import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import connectDB from "@/lib/mongodb"
import AssessmentAnswer from "@/lib/models/assessment/AssessmentAnswer"

export async function POST(req: NextRequest) {
  await connectDB()
  const token = await getToken({ req })
  if (!token?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const answers = body.answers

  if (!Array.isArray(answers) || answers.length === 0) {
    return NextResponse.json({ error: "Jawaban tidak ditemukan" }, { status: 400 })
  }

  // Simpan jawaban user, satu dokumen per user
  const saved = await AssessmentAnswer.findOneAndUpdate(
    { user: token.sub },
    { $set: { answers } },
    { upsert: true, new: true }
  )

  return NextResponse.json({ success: true, answers: saved.answers })
}