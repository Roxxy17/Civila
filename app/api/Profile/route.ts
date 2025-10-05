import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Profile from "@/lib/models/Profile";
import User from "@/lib/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const profile = await Profile.findOne({ user: session.user.id });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    await connectDB();

    // Check if profile already exists
    const existingProfile = await Profile.findOne({ user: session.user.id });
    
    let profile;
    if (existingProfile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: session.user.id },
        { ...data, updatedAt: new Date() },
        { new: true }
      );
    } else {
      // Create new profile
      profile = await Profile.create({
        ...data,
        user: session.user.id,
      });
    }

    // Update user's hasProfile field
    await User.findByIdAndUpdate(session.user.id, { 
      hasProfile: true 
    });

    return NextResponse.json({ 
      success: true, 
      profile,
      message: "Profile berhasil disimpan" 
    });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 });
  }
}