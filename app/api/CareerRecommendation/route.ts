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

  console.log("🚀 Starting career recommendation for:", careerName);

  // Cek apakah karier sudah dipilih sebelumnya
  const existingRecommendation = await CareerRecommendation.findOne({
    user: token.sub,
    careerName,
    assessmentResult: assessmentResultId,
    isPicked: true
  });

  if (existingRecommendation) {
    console.log("✅ Career already picked:", careerName);
    return NextResponse.json({ 
      success: true, 
      recommendation: existingRecommendation,
      message: "Karier sudah dipilih sebelumnya" 
    });
  }

  // Cek apakah career untuk assessment ini sudah dipilih
  const existingPick = await CareerRecommendation.findOne({
    careerName,
    assessmentResult: assessmentResultId,
    isPicked: true
  });

  if (existingPick) {
    return NextResponse.json({
      success: false,
      error: "Career sudah dipilih untuk assessment ini"
    });
  }

  // Ambil detail assessment result
  const assessmentResult = await AssessmentResult.findById(assessmentResultId);
  if (!assessmentResult) {
    return NextResponse.json(
      { error: "AssessmentResult tidak ditemukan" },
      { status: 404 }
    );
  }

  console.log("📊 Assessment data found:", {
    score: assessmentResult.overallScore,
    breakdown: assessmentResult.breakdown
  });

  // Check Gemini API availability first
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY tidak tersedia!");
    return NextResponse.json(
      { error: "AI service tidak tersedia saat ini. Silakan coba lagi nanti." },
      { status: 503 }
    );
  }

  console.log("🤖 Generating comprehensive career data with AI...");
  
  const prompt = `Anda adalah AI konsultan karier ahli yang sangat berpengalaman di pasar Indonesia. Analisis data assessment berikut dan berikan detail karier "${careerName}" yang komprehensif dan relevan untuk user Indonesia.

Data Assessment:
- Skor Keseluruhan: ${assessmentResult.overallScore || 0}%
- Breakdown: ${JSON.stringify(assessmentResult.breakdown || {})}
- Profil User: ${JSON.stringify(assessmentResult.userProfile || {})}

Target Karier: "${careerName}"

Berikan response JSON yang valid (tanpa markdown, tanpa penjelasan tambahan) dengan struktur PERSIS seperti ini:

{
  "level": "Junior/Mid/Senior",
  "salaryRange": "Rp X.XXX.XXX - Rp Y.YYY.YYY/bulan",
  "growthRate": "+XX% per tahun",
  "estimatedLearningTime": "X-Y bulan",
  "requiredSkills": ["skill1 Indonesia", "skill2 Indonesia", "skill3 Indonesia", "skill4 Indonesia", "skill5 Indonesia"],
  "description": "Deskripsi karier yang detail dan menarik dalam bahasa Indonesia (2-3 kalimat yang menggambarkan peluang, prospek, dan daya tarik karier ini)",
  "category": "Technology/Design/Business/Marketing/Data/Finance",
  "difficulty": "Pemula/Menengah/Lanjutan",
  "marketDemand": "Tinggi/Sedang/Rendah",
  "workType": ["Remote", "Hybrid", "On-site"],
  "aiScore": 85,
  "matchReasons": [
    "Alasan spesifik mengapa cocok berdasarkan hasil assessment dalam bahasa Indonesia",
    "Kesesuaian skill dengan kemampuan user dalam bahasa Indonesia", 
    "Penjelasan kecocokan minat dan kepribadian dalam bahasa Indonesia"
  ],
  "softSkills": ["komunikasi efektif", "pemecahan masalah", "kerja tim", "kepemimpinan", "manajemen waktu", "adaptabilitas"],
  "tools": ["tool1 relevan", "tool2 relevan", "tool3 relevan", "tool4 relevan", "tool5 relevan"],
  "dayInLife": "Deskripsi detail aktivitas harian dalam karier ini dalam bahasa Indonesia (3-4 kalimat yang menggambarkan rutinitas kerja, tantangan, dan kepuasan kerja sehari-hari)",
  "careerPath": [
    "Junior ${careerName}",
    "${careerName}",
    "Senior ${careerName}",
    "Lead ${careerName}",
    "Manager/Direktur ${careerName}"
  ],
  "learningMilestones": [
    {
      "month": 3,
      "achievement": "Fondasi dan Konsep Dasar",
      "skills": ["skill dasar 1", "skill dasar 2", "skill dasar 3"]
    },
    {
      "month": 6,
      "achievement": "Praktik dan Implementasi",
      "skills": ["skill praktis 1", "skill praktis 2", "skill praktis 3"]
    },
    {
      "month": 12,
      "achievement": "Kompetensi Profesional",
      "skills": ["skill lanjutan 1", "skill lanjutan 2", "skill lanjutan 3"]
    },
    {
      "month": 18,
      "achievement": "Keahlian dan Spesialisasi",
      "skills": ["skill ahli 1", "skill ahli 2", "skill ahli 3"]
    }
  ]
}

PERSYARATAN KRITIS:
1. SEMUA konten harus dalam Bahasa Indonesia yang natural dan profesional
2. salaryRange harus akurat untuk pasar kerja Indonesia tahun 2025
3. aiScore harus mencerminkan kesesuaian dengan assessment (75-95)
4. matchReasons harus merujuk spesifik pada data assessment user
5. careerPath harus menunjukkan progressi karier yang realistis di Indonesia
6. learningMilestones harus actionable dan sesuai dengan konteks Indonesia
7. requiredSkills dan softSkills harus menggunakan terminologi Indonesia
8. description dan dayInLife harus menggambarkan realitas kerja di Indonesia
9. tools harus relevan dan umum digunakan di Indonesia
10. Output harus JSON valid tanpa teks tambahan apapun
11. Gunakan perspektif pasar kerja Indonesia, bukan internasional
12. Semua field wajib diisi dengan data yang bermakna dan realistis`;

  let careerData = null;

  try {
    console.log("🤖 Calling Gemini AI for career data generation...");
    
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        }),
      }
    );
    
    if (!geminiRes.ok) {
      throw new Error(`Gemini API error: ${geminiRes.status} ${geminiRes.statusText}`);
    }

    const geminiData = await geminiRes.json();
    let text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    if (!text) {
      throw new Error("Empty response from Gemini AI");
    }
    
    console.log("🤖 Raw Gemini response:", text.substring(0, 200) + "...");
    
    // Clean up response aggressively
    text = text.trim();
    text = text.replace(/^```json\s*/, "").replace(/```\s*$/, "");
    text = text.replace(/^```\s*/, "").replace(/```\s*$/, "");
    text = text.replace(/^\s*{/, "{").replace(/}\s*$/, "}");
    
    // Parse AI response
    try {
      careerData = JSON.parse(text);
      console.log("✅ Successfully parsed AI data for:", careerName);
      console.log("🎯 AI generated fields:", Object.keys(careerData));
      
      // Validate critical fields
      const requiredFields = ['level', 'salaryRange', 'category', 'description', 'aiScore', 'requiredSkills'];
      const missingFields = requiredFields.filter(field => !careerData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`AI response missing required fields: ${missingFields.join(', ')}`);
      }
      
      console.log("🔍 AI Data Validation:", {
        level: careerData.level,
        category: careerData.category,
        aiScore: careerData.aiScore,
        hasDescription: !!careerData.description,
        hasRequiredSkills: Array.isArray(careerData.requiredSkills) && careerData.requiredSkills.length > 0,
        hasLearningMilestones: Array.isArray(careerData.learningMilestones) && careerData.learningMilestones.length > 0,
        hasMatchReasons: Array.isArray(careerData.matchReasons) && careerData.matchReasons.length > 0
      });
      
    } catch (parseError) {
      console.error("❌ Failed to parse AI response:", parseError);
      console.log("📝 Raw response text:", text);
      throw new Error("Invalid JSON response from AI");
    }
    
  } catch (aiError) {
    console.error("❌ AI generation failed:", aiError);
    return NextResponse.json(
      { 
        error: "Gagal menghasilkan rekomendasi karier dengan AI. Silakan coba lagi.", 
        details: aiError.message 
      },
      { status: 500 }
    );
  }

  // Simpan data AI ke database
  try {
    console.log("💾 Saving AI-generated career recommendation...");
    
    // EXPLICIT field assignment dengan data AI yang sudah divalidasi
    const recommendationData = {
      user: token.sub,
      careerName,
      assessmentResult: assessmentResultId,
      isPicked: true,
      pickedAt: new Date(),
      
      // Core fields dari AI
      level: String(careerData.level),
      salaryRange: String(careerData.salaryRange),
      growthRate: String(careerData.growthRate || "+15% per tahun"),
      estimatedLearningTime: String(careerData.estimatedLearningTime || "6-12 bulan"),
      requiredSkills: Array.isArray(careerData.requiredSkills) ? careerData.requiredSkills : [],
      
      // Comprehensive fields dari AI
      description: String(careerData.description),
      category: String(careerData.category),
      difficulty: String(careerData.difficulty || "Beginner"),
      marketDemand: String(careerData.marketDemand || "High"),
      workType: Array.isArray(careerData.workType) ? careerData.workType : ["Remote", "Hybrid"],
      aiScore: Number(careerData.aiScore),
      matchReasons: Array.isArray(careerData.matchReasons) ? careerData.matchReasons : [],
      softSkills: Array.isArray(careerData.softSkills) ? careerData.softSkills : [],
      tools: Array.isArray(careerData.tools) ? careerData.tools : [],
      dayInLife: String(careerData.dayInLife || ""),
      careerPath: Array.isArray(careerData.careerPath) ? careerData.careerPath : [],
      learningMilestones: Array.isArray(careerData.learningMilestones) ? careerData.learningMilestones : []
    };

    console.log("🔍 Final AI-Generated Data:", {
      careerName: recommendationData.careerName,
      level: recommendationData.level,
      category: recommendationData.category,
      aiScore: recommendationData.aiScore,
      descriptionLength: recommendationData.description?.length || 0,
      skillsCount: recommendationData.requiredSkills?.length || 0,
      milestonesCount: recommendationData.learningMilestones?.length || 0,
      matchReasonsCount: recommendationData.matchReasons?.length || 0,
      totalDataFields: Object.keys(recommendationData).length
    });

    const recommendation = await CareerRecommendation.create(recommendationData);

    console.log("✅ Successfully saved AI-generated recommendation with ID:", recommendation._id);
    
    // Verification
    const savedData = await CareerRecommendation.findById(recommendation._id);
    console.log("📊 AI Data Verification from DB:", {
      careerName: savedData?.careerName,
      level: savedData?.level,
      category: savedData?.category,
      aiScore: savedData?.aiScore,
      dataSource: "100% AI Generated",
      hasAllFields: !!(savedData?.description && savedData?.category && savedData?.aiScore)
    });

    return NextResponse.json({ 
      success: true, 
      recommendation: savedData,
      message: "Career recommendation generated successfully with AI",
      dataSource: "AI-Powered"
    });
    
  } catch (dbError) {
    console.error("❌ Database save error:", dbError);
    return NextResponse.json(
      { error: "Gagal menyimpan rekomendasi karier: " + dbError.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  const token = await getToken({ req });
  if (!token?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const recommendations = await CareerRecommendation.find({ user: token.sub })
      .populate('assessmentResult')
      .sort({ createdAt: -1 });
    
    console.log(`📊 Found ${recommendations.length} AI-generated recommendations for user`);
    
    return NextResponse.json({ 
      success: true, 
      recommendations,
      count: recommendations.length,
      dataSource: "AI-Powered"
    });
  } catch (error) {
    console.error("❌ Error fetching recommendations:", error);
    return NextResponse.json(
      { error: "Gagal mengambil rekomendasi karier" },
      { status: 500 }
    );
  }
}

// 🗑️ REMOVED: All fallback data functions
// ❌ generateEnhancedFallbackData() - DELETED
// ❌ getDefaultSkills() - DELETED  
// ❌ getDefaultTools() - DELETED
// ❌ careerSpecifics constants - DELETED

// Sekarang 100% data berasal dari AI Gemini! 🤖✨