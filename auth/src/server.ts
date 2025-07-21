import consoleStamp from "console-stamp"
import { app } from "./express-app"
import { config } from "./config"
import { connectToDB } from '@hp_quicktix/common'

consoleStamp(console, {
  format: ":date(mm/dd/yyyy HH:MM:ss) :label"
})

const PORT = config.PORT
const dbConfig = {
  serviceName: config.SERVICE_NAME as string,
  dbName: config.DB_NAME as string,
  db_uri: config.MONGODB_URI as string
}

const start = async () => {
  await connectToDB(dbConfig)
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()