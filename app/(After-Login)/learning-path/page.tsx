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
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const learningPaths = {
  "Data Scientist": {
    title: "Data Scientist Learning Path",
    description:
      "Menjadi ahli dalam analisis data dan machine learning dengan kemampuan membangun model prediktif dan insights bisnis",
    totalModules: 15,
    estimatedTime: "12-18 bulan",
    difficulty: "Advanced",
    color: "from-emerald-500 to-teal-500",
    icon: BarChart3,
    category: "Analytics",
    rating: 4.8,
    students: 1250,
    modules: [
      {
        id: 1,
        title: "Python Programming Fundamentals",
        description:
          "Pelajari dasar-dasar Python untuk data science mulai dari syntax hingga OOP",
        duration: "2 minggu",
        type: "Course",
        difficulty: "Beginner",
        completed: false,
        locked: false,
        lessons: 12,
        projects: 3,
        content: {
          lessons: [
            "Variables & Data Types",
            "Control Flow",
            "Functions",
            "Object-Oriented Programming",
          ],
          projects: ["Calculator App", "Data Processing Script"],
          resources: [
            { name: "Python.org Tutorial", url: "#", type: "Documentation" },
            { name: "Automate the Boring Stuff", url: "#", type: "Book" },
          ],
        },
      },
      {
        id: 2,
        title: "Statistics & Probability",
        description:
          "Konsep statistik yang essential untuk data science dan machine learning",
        duration: "3 minggu",
        type: "Theory",
        difficulty: "Intermediate",
        completed: false,
        locked: true,
        lessons: 18,
        projects: 2,
        content: {
          lessons: [
            "Descriptive Statistics",
            "Probability Distributions",
            "Hypothesis Testing",
            "Correlation & Regression",
          ],
          projects: ["Statistical Analysis Report", "A/B Testing Simulation"],
          resources: [
            { name: "Khan Academy Statistics", url: "#", type: "Course" },
            { name: "Think Stats", url: "#", type: "Book" },
          ],
        },
      },
      {
        id: 3,
        title: "Data Manipulation with Pandas",
        description:
          "Master data manipulation menggunakan Pandas library untuk data cleaning dan analysis",
        duration: "2 minggu",
        type: "Hands-on",
        difficulty: "Intermediate",
        completed: false,
        locked: true,
        lessons: 15,
        projects: 4,
        content: {
          lessons: [
            "DataFrame Basics",
            "Data Cleaning",
            "Grouping & Aggregation",
            "Merging Data",
          ],
          projects: ["Sales Data Analysis", "Customer Segmentation"],
          resources: [
            { name: "Pandas Documentation", url: "#", type: "Documentation" },
            { name: "Python for Data Analysis", url: "#", type: "Book" },
          ],
        },
      },
    ],
  },
  "Software Engineer": {
    title: "Software Engineer Learning Path",
    description:
      "Menjadi full-stack developer yang handal dengan menguasai teknologi frontend dan backend modern",
    totalModules: 12,
    estimatedTime: "8-12 bulan",
    difficulty: "Intermediate",
    color: "from-blue-500 to-cyan-500",
    icon: Code,
    category: "Technology",
    rating: 4.9,
    students: 2340,
    modules: [
      {
        id: 1,
        title: "JavaScript Fundamentals",
        description:
          "Pelajari dasar-dasar JavaScript modern dengan ES6+ features dan best practices",
        duration: "3 minggu",
        type: "Course",
        difficulty: "Beginner",
        completed: false,
        locked: false,
        lessons: 20,
        projects: 5,
        content: {
          lessons: [
            "ES6+ Features",
            "DOM Manipulation",
            "Async Programming",
            "Error Handling",
          ],
          projects: ["Todo App", "Weather App"],
          resources: [
            { name: "MDN JavaScript Guide", url: "#", type: "Documentation" },
            { name: "JavaScript.info", url: "#", type: "Tutorial" },
          ],
        },
      },
      {
        id: 2,
        title: "React.js Development",
        description:
          "Build modern web applications dengan React dan ecosystem yang powerful",
        duration: "4 minggu",
        type: "Framework",
        difficulty: "Intermediate",
        completed: false,
        locked: true,
        lessons: 25,
        projects: 6,
        content: {
          lessons: [
            "Components & JSX",
            "State & Props",
            "Hooks",
            "Context API",
          ],
          projects: ["E-commerce App", "Social Media Dashboard"],
          resources: [
            { name: "React Documentation", url: "#", type: "Documentation" },
            { name: "React Tutorial", url: "#", type: "Course" },
          ],
        },
      },
    ],
  },
  "Product Manager": {
    title: "Product Manager Learning Path",
    description:
      "Menjadi product manager yang strategic dan data-driven dengan kemampuan leadership yang kuat",
    totalModules: 10,
    estimatedTime: "6-10 bulan",
    difficulty: "Intermediate",
    color: "from-purple-500 to-pink-500",
    icon: Target,
    category: "Business",
    rating: 4.7,
    students: 890,
    modules: [
      {
        id: 1,
        title: "Product Management Fundamentals",
        description:
          "Dasar-dasar product management dan strategy untuk membangun produk yang user-centric",
        duration: "2 minggu",
        type: "Theory",
        difficulty: "Beginner",
        completed: false,
        locked: false,
        lessons: 16,
        projects: 3,
        content: {
          lessons: [
            "Product Lifecycle",
            "Market Research",
            "User Personas",
            "Product Strategy",
          ],
          projects: ["Product Requirements Document", "Market Analysis Report"],
          resources: [
            { name: "Product Management Course", url: "#", type: "Course" },
            { name: "Inspired by Marty Cagan", url: "#", type: "Book" },
          ],
        },
      },
    ],
  },
  "UI/UX Designer": {
    title: "UI/UX Designer Learning Path",
    description:
      "Menjadi designer yang user-centric dan kreatif dengan kemampuan research dan prototyping",
    totalModules: 8,
    estimatedTime: "4-8 bulan",
    difficulty: "Beginner",
    color: "from-pink-500 to-rose-500",
    icon: Palette,
    category: "Design",
    rating: 4.6,
    students: 1560,
    modules: [
      {
        id: 1,
        title: "Design Thinking Fundamentals",
        description:
          "Memahami proses design thinking dan user research untuk menciptakan solusi yang tepat",
        duration: "2 minggu",
        type: "Theory",
        difficulty: "Beginner",
        completed: false,
        locked: false,
        lessons: 14,
        projects: 2,
        content: {
          lessons: [
            "Design Process",
            "User Research",
            "Empathy Mapping",
            "Problem Definition",
          ],
          projects: ["User Research Report", "Design Challenge"],
          resources: [
            { name: "Design Thinking Toolkit", url: "#", type: "Guide" },
            { name: "IDEO Design Kit", url: "#", type: "Resource" },
          ],
        },
      },
    ],
  },
};

