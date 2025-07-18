import { Schema, Model, Document, model } from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface TicketAttrs {
  title: string;
  price: number;
  sellerId: string;
}

interface TicketDoc extends Document {
  title: string;
  price: number;
  sellerId: string;
  orderId?: string;
}

interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sellerId: {
    type: String,
    required: true
  },
  orderId: {
    type: String
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

ticketSchema.set('versionKey', 'version')
ticketSchema.plugin(updateIfCurrentPlugin)

ticketSchema.statics.build = (attrs: TicketAttrs) => new Ticket(attrs)

const Ticket = model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export default Ticket