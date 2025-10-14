"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Mail, Phone, Linkedin, Twitter, Instagram, ExternalLink, 
  Code, Rocket, Zap, Eye, Heart, Download, Users, Target,
  GraduationCap, Trophy, Paintbrush, Monitor, Video, BookOpen,
  BarChart, TrendingUp, ShoppingBag, FolderOpen, Github,
  Globe, MapPin, Calendar, Award, User
} from "lucide-react"

// Template Components
const MinimalTemplate = ({ data, customization }: any) => (
  <div className={`min-h-screen p-8 ${customization.bgColor || 'bg-gradient-to-br from-slate-50 to-white'}`}>
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Profile Section */}
      <div className="text-center space-y-4">
        <div className={`w-32 h-32 mx-auto rounded-full ${customization.accentColor || 'bg-indigo-500'} flex items-center justify-center text-white text-4xl font-bold shadow-2xl`}>
          {data.profile.name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">{data.profile.name}</h1>
          <p className="text-xl text-slate-600 mb-4">{data.profile.title}</p>
          <p className="text-slate-500 leading-relaxed max-w-lg mx-auto">{data.profile.bio}</p>
          
          {/* Location & Availability */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            {data.profile.location && (
              <div className="flex items-center gap-1 text-slate-500">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{data.profile.location}</span>
              </div>
            )}
            {data.profile.availability && (
              <div className="flex items-center gap-1 text-emerald-500">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{data.profile.availability}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Links */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-indigo-300 group">
          <a href={`mailto:${data.profile.email}`} className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
              <Mail className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">Send Email</h3>
              <p className="text-slate-600">{data.profile.email}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          </a>
        </Card>
        
        <Card className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-indigo-300 group">
          <a href={`tel:${data.profile.phone}`} className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
              <Phone className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">Call Me</h3>
              <p className="text-slate-600">{data.profile.phone}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
          </a>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-indigo-300 group">
          <a href={`https://linkedin.com/in/${data.profile.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Linkedin className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">LinkedIn</h3>
              <p className="text-slate-600">@{data.profile.social.linkedin}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </a>
        </Card>

        {/* Additional Social Links */}
        {data.profile.social.twitter && (
          <Card className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-indigo-300 group">
            <a href={`https://twitter.com/${data.profile.social.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                <Twitter className="w-6 h-6 text-sky-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">Twitter</h3>
                <p className="text-slate-600">@{data.profile.social.twitter}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors" />
            </a>
          </Card>
        )}

        {data.profile.social.github && (
          <Card className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-indigo-300 group">
            <a href={`https://github.com/${data.profile.social.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                <Github className="w-6 h-6 text-slate-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">GitHub</h3>
                <p className="text-slate-600">@{data.profile.social.github}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-500 transition-colors" />
            </a>
          </Card>
        )}

        {data.profile.website && (
          <Card className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-indigo-300 group">
            <a href={data.profile.website.startsWith('http') ? data.profile.website : `https://${data.profile.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">Website</h3>
                <p className="text-slate-600">{data.profile.website}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-500 transition-colors" />
            </a>
          </Card>
        )}
      </div>

      {/* Featured Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 text-center">Featured Work</h2>
          {data.projects.map((project: any) => (
            <Card key={project.id} className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-indigo-300 group">
              <a href={project.url || '#'} target="_blank" rel="noopener noreferrer" className="block">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                      {project.status && (
                        <Badge variant={project.status === 'Live' ? 'default' : 'secondary'} className="text-xs">
                          {project.status}
                        </Badge>
                      )}
                    </div>
                    <p className="text-slate-600 mb-3 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 4).map((tech: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">{tech}</Badge>
                      ))}
                      {project.technologies && project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">+{project.technologies.length - 4}</Badge>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors ml-4 flex-shrink-0" />
                </div>
                
                {/* Project Metrics */}
                {project.metrics && (
                  <div className="flex items-center gap-4 text-sm text-slate-500 pt-3 border-t border-slate-100">
                    {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-1">
                        {key === 'views' && <Eye className="w-3 h-3" />}
                        {key === 'likes' && <Heart className="w-3 h-3" />}
                        {key === 'downloads' && <Download className="w-3 h-3" />}
                        {key === 'users' && <Users className="w-3 h-3" />}
                        {key === 'stars' && <Trophy className="w-3 h-3" />}
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </a>
            </Card>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.profile.skills && data.profile.skills.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 text-center">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {data.profile.skills.map((skill: string, index: number) => (
              <Badge 
                key={index} 
                className={`${customization.accentColor?.replace('bg-', 'bg-') || 'bg-indigo-500'} text-white px-4 py-2 hover:scale-105 transition-all duration-200 shadow-md`}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {data.achievements && data.achievements.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 text-center">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.achievements.slice(0, 4).map((achievement: any, index: number) => (
              <Card key={index} className="p-4 border-2 border-slate-100 hover:border-indigo-200 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800">{achievement.name}</h4>
                    <p className="text-sm text-slate-600">{achievement.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center pt-8 border-t border-slate-200">
        <p className="text-slate-500 text-sm mb-4">
          Portfolio created with <span className="text-indigo-500 font-semibold">Civila</span>
        </p>
        <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 hover:scale-105 transition-all duration-200">
          <a href="/" target="_blank" rel="noopener noreferrer">
            Create Your Portfolio
          </a>
        </Button>
      </div>
    </div>
  </div>
)

const CreativeTemplate = ({ data, customization }: any) => (
  <div className={`min-h-screen ${customization.bgColor || 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500'}`}>
    <div className="container mx-auto px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Artistic Header */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl" />
          <div className="relative p-12 text-center text-white">
            <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-6xl font-bold border-4 border-white/30 shadow-2xl">
              {data.profile.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              {data.profile.name}
            </h1>
            <p className="text-2xl font-medium mb-6 text-white/90">{data.profile.title}</p>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">{data.profile.bio}</p>
          </div>
        </div>

        {/* Creative Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300">
            <a href={`mailto:${data.profile.email}`} className="block text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Email Me</h3>
                <p className="text-slate-600 text-sm">{data.profile.email}</p>
              </div>
            </a>
          </Card>

          <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300">
            <a href={`https://linkedin.com/in/${data.profile.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="block text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2">LinkedIn</h3>
                <p className="text-slate-600 text-sm">@{data.profile.social.linkedin}</p>
              </div>
            </a>
          </Card>

          <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300">
            <a href={`tel:${data.profile.phone}`} className="block text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Call Me</h3>
                <p className="text-slate-600 text-sm">{data.profile.phone}</p>
              </div>
            </a>
          </Card>

          {/* Additional social links in creative style */}
          {data.profile.social.github && (
            <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300">
              <a href={`https://github.com/${data.profile.social.github}`} target="_blank" rel="noopener noreferrer" className="block text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl flex items-center justify-center">
                  <Github className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">GitHub</h3>
                  <p className="text-slate-600 text-sm">@{data.profile.social.github}</p>
                </div>
              </a>
            </Card>
          )}

          {/* Projects */}
          {data.projects?.map((project: any) => (
            <Card key={project.id} className="md:col-span-2 lg:col-span-3 p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <a href={project.url || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-8">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{project.title}</h3>
                  <p className="text-slate-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech: string, index: number) => (
                      <Badge key={index} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <ExternalLink className="w-8 h-8 text-purple-500" />
              </a>
            </Card>
          ))}
        </div>

        {/* Skills Section */}
        {data.profile.skills && data.profile.skills.length > 0 && (
          <div className="mt-16">
            <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">My Superpowers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.profile.skills.map((skill: string, index: number) => (
                  <div key={index} className="text-center p-4">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-semibold text-slate-800">{skill}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-white">
          <p className="text-white/80 text-sm mb-4">
            Portfolio created with <span className="font-semibold">Civila</span>
          </p>
          <Button asChild className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30">
            <a href="/" target="_blank" rel="noopener noreferrer">
              Create Your Portfolio
            </a>
          </Button>
        </div>
      </div>
    </div>
  </div>
)

const ProfessionalTemplate = ({ data, customization }: any) => (
  <div className={`min-h-screen ${customization.bgColor || 'bg-slate-50'}`}>
    <div className="container mx-auto px-8 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Professional Header */}
        <Card className="p-12 mb-12 bg-white border-0 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-48 h-48 bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
              {data.profile.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold text-slate-800 mb-4">{data.profile.name}</h1>
              <p className="text-2xl text-slate-600 mb-6">{data.profile.title}</p>
              <p className="text-lg text-slate-500 leading-relaxed mb-8">{data.profile.bio}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {data.profile.industry && (
                  <Badge className="px-4 py-2 bg-slate-700 text-white">{data.profile.industry}</Badge>
                )}
                {data.profile.experience && (
                  <Badge className="px-4 py-2 bg-slate-700 text-white">{data.profile.experience}</Badge>
                )}
                {data.profile.location && (
                  <Badge className="px-4 py-2 bg-slate-700 text-white">{data.profile.location}</Badge>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <a href={`mailto:${data.profile.email}`} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Email</h3>
                <p className="text-slate-600">{data.profile.email}</p>
              </div>
            </a>
          </Card>

          <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <a href={`tel:${data.profile.phone}`} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Phone</h3>
                <p className="text-slate-600">{data.profile.phone}</p>
              </div>
            </a>
          </Card>

          <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <a href={`https://linkedin.com/in/${data.profile.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Linkedin className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">LinkedIn</h3>
                <p className="text-slate-600">@{data.profile.social.linkedin}</p>
              </div>
            </a>
          </Card>
        </div>

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <Card className="p-8 mb-12 bg-white border-0 shadow-xl">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Featured Projects</h2>
            <div className="space-y-8">
              {data.projects.map((project: any) => (
                <div key={project.id} className="border-b border-slate-200 pb-8 last:border-b-0">
                  <a href={project.url || '#'} target="_blank" rel="noopener noreferrer" className="block hover:bg-slate-50 p-4 rounded-lg transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2 hover:text-indigo-600 transition-colors">{project.title}</h3>
                        {project.type && (
                          <Badge className="mb-4 bg-slate-100 text-slate-700">{project.type}</Badge>
                        )}
                      </div>
                      <ExternalLink className="w-6 h-6 text-slate-400 hover:text-indigo-500 transition-colors" />
                    </div>
                    <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech: string, index: number) => (
                        <Badge key={index} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Skills */}
        {data.profile.skills && data.profile.skills.length > 0 && (
          <Card className="p-8 bg-white border-0 shadow-xl">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Core Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {data.profile.skills.map((skill: string, index: number) => (
                <div key={index} className="text-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="w-12 h-12 mx-auto mb-3 bg-slate-700 rounded-xl flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-slate-800">{skill}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-slate-200">
          <p className="text-slate-500 text-sm mb-4">
            Portfolio created with <span className="text-slate-700 font-semibold">Civila</span>
          </p>
          <Button asChild className="bg-slate-700 text-white hover:bg-slate-800">
            <a href="/" target="_blank" rel="noopener noreferrer">
              Create Your Portfolio
            </a>
          </Button>
        </div>
      </div>
    </div>
  </div>
)

export default function PublicPortfolioPage() {
  const params = useParams()
  const [portfolioData, setPortfolioData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [template, setTemplate] = useState("minimal")
  const [customization, setCustomization] = useState({})

  useEffect(() => {
    // In a real app, you'd fetch this from your backend using the userId
    // For now, we'll use localStorage as a demo
    const portfolioSettings = localStorage.getItem('portfolioSettings')
    
    if (portfolioSettings) {
      try {
        const settings = JSON.parse(portfolioSettings)
        setPortfolioData(settings.data)
        setTemplate(settings.template)
        setCustomization(settings.customization)
      } catch (error) {
        console.error('Error parsing portfolio settings:', error)
        setPortfolioData(null)
      }
    } else {
      // Fallback demo data
      setPortfolioData({
        profile: {
          name: "Sarah Martinez",
          title: "Full-Stack Developer & UI/UX Designer",
          bio: "Passionate developer with 3+ years of experience building modern web applications. I love creating beautiful, functional designs that solve real-world problems.",
          email: "sarah@example.com",
          phone: "+62 812-3456-7890",
          location: "Jakarta, Indonesia",
          website: "sarahmartinez.com",
          availability: "Available for new opportunities",
          industry: "Technology",
          experience: "3+ years",
          social: {
            linkedin: "sarahmartinez",
            twitter: "sarahmartinez",
            github: "sarahmartinez",
            instagram: "sarahmartinez"
          },
          skills: ["React", "TypeScript", "Node.js", "Python", "Figma", "UI/UX Design", "PostgreSQL", "AWS"]
        },
        projects: [
          {
            id: 1,
            title: "EcoCommerce Platform",
            description: "Sustainable e-commerce platform with carbon footprint tracking and eco-friendly product recommendations.",
            type: "Web Application",
            technologies: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
            status: "Live",
            url: "https://demo.com",
            metrics: {
              users: "10K+",
              views: "50K+",
              rating: "4.8/5"
            }
          },
          {
            id: 2,
            title: "Learning Management System",
            description: "Modern LMS with interactive courses, progress tracking, and real-time collaboration features.",
            type: "Web Application",
            technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
            status: "In Development",
            url: "https://demo2.com",
            metrics: {
              students: "2K+",
              courses: "150+",
              completion: "85%"
            }
          }
        ],
        achievements: [
          {
            name: "Top Developer",
            description: "Ranked #1 developer of the month",
            icon: "🏆",
            category: "Performance"
          },
          {
            name: "Innovation Award",
            description: "Best innovative solution 2024",
            icon: "💡",
            category: "Innovation"
          }
        ]
      })
      setTemplate("minimal")
      setCustomization({
        bgColor: "bg-gradient-to-br from-slate-50 to-white",
        accentColor: "bg-indigo-500"
      })
    }
    
    setLoading(false)
  }, [params.userId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-12 h-12 text-slate-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Portfolio Not Found</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            This portfolio doesn't exist or has been removed. Create your own professional portfolio in minutes!
          </p>
          <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 text-lg">
            <a href="/">Create Your Portfolio</a>
          </Button>
        </div>
      </div>
    )
  }

  // Render the appropriate template
  const renderTemplate = () => {
    switch (template) {
      case "creative":
        return <CreativeTemplate data={portfolioData} customization={customization} />
      case "professional":
        return <ProfessionalTemplate data={portfolioData} customization={customization} />
      default:
        return <MinimalTemplate data={portfolioData} customization={customization} />
    }
  }

  return (
    <div className="min-h-screen">
      {renderTemplate()}
    </div>
  )
}