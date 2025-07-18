import dotenv from 'dotenv'

dotenv.config()

export const config = {
  REDIS_HOST: process.env.REDIS_HOST,
  CLIENT_ID: process.env.EXPIRATION_KAFKA_CLIENT_ID,
  GROUP_ID: process.env.EXPIRATION_KAFKA_GROUP_ID,
  TOPICS: process.env.EXPIRATION_KAFKA_CONSUMER_TOPICS
}