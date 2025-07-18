import { EachMessagePayload } from "kafkajs";
import Ticket from "../../models/ticket.model";
import { NotFoundError } from "@hp_quicktix/common";
import Order from "../../models/order.model";
import { kafkaClient } from "../../config/kafka";

export const ticketConsumerEvent = async (payload: EachMessagePayload) => {
  const { topic, message } = payload

  switch (topic) {
    case 'ticket-created': {
      const ticket = JSON.parse(message.value!.toString())
      await Ticket.build(ticket).save()
      console.log('Ticket created successfully.')
      break
    }

    case 'ticket-updated': {
      const data = JSON.parse(message.value!.toString())

      const ticket = await Ticket.findOne({
        _id: data.id,
        version: data.version - 1
      })

      if (!ticket) throw new NotFoundError('Ticket not found.')

      ticket.set({
        title: data.title,
        price: data.price
      })

      await ticket.save()
      break
    }

    case 'order-expired': {
      const id = JSON.parse(message.value!.toString())

      const order = await Order.findById(id)

      if (!order) throw new NotFoundError('Order not found.')

      if (order.status === 'completed') return

      order.status = 'cancelled'
      await order.save()

      await kafkaClient.produceMessage('order-cancelled', order.ticketId)
      break
    }
  }
}