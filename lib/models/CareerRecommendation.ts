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
  assessmentResult: mongoose.Types.ObjectId;
  isPicked? : boolean;
  pickedAt?: Date;
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
    assessmentResult: { type: Schema.Types.ObjectId, ref: "AssessmentResult" },
    isPicked: { type: Boolean, default: false },
    pickedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.CareerRecommendation ||
  mongoose.model<ICareerRecommendation>(
    "CareerRecommendation",
    CareerRecommendationSchema
  );