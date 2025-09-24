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
import { Brain, Upload, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { SkillAssessmentModal } from "@/components/skill-assessment-modal"

export default function ProfileSetupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    workInterest: "",
    skills: "",
    cv: null as File | null,
  })
  const [showAssessment, setShowAssessment] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      if (parsedUser.name) {
        setFormData((prev) => ({ ...prev, name: parsedUser.name }))
      }
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, cv: file }))
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    // Save profile data
    const updatedUser = {
      ...user,
      ...formData,
      hasProfile: true,
    }
    localStorage.setItem("user", JSON.stringify(updatedUser))

    // Show skill assessment
    setShowAssessment(true)
  }

  const handleAssessmentComplete = (results: any) => {
    // Save assessment results
    const userData = JSON.parse(localStorage.getItem("user") || "{}")
    const updatedUser = {
      ...userData,
      assessmentResults: results,
      hasCompletedAssessment: true,
    }
    localStorage.setItem("user", JSON.stringify(updatedUser))

    setShowAssessment(false)
    router.push("/profile/results")
  }

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
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Masukkan nama lengkap"
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
          <Label htmlFor="workInterest">Minat Kerja</Label>
          <Select onValueChange={(value) => handleInputChange("workInterest", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih bidang yang diminati" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Teknologi & IT</SelectItem>
              <SelectItem value="design">Desain & Kreatif</SelectItem>
              <SelectItem value="business">Bisnis & Manajemen</SelectItem>
              <SelectItem value="marketing">Marketing & Sales</SelectItem>
              <SelectItem value="finance">Keuangan & Akuntansi</SelectItem>
              <SelectItem value="healthcare">Kesehatan & Medis</SelectItem>
              <SelectItem value="education">Pendidikan & Pelatihan</SelectItem>
              <SelectItem value="engineering">Teknik & Engineering</SelectItem>
              <SelectItem value="other">Lainnya</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

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
          <Label htmlFor="skills">Keahlian</Label>
          <Textarea
            id="skills"
            value={formData.skills}
            onChange={(e) => handleInputChange("skills", e.target.value)}
            placeholder="Sebutkan keahlian yang Anda miliki (contoh: JavaScript, Photoshop, Public Speaking, dll)"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cv">Upload CV (Opsional)</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <input id="cv" type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
            <label htmlFor="cv" className="cursor-pointer">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">{formData.cv ? formData.cv.name : "Klik untuk upload CV"}</p>
              <p className="text-xs text-muted-foreground mt-1">Format: PDF, DOC, DOCX (Max 5MB)</p>
            </label>
          </div>
        </div>
      </div>
    </div>
  )

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
            <strong>Minat Kerja:</strong> {formData.workInterest}
          </p>
        </div>

        <div className="p-4 bg-muted/20 rounded-lg">
          <h3 className="font-semibold mb-2">Keahlian</h3>
          <p>{formData.skills || "Belum diisi"}</p>
        </div>

        <div className="p-4 bg-muted/20 rounded-lg">
          <h3 className="font-semibold mb-2">CV</h3>
          <p>{formData.cv ? formData.cv.name : "Tidak ada file"}</p>
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

  return (
    <AuthGuard>
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
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= currentStep
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

      <SkillAssessmentModal isOpen={showAssessment} onComplete={handleAssessmentComplete} />
    </AuthGuard>
  )
}
