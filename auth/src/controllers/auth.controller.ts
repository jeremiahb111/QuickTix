import { NextFunction, Request, Response } from "express";
import { SigninType, SignupType } from "../types/auth.type";
import User from "../models/user.model";
import { BadRequestError, SuccessResponse, JWT } from '@hp_quicktix/common'

export const signup = async (req: Request<{}, {}, SignupType>, res: Response, next: NextFunction) => {
  const isUserExist = await User.findOne({ email: req.body.email })

  if (isUserExist) throw new BadRequestError('Email is already taken.')

  const user = User.build(req.body)

  await user.save()

  JWT.generateToken({ id: user.id, email: user.email }, res)

  return new SuccessResponse('User created successfully.', 201, user).send(res)
}

export const signin = async (req: Request<{}, {}, SigninType>, res: Response, next: NextFunction) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user || !(await user.comparePassword(req.body.password))) throw new BadRequestError('Invalid credentials.')

  JWT.generateToken({ id: user.id, email: user.email }, res)

  return new SuccessResponse('User signed in successfully.', 200, user).send(res)
}

export const signout = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('session')
  return new SuccessResponse('User signed out successfully.', 200).send(res)
}

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  return new SuccessResponse('User fetched successfully.', 200, req.currentUser).send(res)
}