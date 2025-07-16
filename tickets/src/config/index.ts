import dotenv from "dotenv";

dotenv.config();

export const config = {
  TICKET_PORT: process.env.TICKET_PORT,
  MONGODB_URI: process.env.MONGODB_URI,
}