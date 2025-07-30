import consoleStamp from "console-stamp";
import { app } from "./express-app";
import { connectToDB } from "@hp_quicktix/common";
import { config } from "./config";
import { kafkaClient } from "./config/kafka";
import { ticketConsumerEvent } from "./events/consumer/ticket";
import { orderEventConsumer } from "./events/consumer/order";
import { EachMessagePayload } from "kafkajs";

consoleStamp(console, {
  format: ":date(mm/dd/yyyy HH:MM:ss) :label"
})

const PORT = config.PORT || 3000
const dbConfig = {
  serviceName: config.SERVICE_NAME as string,
  dbName: config.DB_NAME as string,
  db_uri: config.MONGODB_URI as string
}

const topics = config.TOPICS?.split(',') || []

const handleKafkaMessage = async (payload: EachMessagePayload) => {
  const { topic } = payload

  try {
    if (topic.startsWith('ticket')) {
      await ticketConsumerEvent(payload)
    } else if (topic.startsWith('order')) {
      await orderEventConsumer(payload)
    } else {
      console.warn(`Unknown topic: ${topic}`)
    }
  } catch (error) {
    console.error(`Error processing Kafka message: ${error}`)
  }
}

const start = async () => {
  try {
    await Promise.all([
      connectToDB(dbConfig),
      kafkaClient.initProducer(),
      kafkaClient.initConsumer(topics, handleKafkaMessage),
    ])

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error(`Error starting server: ${error}`)
    process.exit(1)
  }
}

start()

process.on('SIGINT', async () => {
  console.log('Shutting down...')
  await kafkaClient.disconnect()
  process.exit(0)
})
