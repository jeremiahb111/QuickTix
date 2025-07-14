import { Schema, Model, model, Document } from 'mongoose'
import { Password } from '../lib/bcrypt'

interface UserAttrs {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface UserDoc extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
  comparePassword(enteredPassword: string): Promise<boolean>
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret: Record<string, any>) {
      ret.id = ret._id
      delete ret._id
      delete ret.password
      delete ret.__v
    }
  }
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.password)
    this.set('password', hashed)
  }
  next()
})

userSchema.statics.build = (attrs: UserAttrs): UserDoc => {
  return new User(attrs)
}

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await Password.toCompare(enteredPassword, this.password)
}

const User = model<UserDoc, UserModel>('User', userSchema)

export default User