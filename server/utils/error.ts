import type { H3Event, EventHandlerRequest } from "h3";

import { ERRORS, ERROR_COOKIE_NAME, ErrorMessages } from "@/constants/errors";
import { StringFormat } from "firebase/storage";

export interface ErrorCookie {
  code: ERRORS;
  message: StringFormat;
}

export function sendError(
  event: H3Event<EventHandlerRequest>,
  code: ERRORS,
  to = "/"
) {
  setCookie(
    event,
    ERROR_COOKIE_NAME,
    JSON.stringify({ code, message: ErrorMessages[code] } as ErrorCookie)
  );

  return sendRedirect(event, to);
}
