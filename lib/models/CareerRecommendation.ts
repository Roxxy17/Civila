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
  isPicked?: boolean;
  pickedAt?: Date;
  
  description?: string;                    // Career description
  category?: string;                       // "Technology", "Design", "Business"
  difficulty?: string;                     // "Beginner", "Intermediate", "Advanced"
  marketDemand?: string;                   // "High", "Medium", "Low"
  workType?: string[];                     // ["Remote", "Hybrid", "On-site"]
  aiScore?: number;                        // 0-100 match score
  matchReasons?: string[];                 // Why this career fits
  softSkills?: string[];                   // Non-technical skills
  tools?: string[];                        // Tools/technologies used
  dayInLife?: string;                      // Typical work day description
  careerPath?: string[];                   // Career progression steps

  learningMilestones?: Array<{
    month: number;
    achievement: string;
    skills: string[];
  }>;
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
    
    // New fields
    description: { type: String },
    category: { type: String },
    difficulty: { type: String },
    marketDemand: { type: String },
    workType: [{ type: String }],
    aiScore: { type: Number, min: 0, max: 100 },
    matchReasons: [{ type: String }],
    softSkills: [{ type: String }],
    tools: [{ type: String }],
    dayInLife: { type: String },
    careerPath: [{ type: String }],
    learningMilestones: [{
      month: { type: Number },
      achievement: { type: String },
      skills: [{ type: String }]
    }]
  },
  { timestamps: true }
);

export default mongoose.models.CareerRecommendation ||
  mongoose.model<ICareerRecommendation>(
    "CareerRecommendation",
    CareerRecommendationSchema
  );