import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import connectDB from "@/lib/mongodb";
import AssessmentAnswer from "@/lib/models/assessment/AssessmentAnswer";
import AssessmentQuestion from "@/lib/models/assessment/AssessmentQuestion";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const answerDoc = await AssessmentAnswer.findById(id);
  if (!answerDoc) {
    return NextResponse.json({ error: "Answer not found" }, { status: 404 });
  }
  return NextResponse.json({ answers: answerDoc.answers, assessmentId: answerDoc.assessmentId });
}


export async function POST(req: NextRequest) {
  await connectDB();
  const token = await getToken({ req });
  if (!token?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { answers, assessmentId } = body;

  if (!Array.isArray(answers) || answers.length === 0 || !assessmentId) {
    return NextResponse.json({ error: "Data tidak valid" }, { status: 400 });
  }

  // Ambil soal assessment yang dijawab user
  const questionDoc = await AssessmentQuestion.findById(assessmentId);
  if (!questionDoc) {
    return NextResponse.json(
      { error: "Soal assessment tidak ditemukan" },
      { status: 404 }
    );
  }

  // Bandingkan jawaban user dengan kunci jawaban
  const checkedAnswers = answers.map((ans: any) => {
    const q = questionDoc.questions[ans.questionIndex];
    let isCorrect = false;
    if (q && q.correctAnswer) {
      isCorrect = ans.answer === q.correctAnswer;
    }
    return {
      ...ans,
      isCorrect,
    };
  });

  // Simpan jawaban sebagai dokumen baru (multi assessment per user)
  const saved = await AssessmentAnswer.create({
    user: token.sub,
    assessmentId: assessmentId,
    answers: checkedAnswers,
  });

  // Pastikan response mengembalikan id jawaban
  return NextResponse.json({
    success: true,
    _id: saved._id, // <-- frontend ambil id ini untuk result
    answers: saved.answers,
  });
}
