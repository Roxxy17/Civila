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
import { Brain, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import AssessmentWorkPage from "../Assessment/Work/page"
import AssessmentResultsPage from "../Assessment/Results/page"
import GenerateAssessmentPage from "../Assessment/Generate/page"

const careerCategories = [
  "Tecnologia & IT",
  "Design & Kreatif",
  "Bisnis & Manajemen",
  "Marketing & Sales",
  "Keuangan & Akuntansi",
  "Kesehatan & Medis",
  "Pendidikan & Pelatihan",
  "Teknik & Engineering",
  "Lainnya",
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
    uploadedCV: "", // berisi isi CV
  })
  const [extractingPdf, setExtractingPdf] = useState(false)
  const [showGenerate, setShowGenerate] = useState(false)
  const [showAssessment, setShowAssessment] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [latestResultId, setLatestResultId] = useState<string | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [pdfReady, setPdfReady] = useState(false)
  const router = useRouter()

  // Ambil profile dari backend dan isi form
  useEffect(() => {
    if (session?.user?.name) {
      setFormData((prev) => ({ ...prev, name: session.user.name }))
    }
    fetchProfile()
    // eslint-disable-next-line
  }, [session])

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
    setExtractingPdf(true) // mulai loading ekstraksi
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
      setExtractingPdf(false) // selesai ekstraksi
    }
    reader.readAsArrayBuffer(file)
  }

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  // Simpan profile ke backend (POST jika belum ada, PUT jika sudah ada)
  const handleSave = async () => {
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

    if (res.ok) {
      setShowGenerate(true) // Tampilkan modal generate assessment
      fetchProfile()
    } else {
      alert("Gagal menyimpan profile")
    }
  }

  // Handler setelah generate assessment selesai
  const handleGenerateComplete = () => {
    setShowGenerate(false)
    setShowAssessment(true)
  }

  // Handler setelah assessment selesai
  const handleAssessmentComplete = async (answerId: string) => {
    // Proses result di backend
    const resultRes = await fetch("/api/Assesment/Result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assessmentAnswerId: answerId })
    })
    if (resultRes.ok) {
      setShowAssessment(false)
      setShowResult(true)
      // Optionally, simpan id result terbaru jika ingin menampilkan langsung
      // const data = await resultRes.json()
      // setLatestResultId(data.results[data.results.length - 1]?._id)
    }
  }

  // Handler tutup modal result
  const handleCloseResult = () => setShowResult(false)

  // Step 1: Informasi Dasar
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          Informasi <GradientText>Dasar</GradientText>
        </h2>
        <p className="text-muted-foreground">Ceritakan tentang diri Anda</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input
            id="name"
            value={formData.name}
            readOnly
            className="bg-muted cursor-not-allowed"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Umur</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
            placeholder="Masukkan umur"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="background">Latar Belakang</Label>
          <Textarea
            id="background"
            value={formData.background}
            onChange={(e) => handleInputChange("background", e.target.value)}
            placeholder="Contoh: Fresh graduate IT, pengalaman magang, dll"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="targetCareer">Minat Kerja</Label>
          <Select
            value={formData.targetCareer}
            onValueChange={(value) => handleInputChange("targetCareer", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih bidang yang diminati" />
            </SelectTrigger>
            <SelectContent>
              {careerCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="interests">Minat Lain</Label>
          <Input
            id="interests"
            value={formData.interests}
            onChange={(e) => handleInputChange("interests", e.target.value)}
            placeholder="Contoh: AI, Web, Finance (pisahkan dengan koma)"
          />
        </div>
      </div>
    </div>
  )

  // Step 2: Keahlian & CV
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          <GradientText>Keahlian</GradientText> & CV
        </h2>
        <p className="text-muted-foreground">Bagikan keahlian dan pengalaman Anda</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentSkills">Keahlian</Label>
          <Textarea
            id="currentSkills"
            value={formData.currentSkills}
            onChange={(e) => handleInputChange("currentSkills", e.target.value)}
            placeholder="Sebutkan keahlian yang Anda miliki (pisahkan dengan koma)"
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cv">Upload CV (PDF)</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <input
              id="cv"
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="block"
              disabled={!pdfReady || extractingPdf}
            />
            {!pdfReady && (
              <div className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                <span>Menyiapkan library PDF...</span>
                <span className="animate-spin">⏳</span>
              </div>
            )}
            {extractingPdf && (
              <div className="text-xs text-blue-500 mt-2 flex items-center gap-2">
                <span>Mengekstrak isi CV PDF...</span>
                <span className="animate-spin">⏳</span>
              </div>
            )}
            {formData.uploadedCV && (
              <div className="mt-2 p-2 bg-muted rounded text-xs max-h-40 overflow-auto">
                <strong>Isi CV:</strong>
                <pre>{formData.uploadedCV.slice(0, 1000)}{formData.uploadedCV.length > 1000 ? "..." : ""}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  // Step 3: Konfirmasi
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          <GradientText>Konfirmasi</GradientText> Data
        </h2>
        <p className="text-muted-foreground">Pastikan informasi Anda sudah benar</p>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-muted/20 rounded-lg">
          <h3 className="font-semibold mb-2">Informasi Dasar</h3>
          <p>
            <strong>Nama:</strong> {formData.name}
          </p>
          <p>
            <strong>Umur:</strong> {formData.age} tahun
          </p>
          <p>
            <strong>Latar Belakang:</strong> {formData.background}
          </p>
          <p>
            <strong>Minat Kerja:</strong> {formData.targetCareer}
          </p>
          <p>
            <strong>Minat Lain:</strong> {formData.interests}
          </p>
        </div>
        <div className="p-4 bg-muted/20 rounded-lg">
          <h3 className="font-semibold mb-2">Keahlian</h3>
          <p>{formData.currentSkills || "Belum diisi"}</p>
        </div>
        <div className="p-4 bg-muted/20 rounded-lg">
          <h3 className="font-semibold mb-2">CV</h3>
          <p>{formData.cv ? formData.cv.name : (profile?.uploadedCV || "Tidak ada file")}</p>
        </div>
      </div>
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-blue-400 text-sm">
          <strong>Langkah Selanjutnya:</strong> Setelah menyimpan, Anda akan diminta mengikuti tes kemampuan untuk
          mendapatkan rekomendasi karier yang lebih akurat.
        </p>
      </div>
    </div>
  )

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
      {/* Generate Assessment Modal */}
      {showGenerate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <GenerateAssessmentPage
            onComplete={handleGenerateComplete}
          />
        </div>
      )}

      {/* Assessment Modal */}
      {showAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <AssessmentWorkPage
            onComplete={handleAssessmentComplete}
            isOpen={showAssessment}
          />
        </div>
      )}

      {/* Result Modal */}
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <AssessmentResultsPage
            showLatest={true}
            onClose={handleCloseResult}
          />
        </div>
      )}

      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="relative z-20 p-6 border-b border-border">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Career Mapper</span>
            </div>
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Kembali ke Dashboard
            </Button>
          </div>
        </nav>

        {/* Profile Setup Content */}
        <div className="relative z-10 px-6 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep
                        ? "bg-gradient-to-br from-primary to-accent text-white"
                        : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                    </div>
                    {step < 3 && (
                      <div className={`w-12 h-0.5 mx-2 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <p className="text-muted-foreground">Langkah {currentStep} dari 3</p>
              </div>
            </div>

            <FloatingCard>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Button>

                {currentStep < 3 ? (
                  <Button onClick={handleNext} className="pulse-glow">
                    Selanjutnya
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSave} className="pulse-glow">
                    Simpan & Lanjut Tes
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>

    </AuthGuard>
  )
}
