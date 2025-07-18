import { NextFunction, Request, Response } from "express";
import Order from "../models/order.model";
import { BadRequestError, NotFoundError, SuccessResponse } from "@hp_quicktix/common";
import Ticket from "../models/ticket.model";
import { config } from "../config";
import { CreateOrderType } from "../types/order.type";
import mongoose from "mongoose";
import { kafkaClient } from "../config/kafka";

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  const orders = await Order.find({ userId: req.currentUser!.id })

  return new SuccessResponse('Orders fetched successfully.', 200, orders).send(res)
}

export const createOrder = async (req: Request<{}, {}, CreateOrderType>, res: Response, next: NextFunction) => {
  const ticketId = req.body.ticketId

  const isValidId = mongoose.Types.ObjectId.isValid(ticketId)

  if (!isValidId) throw new NotFoundError('Cannot create an order for non-existent ticket.')

  const ticket = await Ticket.findById(ticketId)

  if (!ticket) throw new NotFoundError('Ticket not found.')

  const isReserved = await ticket.isReserved()

  if (isReserved) throw new BadRequestError('Ticket is already reserved.')

  const expiration = new Date()
  expiration.setSeconds(expiration.getSeconds() + (+config.WINDOW_TIME!))

  const order = Order.build({
    userId: req.currentUser!.id,
    expiresAt: expiration,
    status: 'created',
    ticketId: ticket.id
  })

  await order.save()

  await kafkaClient.produceMessage('order-created', {
    id: order.id,
    version: order.version,
    status: order.status,
    userId: order.userId,
    expiresAt: order.expiresAt.toISOString(),
    ticketId: order.ticketId
  })

  return new SuccessResponse('Order created successfully.', 201, order).send(res)
}

export const getOrder = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const { id } = req.params

  const isValidId = mongoose.Types.ObjectId.isValid(id)

  if (!isValidId) throw new BadRequestError('Order not found.')

  const order = await Order.findById(id)

  if (!order) throw new NotFoundError('Order not found.')

  return new SuccessResponse('Order fetched successfully.', 200, order).send(res)
}