import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AnimatedBackground } from "@/components/animated-background"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Civila - AI-Powered Career Guidance Platform",
  description:
    "Temukan jalur karier impianmu dengan AI. Platform terdepan untuk pengembangan karier dan pembelajaran yang dipersonalisasi.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="font-sans bg-background text-foreground min-h-screen">
        <AnimatedBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