export default function LearningPathPage() {
  const [user, setUser] = useState<any>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Check if there's a specific career from URL params
    const careerParam = searchParams.get("career");
    if (
      careerParam &&
      learningPaths[careerParam as keyof typeof learningPaths]
    ) {
      setSelectedPath(careerParam);
    }
  }, [searchParams]);

  const getCurrentPath = () => {
    if (!selectedPath) return null;
    return learningPaths[selectedPath as keyof typeof learningPaths];
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
    const pathData = learningPaths[selectedPath as keyof typeof learningPaths];
    const moduleIndex = pathData.modules.findIndex((m) => m.id === moduleId);
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
                {/* Enhanced Header with Breadcrumb */}
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
                          Learning Paths / {currentPath.category} /{" "}
                          {currentPath.title}
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
                        <Button
                          size="sm"
                          className="bg-white/20 text-white border border-white/30 hover:bg-white/30 rounded-lg text-xs"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${currentPath.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
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
                              {currentPath.rating}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Path Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                    <div className="relative p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xl font-bold">
                            {currentPath.totalModules}
                          </div>
                          <div className="text-white/80 text-xs">
                            Total Modul
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                    <div className="relative p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xl font-bold">
                            {
                              currentPath.modules.filter(
                                (m: any) => m.completed
                              ).length
                            }
                          </div>
                          <div className="text-white/80 text-xs">Selesai</div>
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
                          <div className="text-lg font-bold">
                            {currentPath.estimatedTime}
                          </div>
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
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xl font-bold">
                            {Math.round(getPathProgress(currentPath))}%
                          </div>
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
                    <Badge
                      className={`px-3 py-1 text-xs ${getDifficultyColor(
                        currentPath.difficulty
                      )}`}
                    >
                      {currentPath.difficulty} Level
                    </Badge>
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
                    <Progress
                      value={getPathProgress(currentPath)}
                      className="h-2"
                    />
                  </div>
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
                              <Badge
                                variant="outline"
                                className="text-xs px-2 py-0.5"
                              >
                                {module.type}
                              </Badge>
                              <Badge
                                className={`text-xs px-2 py-0.5 ${getDifficultyColor(
                                  module.difficulty
                                )}`}
                              >
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
              {/* Header Section */}
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
                          Pilih jalur pembelajaran yang sesuai dengan tujuan
                          karier Anda
                        </p>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-4">
                      <Card className="p-4 bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                            <BookOpen className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            {Object.keys(learningPaths).length}
                          </div>
                          <div className="text-xs text-slate-600">Paths</div>
                        </div>
                      </Card>

                      <Card className="p-4 bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            5.4K
                          </div>
                          <div className="text-xs text-slate-600">Students</div>
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
                          variant={
                            filterDifficulty === level ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            setFilterDifficulty(
                              filterDifficulty === level ? null : level
                            )
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
                      {["Technology", "Design", "Business", "Analytics"].map(
                        (category) => (
                          <Button
                            key={category}
                            variant={
                              filterCategory === category
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              setFilterCategory(
                                filterCategory === category ? null : category
                              )
                            }
                            className="rounded-lg text-xs px-3 py-1 h-7"
                          >
                            {category}
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Learning Paths Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3  gap-6">
                {filteredPaths.map(([pathName, path], index) => {
                  const IconComponent = path.icon;
                  return (
                    <Card
                      key={pathName}
                      className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm"
                      onClick={() => setSelectedPath(pathName)}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                      />
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12" />

                      <div className="relative p-5">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className={`w-12 h-12 bg-gradient-to-br ${path.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
                              {path.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={`text-xs px-2 py-0.5 ${getDifficultyColor(
                                  path.difficulty
                                )}`}
                              >
                                {path.difficulty}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-xs px-2 py-0.5"
                              >
                                {path.category}
                              </Badge>
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
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              Modul
                            </div>
                          </div>
                          <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
                              {path.estimatedTime}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              Estimasi
                            </div>
                          </div>
                        </div>

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
                          <Progress
                            value={getPathProgress(path)}
                            className="h-2"
                          />
                        </div>

                        {/* Footer Stats */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">
                                {path.rating}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                              <Users className="w-4 h-4" />
                              <span className="text-sm">
                                {path.students.toLocaleString()}
                              </span>
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
              {filteredPaths.length === 0 && (
                <Card className="p-12 text-center border-0 shadow-lg bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Tidak ada hasil ditemukan
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                    Coba ubah filter atau kata kunci pencarian Anda
                  </p>
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
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
