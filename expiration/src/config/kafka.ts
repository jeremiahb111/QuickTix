import { KafkaClient } from "@hp_quicktix/common";

export const kafkaClient = new KafkaClient({
  clientId: 'expiration-service',
  brokers: ['kafka:9094'],
  groupId: 'expiration-service'
})