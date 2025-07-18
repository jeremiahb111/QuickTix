import { EachMessagePayload } from "kafkajs";
import { expirationQueue } from "../queues/expiration-queue";

export const orderEventConsumer = async ({ message }: EachMessagePayload) => {
  const data = JSON.parse(message.value!.toString())
  const delay = new Date(data.expiresAt).getTime() - new Date().getTime()

  await expirationQueue.add({ orderId: data.id }, { delay })
}