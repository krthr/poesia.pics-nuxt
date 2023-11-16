import type { ErrorCookie } from "~/server/api/poem.post";
import { ERROR_COOKIE_NAME } from "@/constants/errors";

export default function useError() {
  const errorCookie = useCookie(ERROR_COOKIE_NAME);
  const error = errorCookie.value as ErrorCookie | undefined;

  errorCookie.value = null;

  if (error) {
    return error;
  }
}
