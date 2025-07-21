import dotenv from 'dotenv'

dotenv.config()

export const config = {
  PORT: process.env.PAYMENTS_PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.PAYMENTS_DB_NAME,
  SERVICE_NAME: process.env.PAYMENTS_SERVICE_NAME
}