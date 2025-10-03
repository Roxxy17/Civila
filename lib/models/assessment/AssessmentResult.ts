import mongoose, { Schema, Document } from "mongoose"

export interface IResult {
  assessmentAnswer: mongoose.Types.ObjectId; // ref ke dokumen jawaban
  overallScore: number;
  breakdown: Record<string, number>;
  recommendedCareers: string[];
  createdAt?: Date;
}

export interface IAssessmentResult extends Document {
  user: mongoose.Types.ObjectId;
  results: IResult[];
  createdAt?: Date;
}

const ResultSchema = new Schema<IResult>(
  {
    assessmentAnswer: { type: Schema.Types.ObjectId, ref: "AssessmentAnswer", required: true },
    overallScore: { type: Number, required: true },
    breakdown: { type: Map, of: Number },
    recommendedCareers: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
  },
  { _id: true }
);  

const AssessmentResultSchema = new Schema<IAssessmentResult>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    results: [ResultSchema],
  },
  { timestamps: true }
);

export default mongoose.models.AssessmentResult ||
  mongoose.model<IAssessmentResult>("AssessmentResult", AssessmentResultSchema);
