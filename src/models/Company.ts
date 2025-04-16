import mongoose, { Document, Model } from "mongoose";

export interface ICompany extends Document {
  name: string;
  matchScore: number;
  status: "Target" | "Not Target";
}

const companySchema = new mongoose.Schema<ICompany>({
  name: String,
  matchScore: Number,
  status: {
    type: String,
    enum: ["Target", "Not Target"],
    default: "Not Target",
  },
});

export const Company: Model<ICompany> =
  mongoose.models.Company || mongoose.model<ICompany>("Company", companySchema);