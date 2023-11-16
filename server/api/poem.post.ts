import type { H3Event, EventHandlerRequest } from "h3";
import type { UploadResult } from "firebase/storage";
import type { PoemPayload } from "@/models/poem";

import Sharp from "sharp";
import { nanoid } from "nanoid";

import {
  firestore,
  doc,
  setDoc,
  storage,
  uploadBytes,
  ref,
} from "@/services/firebase";
import { ERRORS, ERROR_COOKIE_NAME, ErrorMessages } from "@/constants/errors";
import { poemConverter } from "@/models/poem";

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

function sendError(
  event: H3Event<EventHandlerRequest>,
  code: ERRORS,
  to = "/"
) {
  setCookie(event, ERROR_COOKIE_NAME, ErrorMessages[code]);
  return sendRedirect(event, to);
}

export default defineEventHandler(async (event) => {
  const id = nanoid(10);

  const body = await readMultipartFormData(event);
  if (!body) {
    return sendError(event, ERRORS.EMPTY_BODY);
  }

  const file = body?.find(
    (field) =>
      field.filename &&
      field.name === "image" &&
      (!field.type || ALLOWED_FILE_TYPES.includes(field.type))
  );

  if (!file) {
    return sendError(event, ERRORS.NO_IMAGE_FIELD);
  }

  const image = Sharp(file.data).jpeg().resize(800, null).withMetadata();
  const preview = image.clone().resize(5, null).blur(10);

  const [imageBuff, imageMetadata, previewBase64] = await Promise.all([
    image.toBuffer(),
    image.metadata(),
    preview
      .toBuffer()
      .then(
        (previewBuff) =>
          `data:image/jpeg;base64,` + previewBuff.toString("base64")
      )
      .catch(() => undefined),
  ]);

  const imageRef = ref(storage, `poems/images/${id}.jpg`);

  let uploadResult: UploadResult;
  try {
    uploadResult = await uploadBytes(imageRef, imageBuff, {
      cacheControl: "max-age=31536000, public",
      contentType: "image/jpeg",
    });
  } catch (error) {
    return sendError(event, ERRORS.UPLOAD_ERROR);
  }

  const payload: PoemPayload = {
    id,
    image: {
      path: uploadResult.metadata.fullPath,
      preview: previewBase64,
      width: imageMetadata.width,
      height: imageMetadata.height,
    },
    poem: {},
  };

  try {
    await setDoc(
      doc(firestore, "poems", id).withConverter(poemConverter),
      payload
    );
  } catch (error) {
    return sendError(event, ERRORS.DOC_CREATION_ERROR);
  }

  return sendRedirect(event, `/poems/${id}`);
});
