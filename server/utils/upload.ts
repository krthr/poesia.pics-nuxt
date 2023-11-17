import type { H3Event, EventHandlerRequest } from "h3";
import { ERRORS } from "@/constants/errors";

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export async function readImageFromBody(
  event: H3Event<EventHandlerRequest>,
  fieldName = "image"
) {
  const body = await readMultipartFormData(event);
  if (!body) {
    return undefined;
  }

  const file = body?.find(
    (field) =>
      field.filename &&
      field.name === fieldName &&
      (!field.type || ALLOWED_FILE_TYPES.includes(field.type))
  );

  if (!file) {
    return undefined;
  }

  return file;
}
