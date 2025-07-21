import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import { config } from "../config";
import { BadRequestError, NotFoundError, SuccessResponse, UnauthorizedError } from "@hp_quicktix/common";
import Order from "../models/order.model";
import { kafkaClient } from "../config/kafka";
import Payment from "../models/payment.model";
import { CheckoutSessionType, CheckoutSuccessType } from "../types/payment.type";

const stripe = new Stripe(config.STRIPE_SECRET_KEY!)

export const createCheckoutSession = async (req: Request<{}, {}, CheckoutSessionType>, res: Response, next: NextFunction) => {
  const { orderId, ticketInfo } = req.body

  if (!orderId) throw new BadRequestError('Order id is required.')

  const order = await Order.findOne({
    _id: orderId,
    status: 'created'
  })

  if (!order) throw new NotFoundError('Order not found')

  if (order.userId !== req.currentUser!.id) throw new UnauthorizedError('You are not allowed to checkout this order')

  if (order.status === 'cancelled') throw new BadRequestError('Cannot pay for cancelled order')

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: ticketInfo.title,
            description: 'test',
            images: ['https://marketplace.canva.com/EAFlojB7hMI/1/0/1600w/canva-black-modern-event-concert-ticket-mIW2XWERLoA.jpg']
          },
          unit_amount: ticketInfo.price * 100
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: 'https://google.com',
    cancel_url: 'https://google.com',
    metadata: {
      orderId
    }
  })

  return new SuccessResponse('Checkout session created successfully.', 201, {
    sessionId: session.id,
    paymentLink: session.url
  }).send(res)
}

export const checkoutSuccess = async (req: Request<{}, {}, CheckoutSuccessType>, res: Response, next: NextFunction) => {
  const { sessionId } = req.body

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (session.payment_status !== 'paid') throw new BadRequestError('Payment not yet completed')

  const { orderId } = session.metadata!

  const order = await Order.findById(orderId)

  if (!order) throw new NotFoundError('Order not found')

  order.status = 'completed'

  await order.save()

  await Payment.build({
    orderId: order.id,
    stripeId: session.payment_intent as string,
    price: order.price
  }).save()

  await kafkaClient.produceMessage('order-completed', order)

  return new SuccessResponse('Order completed successfully.').send(res)
}