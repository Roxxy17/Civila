import mongoose, { Schema, Document } from "mongoose"

export interface IQuestion {
  questionText: string;
  category?: string;
  options?: string[];
  correctAnswer?: string;
}

export interface IAssessmentQuestion extends Document {
  user: mongoose.Types.ObjectId;
  questions: IQuestion[];
  createdAt?: Date;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    questionText: { type: String, required: true },
    category: { type: String },
    options: [{ type: String }],
    correctAnswer: { type: String },
  },
  { _id: false }
);

const AssessmentQuestionSchema = new Schema<IAssessmentQuestion>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

export default mongoose.models.AssessmentQuestion ||
  mongoose.model<IAssessmentQuestion>(
    "AssessmentQuestion",
    AssessmentQuestionSchema
  );