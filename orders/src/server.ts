import consoleStamp from "console-stamp";
import { app } from "./express-app";
import { connectToDB } from "@hp_quicktix/common";
import { config } from "./config";
import { TicketCreatedConsumer } from "./events/consumer/ticket-created-consumer";
import { kafka } from "./kafka";

consoleStamp(console, {
  format: ":date(mm/dd/yyyy HH:MM:ss) :label"
})

const PORT = config.PORT || 3000
const dbConfig = {
  serviceName: config.SERVICE_NAME as string,
  dbName: config.DB_NAME as string
}

const start = async () => {
  await connectToDB(dbConfig)
  await new TicketCreatedConsumer(kafka).consume()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()