"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, Brain, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AssessmentWorkPage() {
  const [questions, setQuestions] = useState<any[]>([])
  const [assessmentId, setAssessmentId] = useState<string>("")
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const router = useRouter()
  const [processingResult, setProcessingResult] = useState(false)

  // Ambil soal dari backend (GET)
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      const res = await fetch("/api/Assesment/Question", { method: "GET" })
      if (res.ok) {
        const data = await res.json()
        setQuestions(data.questions)
        if (data.assessmentId) setAssessmentId(data.assessmentId)
      }
      setLoading(false)
    }
    fetchQuestions()
  }, [])

  // Timer
  useEffect(() => {
    if (!loading && !isCompleted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [loading, isCompleted, timeLeft])

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
          setProcessingResult(true)
          // Generate hasil assessment (result) otomatis dan tunggu selesai
          const resultRes = await fetch("/api/Assesment/Result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ assessmentAnswerId: answerId })
          })
          setProcessingResult(false)
          if (resultRes.ok) {
            // Redirect ke halaman hasil assessment
            router.push("/profile/Assessment/Results")
          }
        }
      }
    } catch (err) {
      setProcessingResult(false)
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

  const progress = questions.length ? ((currentQuestion + 1) / questions.length) * 100 : 0

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative w-full max-w-md">
          <FloatingCard className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              <GradientText>Memuat Soal Assessment...</GradientText>
            </h2>
            <p className="text-muted-foreground mb-4">
              Mohon tunggu, soal assessment sedang dimuat.
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </FloatingCard>
        </div>
      </div>
    )
  }

  if (!questions.length) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative w-full max-w-md">
          <FloatingCard className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-accent rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              <GradientText>Soal Tidak Tersedia</GradientText>
            </h2>
            <p className="text-muted-foreground mb-4">
              Tidak ada soal assessment yang bisa ditampilkan saat ini.
            </p>
          </FloatingCard>
        </div>
      </div>
    )
  }

  if (isCompleted || processingResult) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative w-full max-w-md">
          <FloatingCard className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              <GradientText>Tes Selesai!</GradientText>
            </h2>
            <p className="text-muted-foreground mb-4">
              {processingResult
                ? "Hasil tes Anda sedang diproses..."
                : "Hasil tes Anda sedang diproses..."}
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </FloatingCard>
        </div>
      </div>
    )
  }

  const q = questions[currentQuestion]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl">
        <FloatingCard>
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              <GradientText>Assessment Karier</GradientText>
            </h2>
            <p className="text-muted-foreground">
              Jawab pertanyaan berikut untuk mendapatkan rekomendasi karier yang akurat
            </p>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Pertanyaan {currentQuestion + 1} dari {questions.length}
              </span>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <div className="mb-8">
            <div className="mb-4">
              <span className="text-sm text-primary font-medium">{q.category}</span>
            </div>
            <h3 className="text-lg font-semibold mb-6">{q.questionText}</h3>
            <RadioGroup
              value={selectedAnswer !== null ? selectedAnswer.toString() : ""}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
            >
              {q.options?.map((opt: string, i: number) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/20 transition-colors"
                >
                  <RadioGroupItem value={i.toString()} id={`option-${i}`} />
                  <Label htmlFor={`option-${i}`} className="flex-1 cursor-pointer">
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Navigation */}
          <div className="flex justify-end">
            <Button onClick={handleNext} disabled={selectedAnswer === null || submitting} className="pulse-glow">
              {currentQuestion === questions.length - 1 ? "Selesai" : "Selanjutnya"}
            </Button>
          </div>
        </FloatingCard>
      </div>
    </div>
  )
}