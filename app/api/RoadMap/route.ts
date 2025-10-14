import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import CareerRecommendation from "@/lib/models/CareerRecommendation";
import Roadmap from "@/lib/models/Roadmap";
import RoadmapStep from "@/lib/models/RoadmapSteps";

// Fungsi untuk generate roadmap steps via Gemini AI
async function generateRoadmapStepsAI(career: string, skills: string[]) {
  const prompt = `Buat roadmap pembelajaran bertahap untuk menjadi ${career} dari nol,
dengan skill awal: ${skills.length > 0 ? skills.join(", ") : "tanpa skill awal"}.
Format JSON seperti ini:
[
  { "stage": "Fundamental", "modules": ["Intro to Data", "Excel Basics", ...] },
  { "stage": "Intermediate", "modules": ["SQL Advanced", "Data Cleaning", ...] },
  { "stage": "Advanced", "modules": ["Machine Learning Intro", "Dashboarding", ...] }
]`;

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 800 }
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Gemini API error: ${res.status} ${txt}`);
  }

  const json = await res.json();
  // Gemini response: json.candidates[0].content.parts[0].text
  const text =
    json?.candidates?.[0]?.content?.parts?.[0]?.text ||
    json?.candidates?.[0]?.content?.parts?.[0] ||
    json?.candidates?.[0]?.content?.text ||
    JSON.stringify(json);

  try {
    // Pastikan AI mengembalikan JSON array
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    console.error("Failed to parse AI output as JSON:", text, err);
    throw new Error("AI returned non-JSON. Inspect logs.");
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { careerRecommendationId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // 1. Ambil data CareerRecommendation
    const careerRec = await CareerRecommendation.findById(params.careerRecommendationId);
    if (!careerRec || !careerRec.user.equals(session.user.id)) {
      return NextResponse.json({ error: "Career Recommendation not found" }, { status: 404 });
    }

    // 2. Generate roadmap steps via Gemini AI
    let stepsData;
    try {
      stepsData = await generateRoadmapStepsAI(
        careerRec.careerName,
        careerRec.requiredSkills || []
      );
    } catch (e) {
      return NextResponse.json({ error: "AI generation failed: " + e.message }, { status: 500 });
    }

    // 3. Buat Roadmap
    const roadmap = await Roadmap.create({
      user: session.user.id,
      career: careerRec.careerName,
      description: `Roadmap untuk ${careerRec.careerName}`,
      generatedBy: "Gemini AI"
    });

    // 4. Buat RoadmapSteps
    let stepNumber = 1;
    for (const stage of stepsData) {
      for (const module of stage.modules) {
        await RoadmapStep.create({
          roadmap: roadmap._id,
          stepNumber: stepNumber++,
          title: module,
          description: `Belajar ${module} pada tahap ${stage.stage}`,
          isCompleted: false
        });
      }
    }

    // 5. Update CareerRecommendation dengan roadmap
    careerRec.roadmap = roadmap._id;
    await careerRec.save();

    return NextResponse.json({
      success: true,
      roadmapId: roadmap._id,
      message: "Roadmap berhasil digenerate dengan Gemini AI dan dihubungkan ke Career Recommendation"
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}