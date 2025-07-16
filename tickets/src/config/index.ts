import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.TICKET_PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.TICKET_DB_NAME,
  SERVICE_NAME: process.env.TICKET_SERVICE_NAME
}