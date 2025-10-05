import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
  hasProfile?: boolean // Tambahkan field ini
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hasProfile: { type: Boolean, default: false }, // Tambahkan field ini
}, { timestamps: true })

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)