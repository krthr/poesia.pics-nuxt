export enum ERRORS {
  EMPTY_BODY = "EMPTY_BODY",
  NO_IMAGE_FIELD = "NO_IMAGE_FIELD",
  IMAGE_PROCESS_ERROR = "IMAGE_PROCESS_ERROR",
  UPLOAD_ERROR = "UPLOAD_ERROR",
  DOC_CREATION_ERROR = "DOC_CREATION_ERROR",
  POEM_GENERATION_ERROR = "POEM_GENERATION_ERROR",
}

export const ErrorMessages = {
  [ERRORS.EMPTY_BODY]: "",
  [ERRORS.NO_IMAGE_FIELD]: "",
  [ERRORS.IMAGE_PROCESS_ERROR]: "",
  [ERRORS.UPLOAD_ERROR]: "",
  [ERRORS.DOC_CREATION_ERROR]:
    "Ha ocurrido un error al tratar de guarda el poema. Inténtalo más tarde.",
  [ERRORS.POEM_GENERATION_ERROR]:
    "No se ha podido generar el poema. Inténtalo más tarde.",
};

export const ERROR_COOKIE_NAME = "x-poesiapics-error";
