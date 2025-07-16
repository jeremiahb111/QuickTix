import { Consumer, Kafka } from "kafkajs";

export class TicketCreatedConsumer {
  private readonly groupId = 'order-service'
  private readonly topic = 'ticket-created'
  private readonly consumer: Consumer

  constructor(kafka: Kafka) {
    this.consumer = kafka.consumer({ groupId: this.groupId })
  }

  async consume() {
    await this.consumer.connect()
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: true })
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value!.toString(),
        })
      },
    })
  }
}