import consoleStamp from "console-stamp";
import { app } from "./express-app";
import { connectToDB } from "@hp_quicktix/common";
import { config } from "./config";
import { kafkaClient } from "./config/kafka";
import { ticketConsumerEvent } from "./events/consumer/ticket";

consoleStamp(console, {
  format: ":date(mm/dd/yyyy HH:MM:ss) :label"
})

const PORT = config.PORT || 3000
const dbConfig = {
  serviceName: config.SERVICE_NAME as string,
  dbName: config.DB_NAME as string
}

const topics = config.TOPICS?.split(',') || []

const start = async () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  await connectToDB(dbConfig)
  await kafkaClient.initProducer()
  await kafkaClient.initConsumer(topics, ticketConsumerEvent)
}

start()

process.on('SIGINT', async () => {
  console.log('Shutting down...')
  await kafkaClient.disconnect()
  process.exit(0)
})
