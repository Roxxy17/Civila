import mongoose, { Document, Schema } from "mongoose";

export interface IRoadmapStep extends Document {
  roadmap: mongoose.Types.ObjectId;
  stepNumber: number;
  title: string;
  description?: string;
  resourceLink?: string;
  isCompleted?: boolean;
}

const RoadmapStepSchema = new Schema<IRoadmapStep>(
  {
    roadmap: { type: Schema.Types.ObjectId, ref: "Roadmap", required: true },
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    resourceLink: { type: String },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.RoadmapStep ||
  mongoose.model<IRoadmapStep>("RoadmapStep", RoadmapStepSchema);
