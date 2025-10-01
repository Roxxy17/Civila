"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { FloatingCard } from "@/components/floating-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { BookOpen, User, Phone, Mail, Calendar, Target } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"


export default function EditProfilePage() {
  // 🔹 Progress dummy
  const [progressData] = useState({
    learningPaths: [
      { name: "Frontend Development", progress: 75, modules: 8, totalModules: 12 },
      { name: "Data Science", progress: 45, modules: 6, totalModules: 15 },
      { name: "UI/UX Design", progress: 30, modules: 3, totalModules: 10 },
    ],
  })

  // 🔹 Form data
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    workInterest: "", // 🔥 tambahan interest
  })

  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  // 🔹 Load user dari localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData({
        fullName: parsedUser.fullName || "",
        dob: parsedUser.dob || "",
        gender: parsedUser.gender || "",
        mobile: parsedUser.mobile || "",
        email: parsedUser.email || "",
        workInterest: parsedUser.workInterest || "",
      })
    }
  }, [])

  // 🔹 Handler input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("user", JSON.stringify({ ...user, ...formData, hasProfile: true }))
    router.push("/profile/results")
  }

  return (
    <AuthGuard>
      <div className="p-5 gap-5 flex h-screen w-screen scrollbar-none overflow-hidden">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggleExpanded={() => setIsSidebarExpanded((prev) => !prev)}
        />

        <div className="flex flex-col w-full h-full relative">
          <div className="flex-1 h-full overflow-auto px-5">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8 mb-5">

                {/* FORM EDIT PROFILE */}
                <form
                  onSubmit={handleSubmit}
                  className="bg-background backdrop-blur-xl border-r border-white/30 rounded-3xl shadow-[0_8px_10px_0_rgba(31,38,135,0.37)] p-6 space-y-8"
                >
                  <h2 className="text-2xl font-bold">Edit Profil</h2>

                  {/* Personal Info */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Personal Information</h3>

                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-1.5 flex items-center justify-center w-10 h-10 rounded-full bg-background">
                          <User className="w-5 h-5 text-secondary" />
                        </div>
                        <Input
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="pl-14"
                          required
                        />
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date of Birth</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-1.5 flex items-center justify-center w-10 h-10 rounded-full bg-background">
                          <Calendar className="w-5 h-5 text-secondary" />
                        </div>
                        <Input
                          name="dob"
                          type="date"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className="pl-14"
                          required
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border bg-background py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Contact Information</h3>

                    {/* Mobile */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mobile</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-1.5 flex items-center justify-center w-10 h-10 rounded-full bg-background">
                          <Phone className="w-5 h-5 text-secondary" />
                        </div>
                        <Input
                          name="mobile"
                          type="text"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="pl-14"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-1.5 flex items-center justify-center w-10 h-10 rounded-full bg-background">
                          <Mail className="w-5 h-5 text-secondary" />
                        </div>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-14"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Career Detail */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Career Detail
                    </h3>

                    {/* Work Interest */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Work Interest</label>
                      <div className="relative flex items-center">
                        {/* Icon kiri */}
                        <div className="absolute left-1.5 flex items-center justify-center w-10 h-10 rounded-full bg-background">
                          <Target className="w-5 h-5 text-secondary" />
                        </div>

                        {/* Select pakai shadcn-ui */}
                        <Select
                          value={formData.workInterest}
                          onValueChange={(val) =>
                            setFormData((prev) => ({ ...prev, workInterest: val }))
                          }
                          required
                        >
                          <SelectTrigger
                            className="pl-14 pr-4 h-13 w-full min-w-0 rounded-full border bg-transparent text-base shadow-xs outline-none 
        dark:bg-input/30 md:text-lg focus:ring-2 focus:ring-primary"
                          >
                            <SelectValue placeholder="Pilih bidang yang diminati" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">💻 Teknologi & IT</SelectItem>
                            <SelectItem value="design">🎨 Desain & Kreatif</SelectItem>
                            <SelectItem value="business">📊 Bisnis & Manajemen</SelectItem>
                            <SelectItem value="marketing">📢 Marketing & Sales</SelectItem>
                            <SelectItem value="finance">💰 Keuangan & Akuntansi</SelectItem>
                            <SelectItem value="healthcare">⚕️ Kesehatan & Medis</SelectItem>
                            <SelectItem value="education">📚 Pendidikan & Pelatihan</SelectItem>
                            <SelectItem value="engineering">⚙️ Teknik & Engineering</SelectItem>
                            <SelectItem value="other">✨ Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Pilih bidang kerja yang paling sesuai dengan passion atau rencana kariermu.
                      </p>
                    </div>
                  </div>
                  {/* Save */}
                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline">Cancel</Button>
                    <Button type="submit">Save</Button>
                  </div>
                </form>

                {/* PROFILE CARD */}
                <div
                  className="relative rounded-3xl overflow-hidden shadow-[0_8px_10px_0_rgba(31,38,135,0.37)] bg-background transition-all duration-500"
                  style={{ height: "100%" }}
                >
                  <div className="absolute top-0 left-0 w-full h-[45%]">
                    <img
                      src="/try1.png"
                      alt="Profile Background"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                  </div>

                  {/* Konten utama */}
                  <div className="relative z-10 p-6 mt-[100%]">
                    <h1 className="text-xl font-bold mb-4 text-foreground">
                      {formData.fullName || "Nama User"}
                    </h1>
                    <p className="font-normal text-sm mb-2 text-foreground">
                      {formData.email || "Email user"}
                    </p>
                    <p className="font-normal text-sm mb-4 text-muted-foreground">
                      Interest: {formData.workInterest || "Belum dipilih"}
                    </p>
                    <Button asChild className="w-full bg-transparent" variant="outline">
                      <Link href="/profile/results">
                        {user?.hasProfile ? "Lihat Profile" : "Lengkapi Profil"}
                      </Link>
                    </Button>

                    {/* Progress */}
                    <FloatingCard delay={0.5} className="mt-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold">Progress Learning Path</h3>
                      </div>
                      <div className="space-y-4">
                        {progressData.learningPaths.map((path, index) => (
                          <div key={index} className="p-4 rounded-lg border border-border bg-card/50">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{path.name}</h4>
                              <Badge variant="secondary">{path.progress}%</Badge>
                            </div>
                            <Progress value={path.progress} className="mb-2" />
                            <p className="text-sm text-muted-foreground">
                              {path.modules}/{path.totalModules} modul selesai
                            </p>
                          </div>
                        ))}
                      </div>
                    </FloatingCard>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
