import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { errorHandler } from '@hp_quicktix/common'

import ticketRoutes from './routes/ticket.route'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.use('/api/tickets', ticketRoutes)

app.use(errorHandler)

export { app }