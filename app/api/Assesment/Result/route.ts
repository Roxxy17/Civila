import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import connectDB from "@/lib/mongodb";
import AssessmentAnswer from "@/lib/models/assessment/AssessmentAnswer";
import AssessmentQuestion from "@/lib/models/assessment/AssessmentQuestion";
import AssessmentResult from "@/lib/models/assessment/AssessmentResult";

export async function POST(req: NextRequest) {
  await connectDB();
  const token = await getToken({ req });
  if (!token?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { assessmentAnswerId } = body;

  if (!assessmentAnswerId) {
    return NextResponse.json(
      { error: "assessmentAnswerId diperlukan" },
      { status: 400 }
    );
  }

  // Ambil jawaban dan soal
  const answerDoc = await AssessmentAnswer.findById(assessmentAnswerId);
  if (!answerDoc) {
    return NextResponse.json(
      { error: "Jawaban assessment tidak ditemukan" },
      { status: 404 }
    );
  }

  const questionDoc = await AssessmentQuestion.findById(answerDoc.assessmentId);
  if (!questionDoc) {
    return NextResponse.json(
      { error: "Soal assessment tidak ditemukan" },
      { status: 404 }
    );
  }

  // Hitung skor dan breakdown
  let totalCorrect = 0;
  const breakdown: Record<string, number> = {};

  answerDoc.answers.forEach((ans: any) => {
    const q = questionDoc.questions[ans.questionIndex];
    if (ans.isCorrect) {
      totalCorrect++;
      if (q.category) {
        breakdown[q.category] = (breakdown[q.category] || 0) + 1;
      }
    }
  });

  const overallScore = Math.round(
    (totalCorrect / questionDoc.questions.length) * 100
  );

  // Generate rekomendasi karier menggunakan Gemini AI
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const prompt = `
Berdasarkan hasil assessment berikut:
- Skor keseluruhan: ${overallScore}
- Breakdown kategori: ${JSON.stringify(breakdown)}

Berikan 2-3 rekomendasi karier yang paling sesuai untuk user, dalam format array string JSON valid tanpa penjelasan tambahan.
`;

  let recommendedCareers: string[] = [];

  try {
    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const geminiData = await geminiRes.json();
    let text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    // Bersihkan jika ada ```json ... ```
    if (text.startsWith("```json")) {
      text = text
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
    }
    if (text.startsWith("```")) {
      text = text.replace(/^```/, "").replace(/```$/, "").trim();
    }
    recommendedCareers = JSON.parse(text);
  } catch (err) {
    // Fallback jika Gemini gagal
    recommendedCareers = ["Generalist"];
  }

  // Simpan hasil
  const saved = await AssessmentResult.findOneAndUpdate(
    { user: token.sub },
    {
      $push: {
        results: {
          assessmentAnswer: assessmentAnswerId,
          overallScore,
          breakdown,
          recommendedCareers,
          createdAt: new Date(),
        },
      },
    },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true, results: saved.results });
}

export async function GET(req: NextRequest) {
  await connectDB();
  const token = await getToken({ req });
  if (!token?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ambil semua hasil assessment milik user
  const resultDoc = await AssessmentResult.findOne({ user: token.sub });
  if (!resultDoc || !resultDoc.results || resultDoc.results.length === 0) {
    return NextResponse.json({ results: [] });
  }

  return NextResponse.json({ results: resultDoc.results });
}
