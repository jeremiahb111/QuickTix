import { Response, Request, NextFunction, RequestHandler } from 'express'

type AsyncController<
  P extends object = {},
  B extends object = {},
  Q extends object = {}
> = (req: Request<P, any, B, Q>, res: Response, next: NextFunction) => Promise<Response>

export const catchAsync = <
  P extends object = {},
  B extends object = {},
  Q extends object = {}
>(controller: AsyncController<P, B, Q>): RequestHandler<P, any, B, Q> => {
  return (req, res, next) => controller(req, res, next).catch(next)
}