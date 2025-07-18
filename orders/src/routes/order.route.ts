import { catchAsync, currentUser, validate } from "@hp_quicktix/common";
import { Router } from "express";
import { createOrder, getOrder, getOrders } from "../controllers/order.controller";
import { CreateOrderSchema } from "../types/order.type";

const router = Router()

router.use(currentUser)

router.route('/')
  .get(catchAsync(getOrders))
  .post(validate(CreateOrderSchema), catchAsync(createOrder))

router.get('/:id', catchAsync(getOrder))

export default router