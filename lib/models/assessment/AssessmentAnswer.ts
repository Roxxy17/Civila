import mongoose, { Schema, Document } from "mongoose"

export interface IAnswer {
  questionIndex: number; // index soal di array questions
  answer: string;        // jawaban user (misal "A", "B", dst)
  isCorrect?: boolean;
}

export interface IAssessmentAnswer extends Document {
  user: mongoose.Types.ObjectId;
  answers: IAnswer[];
  createdAt?: Date;
}

const AnswerSchema = new Schema<IAnswer>(
  {
    questionIndex: { type: Number, required: true },
    answer: { type: String, required: true },
    isCorrect: { type: Boolean },
  },
  { _id: false }
);

const AssessmentAnswerSchema = new Schema<IAssessmentAnswer>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    answers: [AnswerSchema],
  },
  { timestamps: true }
);

export default mongoose.models.AssessmentAnswer ||
  mongoose.model<IAssessmentAnswer>("AssessmentAnswer", AssessmentAnswerSchema);