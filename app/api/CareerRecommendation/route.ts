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

  // Enhanced prompt untuk generate comprehensive career data
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const prompt = `
Anda adalah AI career advisor expert yang sangat berpengalaman. Analisa data assessment berikut dan berikan detail karier "${careerName}" yang paling relevan dan comprehensive untuk user ini.

Data assessment user:
{
  "overallScore": ${assessmentResult.overallScore || 0},
  "breakdown": ${JSON.stringify(assessmentResult.breakdown || {})},
  "userProfile": {
    "age": ${assessmentResult.userProfile?.age || 0},
    "educationBackground": "${assessmentResult.userProfile?.educationBackground || ""}",
    "skills": ${JSON.stringify(assessmentResult.userProfile?.skills || [])},
    "interests": ${JSON.stringify(assessmentResult.userProfile?.interests || [])}
  }
}

Target Karier: "${careerName}"

Berikan output JSON valid (tanpa penjelasan atau markdown) dengan struktur lengkap berikut:

{
  "level": "Junior/Mid/Senior",
  "salaryRange": "Rp X.XXX.XXX - Rp Y.YYY.YYY/bulan",
  "growthRate": "+XX% per tahun",
  "estimatedLearningTime": "X-Y bulan",
  "requiredSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "description": "Deskripsi lengkap karier yang menarik dan informatif (2-3 kalimat)",
  "category": "Technology/Design/Business/Marketing/Data/Finance",
  "difficulty": "Beginner/Intermediate/Advanced",
  "marketDemand": "High/Medium/Low",
  "workType": ["Remote", "Hybrid", "On-site"],
  "aiScore": 85,
  "matchReasons": [
    "Alasan spesifik mengapa cocok berdasarkan assessment",
    "Kesesuaian dengan skills user",
    "Alignment dengan interests user"
  ],
  "softSkills": ["komunikasi", "problem solving", "teamwork", "leadership", "time management"],
  "tools": ["tool1", "tool2", "tool3", "tool4", "tool5"],
  "dayInLife": "Deskripsi detail aktivitas harian dalam karier ini (3-4 kalimat)",
  "careerPath": [
    "Junior ${careerName}",
    "${careerName}",
    "Senior ${careerName}",
    "Lead ${careerName}",
    "Manager/Director level"
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
      "achievement": "Expertise dan Spesialisasi",
      "skills": ["skill expert 1", "skill expert 2", "skill expert 3"]
    }
  ]
}

PENTING:
1. aiScore harus realistis berdasarkan kesesuaian assessment (75-95 untuk highly matched)
2. salaryRange harus akurat untuk pasar Indonesia saat ini
3. matchReasons harus spesifik merujuk data assessment user
4. requiredSkills dan tools harus relevan dengan karier target
5. learningMilestones harus realistis dan actionable
6. Semua field harus diisi dengan data yang meaningful
7. Output harus valid JSON tanpa tambahan teks apapun
`;

  let careerData = {
    level: "",
    salaryRange: "",
    growthRate: "",
    estimatedLearningTime: "",
    requiredSkills: [],
    description: "",
    category: "",
    difficulty: "",
    marketDemand: "",
    workType: [],
    aiScore: 0,
    matchReasons: [],
    softSkills: [],
    tools: [],
    dayInLife: "",
    careerPath: [],
    learningMilestones: []
  };

  try {
    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" +
        GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        }),
      }
    );
    
    const geminiData = await geminiRes.json();
    let text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Clean up response
    text = text.trim();
    if (text.startsWith("```json")) {
      text = text.replace(/^```json/, "").replace(/```$/, "").trim();
    }
    if (text.startsWith("```")) {
      text = text.replace(/^```/, "").replace(/```$/, "").trim();
    }
    
    try {
      const parsedData = JSON.parse(text);
      careerData = { ...careerData, ...parsedData };
    } catch (parseError) {
      console.error("Gagal parse Gemini response:", text);
      console.error("Parse error:", parseError);
      
      // Enhanced fallback with career-specific data
      careerData = generateFallbackData(careerName, assessmentResult);
    }
  } catch (apiError) {
    console.error("Gemini API error:", apiError);
    // Enhanced fallback
    careerData = generateFallbackData(careerName, assessmentResult);
  }

  // Simpan ke database dengan semua field baru
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
    
    // New comprehensive fields
    description: careerData.description,
    category: careerData.category,
    difficulty: careerData.difficulty,
    marketDemand: careerData.marketDemand,
    workType: careerData.workType,
    aiScore: careerData.aiScore,
    matchReasons: careerData.matchReasons,
    softSkills: careerData.softSkills,
    tools: careerData.tools,
    dayInLife: careerData.dayInLife,
    careerPath: careerData.careerPath,
    learningMilestones: careerData.learningMilestones
  });

  return NextResponse.json({ success: true, recommendation });
}

