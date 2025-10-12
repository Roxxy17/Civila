"use client";

import { AuthGuard } from "@/components/auth-guard";
import { FloatingCard } from "@/components/floating-card";
import { GradientText } from "@/components/gradient-text";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import {
  Brain,
  User,
  LogOut,
  BarChart3,
  Target,
  BookOpen,
  Trophy,
  Star,
  Calendar,
  TrendingUp,
  Gamepad2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [hasProfile, setHasProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [stats, setStats] = useState({
    completedModules: 12,
    totalModules: 24,
    currentStreak: 7,
    totalPoints: 2450,
    level: 3,
    achievements: 8,
  });
  const progressPercentage = (stats.completedModules / stats.totalModules) * 100;
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // Check profile status dari database
  const checkProfileStatus = async () => {
    if (!session?.user?.id) return;
    
    setProfileLoading(true);
    try {
      const res = await fetch("/api/Profile");
      const data = await res.json();
      
      if (res.ok && data.profile) {
        setHasProfile(true);
        // Update session jika hasProfile tidak sesuai
        if (!session.user.hasProfile) {
          console.log("Updating session hasProfile to true");
          await update({ hasProfile: true });
        }
      } else {
        setHasProfile(false);
        // Update session jika hasProfile tidak sesuai
        if (session.user.hasProfile) {
          console.log("Updating session hasProfile to false");
          await update({ hasProfile: false });
        }
      }
    } catch (error) {
      console.error("Error checking profile:", error);
      setHasProfile(false);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      checkProfileStatus();
    }
  }, [session?.user?.id]);

  // Refresh profile status saat user kembali ke dashboard
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && session?.user?.id) {
        checkProfileStatus();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [session?.user?.id]);

  // Jika belum login, redirect ke login
  if (status === "loading") return null;
  if (!session?.user) {
    router.push("/login");
    return null;
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <AuthGuard>
      <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggleExpanded={() => setIsSidebarExpanded((prev) => !prev)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="px-6 py-8 space-y-8">
              
              {/* Header Section */}
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
                <div className="relative p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl border border-white/30">
                        <BarChart3 className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                          Dashboard <span className="text-white/90">Career Mapper</span>
                        </h1>
                        <p className="text-white/80 text-lg">
                          Selamat datang, <span className="font-semibold">{session.user.name || session.user.email}</span>
                        </p>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-4">
                      <Card className="p-4 bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                        <div className="text-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                            <TrendingUp className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            {Math.round(progressPercentage)}%
                          </div>
                          <div className="text-xs text-slate-600 font-medium">Progress</div>
                        </div>
                      </Card>
                      
                      <Card className="p-4 bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                        <div className="text-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                            <Star className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                            {stats.level}
                          </div>
                          <div className="text-xs text-slate-600 font-medium">Level</div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full -translate-y-12 translate-x-12" />
                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          {Math.round(progressPercentage)}%
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Progress Belajar</div>
                      </div>
                    </div>
                    <Progress value={progressPercentage} className="h-2 rounded-full" />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      {stats.completedModules} dari {stats.totalModules} modul
                    </p>
                  </div>
                </Card>

                <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-full -translate-y-12 translate-x-12" />
                  <div className="relative p-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                          {stats.currentStreak}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Streak Harian</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                      Pertahankan konsistensi!
                    </p>
                  </div>
                </Card>

                <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full -translate-y-12 translate-x-12" />
                  <div className="relative p-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                          {stats.totalPoints.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Total Poin</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                      Level {stats.level}
                    </p>
                  </div>
                </Card>

                <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full -translate-y-12 translate-x-12" />
                  <div className="relative p-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          {stats.achievements}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Achievement</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                      Pencapaian terbuka
                    </p>
                  </div>
                </Card>
              </div>

              {/* Main Features Grid */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Features</h2>
                  <p className="text-slate-600 dark:text-slate-400">Jelajahi semua fitur platform</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Profile & Assessment Card - Enhanced */}
                  <Card className="group relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-colors" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16" />
                    
                    <div className="relative p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">
                            Profil & Assessment
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            {profileLoading ? (
                              <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
                            ) : (
                              <div className={`w-2 h-2 rounded-full ${
                                hasProfile ? "bg-green-500" : "bg-yellow-500"
                              }`} />
                            )}
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {profileLoading 
                                ? "Memuat status..." 
                                : hasProfile
                                ? "Profil lengkap"
                                : "Profil belum lengkap"
                              }
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        {hasProfile
                          ? "Lihat hasil assessment dan rekomendasi karier Anda. Lakukan assessment ulang untuk mendapatkan insight terbaru."
                          : "Lengkapi profil dan ikuti tes kemampuan untuk mendapatkan rekomendasi karier yang akurat dan personal."}
                      </p>

                      {hasProfile ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <Button asChild size="sm" variant="outline" className="rounded-xl">
                              <Link href="/profile/setup">
                                <User className="w-4 h-4 mr-1" />
                                Profil
                              </Link>
                            </Button>
                            <Button asChild size="sm" variant="outline" className="rounded-xl">
                              <Link href="/profile/Assessment/Results">
                                <BarChart3 className="w-4 h-4 mr-1" />
                                Hasil
                              </Link>
                            </Button>
                          </div>
                          <Button asChild className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 hover:from-indigo-600 hover:to-purple-600 rounded-xl">
                            <Link href="/profile/setup">
                              <Brain className="w-4 h-4 mr-2" />
                              Assessment Baru
                            </Link>
                          </Button>
                        </div>
                      ) : (
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 hover:from-indigo-600 hover:to-purple-600 rounded-xl"
                          disabled={profileLoading}
                        >
                          <Link href="/profile/setup">
                            <User className="w-4 h-4 mr-2" />
                            {profileLoading ? "Memuat..." : "Lengkapi Profil"}
                          </Link>
                        </Button>
                      )}
                    </div>
                  </Card>

                  {/* AI Career Mapper */}
                  <Card className="group relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-colors" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full -translate-y-16 translate-x-16" />
                    
                    <div className="relative p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Target className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 transition-colors">
                            AI Career Mapper
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Rekomendasi karier
                          </p>
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        Dapatkan rekomendasi karier dan roadmap pembelajaran yang dipersonalisasi berdasarkan minat dan kemampuan Anda.
                      </p>
                      
                      <Button asChild className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 hover:from-cyan-600 hover:to-blue-600 rounded-xl">
                        <Link href="/career-mapper">
                          <Target className="w-4 h-4 mr-2" />
                          Jelajahi Karier
                        </Link>
                      </Button>
                    </div>
                  </Card>

                  {/* Learning Path */}
                  <Card className="group relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 group-hover:from-emerald-500/10 group-hover:to-green-500/10 transition-colors" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-full -translate-y-16 translate-x-16" />
                    
                    <div className="relative p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 transition-colors">
                            Learning Path
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Jalur pembelajaran
                          </p>
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        Ikuti jalur pembelajaran yang disesuaikan dengan tujuan karier Anda. Modul terstruktur untuk hasil optimal.
                      </p>
                      
                      <Button asChild className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0 hover:from-emerald-600 hover:to-green-600 rounded-xl">
                        <Link href="/learning-path">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Mulai Belajar
                        </Link>
                      </Button>
                    </div>
                  </Card>

                  {/* Progress Tracker */}
                  <Card className="group relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 group-hover:from-orange-500/10 group-hover:to-yellow-500/10 transition-colors" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-yellow-400/10 rounded-full -translate-y-16 translate-x-16" />
                    
                    <div className="relative p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <BarChart3 className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 transition-colors">
                            Progress Tracker
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Pantau kemajuan
                          </p>
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        Lihat statistik pembelajaran dan pencapaian Anda dalam dashboard yang komprehensif.
                      </p>
                      
                      <Button asChild className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0 hover:from-orange-600 hover:to-yellow-600 rounded-xl">
                        <Link href="/profile">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Lihat Progress
                        </Link>
                      </Button>
                    </div>
                  </Card>

                  {/* Portfolio */}
                  <Card className="group relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-colors" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full -translate-y-16 translate-x-16" />
                    
                    <div className="relative p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Trophy className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 transition-colors">
                            Portfolio
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Showcase karya
                          </p>
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        Bangun portfolio profesional untuk menunjukkan kemampuan dan proyek Anda kepada dunia.
                      </p>
                      
                      <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600 rounded-xl">
                        <Link href="/portfolio">
                          <Trophy className="w-4 h-4 mr-2" />
                          Kelola Portfolio
                        </Link>
                      </Button>
                    </div>
                  </Card>

                  {/* Gamification Hub */}
                  <Card className="group relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/20 dark:to-red-950/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-red-500/5 group-hover:from-rose-500/10 group-hover:to-red-500/10 transition-colors" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-400/10 to-red-400/10 rounded-full -translate-y-16 translate-x-16" />
                    
                    <div className="relative p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Gamepad2 className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-rose-600 transition-colors">
                            Gamification Hub
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Challenges & rewards
                          </p>
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        Ikuti challenges menarik, raih badges eksklusif, dan bersaing di leaderboard global.
                      </p>
                      
                      <Button asChild className="w-full bg-gradient-to-r from-rose-500 to-red-500 text-white border-0 hover:from-rose-600 hover:to-red-600 rounded-xl">
                        <Link href="/gamification">
                          <Gamepad2 className="w-4 h-4 mr-2" />
                          Explore Games
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Logout Section */}
              <Card className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Session Management</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Kelola sesi login Anda</p>
                  </div>
                  <Button onClick={handleLogout} variant="outline" className="rounded-xl">
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
