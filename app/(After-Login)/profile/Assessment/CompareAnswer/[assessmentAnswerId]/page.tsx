"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  BookOpen, 
  Target, 
  Trophy, 
  AlertCircle,
  Brain,
  Sparkles,
  BarChart3,
  Award,
  TrendingUp,
  Lightbulb,
  Clock,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FloatingCard } from "@/components/floating-card";
import { GradientText } from "@/components/gradient-text";

export default function CompareAnswerPage() {
  const router = useRouter();
  const { assessmentAnswerId } = useParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [assessmentData, setAssessmentData] = useState<any>(null);

  useEffect(() => {
    if (!assessmentAnswerId) return;
    async function fetchData() {
      setLoading(true);
      try {
        const ansRes = await fetch(`/api/Assesment/Answer?id=${assessmentAnswerId}`);
        const ansData = await ansRes.json();
        setAnswers(ansData.answers || []);
        setAssessmentData(ansData);
        
        const qRes = await fetch(`/api/Assesment/Question?assessmentId=${ansData.assessmentId}`);
        const qData = await qRes.json();
        setQuestions(qData.questions || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [assessmentAnswerId]);

  // Calculate statistics
  const correctAnswers = answers.filter(ans => ans.isCorrect).length;
  const totalAnswers = answers.length;
  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

  // Get score color based on accuracy
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-500";
    if (score >= 80) return "text-green-500";
    if (score >= 70) return "text-blue-500";
    if (score >= 60) return "text-yellow-500";
    if (score >= 50) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return "from-emerald-500 to-emerald-600";
    if (score >= 80) return "from-green-500 to-green-600";
    if (score >= 70) return "from-blue-500 to-blue-600";
    if (score >= 60) return "from-yellow-500 to-yellow-600";
    if (score >= 50) return "from-orange-500 to-orange-600";
    return "from-red-500 to-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Average";
    if (score >= 50) return "Below Average";
    return "Needs Improvement";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <FloatingCard className="bg-card border-border shadow-lg">
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto">
              <Brain className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground">
                <GradientText>Memuat Perbandingan...</GradientText>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Menganalisis jawaban dan kunci jawaban
              </p>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
            </div>
          </div>
        </FloatingCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            <GradientText>Perbandingan Jawaban</GradientText>
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Analisis mendalam antara jawaban Anda dengan kunci jawaban yang benar. 
            Pelajari area yang perlu ditingkatkan untuk hasil yang lebih baik.
          </p>
        </div>

        {/* Navigation & Back Button */}
        <FloatingCard className="bg-card border-border shadow-lg mb-8">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              {/* Left: Navigation */}
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="border-border hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Hasil
                </Button>
                <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Compare Answers</span>
                </div>
              </div>

              {/* Right: Assessment Info */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Assessment ID</div>
                  <div className="font-semibold text-foreground">
                    {assessmentData?.assessmentId?.slice(-8) || "Unknown"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Tanggal</div>
                  <div className="font-semibold text-foreground">
                    {new Date().toLocaleDateString("id-ID")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FloatingCard>

        {/* Statistics Overview */}
        <FloatingCard className="bg-gradient-to-r from-primary to-accent text-white shadow-lg mb-8">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium">Total Soal</p>
                  <p className="text-3xl font-bold">{totalAnswers}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium">Jawaban Benar</p>
                  <p className="text-3xl font-bold text-green-200">{correctAnswers}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium">Jawaban Salah</p>
                  <p className="text-3xl font-bold text-red-200">{totalAnswers - correctAnswers}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium">Tingkat Akurasi</p>
                  <p className="text-3xl font-bold text-yellow-200">{accuracy}%</p>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-white/90 font-medium">Progress Keseluruhan</span>
                <span className="text-white font-bold text-lg">{accuracy}%</span>
              </div>
              <Progress value={accuracy} className="h-3 bg-white/20" />
              <div className="mt-2 text-center">
                <Badge 
                  variant="secondary" 
                  className="bg-white/20 text-white border-white/30"
                >
                  {getScoreLabel(accuracy)}
                </Badge>
              </div>
            </div>
          </div>
        </FloatingCard>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <FloatingCard className={`border-l-4 ${
            accuracy >= 80 ? 'border-l-green-500 bg-green-50/50 dark:bg-green-900/10' : 
            accuracy >= 60 ? 'border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/10' :
            'border-l-red-500 bg-red-50/50 dark:bg-red-900/10'
          }`}>
            <div className="p-6 text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${getScoreGradient(accuracy)} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                Performa Keseluruhan
              </h3>
              <div className={`text-3xl font-bold mb-2 ${getScoreColor(accuracy)}`}>
                {accuracy}%
              </div>
              <p className="text-sm text-muted-foreground">
                {getScoreLabel(accuracy)}
              </p>
            </div>
          </FloatingCard>

          <FloatingCard className="bg-card border-border">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                Waktu Pengerjaan
              </h3>
              <div className="text-3xl font-bold text-blue-500 mb-2">
                ~15
              </div>
              <p className="text-sm text-muted-foreground">
                Menit (Estimasi)
              </p>
            </div>
          </FloatingCard>

          <FloatingCard className="bg-card border-border">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                Area Perbaikan
              </h3>
              <div className="text-3xl font-bold text-purple-500 mb-2">
                {totalAnswers - correctAnswers}
              </div>
              <p className="text-sm text-muted-foreground">
                Soal perlu review
              </p>
            </div>
          </FloatingCard>
        </div>

        {/* Questions Analysis */}
        <div className="space-y-6 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              <GradientText>Analisis Detail Jawaban</GradientText>
            </h2>
            <p className="text-muted-foreground">
              Review setiap soal untuk memahami kesalahan dan meningkatkan pemahaman
            </p>
          </div>

          {answers.map((ans: any, idx: number) => {
            const q = questions[ans.questionIndex];
            const isCorrect = ans.isCorrect;
            
            return (
              <FloatingCard 
                key={idx} 
                className={`border-l-4 transition-all duration-200 hover:shadow-lg ${
                  isCorrect 
                    ? 'border-l-green-500 bg-green-50/50 dark:bg-green-900/10' 
                    : 'border-l-red-500 bg-red-50/50 dark:bg-red-900/10'
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                      }`}>
                        <Target className={`w-5 h-5 ${
                          isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`} />
                      </div>
                      Soal {idx + 1}
                    </CardTitle>
                    <Badge 
                      variant={isCorrect ? "default" : "destructive"}
                      className="flex items-center gap-2 px-3 py-1"
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Benar
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          Salah
                        </>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Question */}
                  <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      Pertanyaan:
                    </h4>
                    <p className="text-foreground leading-relaxed">
                      {q?.questionText || "Soal tidak ditemukan"}
                    </p>
                  </div>

                  {/* User Answer */}
                  <div className={`p-4 rounded-lg border ${
                    isCorrect 
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                      : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="font-semibold text-foreground">Jawaban Anda:</h4>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <p className={`font-medium text-lg ${
                      isCorrect 
                        ? 'text-green-800 dark:text-green-200' 
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {ans.answer}
                    </p>
                  </div>

                  {/* Correct Answer */}
                  <div className="p-4 bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300">Kunci Jawaban:</h4>
                    </div>
                    <p className="font-medium text-lg text-blue-800 dark:text-blue-200">
                      {q?.correctAnswer || "Tidak tersedia"}
                    </p>
                  </div>

                  {/* Explanation */}
                  {q?.explanation && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">Penjelasan:</h4>
                      </div>
                      <p className="text-yellow-800 dark:text-yellow-200 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </CardContent>
              </FloatingCard>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <FloatingCard className="bg-card border-border shadow-lg">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Selesai dengan Review?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Kembali ke hasil assessment atau lakukan assessment baru
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="border-border hover:bg-muted px-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Hasil
                </Button>
                <Button
                  onClick={() => router.push("/profile/setup")}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg px-6"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Assessment Baru
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </FloatingCard>
      </div>
    </div>
  );
}