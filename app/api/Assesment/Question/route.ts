import { NextRequest, NextResponse } from "next/server";
import Profile from "@/lib/models/Profile";
import AssessmentQuestion from "@/lib/models/assessment/AssessmentQuestion";
import connectDB from "@/lib/mongodb";
import { getToken } from "next-auth/jwt";

const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY || "AIzaSyBPigQpP89fRFs77lPNkF88cq-SVDJXmFw";

export async function POST(req: NextRequest) {
  await connectDB();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ambil data profile user
  const profile = await Profile.findOne({ user: token.sub });
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // Buat prompt untuk Gemini
  const prompt = `
   Buatkan 20 soal pilihan ganda untuk assessment karier user berdasarkan data berikut:

- Latar belakang: ${profile.background}
- Umur: ${profile.age}
- Minat karier: ${profile.targetCareer}
- Keahlian: ${profile.currentSkills?.join(", ")}
- Minat lain: ${profile.interests?.join(", ")}
- Isi CV: ${profile.uploadedCV}

Aturan:
1. Soal harus relevan dengan data user.
2. Setiap soal wajib punya kategori salah satu dari: ["Technical", "SoftSkill", "Interest", "ProblemSolving", "CareerKnowledge"].
3. Setiap soal memiliki 4 opsi jawaban.
4. Field "correctAnswer" isi dengan string kosong "" (biar bisa diisi oleh sistem nanti).
5. Output hanya dalam format JSON array valid, tanpa teks tambahan, tanpa markdown.

Format:
[
  {
    "questionText": "....",
    "category": "Technical",
    "options": ["A. ....", "B. ....", "C. ....", "D. ...."],
    "correctAnswer": ""
  }
]

  `;

  // Panggil API Gemini
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
  if (geminiData.error) {
    console.error("Gemini API error:", geminiData.error);
    return NextResponse.json(
      { error: "Gemini API error: " + geminiData.error.message },
      { status: 500 }
    );
  }

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
  let questions: any[] = [];
  try {
    questions = JSON.parse(text);
    // Filter hanya soal yang valid
    questions = questions
      .filter(
        (q) =>
          q &&
          typeof q.questionText === "string" &&
          q.questionText.trim().length > 0
      )
      .map((q) => {
        // Cari index jawaban benar
        let idx = -1;
        if (Array.isArray(q.options) && typeof q.correctAnswer === "string") {
          idx = q.options.findIndex((opt) => {
            // Jika correctAnswer sudah "A"/"B"/"C"/"D", gunakan langsung
            if (["A", "B", "C", "D"].includes(q.correctAnswer))
              return opt.startsWith(q.correctAnswer + ".");
            // Jika correctAnswer adalah isi jawaban, cocokkan dengan isi setelah abjad
            return (
              opt
                .replace(/^([A-D]\. )/, "")
                .trim()
                .toLowerCase() === q.correctAnswer.trim().toLowerCase()
            );
          });
        }
        const abcd = ["A", "B", "C", "D"];
        return {
          ...q,
          options: Array.isArray(q.options) ? q.options.slice(0, 4) : [],
          correctAnswer: abcd[idx] || "A",
        };
      })
      .filter(
        (q) =>
          typeof q.questionText === "string" &&
          q.questionText.trim().length > 0 &&
          Array.isArray(q.options) &&
          q.options.length === 4 &&
          typeof q.correctAnswer === "string" &&
          ["A", "B", "C", "D"].includes(q.correctAnswer)
      );

    if (!questions.length) {
      console.error("Tidak ada soal valid dari Gemini:", text);
      return NextResponse.json(
        { error: "Tidak ada soal valid dari Gemini" },
        { status: 500 }
      );
    }

    console.log("Jumlah soal yang akan disimpan:", questions.length);
    console.log("Soal yang akan disimpan:", questions);
  } catch (err) {
    console.error("Parsing error:", err);
    console.error("Gemini raw text:", text);
    return NextResponse.json(
      { error: "Gagal parsing soal dari Gemini" },
      { status: 500 }
    );
  }

  // Simpan ke database
  const savedQuestions = await AssessmentQuestion.findOneAndUpdate(
    { user: token.sub },
    { $set: { questions: questions } },
    { upsert: true, new: true }
  );

  return NextResponse.json({ questions: savedQuestions.questions });
}
