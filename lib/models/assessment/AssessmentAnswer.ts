import mongoose, { Schema, Document } from "mongoose"

export interface IAssessmentAnswer extends Document {
  user: mongoose.Types.ObjectId;
  question: mongoose.Types.ObjectId;
  answer: string;
  isCorrect?: boolean;
  createdAt?: Date;
}

const AssessmentAnswerSchema = new Schema<IAssessmentAnswer>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: Schema.Types.ObjectId, ref: "AssessmentQuestion" },
    answer: { type: String },
    isCorrect: { type: Boolean },
  },
  { timestamps: true }
);

export default mongoose.models.AssessmentAnswer ||
  mongoose.model<IAssessmentAnswer>("AssessmentAnswer", AssessmentAnswerSchema);