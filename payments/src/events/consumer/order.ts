import { EachMessagePayload } from "kafkajs";
import Order from "../../models/order.model";
import { NotFoundError } from "@hp_quicktix/common";

export const orderEventConsumer = async (payload: EachMessagePayload) => {
  const { topic, message } = payload
  const data = JSON.parse(message.value!.toString())

  switch (topic) {
    case 'order-created': {
      const order = await Order.build({
        id: data.id,
        version: data.version,
        status: data.status,
        userId: data.userId,
        price: data.ticket.price
      }).save()

      console.log(`Order ${order.id} has been created.`)

      break
    }
    case 'order-expired': {
      const orderId = data

      const order = await Order.findById(orderId)

      if (!order) throw new NotFoundError('Order not found.')

      if (order.status === 'completed') return

      order.status = 'cancelled'

      await order.save()

      console.log(`Order ${order.id} has been cancelled.`)

      break
    }
  }
}