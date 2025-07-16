import dotenv from 'dotenv'

dotenv.config()

export const config = {
  PORT: process.env.AUTH_PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.AUTH_DB_NAME,
  SERVICE_NAME: process.env.AUTH_SERVICE_NAME
}