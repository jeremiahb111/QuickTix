import { z } from "zod"

export const SignupSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .trim()
    .toLowerCase()
    .min(1, { message: 'Last name is required' }),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .trim()
    .toLowerCase()
    .min(1, { message: 'Last name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .toLowerCase()
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export const SigninSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .toLowerCase()
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
})

export type SignupType = z.infer<typeof SignupSchema>
export type SigninType = z.infer<typeof SigninSchema>