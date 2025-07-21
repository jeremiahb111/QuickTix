import { z } from 'zod'
import mongoose from 'mongoose'

export const CheckoutSessionSchema = z.object({
  orderId: z
    .string({ required_error: 'Order ID is required' })
    .refine((id) => mongoose.Types.ObjectId.isValid(id), { message: 'Invalid order ID' }),
  ticketInfo: z.object({
    price: z.number({ required_error: 'Ticket price is required' }).min(1, { message: 'Ticket price must be greater than 1' }),
    title: z.string({ required_error: 'Ticket title is required' }).min(1, { message: 'Ticket title is required' })
  })
})

export const CheckoutSuccessSchema = z.object({
  sessionId: z
    .string({ required_error: 'Session ID is required' })
})

export type CheckoutSessionType = z.infer<typeof CheckoutSessionSchema>
export type CheckoutSuccessType = z.infer<typeof CheckoutSuccessSchema>