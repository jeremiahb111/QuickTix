import { Schema, Model, Document, model } from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface PaymentAttrs {
  orderId: string;
  stripeId: string;
  price: number
}

interface PaymentDoc extends Document {
  orderId: string;
  stripeId: string;
  price: number
}

interface PaymentModel extends Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc
}

const paymentSchema = new Schema({
  orderId: {
    type: String,
    required: true
  },
  stripeId: {
    type: String,
    required: true
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

paymentSchema.set('versionKey', 'version')
paymentSchema.plugin(updateIfCurrentPlugin)

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs)
}

const Payment = model<PaymentDoc, PaymentModel>('Payment', paymentSchema)

export default Payment