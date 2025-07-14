import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoute from './routes/auth.route'
import { errorHandler } from './middlewares/error-handler'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', authRoute)

app.use(errorHandler)

export { app }