import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import Profile from "@/lib/models/Profile";

export async function GET() {
  try {
    console.log("Starting migration via API...");
    
    await connectDB();
    console.log("Connected to database");
    
    const users = await User.find({});
    console.log(`Found ${users.length} users`);
    
    const results = [];
    let usersWithProfile = 0;
    let updatedCount = 0;
    
    for (const user of users) {
      try {
        const profile = await Profile.findOne({ user: user._id });
        const hasProfile = !!profile;
        
        if (hasProfile) {
          usersWithProfile++;
        }
        
        // Update user dengan hasProfile flag
        await User.findByIdAndUpdate(user._id, { hasProfile });
        updatedCount++;
        
        results.push({
          email: user.email,
          userId: user._id.toString(),
          hasProfile: hasProfile,
          status: 'updated'
        });
        
        console.log(`✓ Updated user ${user.email}: hasProfile = ${hasProfile}`);
      } catch (userError) {
        console.error(`❌ Error updating user ${user.email}:`, userError);
        results.push({
          email: user.email,
          userId: user._id?.toString() || 'unknown',
          hasProfile: false,
          status: 'error',
          error: userError.message
        });
      }
    }
    
    const summary = {
      totalUsers: users.length,
      usersWithProfile: usersWithProfile,
      usersWithoutProfile: users.length - usersWithProfile,
      successfulUpdates: updatedCount,
      errors: results.filter(r => r.status === 'error').length
    };
    
    console.log("\n=== Migration Summary ===");
    console.log(`Total users processed: ${updatedCount}`);
    console.log(`Users with profile: ${usersWithProfile}`);
    console.log(`Users without profile: ${updatedCount - usersWithProfile}`);
    console.log("Migration completed successfully!");
    
    return NextResponse.json({ 
      success: true,
      message: "Migration completed successfully",
      summary: summary,
      results: results
    });
    
  } catch (error) {
    console.error("Migration failed:", error);
    return NextResponse.json({ 
      error: "Migration failed",
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function POST() {
  // Sama seperti GET untuk kompatibilitas
  return GET();
}