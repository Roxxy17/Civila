import { NextRequest, NextResponse } from "next/server"
import Profile from "@/lib/models/Profile"
import User from "@/lib/models/User"
import connectDB from "@/lib/mongodb"
import { getToken } from "next-auth/jwt"

export async function GET(req: NextRequest) {
  await connectDB()
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token || !token.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Cari profile berdasarkan user id dari token
  const profile = await Profile.findOne({ user: token.sub })
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 })
  }
  return NextResponse.json(profile)
}

export async function POST(req: NextRequest) {
  await connectDB()
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token || !token.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  // Cek apakah profile sudah ada
  const existing = await Profile.findOne({ user: token.sub })
  if (existing) {
    return NextResponse.json({ error: "Profile already exists" }, { status: 400 })
  }

  // Buat profile baru
  const profile = await Profile.create({
    user: token.sub,
    ...body,
  })
  return NextResponse.json(profile, { status: 201 })
}

export async function PUT(req: NextRequest) {
  await connectDB()
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token || !token.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  // Update profile user
  const profile = await Profile.findOneAndUpdate(
    { user: token.sub },
    { $set: body },
    { new: true }
  )
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 })
  }
  return NextResponse.json(profile)
}