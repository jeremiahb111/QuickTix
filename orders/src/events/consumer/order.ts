import { EachMessagePayload } from "kafkajs";
import Order from "../../models/order.model";
import { NotFoundError } from "@hp_quicktix/common";
import { kafkaClient } from "../../config/kafka";

export const orderEventConsumer = async (payload: EachMessagePayload) => {
  const { topic, message } = payload

  switch (topic) {
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

    case 'order-completed': {
      const orderCompleted = JSON.parse(message.value!.toString())

      const order = await Order.findOne({
        _id: orderCompleted.id,
        version: orderCompleted.version - 1
      })

      if (!order) throw new NotFoundError('Order not found.')

      order.status = 'completed'
      await order.save()

      console.log(`Order ${order.id} has been completed.`)
      break
    }
  }
}