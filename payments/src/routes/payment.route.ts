import { catchAsync, currentUser, validate } from "@hp_quicktix/common";
import { Router } from "express";
import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller";
import { CheckoutSessionSchema, CheckoutSuccessSchema } from "../types/payment.type";

const router = Router();

router.use(currentUser)

router.post('/create-checkout-session', validate(CheckoutSessionSchema), catchAsync(createCheckoutSession))
router.post('/checkout-success', validate(CheckoutSuccessSchema), catchAsync(checkoutSuccess))

export default router