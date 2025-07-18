import dotenv from 'dotenv'

dotenv.config()

export const config = {
  PORT: process.env.ORDER_PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.ORDER_DB_NAME,
  SERVICE_NAME: process.env.ORDER_SERVICE_NAME,
  WINDOW_TIME: process.env.ORDER_EXPIRATION_WINDOW,
  TOPICS: process.env.ORDER_KAFKA_CONSUMER_TOPICS,
  GROUP_ID: process.env.ORDER_KAFKA_GROUP_ID,
  CLIENT_ID: process.env.ORDER_KAFKA_CLIENT_ID
}