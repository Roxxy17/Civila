import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import connectDB from "@/lib/mongodb";
import CareerRecommendation from "@/lib/models/CareerRecommendation";
import AssessmentResult from "@/lib/models/assessment/AssessmentResult";

export async function POST(req: NextRequest) {
  await connectDB();
  const token = await getToken({ req });
  if (!token?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { careerName, assessmentResultId } = body;

  if (!careerName || !assessmentResultId) {
    return NextResponse.json(
      { error: "careerName dan assessmentResultId diperlukan" },
      { status: 400 }
    );
  }

  // Ambil detail assessment result
  const assessmentResult = await AssessmentResult.findById(assessmentResultId);
  if (!assessmentResult) {
    return NextResponse.json(
      { error: "AssessmentResult tidak ditemukan" },
      { status: 404 }
    );
  }

  // Generate detail karir dari Gemini API
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const prompt = `
Berdasarkan karier berikut: "${careerName}"
Berikan data JSON valid (tanpa penjelasan) dengan field:
{
  "level": "Junior/Mid/Senior",
  "salaryRange": "RpX - RpY",
  "growthRate": "persentase/tahun",
  "estimatedLearningTime": "X bulan/tahun",
  "requiredSkills": ["skill1", "skill2", ...]
}
`;

  let careerData = {
    level: "",
    salaryRange: "",
    growthRate: "",
    estimatedLearningTime: "",
    requiredSkills: [],
  };

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
    if (text.startsWith("```json")) {
      text = text.replace(/^```json/, "").replace(/```$/, "").trim();
    }
    if (text.startsWith("```")) {
      text = text.replace(/^```/, "").replace(/```$/, "").trim();
    }
    try {
      careerData = JSON.parse(text);
    } catch (err) {
      console.error("Gagal parse Gemini response:", text);
      // fallback default
      careerData = {
        level: "Junior",
        salaryRange: "Rp5.000.000 - Rp10.000.000",
        growthRate: "10%/tahun",
        estimatedLearningTime: "6 bulan",
        requiredSkills: ["Komunikasi", "Problem Solving"],
      };
    }
  } catch (err) {
    // fallback default
    careerData = {
      level: "Junior",
      salaryRange: "Rp5.000.000 - Rp10.000.000",
      growthRate: "10%/tahun",
      estimatedLearningTime: "6 bulan",
      requiredSkills: ["Komunikasi", "Problem Solving"],
    };
  }

  // Simpan ke database
  const recommendation = await CareerRecommendation.create({
    user: token.sub,
    careerName,
    level: careerData.level,
    salaryRange: careerData.salaryRange,
    growthRate: careerData.growthRate,
    estimatedLearningTime: careerData.estimatedLearningTime,
    requiredSkills: careerData.requiredSkills,
    assessmentResult: assessmentResultId,
    isPicked: true,
    pickedAt: new Date(),
  });

  return NextResponse.json({ success: true, recommendation });
}

export async function GET(req: NextRequest) {
  await connectDB();
  const token = await getToken({ req });
  if (!token?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ambil semua career recommendation milik user
  const recommendations = await CareerRecommendation.find({ user: token.sub });
  return NextResponse.json({ recommendations });
}