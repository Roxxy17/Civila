import mongoose, { Schema, Document } from "mongoose"

export interface IAssessmentResult extends Document {
  user: mongoose.Types.ObjectId;
  overallScore: number;
  breakdown: Record<string, number>;
  recommendedCareers: string[];
  createdAt?: Date;
}

const AssessmentResultSchema = new Schema<IAssessmentResult>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    overallScore: { type: Number, required: true },
    breakdown: { type: Map, of: Number },
    recommendedCareers: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.AssessmentResult ||
  mongoose.model<IAssessmentResult>(
    "AssessmentResult",
    AssessmentResultSchema
  );