export async function GET(req: NextRequest) {
  await connectDB();
  const token = await getToken({ req });
  if (!token?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Ambil semua career recommendation milik user dengan populate assessment result
    const recommendations = await CareerRecommendation.find({ user: token.sub })
      .populate('assessmentResult')
      .sort({ createdAt: -1 }); // Sort by newest first
    
    return NextResponse.json({ 
      success: true, 
      recommendations,
      count: recommendations.length 
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { error: "Gagal mengambil rekomendasi karier" },
      { status: 500 }
    );
  }
}

// Helper function untuk generate fallback data yang lebih intelligent
function generateFallbackData(careerName: string, assessmentResult: any) {
  const name = careerName.toLowerCase();
  
  // Determine category
  let category = "Technology";
  if (name.includes('designer') || name.includes('artist') || name.includes('creative')) {
    category = "Design";
  } else if (name.includes('marketing') || name.includes('sales') || name.includes('growth')) {
    category = "Marketing";
  } else if (name.includes('manager') || name.includes('analyst') || name.includes('business')) {
    category = "Business";
  } else if (name.includes('data') || name.includes('analytics')) {
    category = "Data";
  }

  // Determine level based on assessment score
  let level = "Junior";
  let difficulty = "Beginner";
  let aiScore = 75;
  
  if (assessmentResult?.overallScore) {
    if (assessmentResult.overallScore >= 80) {
      level = "Mid";
      difficulty = "Intermediate";
      aiScore = 85;
    }
    if (assessmentResult.overallScore >= 90) {
      level = "Senior";
      difficulty = "Advanced";
      aiScore = 95;
    }
  }

  // Career-specific salary ranges (Indonesia market)
  const salaryRanges = {
    "Technology": {
      "Junior": "Rp 6.000.000 - Rp 12.000.000/bulan",
      "Mid": "Rp 12.000.000 - Rp 25.000.000/bulan",
      "Senior": "Rp 25.000.000 - Rp 50.000.000/bulan"
    },
    "Design": {
      "Junior": "Rp 5.000.000 - Rp 10.000.000/bulan",
      "Mid": "Rp 10.000.000 - Rp 20.000.000/bulan",
      "Senior": "Rp 20.000.000 - Rp 40.000.000/bulan"
    },
    "Marketing": {
      "Junior": "Rp 5.500.000 - Rp 11.000.000/bulan",
      "Mid": "Rp 11.000.000 - Rp 22.000.000/bulan",
      "Senior": "Rp 22.000.000 - Rp 45.000.000/bulan"
    },
    "Business": {
      "Junior": "Rp 6.500.000 - Rp 13.000.000/bulan",
      "Mid": "Rp 13.000.000 - Rp 28.000.000/bulan",
      "Senior": "Rp 28.000.000 - Rp 60.000.000/bulan"
    }
  };

  return {
    level,
    salaryRange: salaryRanges[category as keyof typeof salaryRanges]?.[level as keyof any] || "Rp 5.000.000 - Rp 10.000.000/bulan",
    growthRate: "+12% per tahun",
    estimatedLearningTime: difficulty === "Beginner" ? "6-12 bulan" : difficulty === "Intermediate" ? "12-18 bulan" : "18-24 bulan",
    requiredSkills: getDefaultSkills(category),
    description: `Karier ${careerName} menawarkan peluang yang menarik di bidang ${category.toLowerCase()}. Posisi ini sangat cocok untuk individu yang memiliki passion di bidang teknologi dan inovasi, dengan prospek pengembangan karier yang excellent.`,
    category,
    difficulty,
    marketDemand: "High",
    workType: ["Remote", "Hybrid", "On-site"],
    aiScore,
    matchReasons: [
      "Sesuai dengan hasil assessment dan kemampuan Anda",
      "Cocok dengan minat dan preferensi karier",
      "Tingkat kesulitan sesuai dengan pengalaman saat ini"
    ],
    softSkills: ["Komunikasi", "Problem Solving", "Teamwork", "Critical Thinking", "Adaptability"],
    tools: getDefaultTools(category),
    dayInLife: `Sebagai ${careerName}, hari kerja Anda akan diisi dengan berbagai aktivitas menarik seperti kolaborasi dengan tim, menyelesaikan project-project challenging, dan terus belajar teknologi terbaru. Pekerjaan ini menawarkan work-life balance yang baik dengan lingkungan kerja yang dinamis dan supportif.`,
    careerPath: [
      `Junior ${careerName}`,
      `${careerName}`,
      `Senior ${careerName}`,
      `Lead ${careerName}`,
      `${category} Manager`
    ],
    learningMilestones: [
      {
        month: 3,
        achievement: "Fondasi dan Konsep Dasar",
        skills: ["Fundamental concepts", "Basic tools", "Industry overview"]
      },
      {
        month: 6,
        achievement: "Praktik dan Implementasi",
        skills: ["Hands-on projects", "Real-world application", "Portfolio development"]
      },
      {
        month: 12,
        achievement: "Kompetensi Profesional",
        skills: ["Advanced techniques", "Complex problem solving", "Industry best practices"]
      },
      {
        month: 18,
        achievement: "Expertise dan Leadership",
        skills: ["Specialized knowledge", "Team leadership", "Strategic thinking"]
      }
    ]
  };
}

function getDefaultSkills(category: string): string[] {
  const skillsMap = {
    "Technology": ["Programming", "Problem Solving", "Software Development", "Database Management", "System Design"],
    "Design": ["Creative Thinking", "Design Software", "User Experience", "Visual Communication", "Prototyping"],
    "Marketing": ["Digital Marketing", "Content Strategy", "Analytics", "Brand Management", "Campaign Management"],
    "Business": ["Strategic Planning", "Business Analysis", "Project Management", "Financial Analysis", "Leadership"],
    "Data": ["Data Analysis", "Statistics", "SQL", "Python/R", "Data Visualization"]
  };
  
  return skillsMap[category as keyof typeof skillsMap] || skillsMap.Technology;
}

function getDefaultTools(category: string): string[] {
  const toolsMap = {
    "Technology": ["VS Code", "Git", "Docker", "AWS/GCP", "Postman"],
    "Design": ["Figma", "Adobe Creative Suite", "Sketch", "InVision", "Principle"],
    "Marketing": ["Google Analytics", "Facebook Ads", "HubSpot", "Mailchimp", "Canva"],
    "Business": ["Excel/Sheets", "PowerBI", "Slack", "Asana", "Salesforce"],
    "Data": ["Python", "SQL", "Tableau", "Excel", "Jupyter Notebook"]
  };
  
  return toolsMap[category as keyof typeof toolsMap] || toolsMap.Technology;
}