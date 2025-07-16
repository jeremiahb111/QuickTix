import consoleStamp from "console-stamp";
import { app } from "./express-app";
import { connectToDB } from "@hp_quicktix/common";
import { config } from "./config";

consoleStamp(console, {
  format: ":date(mm/dd/yyyy HH:MM:ss) :label"
})

const PORT = config.PORT
const serviceName = config.SERVICE_NAME as string
const dbName = config.DB_NAME as string

const start = async () => {
  console.log(serviceName)
  await connectToDB(serviceName, dbName)
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()