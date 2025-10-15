"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Brain,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileText,
  User,
  Briefcase,
  Target,
  Sparkles,
  Clock,
  AlertCircle
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import AssessmentWorkPage from "../Assessment/Work/page"
import AssessmentResultsPage from "../Assessment/Results/page"
import GenerateAssessmentPage from "../Assessment/Generate/page"

const careerCategories = [
  "Teknologi & IT",
  "Design & Kreatif",
  "Bisnis & Manajemen",
  "Marketing & Sales",
  "Keuangan & Akuntansi",
  "Kesehatan & Medis",
  "Pendidikan & Pelatihan",
  "Teknik & Engineering",
  "Lainnya",
]

const stepConfig = [
  {
    title: "Informasi Dasar",
    description: "Ceritakan tentang diri Anda",
    icon: User,
    color: "from-primary to-accent"
  },
  {
    title: "Keahlian & CV",
    description: "Bagikan keahlian dan pengalaman",
    icon: Briefcase,
    color: "from-primary to-accent"
  },
  {
    title: "Konfirmasi",
    description: "Pastikan data sudah benar",
    icon: Target,
    color: "from-primary to-accent"
  }
]

export default function ProfileSetupPage() {
  const { data: session } = useSession()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    background: "",
    targetCareer: "",
    interests: "",
    currentSkills: "",
    uploadedCV: "",
  })
  const [extractingPdf, setExtractingPdf] = useState(false)
  const [showGenerate, setShowGenerate] = useState(false)
  const [showAssessment, setShowAssessment] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [latestResultId, setLatestResultId] = useState<string | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [pdfReady, setPdfReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (stepConfig.length - 1)) * 100

  // Fetch profile from DB on mount
  useEffect(() => {
    if (session?.user) {
      fetchProfile()
    }
    // eslint-disable-next-line
  }, [session?.user?.email])

  // Fetch profile and set formData if exists
  const fetchProfile = async () => {
    const res = await fetch("/api/Profile", { method: "GET" })
    if (res.ok) {
      const data = await res.json()
      setProfile(data)
      setFormData({
        name: session?.user?.name || "",
        age: data.age || "",
        background: data.background || "",
        targetCareer: data.targetCareer || "",
        interests: (data.interests || []).join(", "),
        currentSkills: (data.currentSkills || []).join(", "),
        uploadedCV: data.uploadedCV || "",
      })
    } else {
      // Data belum ada, kosongkan form
      setFormData({
        name: session?.user?.name || "",
        age: "",
        background: "",
        targetCareer: "",
        interests: "",
        currentSkills: "",
        uploadedCV: "",
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!pdfReady) {
      alert("PDF library belum siap. Silakan tunggu beberapa detik lalu coba lagi.")
      return
    }
    const file = e.target.files?.[0]
    if (!file) return
    setExtractingPdf(true)

    try {
      const pdfjsLib = (window as any).pdfjsLib
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
      const reader = new FileReader()
      reader.onload = async (ev) => {
        const typedarray = new Uint8Array(ev.target!.result as ArrayBuffer)
        const pdf = await pdfjsLib.getDocument(typedarray).promise
        let text = ""
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()
          text += content.items.map((item: any) => item.str).join(" ") + "\n"
        }
        setFormData((prev) => ({ ...prev, uploadedCV: text }))
        setExtractingPdf(false)
      }
      reader.readAsArrayBuffer(file)
    } catch (error) {
      setExtractingPdf(false)
      alert("Gagal mengekstrak CV. Pastikan file PDF valid.")
    }
  }

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSave = async () => {
    setIsLoading(true)
    const payload: any = {
      age: formData.age,
      background: formData.background,
      targetCareer: formData.targetCareer,
      interests: formData.interests.split(",").map(s => s.trim()).filter(Boolean),
      currentSkills: formData.currentSkills.split(",").map(s => s.trim()).filter(Boolean),
      uploadedCV: formData.uploadedCV,
    }

    const method = profile ? "PUT" : "POST"
    const res = await fetch("/api/Profile", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    setIsLoading(false)
    if (res.ok) {
      setShowGenerate(true)
      fetchProfile()
    } else {
      alert("Gagal menyimpan profile")
    }
  }

  const handleGenerateComplete = () => {
    setShowGenerate(false)
    setShowAssessment(true)
  }

  const handleAssessmentComplete = async (answerId: string) => {
    const resultRes = await fetch("/api/Assesment/Result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assessmentAnswerId: answerId })
    })
    if (resultRes.ok) {
      setShowAssessment(false)
      setShowResult(true)
    }
  }

  const handleCloseResult = () => setShowResult(false)

  // Enhanced Step 1: Personal Information
  const renderStep1 = () => (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          Informasi <GradientText>Pribadi</GradientText>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Mari berkenalan! Ceritakan tentang diri Anda untuk membantu kami memberikan rekomendasi yang tepat.
        </p>
      </div>

      <div className="grid gap-6">
        <FloatingCard delay={0.2}>
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-base font-medium flex items-center gap-2 text-foreground">
                <User className="w-4 h-4" />
                Nama Lengkap
              </Label>
              <Input
                id="name"
                value={formData.name}
                readOnly
                className="bg-muted/50 cursor-not-allowed h-12 text-base"
              />
              <p className="text-xs text-muted-foreground">Nama diambil dari akun Anda</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="age" className="text-base font-medium flex items-center gap-2 text-foreground">
                <Clock className="w-4 h-4" />
                Umur
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                placeholder="Contoh: 22"
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="background" className="text-base font-medium flex items-center gap-2 text-foreground">
                <FileText className="w-4 h-4" />
                Latar Belakang Pendidikan/Pengalaman
              </Label>
              <Textarea
                id="background"
                value={formData.background}
                onChange={(e) => handleInputChange("background", e.target.value)}
                placeholder="Contoh: Fresh graduate Teknik Informatika, pernah magang di startup teknologi selama 6 bulan..."
                rows={4}
                className="resize-none text-base bg-background/50 backdrop-blur-sm border-border/50"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="targetCareer" className="text-base font-medium flex items-center gap-2 text-foreground">
                <Target className="w-4 h-4" />
                Bidang Karier yang Diminati
              </Label>
              <Select
                value={formData.targetCareer}
                onValueChange={(value) => handleInputChange("targetCareer", value)}
              >
                <SelectTrigger className="h-12 text-base bg-background/50 backdrop-blur-sm border-border/50">
                  <SelectValue placeholder="Pilih bidang yang paling Anda minati" />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-sm border-border/50 text-black">
                  {careerCategories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-base py-3 hover:bg-muted/50">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="interests" className="text-base font-normal flex items-center gap-2 text-foreground">
                <Sparkles className="w-4 h-4" />
                Minat & Hobi Lainnya
              </Label>
              <Input
                id="interests"
                value={formData.interests}
                onChange={(e) => handleInputChange("interests", e.target.value)}
                placeholder="Contoh: Machine Learning, Web Development, Photography, Gaming"
                className="h-12 text-base"
              />
              <p className="text-xs text-muted-foreground">Pisahkan dengan koma untuk multiple minat</p>
            </div>
          </div>
        </FloatingCard>
      </div>
    </div>
  )

  // Enhanced Step 2: Skills & CV
  const renderStep2 = () => (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-4">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          <GradientText>Keahlian</GradientText> & Pengalaman
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Bagikan keahlian dan pengalaman Anda untuk analisis yang lebih mendalam.
        </p>
      </div>

      <div className="grid gap-6">
        <FloatingCard delay={0.2}>
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <Label htmlFor="currentSkills" className="text-base font-medium flex items-center gap-2 text-foreground">
                <Briefcase className="w-4 h-4" />
                Keahlian & Kompetensi
              </Label>
              <Textarea
                id="currentSkills"
                value={formData.currentSkills}
                onChange={(e) => handleInputChange("currentSkills", e.target.value)}
                placeholder="Contoh: JavaScript, Python, React.js, Node.js, MySQL, Figma, Adobe Photoshop, Project Management"
                rows={5}
                className="resize-none text-base bg-background/50 backdrop-blur-sm border-border/50"
              />
              <p className="text-xs text-muted-foreground">
                Sebutkan semua keahlian teknis dan soft skills yang Anda miliki
              </p>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard delay={0.4}>
          <div className="p-6">
            <div className="space-y-4">
              <Label className="text-base font-medium flex items-center gap-2 text-foreground">
                <Upload className="w-4 h-4" />
                Upload CV (PDF)
              </Label>

              <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center bg-gradient-to-br from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all duration-300">
                <div className="space-y-4">
                  {!pdfReady ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary animate-spin" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-primary">Menyiapkan PDF Reader...</p>
                        <p className="text-xs text-muted-foreground">Mohon tunggu sebentar</p>
                      </div>
                    </div>
                  ) : extractingPdf ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary animate-pulse" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-primary">Mengekstrak CV...</p>
                        <p className="text-xs text-muted-foreground">Sedang memproses file PDF Anda</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-foreground">Drag & drop atau klik untuk upload</p>
                        <p className="text-sm text-muted-foreground">Format PDF, maksimal 10MB</p>
                      </div>
                    </div>
                  )}

                  <input
                    id="cv"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={!pdfReady || extractingPdf}
                  />

                  {!extractingPdf && pdfReady && (
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('cv')?.click()}
                      className="mt-4"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Pilih File CV
                    </Button>
                  )}
                </div>

                {formData.uploadedCV && (
                  <div className="mt-6 p-4 border border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/20 rounded-lg">
                    <div className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4" />
                      CV Berhasil Diupload
                    </div>
                    <div className="bg-background/80 rounded-lg p-3 max-h-32 overflow-auto text-xs font-mono text-foreground">
                      {formData.uploadedCV.slice(0, 500)}
                      {formData.uploadedCV.length > 500 && "..."}
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                      {formData.uploadedCV.split(' ').length} kata berhasil diekstrak
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </FloatingCard>
      </div>
    </div>
  )

  // Enhanced Step 3: Confirmation
  const renderStep3 = () => (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          <GradientText>Konfirmasi</GradientText> Data
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Pastikan semua informasi sudah benar sebelum melanjutkan ke assessment.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Personal Information Summary */}
        <FloatingCard delay={0.2}>
          <div className="p-6">
            <div className="flex items-center gap-2 text-lg font-semibold mb-4 text-foreground">
              <User className="w-5 h-5 text-primary" />
              Informasi Pribadi
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nama</p>
                  <p className="font-medium text-foreground">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Umur</p>
                  <p className="font-medium text-foreground">{formData.age} tahun</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Latar Belakang</p>
                <p className="text-sm leading-relaxed text-foreground">{formData.background || "Belum diisi"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Minat Karier</p>
                <Badge variant="secondary" className="mt-1">{formData.targetCareer}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Minat Lainnya</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.interests.split(',').map((interest, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {interest.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FloatingCard>

        {/* Skills Summary */}
        <FloatingCard delay={0.4}>
          <div className="p-6">
            <div className="flex items-center gap-2 text-lg font-semibold mb-4 text-foreground">
              <Briefcase className="w-5 h-5 text-primary" />
              Keahlian & Pengalaman
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Keahlian</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.currentSkills.split(',').map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">CV</p>
                <div className="flex items-center gap-2 mt-1">
                  <FileText className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-foreground">
                    {formData.uploadedCV ?
                      `CV berhasil diupload (${formData.uploadedCV.split(' ').length} kata)` :
                      "Tidak ada CV yang diupload"
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FloatingCard>

        {/* Next Steps Info */}
        <FloatingCard delay={0.6}>
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Langkah Selanjutnya</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Setelah menyimpan data, Anda akan mengikuti assessment komprehensif untuk mendapatkan
                  rekomendasi karier yang personal dan akurat berdasarkan profil Anda.
                </p>
                <div className="flex items-center gap-2 text-xs text-primary mt-3">
                  <Clock className="w-3 h-3" />
                  <span>Estimasi waktu: 10-15 menit</span>
                </div>
              </div>
            </div>
          </div>
        </FloatingCard>
      </div>
    </div>
  )

  // PDF.js setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.getElementById("pdfjs-script")) {
        const script = document.createElement("script")
        script.id = "pdfjs-script"
        script.src = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js"
        script.onload = () => setPdfReady(true)
        script.onerror = () => alert("Gagal memuat library PDF. Coba refresh halaman atau ganti jaringan.")
        document.body.appendChild(script)
      } else {
        const interval = setInterval(() => {
          if ((window as any).pdfjsLib) {
            setPdfReady(true)
            clearInterval(interval)
          }
        }, 200)
      }
    }
  }, [])


  return (
    <AuthGuard>
      {/* Modals */}
      {showGenerate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <GenerateAssessmentPage onComplete={handleGenerateComplete} />
        </div>
      )}

      {showAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <AssessmentWorkPage onComplete={handleAssessmentComplete} isOpen={showAssessment} />
        </div>
      )}

      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <AssessmentResultsPage showLatest={true} onClose={handleCloseResult} />
        </div>
      )}

        {/* Simplified background with better theme support */}
    <div className="min-h-screen bg-background animated-bg page-transition">
      {/* Enhanced Navigation */}
      <nav className="relative z-20 border-b border-border/50 backdrop-blur-sm bg-background/95">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg pulse-glow">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">
                  <GradientText>Career Mapper</GradientText>
                </span>
                <p className="text-xs text-muted-foreground">Profile Setup</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => router.push("/dashboard")} className="shadow-sm btn-hover-lift">
              Kembali ke Dashboard
            </Button>
          </div>
        </div>
      </nav>

        {/* Enhanced Content */}
        <div className="relative z-10 px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Enhanced Progress Indicator */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-4">
                  {stepConfig.map((step, index) => {
                    const stepNumber = index + 1
                    const isActive = stepNumber === currentStep
                    const isCompleted = stepNumber < currentStep
                    const IconComponent = step.icon

                    return (
                      <div key={stepNumber} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${isCompleted
                                ? `bg-gradient-to-br ${step.color} text-white shadow-lg`
                                : isActive
                                  ? `bg-gradient-to-br ${step.color} text-white shadow-lg scale-110 pulse-glow`
                                  : "bg-muted text-muted-foreground"
                              }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <IconComponent className="w-6 h-6" />
                            )}
                          </div>
                          <div className="text-center mt-2">
                            <p className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                              {step.title}
                            </p>
                            <p className="text-xs text-muted-foreground hidden sm:block">
                              {step.description}
                            </p>
                          </div>
                        </div>
                        {index < stepConfig.length - 1 && (
                          <div className={`w-16 h-1 mx-4 rounded-full transition-all duration-500 ${stepNumber < currentStep ? `bg-gradient-to-r ${step.color}` : "bg-muted"
                            }`} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>

            {/* Step Content */}
            <div className="mb-8">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
            </div>

            {/* Enhanced Navigation Buttons */}
            <FloatingCard delay={0.8}>
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="px-6 py-3 h-auto btn-hover-lift"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      onClick={handleNext}
                      className="px-6 py-3 h-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg pulse-glow btn-hover-lift"
                    >
                      Selanjutnya
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="px-6 py-3 h-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg pulse-glow btn-hover-lift"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Simpan & Mulai Assessment
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}