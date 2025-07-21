import { Schema, Model, Document, model } from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import Order from "./order.model";

interface TicketAttrs {
  id: string;
  title: string;
  price: number;
  sellerId: string;
}

export interface TicketDoc extends Document {
  title: string;
  price: number;
  sellerId: string;
  isReserved(): Promise<boolean>
}

interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sellerId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret: Record<string, any>) {
      ret.id = ret._id
      delete ret._id
    }
  }
})

ticketSchema.set('versionKey', 'version')
ticketSchema.plugin(updateIfCurrentPlugin)

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
    sellerId: attrs.sellerId
  })
}

ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticketId: this.id,
    status: {
      $in: ['created', 'completed']
    }
  })

  return !!existingOrder
}

const Ticket = model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export default Ticket