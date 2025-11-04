import { Prisma } from "@prisma/client";

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

export function HandleApiError(e: any): AppError {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    switch (e.code) {
      case "P2002":
        console.log(e.meta);
        const target = (e.meta?.target as string[])?.join(",") || "resource";
        return new AppError(`This ${target} already exists.`, 400);
      case "P2025":
        return new NotFoundError("The requested resource was not found.");
      default:
        return new DataBaseError(`Database Error : ${e.code}`);
    }
  }
  if (e instanceof AppError) {
    return e;
  }
  if (e instanceof Error) {
    return new AppError(e.message, 500);
  }
  return new AppError("Un expected Error occured", 500);
}
