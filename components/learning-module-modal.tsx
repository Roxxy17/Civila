"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Target,
  FileText,
  Video,
  Code,
  Award,
  ExternalLink,
  ChevronRight,
  X,
  Trophy,
} from "lucide-react";

interface LearningModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: any;
  onComplete: (moduleId: number, progress: number) => void;
  pathColor?: string;
}

export function LearningModuleModal({
  isOpen,
  onClose,
  module,
  onComplete,
  pathColor = "from-blue-500 to-cyan-500"
}: LearningModuleModalProps) {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [lessonProgress, setLessonProgress] = useState<{ [key: number]: number }>({});
  const [moduleProgress, setModuleProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset progress when modal opens
      setCurrentLesson(0);
      setLessonProgress({});
      setModuleProgress(0);
      setShowCelebration(false);
      setIsCompleting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    // Calculate module progress based on lesson progress
    const totalLessons = module?.content?.lessons?.length || 0;
    if (totalLessons > 0) {
      const completedLessons = Object.values(lessonProgress).filter(progress => progress === 100).length;
      const newProgress = (completedLessons / totalLessons) * 100;
      setModuleProgress(newProgress);

      // Show celebration when reaching 100%
      if (newProgress === 100 && !showCelebration && !isCompleting) {
        setShowCelebration(true);
        setIsCompleting(true);
        
        // Auto complete after celebration
        setTimeout(() => {
          onComplete(module.id, 100);
          setShowCelebration(false);
          setTimeout(() => {
            onClose();
          }, 1000);
        }, 3000);
      }
    }
  }, [lessonProgress, module, onComplete, showCelebration, isCompleting]);

  const handleLessonComplete = (lessonIndex: number) => {
    setLessonProgress(prev => ({
      ...prev,
      [lessonIndex]: 100
    }));

    // Move to next lesson if available
    if (lessonIndex < (module?.content?.lessons?.length || 0) - 1) {
      setTimeout(() => {
        setCurrentLesson(lessonIndex + 1);
      }, 500);
    }
  };

  const handleLessonProgress = (lessonIndex: number, progress: number) => {
    setLessonProgress(prev => ({
      ...prev,
      [lessonIndex]: progress
    }));
  };

  const handleStartLearning = (lessonIndex: number) => {
    // Simulate learning progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      handleLessonProgress(lessonIndex, progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        handleLessonComplete(lessonIndex);
      }
    }, 500);
  };

  if (!isOpen || !module) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Course":
        return <BookOpen className="w-5 h-5" />;
      case "Theory":
        return <FileText className="w-5 h-5" />;
      case "Hands-on":
        return <Code className="w-5 h-5" />;
      case "Framework":
        return <Award className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700";
      case "Intermediate":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-700";
      case "Advanced":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden"
          >
            {/* Enhanced Header */}
            <div className={`bg-gradient-to-r ${pathColor} text-white p-6`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                    {getTypeIcon(module.type)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{module.title}</h2>
                    <p className="text-white/90 text-sm">{module.description}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 w-10 h-10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Module Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white/15 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="text-xl font-bold">{Math.round(moduleProgress)}%</div>
                  <div className="text-white/80 text-xs">Progress</div>
                </div>
                <div className="text-center p-3 bg-white/15 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="text-lg font-bold">{module.lessons}</div>
                  <div className="text-white/80 text-xs">Lessons</div>
                </div>
                <div className="text-center p-3 bg-white/15 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="text-lg font-bold">{module.projects}</div>
                  <div className="text-white/80 text-xs">Projects</div>
                </div>
                <div className="text-center p-3 bg-white/15 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="text-sm font-bold">{module.duration}</div>
                  <div className="text-white/80 text-xs">Duration</div>
                </div>
              </div>

              {/* Overall Progress */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/90 text-sm font-medium">Module Progress</span>
                  <span className="text-white font-bold">{Math.round(moduleProgress)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3 border border-white/30">
                  <motion.div 
                    className="bg-white h-3 rounded-full transition-all duration-500 shadow-sm"
                    initial={{ width: 0 }}
                    animate={{ width: `${moduleProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(95vh-280px)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Lessons */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Module Info */}
                  <Card className="p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border-0 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-5 h-5 text-blue-500" />
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Learning Objectives</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={`${getDifficultyColor(module.difficulty)} text-xs`}>
                        {module.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-slate-300 dark:border-slate-600">
                        {module.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-slate-300 dark:border-slate-600">
                        <Clock className="w-3 h-3 mr-1" />
                        {module.duration}
                      </Badge>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {module.description}
                    </p>
                  </Card>

                  {/* Lessons List */}
                  <Card className="p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border-0 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="w-5 h-5 text-emerald-500" />
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Lessons & Skills</h3>
                    </div>
                    <div className="space-y-3">
                      {module.content?.lessons?.map((lesson: string, index: number) => {
                        const progress = lessonProgress[index] || 0;
                        const isCompleted = progress === 100;
                        const isCurrent = index === currentLesson;
                        
                        return (
                          <motion.div
                            key={index}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                              isCompleted 
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-600 shadow-md' 
                                : isCurrent
                                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600 shadow-md ring-2 ring-blue-200 dark:ring-blue-800'
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-slate-300 dark:hover:border-slate-600'
                            }`}
                            onClick={() => setCurrentLesson(index)}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                  isCompleted 
                                    ? 'bg-emerald-500 text-white shadow-lg' 
                                    : isCurrent
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-400'
                                }`}>
                                  {isCompleted ? (
                                    <CheckCircle className="w-5 h-5" />
                                  ) : (
                                    <span className="text-sm font-bold">{index + 1}</span>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h4 className={`font-semibold text-sm ${
                                    isCompleted 
                                      ? 'text-emerald-800 dark:text-emerald-200' 
                                      : isCurrent
                                      ? 'text-blue-800 dark:text-blue-200'
                                      : 'text-slate-800 dark:text-slate-200'
                                  }`}>
                                    {lesson}
                                  </h4>
                                  {progress > 0 && progress < 100 && (
                                    <div className="mt-2">
                                      <Progress value={progress} className="h-2" />
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {isCompleted && (
                                  <Badge className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-600 text-xs">
                                    ✓ Complete
                                  </Badge>
                                )}
                                {isCurrent && !isCompleted && progress === 0 && (
                                  <Button
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStartLearning(index);
                                    }}
                                    className="text-xs px-3 py-1 h-8 bg-blue-500 hover:bg-blue-600"
                                  >
                                    <Play className="w-3 h-3 mr-1" />
                                    Start
                                  </Button>
                                )}
                                {progress > 0 && progress < 100 && (
                                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600 text-xs">
                                    In Progress...
                                  </Badge>
                                )}
                                <ChevronRight className={`w-4 h-4 transition-colors ${
                                  isCurrent ? 'text-blue-500' : 'text-slate-400'
                                }`} />
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </Card>
                </div>

                {/* Right Column - Current Lesson & Resources */}
                <div className="space-y-6">
                  {/* Current Lesson Details */}
                  {module.content?.lessons?.[currentLesson] && (
                    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-blue-800 dark:text-blue-200">Current Lesson</h3>
                          <p className="text-blue-600 dark:text-blue-400 text-sm">Lesson {currentLesson + 1} of {module.content.lessons.length}</p>
                        </div>
                      </div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">
                        {module.content.lessons[currentLesson]}
                      </h4>
                      <div className="space-y-3">
                        {lessonProgress[currentLesson] === 100 ? (
                          <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
                            <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                            <p className="text-emerald-700 dark:text-emerald-300 font-medium">Lesson Completed!</p>
                          </div>
                        ) : lessonProgress[currentLesson] > 0 ? (
                          <div>
                            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                              <span>Learning Progress</span>
                              <span>{lessonProgress[currentLesson]}%</span>
                            </div>
                            <Progress value={lessonProgress[currentLesson]} className="h-3" />
                            <p className="text-center text-blue-600 dark:text-blue-400 text-sm mt-2">
                              Keep learning...
                            </p>
                          </div>
                        ) : (
                          <Button 
                            className="w-full bg-blue-500 hover:bg-blue-600 shadow-lg"
                            onClick={() => handleStartLearning(currentLesson)}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Start Learning This Lesson
                          </Button>
                        )}
                      </div>
                    </Card>
                  )}

                  {/* Projects */}
                  {module.content?.projects && module.content.projects.length > 0 && (
                    <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <Code className="w-5 h-5 text-purple-500" />
                        <h3 className="text-lg font-bold text-purple-800 dark:text-purple-200">Projects</h3>
                      </div>
                      <div className="space-y-3">
                        {module.content.projects.map((project: string, index: number) => (
                          <div key={index} className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-purple-200 dark:border-purple-700 shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center shadow-sm">
                                <span className="text-white text-xs font-bold">{index + 1}</span>
                              </div>
                              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                                {project}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Resources */}
                  {module.content?.resources && module.content.resources.length > 0 && (
                    <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-700 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="w-5 h-5 text-orange-500" />
                        <h3 className="text-lg font-bold text-orange-800 dark:text-orange-200">Resources</h3>
                      </div>
                      <div className="space-y-3">
                        {module.content.resources.map((resource: any, index: number) => (
                          <div key={index} className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-orange-200 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors cursor-pointer shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-sm">
                                  {resource.type === 'Video' ? (
                                    <Video className="w-4 h-4 text-white" />
                                  ) : resource.type === 'Course' ? (
                                    <BookOpen className="w-4 h-4 text-white" />
                                  ) : (
                                    <FileText className="w-4 h-4 text-white" />
                                  )}
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                                    {resource.name}
                                  </span>
                                  <div className="text-xs text-orange-600 dark:text-orange-400">
                                    {resource.type}
                                  </div>
                                </div>
                              </div>
                              <ExternalLink className="w-4 h-4 text-orange-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 dark:border-slate-700 p-6 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Progress: <span className="font-semibold">{Math.round(moduleProgress)}%</span> complete
                  </div>
                  {moduleProgress === 100 && (
                    <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">
                      <Trophy className="w-3 h-3 mr-1" />
                      Module Completed!
                    </Badge>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={onClose} className="border-slate-300 dark:border-slate-600">
                    Close
                  </Button>
                  {moduleProgress === 100 && (
                    <Button 
                      onClick={() => {
                        onComplete(module.id, 100);
                        onClose();
                      }}
                      className="bg-green-500 hover:bg-green-600 shadow-lg"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Module
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Celebration Animation */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-0 z-60 flex items-center justify-center pointer-events-none"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-32 h-32 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                  >
                    <Trophy className="w-16 h-16 text-white" />
                  </motion.div>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-5xl font-bold text-white mb-4 drop-shadow-lg"
                  >
                    🎉 Module Completed! 🎉
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/90 text-xl drop-shadow-md"
                  >
                    Excellent work! The next module is now unlocked.
                  </motion.p>
                  
                  {/* Enhanced Confetti Effect */}
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-3 h-3 rounded-full ${
                        i % 3 === 0 ? 'bg-yellow-400' : 
                        i % 3 === 1 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      initial={{ 
                        x: 0, 
                        y: 0,
                        opacity: 1,
                        scale: 1
                      }}
                      animate={{
                        x: (Math.random() - 0.5) * 600,
                        y: (Math.random() - 0.5) * 600,
                        opacity: 0,
                        scale: 0
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.05,
                        ease: "easeOut"
                      }}
                      style={{
                        left: '50%',
                        top: '50%'
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}