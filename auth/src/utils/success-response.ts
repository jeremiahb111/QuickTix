import { Response } from "express"

interface IJsonResponse<T> {
  success: boolean
  message: string
  data: T
}

export class SuccessResponse<T = null> {
  success = true

  constructor(public message: string, public statusCode: number = 200, public data?: T) { }

  send(res: Response): Response<IJsonResponse<T>> {
    const jsonResponse: IJsonResponse<T> = {
      success: this.success,
      message: this.message,
      data: this.data as T
    }

    return res.status(this.statusCode).json(jsonResponse)
  }
}