import mongoose from "mongoose";
import { z } from "zod";

export const CreateOrderSchema = z.object({
  ticketId: z
    .string({ required_error: 'Ticket ID is required' })
    .refine((id) => mongoose.Types.ObjectId.isValid(id), { message: 'Invalid ticket ID' })
})

export type CreateOrderType = z.infer<typeof CreateOrderSchema>