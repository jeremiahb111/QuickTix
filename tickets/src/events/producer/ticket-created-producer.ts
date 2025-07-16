import { Kafka, Producer } from "kafkajs";

export class TicketCreatedProducer {
  private subject = 'ticket-created'
  private producer: Producer

  constructor(kafka: Kafka) {
    this.producer = kafka.producer()
  }

  async produce(data: any) {
    await this.producer.connect()
    await this.producer.send({
      topic: this.subject,
      messages: [
        {
          value: JSON.stringify(data)
        }
      ]
    })
  }
}