import { connectToDB } from "@hp_quicktix/common"
import { config } from "./config"
import { app } from "./express-app"

const PORT = config.PORT
const dbConfig = {
  serviceName: config.SERVICE_NAME as string,
  dbName: config.DB_NAME as string,
  db_uri: config.MONGODB_URI as string
}

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

    await connectToDB(dbConfig)
  } catch (error) {
    console.log(`Error starting payments service: ${error}`)
    process.exit(1)
  }
}

start()