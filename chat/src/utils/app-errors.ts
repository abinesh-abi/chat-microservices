export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public errorStack?: string; // Optional property
  public logError?: boolean; // Optional property
  constructor(
    name: string,
    statusCode: number,
    description: string,
    isOperational: boolean,
    errorStack: string,
    logingErrorResponse: boolean
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = logingErrorResponse;
    Error.captureStackTrace(this);
  }
}

//api Specific Errors
export class APIError extends AppError {
  constructor(
    name: string,
    statusCode = STATUS_CODES.INTERNAL_ERROR,
    description = "Internal Server Error",
    isOperational = true,
    errorStack: string, // Optional parameter
    logingErrorResponse = false // Default value for logging
  ) {
    super(
      name,
      statusCode,
      description,
      isOperational,
      errorStack,
      logingErrorResponse
    );
  }
}

//400
export class BadRequestError extends AppError {
  constructor(description = "Bad request", logingErrorResponse: boolean) {
    super(
      "NOT FOUND",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      "",
      logingErrorResponse
    );
  }
}

//400
export class ValidationError extends AppError {
  constructor(description = "Validation Error", errorStack: string) {
    super(
      "BAD REQUEST",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      errorStack,
      false
    );
  }
}

// export default {
//   AppError,
//   APIError,
//   BadRequestError,
//   ValidationError,
//   STATUS_CODES,
// };
