import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"

export async function POST(req: Request) {
  const { email, password } = await req.json()
  await connectDB()

  const user = await User.findOne({ email })
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  // Set session/cookie here if manual, or use NextAuth for session
  return NextResponse.json({ message: "Login successful", user })
}