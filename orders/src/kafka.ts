import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: 'order-service',
  brokers: ['kafka:9094']
})