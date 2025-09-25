import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

const protectedRoutes = ["/dashboard", "/profile", "/after-login"] // tambahkan route yang memang harus login

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register")
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  // Jika user sudah login, tidak boleh akses login/register
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Jika user belum login, dan akses halaman yang diproteksi, redirect ke login
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Halaman publik tidak perlu redirect
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}