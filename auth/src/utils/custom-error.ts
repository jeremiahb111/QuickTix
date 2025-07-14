import { StatusCodes } from "http-status-codes"

export interface IError {
  success: boolean
  statusCode: number
  message: string
}

export abstract class CustomError extends Error {
  abstract statusCode: number
  success = false

  constructor(message: string) {
    super(message)
  }

  serializeError(): IError {
    return {
      success: this.success,
      statusCode: this.statusCode,
      message: this.message
    }
  }
}

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST

  constructor(message: string) {
    super(message)
  }
}

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND

  constructor(message: string) {
    super(message)
  }
}

export class UnauthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED

  constructor(message: string) {
    super(message)
  }
}