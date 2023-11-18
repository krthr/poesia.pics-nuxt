import { nanoid } from "nanoid";
import { sendCookieError } from "../utils/error";

import {
  Timestamp,
  firestore,
  doc,
  setDoc,
  uploadImage,
} from "@/services/firebase";
import { ERRORS } from "@/constants/errors";
import { generatePoem } from "@/server/services/poem";
import { poemConverter } from "@/models/poem";
import { parseImage } from "../services/image";
import { readImageFromBody } from "../utils/upload";

export default defineEventHandler(async (event) => {
  const id = nanoid(10);

  const file = await readImageFromBody(event);
  if (!file) {
    return sendCookieError(event, ERRORS.EMPTY_BODY);
  }

  const parseImageResult = await parseImage(file.data);
  if (!parseImageResult) {
    return sendCookieError(event, ERRORS.IMAGE_PROCESS_ERROR);
  }

  const generatePoemResult = await generatePoem(parseImageResult.imageBase64);
  if (!generatePoemResult) {
    return sendCookieError(event, ERRORS.POEM_GENERATION_ERROR);
  }

  const uploadResult = await uploadImage(
    `poems/images/${id}.jpg`,
    parseImageResult.imageBuff
  );
  if (!uploadResult) {
    return sendCookieError(event, ERRORS.UPLOAD_ERROR);
  }

  const payload = {
    id,
    image: {
      path: uploadResult.imagePath,
      preview: parseImageResult.previewBase64,
      width: parseImageResult.width,
      height: parseImageResult.height,
    },
    poem: {
      content: generatePoemResult.content,
      mood: "",
      caption: generatePoemResult.title,
    },
    createdAt: Timestamp.now(),
  };

  try {
    await setDoc(
      doc(firestore, "poems", id).withConverter(poemConverter),
      payload
    );
  } catch (error) {
    return sendCookieError(event, ERRORS.DOC_CREATION_ERROR);
  }

  return sendRedirect(event, `/poems/${id}`);
});
