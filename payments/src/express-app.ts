import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorHandler } from '@hp_quicktix/common'

import paymentRoutes from './routes/payment.route'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.use('/api/payments', paymentRoutes)

app.use(errorHandler)

export { app }