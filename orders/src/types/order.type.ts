import { z } from "zod";

export const CreateOrderSchema = z.object({ ticketId: z.string({ required_error: 'Ticket ID is required' }) })

export type CreateOrderType = z.infer<typeof CreateOrderSchema>