import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../utils/custom-error'
import { JWT } from '../lib/jwt'

interface IUser {
  id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUser
    }
  }
}

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = req.cookies?.session

    if (!session) throw new UnauthorizedError('Valid session is required.')

    const decoded = await JWT.verifyToken(session) as IUser

    req.currentUser = decoded

    next()
  } catch (error) {
    next(error)
  }
}