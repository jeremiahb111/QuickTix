import consoleStamp from "console-stamp"
import { connectToDB } from "@hp_quicktix/common"
import { config } from "./config"
import { app } from "./express-app"
import { kafkaClient } from "./config/kafka"
import { orderEventConsumer } from "./events/consumer/order"

consoleStamp(console, {
  format: ":date(mm/dd/yyyy HH:MM:ss) :label"
})

const PORT = config.PORT
const dbConfig = {
  serviceName: config.SERVICE_NAME as string,
  dbName: config.DB_NAME as string,
  db_uri: config.MONGODB_URI as string
}

const topics = config.TOPICS?.split(',') || []

const start = async () => {
  try {
    await Promise.all([
      connectToDB(dbConfig),
      kafkaClient.initProducer(),
      kafkaClient.initConsumer(topics, orderEventConsumer)
    ])
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.log(`Error starting payments service: ${error}`)
    process.exit(1)
  }
}

start()