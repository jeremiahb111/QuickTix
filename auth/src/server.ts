import consoleStamp from "console-stamp"
import { app } from "./express-app"
import { config } from "./config"
import { connectToDB } from "./lib/db"

consoleStamp(console, {
  format: ":date(mm/dd/yyyy HH:MM:ss) :label"
})

const PORT = config.PORT

const start = async () => {
  await connectToDB()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()