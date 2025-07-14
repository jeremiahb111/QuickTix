import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../utils/custom-error'
import { config } from '../config'
import { Response } from 'express'

interface IPayload {
  id: string
  email: string,
}

export class JWT {
  static generateToken(payload: IPayload, res: Response) {
    const session = jwt.sign(payload, config.JWT_SECRET as string)

    res.cookie('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    })
  }

  static async verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.JWT_SECRET as string, (err, decoded) => {
        if (err) return reject(new UnauthorizedError('Invalid token.'))

        resolve(decoded)
      })
    })
  }
}