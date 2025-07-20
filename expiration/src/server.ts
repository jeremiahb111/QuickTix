import consoleStamp from "console-stamp"

import { kafkaClient } from "./config/kafka"
import { orderEventConsumer } from "./events/order"
import { config } from "./config/secrets"

consoleStamp(console, {
  format: ":date(mm/dd/yyyy HH:MM:ss) :label"
})

const topics = config.TOPICS?.split(',') || []

const start = async () => {
  try {
    console.log('Starting expiration service...')
    await kafkaClient.initProducer()
    await kafkaClient.initConsumer(topics, orderEventConsumer)
  } catch (error) {
    console.log(`Error starting expiration service: ${error}`)
    process.exit(1)
  }
}

start()