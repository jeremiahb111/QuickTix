import bcrypt from 'bcryptjs'

export class Password {
  static async toHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 12)
  }

  static async toCompare(enteredPassword: string, savedPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, savedPassword)
  }
}