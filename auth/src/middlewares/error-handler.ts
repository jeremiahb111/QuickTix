import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import { BadRequestError, CustomError } from "../utils/custom-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const zodValidationError = (err instanceof ZodError)
  const message = zodValidationError ? 'Zod Validation Error' : err.message

  console.error(`${req.originalUrl} - ${message}`)

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.serializeError())
  } else if (zodValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json(new BadRequestError(err.issues[0].message).serializeError())
  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong'
    })
  }
}