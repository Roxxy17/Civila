"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, Brain, Clock, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AssessmentWorkPage({ onComplete, isOpen }: { onComplete?: () => void, isOpen?: boolean }) {
  const [questions, setQuestions] = useState<any[]>([])
  const [assessmentId, setAssessmentId] = useState<string>("")
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes
  const router = useRouter()
  const [processingResult, setProcessingResult] = useState(false)

  // Ambil soal dari backend (GET)
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/Assesment/Question", { method: "GET" })
        if (res.ok) {
          const data = await res.json()
          setQuestions(data.questions || [])
          if (data.assessmentId) setAssessmentId(data.assessmentId)
        }
      } catch (error) {
        console.error("Error fetching questions:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [])

  // Timer
  useEffect(() => {
    if (!loading && !isCompleted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && !isCompleted) {
      // Auto submit when time runs out
      handleTimeUp()
    }
  }, [loading, isCompleted, timeLeft])

  const handleTimeUp = async () => {
    setIsCompleted(true)
    setSubmitting(true)
    await handleSubmitAnswers([...answers])
    setSubmitting(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswers = async (answersToSubmit: number[]) => {
    const payload = {
      assessmentId,
      answers: answersToSubmit.map((answerIndex, i) => ({
        questionIndex: i,
        answer: ["A", "B", "C", "D"][answerIndex]
      }))
    }

    try {
      setProcessingResult(true)
      // Submit jawaban ke backend
      const res = await fetch("/api/Assesment/Answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        const data = await res.json()
        const answerId = data._id || data.id || data.answerId
        if (answerId) {
          // Generate hasil assessment (result) otomatis dan tunggu selesai
          const resultRes = await fetch("/api/Assesment/Result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ assessmentAnswerId: answerId })
          })
          setProcessingResult(false)
          if (resultRes.ok) {
            // Callback completion
            if (onComplete) onComplete()
            // Redirect ke halaman hasil assessment
            router.push("/profile/Assessment/Results")
          }
        }
      }
    } catch (err) {
      setProcessingResult(false)
      console.error("Error submitting answers:", err)
      // Optional: handle error
    }
  }

  const handleNext = async () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = selectedAnswer

      setAnswers(newAnswers)
      setSelectedAnswer(null)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setIsCompleted(true)
        setSubmitting(true)
        await handleSubmitAnswers(newAnswers)
        setSubmitting(false)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] ?? null)
    }
  }

  const progress = questions.length ? ((currentQuestion + 1) / questions.length) * 100 : 0
  const timeProgress = (timeLeft / 900) * 100
  const isTimeWarning = timeLeft < 300 // Warning when < 5 minutes

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animated-bg">
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md pointer-events-none" />
        <div className="relative z-10 w-full max-w-md pointer-events-auto">
          <FloatingCard className="bg-background/95 dark:bg-background/90 backdrop-blur-xl border border-border/50 shadow-2xl">
            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto pulse-glow shadow-lg">
                <Brain className="w-10 h-10 text-white animate-pulse" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">
                  <GradientText>Memuat Assessment...</GradientText>
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Sistem sedang menyiapkan soal assessment yang dipersonalisasi untuk Anda
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full loading-shimmer"></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Mohon tunggu sebentar...
                </p>
              </div>
            </div>
          </FloatingCard>
        </div>
      </div>
    )
  }

  if (!questions.length) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animated-bg">
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md pointer-events-none" />
        <div className="relative z-10 w-full max-w-md pointer-events-auto">
          <FloatingCard className="bg-background/95 dark:bg-background/90 backdrop-blur-xl border border-border/50 shadow-2xl">
            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">
                  <GradientText>Soal Tidak Tersedia</GradientText>
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Tidak ada soal assessment yang tersedia saat ini. Silakan coba lagi nanti atau hubungi administrator.
                </p>
              </div>
              <Button 
                onClick={() => router.push("/dashboard")}
                variant="outline"
                className="w-full border-border/50 hover:bg-muted/50"
              >
                Kembali ke Dashboard
              </Button>
            </div>
          </FloatingCard>
        </div>
      </div>
    )
  }

  if (isCompleted || processingResult) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animated-bg">
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md pointer-events-none" />
        <div className="relative z-10 w-full max-w-lg pointer-events-auto">
          <FloatingCard className="bg-background/95 dark:bg-background/90 backdrop-blur-xl border border-border/50 shadow-2xl">
            <div className="p-8 text-center space-y-6">
              {/* Success Animation */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 rounded-2xl flex items-center justify-center mx-auto pulse-glow shadow-lg animate-in zoom-in duration-500">
                  <CheckCircle2 className="w-12 h-12 text-white animate-in zoom-in duration-700 delay-200" />
                </div>
                
                {/* Success Particles Effect */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-28 h-28 border-2 border-green-400/30 rounded-full animate-ping"></div>
                </div>
              </div>

              <div className="space-y-3 animate-in slide-in-from-bottom duration-500 delay-300">
                <h2 className="text-3xl font-bold text-foreground">
                  <GradientText>Assessment Selesai!</GradientText>
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
                  {processingResult
                    ? "Sistem sedang menganalisis jawaban Anda dengan AI untuk memberikan rekomendasi karier yang akurat..."
                    : "Terima kasih! Hasil assessment Anda sedang diproses untuk memberikan insight karier yang mendalam."}
                </p>
              </div>

              {/* Processing Animation */}
              <div className="space-y-4 animate-in slide-in-from-bottom duration-500 delay-500">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menganalisis hasil dengan AI...</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full loading-shimmer"></div>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="bg-muted/30 dark:bg-muted/20 rounded-xl p-4 space-y-3 animate-in slide-in-from-bottom duration-500 delay-700">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Brain className="w-4 h-4 text-primary" />
                  <span>Assessment Summary:</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>{questions.length} Soal Dijawab</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-blue-500" />
                    <span>Waktu: {Math.floor((900 - timeLeft) / 60)}m {(900 - timeLeft) % 60}s</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground/70 animate-in fade-in duration-500 delay-1000">
                🔄 Anda akan diarahkan ke halaman hasil secara otomatis
              </p>
            </div>
          </FloatingCard>
        </div>
      </div>
    )
  }

  const q = questions[currentQuestion]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animated-bg">
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md pointer-events-none" />
      <div className="relative z-10 w-full max-w-4xl pointer-events-auto">
        <FloatingCard className="bg-background/95 dark:bg-background/90 backdrop-blur-xl border border-border/50 shadow-2xl">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 pulse-glow shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-foreground">
                <GradientText>Assessment Karier</GradientText>
              </h2>
              <p className="text-muted-foreground text-base">
                Jawab pertanyaan berikut untuk mendapatkan rekomendasi karier yang akurat
              </p>
            </div>

            {/* Progress & Timer */}
            <div className="mb-8 space-y-4">
              {/* Question Progress */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">
                  Pertanyaan {currentQuestion + 1} dari {questions.length}
                </span>
                <div className={`flex items-center text-sm font-medium ${isTimeWarning ? 'text-red-500' : 'text-muted-foreground'}`}>
                  <Clock className="w-4 h-4 mr-2" />
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                </div>
              </div>
              <Progress value={progress} className="h-3" />
              
              {/* Time Progress */}
              {isTimeWarning && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-red-500 font-medium">⚠️ Waktu hampir habis!</span>
                    <span className="text-red-500">{Math.floor(timeProgress)}% tersisa</span>
                  </div>
                  <Progress value={timeProgress} className="h-2" />
                </div>
              )}
            </div>

            {/* Question */}
            <div className="mb-8 space-y-6">
              {/* Category Tag */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20">
                <span className="text-sm font-medium text-primary">{q.category}</span>
              </div>
              
              {/* Question Text */}
              <div className="bg-muted/30 dark:bg-muted/20 rounded-xl p-6 border border-border/50">
                <h3 className="text-lg font-semibold text-foreground leading-relaxed">{q.questionText}</h3>
              </div>
              
              {/* Answer Options */}
              <RadioGroup
                value={selectedAnswer !== null ? selectedAnswer.toString() : ""}
                onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
                className="space-y-3"
              >
                {q.options?.map((opt: string, i: number) => (
                  <div
                    key={i}
                    className={`flex items-start space-x-4 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:bg-muted/20 ${
                      selectedAnswer === i
                        ? 'border-primary bg-primary/5 dark:bg-primary/10'
                        : 'border-border/50 hover:border-border'
                    }`}
                  >
                    <RadioGroupItem 
                      value={i.toString()} 
                      id={`option-${i}`} 
                      className="mt-1"
                    />
                    <Label 
                      htmlFor={`option-${i}`} 
                      className="flex-1 cursor-pointer text-base leading-relaxed"
                    >
                      <span className="font-medium text-primary mr-2">
                        {["A", "B", "C", "D"][i]}.
                      </span>
                      {opt}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="border-border/50 hover:bg-muted/50"
              >
                Sebelumnya
              </Button>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{answers.filter(a => a !== undefined).length} dari {questions.length} terjawab</span>
              </div>

              <Button 
                onClick={handleNext} 
                disabled={selectedAnswer === null || submitting} 
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg pulse-glow btn-hover-lift relative z-20"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Mengirim...
                  </>
                ) : currentQuestion === questions.length - 1 ? (
                  <>
                    Selesai
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Selanjutnya
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </FloatingCard>
      </div>
    </div>
  )
}