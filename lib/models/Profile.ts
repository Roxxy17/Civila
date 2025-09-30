import mongoose, { Schema, Document } from "mongoose";

// Definisikan nilai-nilai enum dalam sebuah array untuk kemudahan pengelolaan
const careerCategories = [
  "Teknologi & IT",
  "Desain & Kreatif",
  "Bisnis & Manajemen",
  "Marketing & Sales",
  "Keuangan & Akuntansi",
  "Kesehatan & Medis",
  "Pendidikan & Pelatihan",
  "Teknik & Engineering",
  "Lainnya",
];

export interface IProfile extends Document {
  user: mongoose.Types.ObjectId;
  age?: string;
  background?: string;
  // Anda bisa membuat tipe lebih ketat di interface jika mau
  targetCareer?: (typeof careerCategories)[number];
  interests?: string[];
  currentSkills?: string[];
  uploadedCV? : string;
  skillGap?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    age: { type: String },
    background: { type: String },
    targetCareer: {
      type: String,
      enum: careerCategories,
    },
    interests: [{ type: String }],
    currentSkills: [{ type: String }],
    skillGap: { type: Schema.Types.Mixed },
    uploadedCV: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Profile ||
  mongoose.model<IProfile>("Profile", ProfileSchema);
