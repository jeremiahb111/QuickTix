import { Router } from "express";
import { getCurrentUser, signin, signout, signup } from "../controllers/auth.controller";
import { SigninSchema, SignupSchema } from "../types/auth.type";
import { currentUser, validate, catchAsync } from '@hp_quicktix/common'

const router = Router();

router.post('/signup', validate(SignupSchema), catchAsync(signup))
router.post('/signin', validate(SigninSchema), catchAsync(signin))
router.post('/signout', catchAsync(signout))
router.get('/current-user', currentUser, catchAsync(getCurrentUser))

export default router;