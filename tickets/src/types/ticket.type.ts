import { z } from "zod"

export const CreateTicketSchema = z.object({
  title: z.string({ required_error: 'Title is required' }).trim().min(1, { message: 'Title is required' }),
  price: z.number({ required_error: 'Price is required' }).min(1, { message: 'Price must be greater than 1' })
})

export const UpdateTicketSchema = z.object({
  title: z.string().trim().min(1, { message: 'Title is required' }).optional(),
  price: z.number().min(1, { message: 'Price must be greater than 1' }).optional()
}).refine((data) => {
  return data.title !== undefined || data.price !== undefined
}, {
  message: 'At least one field (title or price) must be provided'
})


export type CreateTicketType = z.infer<typeof CreateTicketSchema>
export type UpdateTicketType = z.infer<typeof UpdateTicketSchema>