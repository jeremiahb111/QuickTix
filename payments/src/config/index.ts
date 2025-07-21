import dotenv from 'dotenv'

dotenv.config()

export const config = {
  PORT: process.env.PAYMENTS_PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.PAYMENTS_DB_NAME,
  SERVICE_NAME: process.env.PAYMENTS_SERVICE_NAME,
  STRIPE_SECRET_KEY: process.env.PAYMENTS_STRIPE_SECRET_KEY,
  TOPICS: process.env.PAYMENTS_KAFKA_CONSUMER_TOPICS,
  CLIENT_ID: process.env.PAYMENTS_KAFKA_CLIENT_ID,
  GROUP_ID: process.env.PAYMENTS_KAFKA_GROUP_ID
}