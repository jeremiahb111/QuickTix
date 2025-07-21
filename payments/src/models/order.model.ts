import { Schema, Model, Document, model } from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface OrderAttrs {
  id: string
  userId: string
  status: string
  version: number
  price: number
}

interface OrderDoc extends Document {
  userId: string
  status: string
  price: number
  version: number
}

interface OrderModel extends Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc
}

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['created', 'cancelled', 'completed'],
    default: 'created',
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret: Record<string, any>) {
      ret.id = ret._id
      delete ret._id
    }
  }
})

orderSchema.set('versionKey', 'version')
orderSchema.plugin(updateIfCurrentPlugin)

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    _id: attrs.id,
    userId: attrs.userId,
    status: attrs.status,
    price: attrs.price
  })
}

const Order = model<OrderDoc, OrderModel>('Order', orderSchema)

export default Order