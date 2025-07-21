import Queue from "bull";
import { config } from "../config/secrets";
import { kafkaClient } from "../config/kafka";

const expirationQueue = new Queue("expiration-queue", {
  redis: {
    host: config.REDIS_HOST
  }
});

expirationQueue.process(async (job) => {
  const { orderId } = job.data

  await kafkaClient.produceMessage('order-expired', orderId)

  console.log(`Transaction with order id: ${orderId} has expired.`)
});

export { expirationQueue };