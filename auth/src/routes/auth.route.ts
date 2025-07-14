import { Router } from "express";
import { catchAsync } from "../utils/catch-async";
import { getCurrentUser, signin, signout, signup } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { SigninSchema, SignupSchema } from "../types/auth.type";
import { currentUser } from "../middlewares/current-user";

const router = Router();

router.post('/signup', validate(SignupSchema), catchAsync(signup))
router.post('/signin', validate(SigninSchema), catchAsync(signin))
router.post('/signout', catchAsync(signout))
router.get('/current-user', currentUser, catchAsync(getCurrentUser))

export default router;