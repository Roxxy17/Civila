import mongoose, { Schema, Document } from "mongoose"

export interface ICareerRecommendation extends Document {
  user: mongoose.Types.ObjectId;
  careerName: string;
  level: string;
  salaryRange?: string;
  growthRate?: string;
  estimatedLearningTime?: string;
  requiredSkills?: string[];
  roadmap?: mongoose.Types.ObjectId;
}

const CareerRecommendationSchema = new Schema<ICareerRecommendation>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    careerName: { type: String, required: true },
    level: { type: String },
    salaryRange: { type: String },
    growthRate: { type: String },
    estimatedLearningTime: { type: String },
    requiredSkills: [{ type: String }],
    roadmap: { type: Schema.Types.ObjectId, ref: "Roadmap" },
  },
  { timestamps: true }
);

export default mongoose.models.CareerRecommendation ||
  mongoose.model<ICareerRecommendation>(
    "CareerRecommendation",
    CareerRecommendationSchema
  );