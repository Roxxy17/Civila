import { FloatingCard } from "@/components/floating-card";
import { GradientText } from "@/components/gradient-text";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, Clock, CheckCircle, Target, ChevronRight, ArrowLeft, Brain, Sparkles, Star, Zap } from "lucide-react";
import { useState } from "react";

// Reuse CareerPickButton from your results/page.tsx
function CareerPickButton({
  careerName,
  reason,
  matchPercentage,
  assessmentResultId,
  isPicked,
}: {
  careerName: string;
  reason: string;
  matchPercentage: number;
  assessmentResultId: string;
  isPicked?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(isPicked ?? false);
  const [error, setError] = useState("");

  const handlePick = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/CareerRecommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          careerName,
          assessmentResultId,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.error || "Gagal memilih karier");
      }
    } catch (err) {
      setError("Gagal memilih karier");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors group flex items-center gap-4">
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-md">
        <Award className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <span className="font-semibold text-foreground text-sm">{careerName}</span>
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-3 h-3 text-yellow-500" />
          <span className="text-xs text-muted-foreground">Rekomendasi tinggi</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {reason}
        </div>
        <div className="text-xs text-blue-600 mt-1 font-semibold">
          Match: {matchPercentage}%
        </div>
        {(success || isPicked) && (
          <span className="text-xs text-green-600 block mt-1">Karier sudah dipilih!</span>
        )}
        {error && (
          <span className="text-xs text-red-600 block mt-1">{error}</span>
        )}
      </div>
      <Button
        size="sm"
        className="ml-2"
        disabled={loading || success || isPicked}
        onClick={handlePick}
      >
        {loading
          ? "Memproses..."
          : success || isPicked
          ? "Sudah Dipilih"
          : "Pilih Karier"}
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}

export default function AssessmentResultModal({ result, onClose }: { result: any, onClose: () => void }) {
  if (!result) return null;

  // Helper functions (copy from results/page.tsx if needed)
  const getScoreGradient = (score: number) => {
    if (score >= 90) return "from-emerald-500 to-emerald-600";
    if (score >= 80) return "from-green-500 to-green-600";
    if (score >= 70) return "from-blue-500 to-blue-600";
    if (score >= 60) return "from-yellow-500 to-yellow-600";
    if (score >= 50) return "from-orange-500 to-orange-600";
    return "from-red-500 to-red-600";
  };
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-500";
    if (score >= 80) return "text-green-500";
    if (score >= 70) return "text-blue-500";
    if (score >= 60) return "text-yellow-500";
    if (score >= 50) return "text-orange-500";
    return "text-red-500";
  };
  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Average";
    if (score >= 50) return "Below Average";
    return "Needs Improvement";
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return new Date().toLocaleDateString('id-ID');
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return new Date().toLocaleDateString('id-ID');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl pointer-events-auto">
        <FloatingCard className="bg-card border-border shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-8 space-y-6">
            {/* Header */}
            <div className="text-center relative">
              <div className={`w-24 h-24 bg-gradient-to-br ${getScoreGradient(result.overallScore || 0)} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <Award className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-3 text-foreground">
                <GradientText>Hasil Assessment Anda</GradientText>
              </h2>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(result.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Selesai dalam 15 menit</span>
                </div>
                <Badge variant="outline" className="px-3 py-1">
                  {getScoreLabel(result.overallScore || 0)}
                </Badge>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overall Score */}
              <FloatingCard className="bg-primary/5 border-primary/20">
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Skor Keseluruhan</h3>
                  <div className="text-3xl font-bold text-primary mb-2">{result.overallScore || 0}%</div>
                  <div className="mt-3">
                    <Progress value={result.overallScore || 0} className="h-2" />
                  </div>
                </div>
              </FloatingCard>
              {/* Categories */}
              <FloatingCard className="bg-green-500/5 border-green-500/20">
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Kategori Dinilai</h3>
                  <div className="text-3xl font-bold text-green-500 mb-2">
                    {result.breakdown ? Object.keys(result.breakdown).length : 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Area kompetensi</div>
                </div>
              </FloatingCard>
              {/* Recommendations */}
              <FloatingCard className="bg-yellow-500/5 border-yellow-500/20">
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Rekomendasi</h3>
                  <div className="text-3xl font-bold text-yellow-500 mb-2">
                    {result.recommendedCareers?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Karier yang cocok</div>
                </div>
              </FloatingCard>
            </div>

            {/* Category Breakdown */}
            {result.breakdown && (
              <FloatingCard className="bg-muted/20 border-border">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Breakdown Kemampuan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(result.breakdown).map(
                      ([category, score]: [string, any]) => {
                        const numScore = typeof score === "number" ? score : 0;
                        return (
                          <div key={category} className="space-y-3 p-4 rounded-xl bg-background border-border">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-foreground">{category}</span>
                              <Badge variant="outline" className={`${getScoreColor(numScore)}`}>
                                {numScore}%
                              </Badge>
                            </div>
                            <Progress value={numScore} className="h-3" />
                            <div className="text-xs text-muted-foreground">
                              {getScoreLabel(numScore)}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </FloatingCard>
            )}

            {/* Recommendations */}
            {result.recommendedCareers && result.recommendedCareers.length > 0 && (
              <FloatingCard className="bg-primary/5 border-primary/20">
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      <GradientText>Rekomendasi Karier untuk Anda</GradientText>
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2 max-w-2xl mx-auto">
                      Berdasarkan analisis mendalam terhadap jawaban assessment Anda
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.recommendedCareers.map((rec: any, idx: number) => (
                      <CareerPickButton
                        key={`recommendation-${idx}-${rec.careerName}`}
                        careerName={rec.careerName}
                        reason={rec.reason}
                        matchPercentage={rec.matchPercentage}
                        assessmentResultId={result.parentId}
                      />
                    ))}
                  </div>
                </div>
              </FloatingCard>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-muted px-8"
                onClick={onClose}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg px-8"
                onClick={() => window.location.href = "/profile/Assessment/Results"}
              >
                <Brain className="w-4 h-4 mr-2" />
                Lihat Semua Hasil
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </FloatingCard>
      </div>
    </div>
  );
}