"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Brain, Clock, CheckCircle } from "lucide-react"

interface SkillAssessmentModalProps {
  isOpen: boolean
  onComplete: (results: any) => void
}

const questions = [
  {
    id: 1,
    category: "Logical Thinking",
    question: "Jika semua A adalah B, dan semua B adalah C, maka:",
    options: ["Semua A adalah C", "Semua C adalah A", "Beberapa A adalah C", "Tidak ada hubungan antara A dan C"],
    correct: 0,
  },
  {
    id: 2,
    category: "Problem Solving",
    question: "Anda menghadapi masalah kompleks di tempat kerja. Langkah pertama yang Anda lakukan:",
    options: [
      "Langsung mencari solusi cepat",
      "Menganalisis akar masalah terlebih dahulu",
      "Meminta bantuan atasan",
      "Menunda hingga ada instruksi jelas",
    ],
    correct: 1,
  },
  {
    id: 3,
    category: "Communication",
    question: "Dalam presentasi, hal terpenting adalah:",
    options: [
      "Menggunakan bahasa teknis yang kompleks",
      "Menyampaikan pesan dengan jelas dan mudah dipahami",
      "Menampilkan sebanyak mungkin data",
      "Berbicara dengan cepat agar efisien",
    ],
    correct: 1,
  },
  {
    id: 4,
    category: "Leadership",
    question: "Ketika memimpin tim, Anda lebih fokus pada:",
    options: [
      "Mengontrol setiap detail pekerjaan",
      "Memberikan arahan jelas dan mendukung tim",
      "Membiarkan tim bekerja sendiri",
      "Menyelesaikan semua tugas penting sendiri",
    ],
    correct: 1,
  },
  {
    id: 5,
    category: "Adaptability",
    question: "Menghadapi perubahan teknologi baru di tempat kerja:",
    options: [
      "Menolak karena sudah nyaman dengan yang lama",
      "Belajar secara bertahap sambil tetap produktif",
      "Langsung menguasai semua fitur baru",
      "Menunggu orang lain belajar dulu",
    ],
    correct: 1,
  },
]

export function SkillAssessmentModal({ isOpen, onComplete }: SkillAssessmentModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [isCompleted, setIsCompleted] = useState(false)

  if (!isOpen) return null

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)
      setSelectedAnswer(null)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // Calculate results
        const results = calculateResults(newAnswers)
        setIsCompleted(true)
        setTimeout(() => {
          onComplete(results)
        }, 2000)
      }
    }
  }

  const calculateResults = (userAnswers: number[]) => {
    let correctCount = 0
    const categoryScores: { [key: string]: { correct: number; total: number } } = {}

    questions.forEach((question, index) => {
      const isCorrect = userAnswers[index] === question.correct
      if (isCorrect) correctCount++

      if (!categoryScores[question.category]) {
        categoryScores[question.category] = { correct: 0, total: 0 }
      }
      categoryScores[question.category].total++
      if (isCorrect) categoryScores[question.category].correct++
    })

    const overallScore = Math.round((correctCount / questions.length) * 100)

    return {
      overallScore,
      correctAnswers: correctCount,
      totalQuestions: questions.length,
      categoryScores,
      recommendations: generateRecommendations(overallScore, categoryScores),
    }
  }

  const generateRecommendations = (score: number, categories: any) => {
    const recommendations = []

    if (score >= 80) {
      recommendations.push("Data Scientist", "Software Engineer", "Product Manager")
    } else if (score >= 60) {
      recommendations.push("Business Analyst", "UI/UX Designer", "Digital Marketing")
    } else {
      recommendations.push("Customer Service", "Content Creator", "Sales Representative")
    }

    return recommendations
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (isCompleted) {
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
            <p className="text-muted-foreground mb-4">Hasil tes Anda sedang diproses...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </FloatingCard>
        </div>
      </div>
    )
  }

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
              <GradientText>Tes Kemampuan</GradientText>
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
              <span className="text-sm text-primary font-medium">{questions[currentQuestion].category}</span>
            </div>
            <h3 className="text-lg font-semibold mb-6">{questions[currentQuestion].question}</h3>

            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/20 transition-colors"
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Navigation */}
          <div className="flex justify-end">
            <Button onClick={handleNext} disabled={selectedAnswer === null} className="pulse-glow">
              {currentQuestion === questions.length - 1 ? "Selesai" : "Selanjutnya"}
            </Button>
          </div>
        </FloatingCard>
      </div>
    </div>
  )
}
