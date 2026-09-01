'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, Bot, Sparkles, CheckCircle2, Lock,
  Send, Code2, FileText, ChevronRight, BrainCircuit, Check,
  HelpCircle, AlertCircle, Award
} from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface ModuleData {
  id: number;
  week: string;
  title: string;
  duration: string;
  videoEmbedUrl: string;
  summary: string;
  keyPoints: string[];
  codeSnippet: string;
  quiz: QuizQuestion;
}

export default function StudentClassroom({ params }: { params: { courseId: string } }) {
  const [courseModules, setCourseModules] = useState<ModuleData[]>([]);
  const [unlockedModules, setUnlockedModules] = useState<number[]>([1]);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'quiz' | 'notes' | 'code'>('quiz');
  
  // Quiz State
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  // AI Tutor State
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'Hello! I am your Sacred Mind AI Tutor. Watch the full lecture, solve the checkpoint question below to unlock the next module, and ask any doubt anytime!' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);

  // Dynamic Content Generation based on courseId
  useEffect(() => {
    const fetchCourseContent = async () => {
      setLoading(true);
      // We will generate 5 modules for whichever course is selected
      const generatedModules: ModuleData[] = [];
      
      for (let i = 0; i < 5; i++) {
        const moduleTitle = `Phase ${i + 1}: ${params.courseId.includes('lang') ? 'Language Fundamentals' : 'Core Architecture'}`;
        
        try {
          const res = await fetch('/api/ai/module-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              courseId: params.courseId,
              moduleTitle: moduleTitle,
              moduleIndex: i
            })
          });
          const data = await res.json();
          
          if (data.success) {
             generatedModules.push({
               id: i + 1,
               week: `Module ${i + 1}`,
               title: data.data.module,
               duration: data.data.videoDetails.duration,
               videoEmbedUrl: data.data.videoDetails.videoUrl,
               summary: data.data.smartNotes.summary,
               keyPoints: data.data.smartNotes.keyConcepts,
               codeSnippet: data.data.smartNotes.codeSnippet,
               quiz: data.data.quiz
             });
          }
        } catch (e) {
          console.error("Error fetching module", e);
        }
      }
      
      setCourseModules(generatedModules);
      setLoading(false);
    };

    fetchCourseContent();
  }, [params.courseId]);

  if (loading || courseModules.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-purple-400 font-mono">Generating dynamic AI curriculum for {params.courseId}...</p>
      </div>
    );
  }

  const currentModule = courseModules[activeModuleIndex];

  // Switch Module handler
  const handleSelectModule = (index: number) => {
    if (!unlockedModules.includes(courseModules[index].id)) {
      alert("🔒 Please pass the current module's checkpoint quiz to unlock this chapter!");
      return;
    }
    setActiveModuleIndex(index);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setQuizPassed(false);
    setActiveTab('quiz');
  };

  // Submit Quiz Question
  const handleQuizSubmit = () => {
    if (selectedAnswer === null) return;
    setQuizSubmitted(true);
    
    if (selectedAnswer === currentModule.quiz.correctIndex) {
      setQuizPassed(true);
      const nextModuleId = currentModule.id + 1;
      if (!unlockedModules.includes(nextModuleId) && nextModuleId <= courseModules.length) {
        setUnlockedModules(prev => [...prev, nextModuleId]);
      }
    } else {
      setQuizPassed(false);
    }
  };

  // Move to next unlocked module
  const handleNextModule = () => {
    if (activeModuleIndex < courseModules.length - 1) {
      handleSelectModule(activeModuleIndex + 1);
    }
  };

  // AI Doubt Solver
  const handleSendQuery = () => {
    if (!userInput.trim()) return;
    const q = userInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: q }]);
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, {
        sender: 'ai',
        text: `Regarding "${q}" in ${currentModule.title}: Let me analyze that for the ${params.courseId} course. ${currentModule.quiz.explanation}`
      }]);
    }, 750);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-purple-600 selection:text-white">
      
      {/* TOP BAR */}
      <header className="h-16 border-b border-purple-950/40 bg-slate-950/90 px-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <Link href="/courses" className="flex items-center space-x-2 group">
            <Image src="/logo.png" alt="Sacred Mind" width={32} height={32} className="object-contain" priority />
            <span className="font-black text-lg text-white group-hover:text-purple-400 transition">Sacred Mind LMS</span>
          </Link>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="text-xs text-purple-300 font-mono bg-purple-950/50 px-3 py-1 rounded-md border border-purple-800/40 hidden sm:inline">
            Interactive Classroom: {params.courseId}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-xs text-slate-400">
            Progress: <strong className="text-white">{Math.round((unlockedModules.length / courseModules.length) * 100)}%</strong>
          </div>
          <Link href="/courses" className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition">
            Exit ✕
          </Link>
        </div>
      </header>

      {/* MAIN LEARNING ARENA */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* LEFT: CURRICULUM & MODULE LOCK STATE */}
        <div className="lg:col-span-3 border-r border-slate-800/80 bg-slate-950/70 p-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Course Syllabus</h3>
            <span className="text-[10px] text-purple-400 font-mono">{unlockedModules.length}/{courseModules.length} Unlocked</span>
          </div>

          <div className="space-y-2.5">
            {courseModules.map((mod, idx) => {
              const isUnlocked = unlockedModules.includes(mod.id);
              const isActive = activeModuleIndex === idx;

              return (
                <button
                  key={mod.id}
                  onClick={() => handleSelectModule(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl transition border flex items-center justify-between ${
                    isActive 
                      ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg shadow-purple-950/60' 
                      : isUnlocked 
                        ? 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-purple-500/40' 
                        : 'bg-slate-950 border-slate-900 text-slate-600 cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className="pr-2">
                    <span className="text-[10px] font-mono text-purple-400 block font-semibold">{mod.week}</span>
                    <span className="text-xs font-bold block leading-snug line-clamp-1">{mod.title}</span>
                    <span className="text-[10px] text-slate-500">{mod.duration}</span>
                  </div>

                  {isUnlocked ? (
                    unlockedModules.includes(mod.id + 1) || (idx === courseModules.length - 1 && quizPassed) ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-purple-400 shrink-0" />
                    )
                  ) : (
                    <Lock className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* MIDDLE: FULL LECTURE VIDEO + MANDATORY QUIZ CHECKPOINT */}
        <div className="lg:col-span-6 p-6 overflow-y-auto max-h-[calc(100vh-4rem)] flex flex-col space-y-6">
          
          {/* HD EMBED VIDEO PLAYER */}
          <div className="rounded-3xl overflow-hidden border border-purple-500/40 bg-slate-900 shadow-2xl relative">
            <div className="aspect-video w-full bg-black">
              <iframe 
                key={currentModule.videoEmbedUrl}
                src={currentModule.videoEmbedUrl} 
                title={currentModule.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-xs font-bold text-white line-clamp-1">{currentModule.title}</span>
              </div>
              <span className="text-[11px] font-mono text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-md border border-purple-800/40 shrink-0">
                {currentModule.duration}
              </span>
            </div>
          </div>

          {/* INTERACTIVE LEARNING TABS */}
          <div className="border-b border-slate-800 flex space-x-6 text-sm font-semibold">
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`pb-3 border-b-2 transition flex items-center space-x-2 ${activeTab === 'quiz' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Mandatory Checkpoint Quiz</span>
            </button>
            <button 
              onClick={() => setActiveTab('notes')}
              className={`pb-3 border-b-2 transition flex items-center space-x-2 ${activeTab === 'notes' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              <FileText className="w-4 h-4" />
              <span>AI Smart Notes</span>
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`pb-3 border-b-2 transition flex items-center space-x-2 ${activeTab === 'code' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              <Code2 className="w-4 h-4" />
              <span>Live Content</span>
            </button>
          </div>

          {/* TAB 1: MANDATORY QUIZ TO UNLOCK NEXT CHAPTER */}
          {activeTab === 'quiz' && (
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-purple-500/30 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-wider">
                    {currentModule.week} Checkpoint Verification
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">
                    {currentModule.quiz.question}
                  </h4>
                </div>
                <span className="p-2 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                  <BrainCircuit className="w-5 h-5" />
                </span>
              </div>

              {/* OPTIONS */}
              <div className="space-y-3">
                {currentModule.quiz.options.map((option, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => {
                      if (!quizPassed) {
                        setSelectedAnswer(optIdx);
                        setQuizSubmitted(false);
                      }
                    }}
                    className={`w-full text-left p-4 rounded-2xl border text-xs transition flex items-center space-x-3 ${
                      selectedAnswer === optIdx
                        ? 'bg-purple-950/60 border-purple-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-purple-500/40'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${selectedAnswer === optIdx ? 'border-purple-400 bg-purple-600 text-white' : 'border-slate-600 text-slate-400'}`}>
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span className="flex-1">{option}</span>
                  </button>
                ))}
              </div>

              {/* QUIZ FEEDBACK BANNER */}
              {quizSubmitted && (
                <div className={`p-4 rounded-2xl border text-xs ${quizPassed ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/30 border-rose-500/40 text-rose-300'}`}>
                  <div className="flex items-center space-x-2 font-bold mb-1">
                    {quizPassed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Correct Answer! Next chapter unlocked 🎉</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span>Incorrect answer. Review the video lecture or AI Notes and try again!</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300 mt-1">{currentModule.quiz.explanation}</p>
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {!quizPassed ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={selectedAnswer === null}
                    className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs text-white transition shadow-lg shadow-purple-600/25"
                  >
                    Submit & Verify Answer
                  </button>
                ) : (
                  activeModuleIndex < courseModules.length - 1 ? (
                    <button
                      onClick={handleNextModule}
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white transition shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2"
                    >
                      <span>Proceed to Next Module ({courseModules[activeModuleIndex + 1].week})</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-900 to-pink-900 border border-purple-500/40 text-center space-y-1">
                      <div className="flex items-center justify-center space-x-2 text-white font-bold text-sm">
                        <Award className="w-5 h-5 text-amber-400" />
                        <span>Congratulations! All Modules Completed</span>
                      </div>
                      <p className="text-[11px] text-purple-200">Official Sacred Mind Industrial Certification verified.</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* TAB 2: AI SMART NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4 bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
              <h4 className="text-base font-bold text-white flex items-center space-x-2">
                <BrainCircuit className="w-5 h-5 text-purple-400" />
                <span>AI Lesson Summary</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentModule.summary}
              </p>
              
              <div className="space-y-2 pt-2">
                {currentModule.keyPoints.map((point, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LIVE PRODUCTION CODE */}
          {activeTab === 'code' && (
            <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 font-mono text-xs text-purple-300 overflow-x-auto leading-relaxed">
              <pre>{currentModule.codeSnippet}</pre>
            </div>
          )}

        </div>

        {/* RIGHT: 24/7 IN-CLASS AI DOUBT SOLVER */}
        <div className="lg:col-span-3 bg-slate-950 p-4 flex flex-col justify-between border-t lg:border-t-0 max-h-[calc(100vh-4rem)]">
          <div>
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
              <Bot className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-bold text-white">In-Class AI Tutor</span>
              <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full font-mono">Live 24/7</span>
            </div>

            <div className="mt-4 space-y-3 max-h-[48vh] overflow-y-auto pr-1">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`p-3 rounded-2xl text-xs leading-relaxed ${msg.sender === 'ai' ? 'bg-slate-900 border border-purple-500/20 text-slate-200' : 'bg-purple-600 text-white ml-6'}`}>
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="text-[10px] text-purple-400 animate-pulse font-mono">
                  AI Tutor is analyzing lesson context...
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
                placeholder="Ask doubt about this lesson..."
                className="flex-1 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleSendQuery}
                className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
