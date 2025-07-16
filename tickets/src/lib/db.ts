import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "tm_tickets"
    })

    if (connect) console.log(`Tickets Service is now connected to MongoDB: ${connect.connection.host}`)
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`)
    process.exit(1)
  }
}