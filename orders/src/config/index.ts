import dotenv from 'dotenv'

dotenv.config()

export const config = {
  PORT: process.env.ORDER_PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.ORDER_DB_NAME,
  SERVICE_NAME: process.env.ORDER_SERVICE_NAME
}