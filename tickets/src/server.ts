import consoleStamp from "console-stamp";
import { app } from "./express-app";
import { connectToDB } from "@hp_quicktix/common";
import { config } from "./config";
import { kafkaClient } from "./config/kafka";
import { ticketEventConsumer } from "./events/consumer/ticket";

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
      kafkaClient.initConsumer(topics, ticketEventConsumer)
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