import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import CareerRecommendation from "@/lib/models/CareerRecommendation";
import Roadmap from "@/lib/models/Roadmap";
import RoadmapStep from "@/lib/models/RoadmapSteps";

export async function GET(
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

    // 2. Ambil Roadmap dan Steps
    const roadmap = await Roadmap.findById(careerRec.roadmap);
    if (!roadmap) {
      return NextResponse.json({ error: "Roadmap not found" }, { status: 404 });
    }
    const steps = await RoadmapStep.find({ roadmap: roadmap._id }).sort({ stepNumber: 1 });

    return NextResponse.json({
      success: true,
      roadmap,
      steps
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 