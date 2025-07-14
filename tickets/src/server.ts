import consoleStamp from "console-stamp";
import { app } from "./express-app";

consoleStamp(console, {
  format: ":date(mm/dd/yyyy HH:MM:ss) :label"
})

const start = async () => {
  app.listen(3001, () => {
    console.log(`Server running on port 3001`)
  })
}

start()