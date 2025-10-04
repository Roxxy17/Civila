import mongoose, { Schema, Document } from "mongoose"

export interface ICareerRecommendation {
  careerName: string;
  reason?: string;
  matchPercentage?: number;
}

export interface IResult {
  assessmentAnswer: mongoose.Types.ObjectId;
  overallScore: number;
  breakdown: Record<string, number>;
  recommendedCareers: ICareerRecommendation[];
  createdAt?: Date;
}

export interface IAssessmentResult extends Document {
  user: mongoose.Types.ObjectId;
  results: IResult[];
  createdAt?: Date;
}

// Embedded schema for recommendedCareers
const CareerRecommendationSchema = new Schema<ICareerRecommendation>(
  {
    careerName: { type: String, required: true },
    reason: { type: String },
    matchPercentage: { type: Number },
  },
  { _id: false }
);

const ResultSchema = new Schema<IResult>(
  {
    assessmentAnswer: { type: Schema.Types.ObjectId, ref: "AssessmentAnswer", required: true },
    overallScore: { type: Number, required: true },
    breakdown: { type: Schema.Types.Mixed }, // lebih fleksibel
    recommendedCareers: [CareerRecommendationSchema],
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
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