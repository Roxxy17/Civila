import mongoose, { Document, Schema } from "mongoose";

export interface IRoadmap extends Document {
  user: mongoose.Types.ObjectId;
  career: string;
  description?: string;
  generatedBy?: string;
  createdAt?: Date;
}

const RoadmapSchema = new Schema<IRoadmap>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    career: { type: String, required: true },
    description: { type: String },
    generatedBy: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Roadmap ||
  mongoose.model<IRoadmap>("Roadmap", RoadmapSchema);
