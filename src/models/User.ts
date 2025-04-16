import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: String,
  password: String,
});

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
