import { catchAsync, currentUser } from "@hp_quicktix/common";
import { Router } from "express";
import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller";

const router = Router();

router.use(currentUser)

router.post('/create-checkout-session', catchAsync(createCheckoutSession))
router.post('/checkout-success', catchAsync(checkoutSuccess))

export default router