import { NODE_ENV } from "../../../../config/config.service.js";


// general customized error method
export const ErrorResponse = ({
  message = "Error",
  status = 400,
  extra = undefined,
} = {}) => {
  const error = new Error(message);
  error.cause = { status, extra };
  return error;
}

//error-templates
export const BadRequestException = (
  message = "BadRequestException",
  extra = undefined,
) => {
  return ErrorResponse({ message, status: 400, extra });
};

export const conflictException = (
  message = "ConflictException",
  extra = undefined,
) => {
  return ErrorResponse({ message, status: 409, extra });
};

export const UnauthorizedException = ({
  message = "UnauthorizedException",
  extra = undefined,
} = {}) => {
  return ErrorResponse({ message, status: 401, extra });
};

export const NotFoundException = (
  message = "NotFoundException",
  extra = undefined,
) => {
  return ErrorResponse({ message, status: 404, extra });
};

export const ForbiddenException = (
  message = "ForbiddenException",
  extra = undefined,
) => {
  return ErrorResponse({ message, status: 403, extra });
};

//Fixed error structure
export const globalErrorHandling = (error, res) => {
  const status = error.cause?.status ?? 500;
  const mode = NODE_ENV;
  const defaultErrorMessage = "something went wrong Server error";
  const displayErrorMessage = error.message || defaultErrorMessage;
  return res.status(status).json({
    mode,
    message: displayErrorMessage,
    stack: mode === "development" ? error.stack : undefined,
  });
};
