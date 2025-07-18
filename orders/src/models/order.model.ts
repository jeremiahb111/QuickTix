import { Schema, Model, Document, model } from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface OrderAttrs {
  userId: string;
  status: string;
  expiresAt: Date;
  ticketId: Schema.Types.ObjectId
}

interface OrderDoc extends Document {
  userId: string;
  status: string;
  expiresAt: Date;
  ticketId: Schema.Types.ObjectId
  version: number;
}

interface OrderModel extends Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
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
  expiresAt: {
    type: Date,
    required: true,
  },
  ticketId: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
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
  return new Order(attrs)
}

const Order = model<OrderDoc, OrderModel>('Order', orderSchema)

export default Order