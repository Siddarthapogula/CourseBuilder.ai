export class AppError extends Error {
  public readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class DataBaseError extends AppError {
  constructor(message: string = "A error occured at Database") {
    super(message, 500);
  }
}

export class AiError extends AppError {
  constructor(message: string = "A error occured at ai generation") {
    super(message, 500);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}
