"use client";

import { useState, useEffect } from "react";
import { AuthGuard } from "@/components/auth-guard";
import { FloatingCard } from "@/components/floating-card";
import { GradientText } from "@/components/gradient-text";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/sidebar";
import { LearningModuleModal } from "@/components/learning-module-modal";
import {
  Brain,
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Target,
  Star,
  Search,
  ArrowLeft,
  Filter,
  Users,
  Award,
  TrendingUp,
  ChevronRight,
  Code,
  BarChart3,
  Palette,
  Shield,
  Cpu,
  Lightbulb,
  Rocket,
  FileText,
  Video,
  Headphones,
  Download,
  Share2,
  Eye,
  Zap,
  Heart,
  Briefcase,
  Layers,
  PenTool,
  Database,
  AlertCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LearningPathPage() {
  const [user, setUser] = useState<any>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [careerRecommendations, setCareerRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch career recommendations dari API
  useEffect(() => {
    const fetchCareerRecommendations = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/CareerRecommendation");
        if (res.ok) {
          const data = await res.json();
          console.log("🔥 Career recommendations from API:", data.recommendations);
          setCareerRecommendations(data.recommendations || []);
        } else {
          throw new Error('Failed to fetch career recommendations');
        }
      } catch (err) {
        console.error("❌ Error fetching career recommendations:", err);
        setError("Gagal memuat data karier");
      } finally {
        setLoading(false);
      }
    };

    fetchCareerRecommendations();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Check if there's a specific career from URL params
    const careerParam = searchParams.get("career");
    if (careerParam) {
      setSelectedPath(careerParam);
    }
  }, [searchParams]);

  // Transform API data ke format yang dibutuhkan UI
  const transformApiDataToLearningPaths = () => {
    const learningPaths: { [key: string]: any } = {};

    careerRecommendations.forEach((career) => {
      const pathKey = career.careerName;
      
      // Tentukan icon berdasarkan kategori
      const getIconByCategory = (category: string) => {
        switch (category?.toLowerCase()) {
          case 'technology': return Code;
          case 'design': return Palette;
          case 'business': case 'marketing': return Target;
          case 'analytics': case 'data': return BarChart3;
          default: return BookOpen;
        }
      };

      // Tentukan warna berdasarkan kategori
      const getColorByCategory = (category: string) => {
        switch (category?.toLowerCase()) {
          case 'technology': return 'from-blue-500 to-cyan-500';
          case 'design': return 'from-pink-500 to-rose-500';
          case 'business': case 'marketing': return 'from-purple-500 to-pink-500';
          case 'analytics': case 'data': return 'from-emerald-500 to-teal-500';
          default: return 'from-slate-500 to-slate-600';
        }
      };

      // Transform learning milestones ke modules
      const modules = career.learningMilestones?.map((milestone: any, index: number) => ({
        id: index + 1,
        title: milestone.achievement,
        description: `Milestone pembelajaran bulan ke-${milestone.month} dengan fokus pada pengembangan skills yang dibutuhkan`,
        duration: `${milestone.month} bulan`,
        type: index === 0 ? "Course" : index % 2 === 0 ? "Hands-on" : "Theory",
        difficulty: index < 2 ? "Beginner" : index < 4 ? "Intermediate" : "Advanced",
        completed: false,
        locked: index > 0, // Hanya modul pertama yang unlocked
        lessons: 12 + (index * 3),
        projects: 2 + index,
        content: {
          lessons: milestone.skills || [],
          projects: [`Project ${index + 1}`, `Assignment ${index + 1}`],
          resources: [
            { name: "Online Course", url: "#", type: "Course" },
            { name: "Documentation", url: "#", type: "Documentation" },
          ],
        },
      })) || [];

      learningPaths[pathKey] = {
        title: `${career.careerName} Learning Path`,
        description: career.description || `Menjadi ${career.careerName} yang handal dengan pembelajaran terstruktur dan komprehensif`,
        totalModules: modules.length || 4,
        estimatedTime: career.estimatedLearningTime || "6-12 bulan",
        difficulty: career.difficulty || "Intermediate",
        color: getColorByCategory(career.category),
        icon: getIconByCategory(career.category),
        category: career.category || "Technology",
        rating: (career.aiScore / 20) || 4.5, // Convert AI score to rating (0-5)
        students: Math.floor(Math.random() * 2000) + 500, // Random students count
        modules: modules.length > 0 ? modules : [
          {
            id: 1,
            title: "Fundamentals",
            description: "Pelajari dasar-dasar yang dibutuhkan untuk memulai karier ini",
            duration: "4 minggu",
            type: "Course",
            difficulty: "Beginner",
            completed: false,
            locked: false,
            lessons: 15,
            projects: 3,
            content: {
              lessons: career.requiredSkills?.slice(0, 4) || ["Skill 1", "Skill 2"],
              projects: ["Beginner Project", "Practice Assignment"],
              resources: [
                { name: "Getting Started Guide", url: "#", type: "Documentation" },
                { name: "Video Tutorial", url: "#", type: "Video" },
              ],
            },
          }
        ],
        // Data tambahan dari API
        salaryRange: career.salaryRange,
        growthRate: career.growthRate,
        requiredSkills: career.requiredSkills,
        softSkills: career.softSkills,
        tools: career.tools,
        careerPath: career.careerPath,
        marketDemand: career.marketDemand,
        workType: career.workType,
        aiScore: career.aiScore,
      };
    });

    return learningPaths;
  };

  const learningPaths = transformApiDataToLearningPaths();

  const getCurrentPath = () => {
    if (!selectedPath) return null;
    return learningPaths[selectedPath];
  };

  const getPathProgress = (path: any) => {
    const completedModules = path.modules.filter(
      (module: any) => module.completed
    ).length;
    return (completedModules / path.modules.length) * 100;
  };

  const handleModuleClick = (module: any) => {
    if (!module.locked) {
      setSelectedModule(module);
      setShowModuleModal(true);
    }
  };

  const handleModuleComplete = (moduleId: number) => {
    if (!selectedPath) return;

    // Update module completion status
    const pathData = learningPaths[selectedPath];
    const moduleIndex = pathData.modules.findIndex((m: any) => m.id === moduleId);
    if (moduleIndex !== -1) {
      pathData.modules[moduleIndex].completed = true;

      // Unlock next module
      if (moduleIndex + 1 < pathData.modules.length) {
        pathData.modules[moduleIndex + 1].locked = false;
      }

      // Save to localStorage
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      userData.learningProgress = userData.learningProgress || {};
      userData.learningProgress[selectedPath] = pathData;
      localStorage.setItem("user", JSON.stringify(userData));

      setShowModuleModal(false);
      // Force re-render
      setCareerRecommendations([...careerRecommendations]);
    }
  };

  const filteredPaths = Object.entries(learningPaths).filter(([name, path]) => {
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      path.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      !filterDifficulty || path.difficulty === filterDifficulty;
    const matchesCategory = !filterCategory || path.category === filterCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700";
      case "Intermediate":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-700";
      case "Advanced":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Course":
        return <BookOpen className="w-4 h-4 text-white" />;
      case "Theory":
        return <FileText className="w-4 h-4 text-white" />;
      case "Hands-on":
        return <Code className="w-4 h-4 text-white" />;
      case "Framework":
        return <Rocket className="w-4 h-4 text-white" />;
      default:
        return <BookOpen className="w-4 h-4 text-white" />;
    }
  };

  // Loading state
  if (loading) {
    return (
      <AuthGuard>
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar
            isExpanded={isSidebarExpanded}
            onToggleExpanded={() => setIsSidebarExpanded(prev => !prev)}
          />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Memuat learning paths...</p>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  // Error state
  if (error) {
    return (
      <AuthGuard>
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar
            isExpanded={isSidebarExpanded}
            onToggleExpanded={() => setIsSidebarExpanded(prev => !prev)}
          />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Terjadi Kesalahan</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Muat Ulang
              </Button>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  // Jika memilih specific path
  if (selectedPath) {
    const currentPath = getCurrentPath();
    if (!currentPath) return null;

    const IconComponent = currentPath.icon;

    return (
      <AuthGuard>
        <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <Sidebar
            isExpanded={isSidebarExpanded}
            onToggleExpanded={() => setIsSidebarExpanded((prev) => !prev)}
          />

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">
              <div className="px-6 py-8 space-y-6">
                {/* Enhanced Header with API Data */}
                <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPath(null)}
                          className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Kembali
                        </Button>
                        <div className="text-white/60 text-xs">
                          Learning Paths / {currentPath.category} / {currentPath.title}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-white/20 text-white border border-white/30 hover:bg-white/30 rounded-lg text-xs"
                        >
                          <Share2 className="w-3 h-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${currentPath.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h1 className="text-3xl font-bold text-white mb-2">
                          {currentPath.title}
                        </h1>
                        <p className="text-white/90 text-sm mb-3">
                          {currentPath.description}
                        </p>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white text-sm font-semibold">
                              {currentPath.rating.toFixed(1)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-white/80" />
                            <span className="text-white text-sm">
                              {currentPath.students.toLocaleString()} siswa
                            </span>
                          </div>
                          <Badge className="bg-white/20 text-white border border-white/30 px-3 py-1 text-xs">
                            {currentPath.difficulty}
                          </Badge>
                          {currentPath.aiScore && (
                            <Badge className="bg-white/20 text-white border border-white/30 px-3 py-1 text-xs">
                              AI Score: {currentPath.aiScore}%
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Enhanced Path Statistics dengan data API */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                    <div className="relative p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xl font-bold">{currentPath.totalModules}</div>
                          <div className="text-white/80 text-xs">Total Modul</div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                    <div className="relative p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">{currentPath.salaryRange || "Competitive"}</div>
                          <div className="text-white/80 text-xs">Gaji</div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                    <div className="relative p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-lg font-bold">{currentPath.estimatedTime}</div>
                          <div className="text-white/80 text-xs">Estimasi</div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                    <div className="relative p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xl font-bold">{Math.round(getPathProgress(currentPath))}%</div>
                          <div className="text-white/80 text-xs">Progress</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Progress Overview */}
                <Card className="p-6 border-0 shadow-lg bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                      Progress Overview
                    </h2>
                    <div className="flex items-center gap-2">
                      <Badge className={`px-3 py-1 text-xs ${getDifficultyColor(currentPath.difficulty)}`}>
                        {currentPath.difficulty} Level
                      </Badge>
                      {currentPath.marketDemand && (
                        <Badge variant="outline" className="px-3 py-1 text-xs">
                          {currentPath.marketDemand} Demand
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Kemajuan Keseluruhan
                      </span>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {Math.round(getPathProgress(currentPath))}% selesai
                      </span>
                    </div>
                    <Progress value={getPathProgress(currentPath)} className="h-2" />
                  </div>

                  {/* Growth Rate dan Work Type */}
                  {(currentPath.growthRate || currentPath.workType) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {currentPath.growthRate && (
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">
                            Pertumbuhan Karier
                          </div>
                          <div className="text-sm font-semibold text-green-800 dark:text-green-200">
                            {currentPath.growthRate}
                          </div>
                        </div>
                      )}
                      {currentPath.workType && currentPath.workType.length > 0 && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                            Tipe Pekerjaan
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {currentPath.workType.map((type: string, index: number) => (
                              <Badge key={index} className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Card>

                {/* Modules List */}
                <Card className="p-6 border-0 shadow-lg bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                    Modul Pembelajaran
                  </h2>
                  <div className="space-y-4">
                    {currentPath.modules.map((module: any, index: number) => (
                      <Card
                        key={module.id}
                        className={`group p-5 cursor-pointer transition-all duration-300 hover:shadow-lg border ${
                          module.locked
                            ? "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800/50"
                            : module.completed
                            ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 hover:scale-[1.01]"
                            : "hover:scale-[1.01] hover:shadow-lg"
                        }`}
                        onClick={() => handleModuleClick(module)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                                module.completed
                                  ? "bg-gradient-to-br from-emerald-500 to-teal-500"
                                  : module.locked
                                  ? "bg-slate-300 dark:bg-slate-600"
                                  : `bg-gradient-to-br ${currentPath.color}`
                              }`}
                            >
                              {module.completed ? (
                                <CheckCircle className="w-6 h-6 text-white" />
                              ) : module.locked ? (
                                <Shield className="w-6 h-6 text-white" />
                              ) : (
                                getTypeIcon(module.type)
                              )}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                                {module.title}
                              </h3>
                              <Badge variant="outline" className="text-xs px-2 py-0.5">
                                {module.type}
                              </Badge>
                              <Badge className={`text-xs px-2 py-0.5 ${getDifficultyColor(module.difficulty)}`}>
                                {module.difficulty}
                              </Badge>
                            </div>

                            <p className="text-slate-600 dark:text-slate-400 mb-2 text-sm line-clamp-2">
                              {module.description}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{module.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                <span>{module.lessons} lessons</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Code className="w-3 h-3" />
                                <span>{module.projects} projects</span>
                              </div>
                              {module.completed && (
                                <div className="flex items-center gap-1 text-green-600">
                                  <CheckCircle className="w-3 h-3" />
                                  <span className="font-medium">Selesai</span>
                                </div>
                              )}
                              {module.locked && (
                                <div className="flex items-center gap-1 text-slate-400">
                                  <Shield className="w-3 h-3" />
                                  <span>Terkunci</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex-shrink-0">
                            <ChevronRight
                              className={`w-5 h-5 transition-all ${
                                module.locked
                                  ? "text-slate-300"
                                  : "text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1"
                              }`}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>

                {/* Additional Career Info dari API */}
                {(currentPath.requiredSkills || currentPath.softSkills || currentPath.tools) && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Required Skills */}
                    {currentPath.requiredSkills && currentPath.requiredSkills.length > 0 && (
                      <Card className="p-6 border-0 shadow-lg bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <Zap className="w-5 h-5 text-orange-500" />
                          Required Skills
                        </h3>
                        <div className="space-y-2">
                          {currentPath.requiredSkills.slice(0, 5).map((skill: string, index: number) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                              <Star className="w-3 h-3 text-orange-500" />
                              <span className="text-xs text-orange-700 dark:text-orange-300">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}

                    {/* Soft Skills */}
                    {currentPath.softSkills && currentPath.softSkills.length > 0 && (
                      <Card className="p-6 border-0 shadow-lg bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-purple-500" />
                          Soft Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {currentPath.softSkills.map((skill: string, index: number) => (
                            <Badge key={index} className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    )}

                    {/* Tools */}
                    {currentPath.tools && currentPath.tools.length > 0 && (
                      <Card className="p-6 border-0 shadow-lg bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5 text-blue-500" />
                          Tools & Technologies
                        </h3>
                        <div className="space-y-2">
                          {currentPath.tools.slice(0, 5).map((tool: string, index: number) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              <span className="text-xs text-blue-700 dark:text-blue-300">{tool}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {selectedModule && (
          <LearningModuleModal
            isOpen={showModuleModal}
            onClose={() => setShowModuleModal(false)}
            module={selectedModule}
            onComplete={handleModuleComplete}
          />
        )}
      </AuthGuard>
    );
  }

  // Main Learning Paths Grid dengan data dari API
  return (
    <AuthGuard>
      <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggleExpanded={() => setIsSidebarExpanded((prev) => !prev)}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="px-6 py-8 space-y-6">
              {/* Header Section dengan statistik dari API */}
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                <div className="relative p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                        <BookOpen className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                          Learning Paths
                        </h1>
                        <p className="text-white/90 text-sm">
                          Pilih jalur pembelajaran yang sesuai dengan rekomendasi AI untuk karier Anda
                        </p>
                      </div>
                    </div>

                    {/* Quick Stats dari API */}
                    <div className="flex items-center gap-4">
                      <Card className="p-4 bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                            <BookOpen className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            {Object.keys(learningPaths).length}
                          </div>
                          <div className="text-xs text-slate-600">AI Paths</div>
                        </div>
                      </Card>

                      <Card className="p-4 bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            {careerRecommendations.length}
                          </div>
                          <div className="text-xs text-slate-600">Careers</div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Search and Filters */}
              <Card className="p-5 border-0 shadow-lg bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Cari learning path berdasarkan nama atau kategori..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-10 text-sm rounded-lg border border-slate-200 dark:border-slate-700"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        Difficulty:
                      </span>
                      {["Beginner", "Intermediate", "Advanced"].map((level) => (
                        <Button
                          key={level}
                          variant={filterDifficulty === level ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            setFilterDifficulty(filterDifficulty === level ? null : level)
                          }
                          className="rounded-lg text-xs px-3 py-1 h-7"
                        >
                          {level}
                        </Button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        Category:
                      </span>
                      {["Technology", "Design", "Business", "Analytics", "Marketing"].map((category) => (
                        <Button
                          key={category}
                          variant={filterCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            setFilterCategory(filterCategory === category ? null : category)
                          }
                          className="rounded-lg text-xs px-3 py-1 h-7"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Learning Paths Grid dari API */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {filteredPaths.map(([pathName, path], index) => {
                  const IconComponent = path.icon;
                  return (
                    <Card
                      key={pathName}
                      className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm"
                      onClick={() => setSelectedPath(pathName)}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12" />

                      <div className="relative p-5">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${path.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
                              {pathName}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Badge className={`text-xs px-2 py-0.5 ${getDifficultyColor(path.difficulty)}`}>
                                {path.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs px-2 py-0.5">
                                {path.category}
                              </Badge>
                              {path.aiScore && (
                                <Badge className="text-xs px-2 py-0.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                                  AI: {path.aiScore}%
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed line-clamp-2">
                          {path.description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
                              {path.totalModules}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Modul</div>
                          </div>
                          <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                              {path.estimatedTime}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Estimasi</div>
                          </div>
                        </div>

                        {/* Salary Range */}
                        {path.salaryRange && (
                          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">
                              Rentang Gaji
                            </div>
                            <div className="text-sm font-bold text-green-800 dark:text-green-200">
                              {path.salaryRange}
                            </div>
                          </div>
                        )}

                        {/* Progress */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                              Progress
                            </span>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                              {Math.round(getPathProgress(path))}%
                            </span>
                          </div>
                          <Progress value={getPathProgress(path)} className="h-2" />
                        </div>

                        {/* Footer Stats */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{path.rating.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                              <Brain className="w-4 h-4 text-purple-500" />
                              <span className="text-sm">AI Generated</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium">
                            <span className="text-sm">Mulai Belajar</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* No Results */}
              {filteredPaths.length === 0 && !loading && (
                <Card className="p-12 text-center border-0 shadow-lg bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Tidak ada hasil ditemukan
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                    {careerRecommendations.length === 0 
                      ? "Belum ada rekomendasi karier. Silakan ambil assessment terlebih dahulu."
                      : "Coba ubah filter atau kata kunci pencarian Anda"
                    }
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchTerm("");
                        setFilterDifficulty(null);
                        setFilterCategory(null);
                      }}
                      className="px-6 py-2 rounded-lg"
                    >
                      Reset Filter
                    </Button>
                    {careerRecommendations.length === 0 && (
                      <Button
                        size="sm"
                        onClick={() => router.push('/profile/assessment')}
                        className="px-6 py-2 rounded-lg"
                      >
                        Ambil Assessment
                      </Button>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}