import mongoose, { Document, Schema } from "mongoose";

export interface IGamification extends Document {
  user: mongoose.Types.ObjectId;
  points: number;
  streakDays: number;
  badges: string[];
  lastActive: Date;
}

const GamificationSchema = new Schema<IGamification>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    points: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 },
    badges: [{ type: String }],
    lastActive: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Gamification ||
  mongoose.model<IGamification>("Gamification", GamificationSchema);
