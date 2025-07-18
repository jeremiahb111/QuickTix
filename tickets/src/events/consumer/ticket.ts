import { EachMessagePayload } from "kafkajs";
import Ticket from "../../models/ticket.model";
import { NotFoundError } from "@hp_quicktix/common";
import { kafkaClient } from "../../config/kafka";

export const ticketEventConsumer = async (payload: EachMessagePayload) => {
  const { message, topic } = payload
  switch (topic) {
    case 'order-created': {
      const orderInfo = JSON.parse(message.value!.toString())

      const ticket = await Ticket.findById(orderInfo.ticketId)

      if (!ticket) throw new NotFoundError('Ticket not found.')

      ticket.set({ orderId: orderInfo.id })

      await ticket.save()

      await kafkaClient.produceMessage('ticket-updated', ticket)

      console.log('Ticket created successfully.')

      break
    }

    case 'order-cancelled': {
      const orderId = JSON.parse(message.value!.toString())

      const ticket = await Ticket.findById(orderId)

      if (!ticket) throw new NotFoundError('Ticket not found.')

      ticket.set({ orderId: undefined })

      await ticket.save()

      await kafkaClient.produceMessage('ticket-updated', ticket)

      console.log('Ticket updated successfully.')

      break
    }
  }
}