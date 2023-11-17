import type { PoemPayload } from "@/models/poem";

import { nanoid } from "nanoid";
import { sendError } from "../utils/error";

import { firestore, doc, setDoc, uploadImage } from "@/services/firebase";
import { ERRORS } from "@/constants/errors";
import { generatePoem } from "@/server/services/poem";
import { poemConverter } from "@/models/poem";
import { parseImage } from "../services/image";
import { readImageFromBody } from "../utils/upload";

export default defineEventHandler(async (event) => {
  const id = nanoid(10);

  const file = await readImageFromBody(event);
  if (!file) {
    return sendError(event, ERRORS.EMPTY_BODY);
  }

  const parseImageResult = await parseImage(file.data);
  if (!parseImageResult) {
    return sendError(event, ERRORS.IMAGE_PROCESS_ERROR);
  }

  const uploadResult = await uploadImage(
    `poems/images/${id}.jpg`,
    parseImageResult.imageBuff
  );
  if (!uploadResult) {
    return sendError(event, ERRORS.UPLOAD_ERROR);
  }

  const payload: PoemPayload = {
    id,
    image: {
      path: uploadResult.imagePath,
      preview: parseImageResult.previewBase64,
      width: parseImageResult.width,
      height: parseImageResult.height,
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
