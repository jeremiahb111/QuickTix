import { KafkaClient } from "@hp_quicktix/common";
import { config } from ".";

export const kafkaClient = new KafkaClient({
  clientId: config.CLIENT_ID!,
  brokers: ['kafka:9094'],
  groupId: config.GROUP_ID
})
