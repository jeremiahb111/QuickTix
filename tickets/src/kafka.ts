import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: 'ticket-service',
  brokers: ['kafka:9094']
})