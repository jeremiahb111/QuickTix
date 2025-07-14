import mongoose from "mongoose"
import { config } from "../config"

export const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(config.MONGODB_URI as string, {
      dbName: "tm_auth"
    })

    console.log(`Connected to MongoDB: ${connect.connection.host}`)
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`)
    process.exit(1)
  }
}