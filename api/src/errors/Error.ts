export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class MethodNotAllowedError extends AppError {
  constructor(message = "Method not allowed") {
    super(message, 405);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

export class GoneError extends AppError {
  constructor(message = "Resource is no longer available") {
    super(message, 410);
  }
}

export class PayloadTooLargeError extends AppError {
  constructor(message = "Payload too large") {
    super(message, 413);
  }
}

export class UnsupportedMediaTypeError extends AppError {
  constructor(message = "Unsupported media type") {
    super(message, 415);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message = "Unprocessable entity") {
    super(message, 422);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = "Too many requests") {
    super(message, 429);
  }
}

// 5xx Server Errors
export class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500);
  }
}

export class NotImplementedError extends AppError {
  constructor(message = "Not implemented") {
    super(message, 501);
  }
}

export class BadGatewayError extends AppError {
  constructor(message = "Bad gateway") {
    super(message, 502);
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = "Service unavailable") {
    super(message, 503);
  }
}

export class GatewayTimeoutError extends AppError {
  constructor(message = "Gateway timeout") {
    super(message, 504);
  }
}

export class DatabaseError extends AppError {
  constructor(message = "Database error") {
    super(message, 500);
  }
}

export class TimeoutError extends AppError {
  constructor(message = "Operation timed out") {
    super(message, 504);
  }
}

export class DependencyError extends AppError {
  constructor(message = "External dependency failed") {
    super(message, 502);
  }
}
