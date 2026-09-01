'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bot, BrainCircuit, Sparkles, Clock, CheckCircle2, 
  ArrowRight, X, Languages, Globe, Database, TrendingUp,
  CreditCard, ShieldCheck, Check, QrCode, Lock
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  category: 'tech' | 'language';
  duration: string;
  price: string;
  priceNum: number;
  highlights: string[];
  bestFor: string;
  badge: string;
  icon: any;
  color: string;
  borderColor: string;
  accentBtn: string;
}

const ALL_COURSES: Course[] = [
  {
    id: 'ai-foundation',
    title: 'AI Foundation (For Beginners)',
    category: 'tech',
    duration: '1 Month',
    price: '₹5,000',
    priceNum: 5000,
    highlights: ['Prompt Engineering & GenAI mastery', 'Essential AI tools & daily practical workflows', 'Zero coding background required'],
    bestFor: 'Beginners, students, aur non-tech professionals',
    badge: 'Beginner Friendly',
    icon: Sparkles,
    color: 'from-purple-950/40 to-slate-900',
    borderColor: 'border-purple-500/30',
    accentBtn: 'bg-purple-600 hover:bg-purple-500'
  },
  {
    id: 'advanced-ai-ml',
    title: 'Advanced AI & Machine Learning Program',
    category: 'tech',
    duration: '4 Months',
    price: '₹40,000',
    priceNum: 40000,
    highlights: ['Deep Learning, Neural Networks & NLP', 'Live enterprise production projects', '100% Guaranteed Job Placement support'],
    bestFor: 'Career switchers, tech graduates, aur aspiring AI engineers',
    badge: '100% Placement Support',
    icon: BrainCircuit,
    color: 'from-pink-950/40 to-slate-900',
    borderColor: 'border-pink-500/30',
    accentBtn: 'bg-pink-600 hover:bg-pink-500'
  },
  {
    id: 'nextgen-ai-marketing',
    title: 'Next-Gen AI in Digital Marketing',
    category: 'tech',
    duration: '2 Months',
    price: '₹10,000',
    priceNum: 10000,
    highlights: ['AI-driven high-converting content generation', 'Automated ad optimization & predictive ROI', 'SEO analytics & automated sales funnels'],
    bestFor: 'Digital marketers, business owners, aur content creators',
    badge: 'High ROI',
    icon: TrendingUp,
    color: 'from-amber-950/40 to-slate-900',
    borderColor: 'border-amber-500/30',
    accentBtn: 'bg-amber-600 hover:bg-amber-500'
  },
  {
    id: 'data-science-ai',
    title: 'Data Science & Applied AI Masterclass',
    category: 'tech',
    duration: '3 Months',
    price: '₹40,000',
    priceNum: 40000,
    highlights: ['Python for Data Science & Predictive Analytics', 'Statistical modeling & Machine Learning algorithms', 'Big Data pipelines & cloud processing'],
    bestFor: 'Data enthusiasts, analysts, aur software developers',
    badge: 'Enterprise Grade',
    icon: Database,
    color: 'from-cyan-950/40 to-slate-900',
    borderColor: 'border-cyan-500/30',
    accentBtn: 'bg-cyan-600 hover:bg-cyan-500'
  },
  {
    id: 'ai-automation-engineering',
    title: 'AI Automation & Workflow Engineering',
    category: 'tech',
    duration: '2 Months',
    price: '₹15,000',
    priceNum: 15000,
    highlights: ['Custom autonomous AI agents & LLM pipelines', 'Zapier, Make.com & n8n enterprise workflows', 'Webhook architectures & business automation'],
    bestFor: 'Freelancers, developers, aur agency owners',
    badge: 'Fast-Track Practical',
    icon: Bot,
    color: 'from-indigo-950/40 to-slate-900',
    borderColor: 'border-indigo-500/30',
    accentBtn: 'bg-indigo-600 hover:bg-indigo-500'
  },
  {
    id: 'lang-english',
    title: 'English Fluency & Business Communication',
    category: 'language',
    duration: '2 Months',
    price: '₹6,000',
    priceNum: 6000,
    highlights: ['AI Voice Accent Trainer & Grammar Correction', 'Corporate presentations, interviews & email etiquette', 'Interactive 24/7 AI conversational sparring'],
    bestFor: 'Professionals, job seekers, and students',
    badge: 'AI Voice Tutor',
    icon: Globe,
    color: 'from-emerald-950/40 to-slate-900',
    borderColor: 'border-emerald-500/30',
    accentBtn: 'bg-emerald-600 hover:bg-emerald-500'
  },
  {
    id: 'lang-punjabi',
    title: 'Punjabi Language & Cultural Professional Course',
    category: 'language',
    duration: '1.5 Months',
    price: '₹5,000',
    priceNum: 5000,
    highlights: ['Gurmukhi script reading, writing, and vocabulary', 'Conversational AI partner for regional fluency', 'Standard corporate and cultural communication'],
    bestFor: 'Non-native speakers, regional executives',
    badge: 'Regional Fluency',
    icon: Languages,
    color: 'from-orange-950/40 to-slate-900',
    borderColor: 'border-orange-500/30',
    accentBtn: 'bg-orange-600 hover:bg-orange-500'
  },
  {
    id: 'lang-french',
    title: 'French Language Mastery (A1-B2 AI Accelerated)',
    category: 'language',
    duration: '3 Months',
    price: '₹12,000',
    priceNum: 12000,
    highlights: ['CEFR-aligned curriculum with AI pronunciation coach', 'Immigration & study abroad preparation', 'Automated mock oral exams'],
    bestFor: 'Study abroad aspirants (Canada/France/Europe)',
    badge: 'Immigration & Study',
    icon: Globe,
    color: 'from-blue-950/40 to-slate-900',
    borderColor: 'border-blue-500/30',
    accentBtn: 'bg-blue-600 hover:bg-blue-500'
  },
  {
    id: 'lang-dutch',
    title: 'Dutch Language Immersion (Beginner to Business)',
    category: 'language',
    duration: '3 Months',
    price: '₹14,000',
    priceNum: 14000,
    highlights: ['Inburgering integration & work visa preparation', 'Interactive AI Dutch conversational tutor', 'Everyday practical dialogues and professional syntax'],
    bestFor: 'Professionals relocating to Netherlands/Belgium',
    badge: 'European Relocation',
    icon: Globe,
    color: 'from-red-950/40 to-slate-900',
    borderColor: 'border-red-500/30',
    accentBtn: 'bg-red-600 hover:bg-red-500'
  }
];

export default function CoursesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'tech' | 'language'>('all');
  
  // Syllabus Modal State
  const [activeModal, setActiveModal] = useState<Course | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [syllabus, setSyllabus] = useState<any | null>(null);

  // Direct Checkout Modal State
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const filteredCourses = ALL_COURSES.filter(c => filter === 'all' || c.category === filter);

  const openSyllabusModal = async (course: Course) => {
    setActiveModal(course);
    setAiLoading(true);
    setSyllabus(null);

    try {
      const res = await fetch('/api/ai/syllabus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic: course.title, 
          duration: course.duration,
          category: course.category 
        })
      });
      const data = await res.json();
      if (data.success) {
        setSyllabus(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  const handleEnrollCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentProcessing(true);

    // Simulate Instant Payment Gateway Verification & LMS Key Generation
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentDone(true);

      // Auto redirect to AI Classroom after 1.5 seconds
      setTimeout(() => {
        if (checkoutCourse) {
          router.push(`/learn/${checkoutCourse.id}`);
        }
      }, 1500);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-600 selection:text-white">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-purple-950/40">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <Image src="/logo.png" alt="Sacred Mind" width={48} height={48} className="object-contain drop-shadow-[0_0_18px_rgba(168,85,247,0.5)]" priority />
            </div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-400 bg-clip-text text-transparent">
              Sacred Mind
            </span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-slate-300 hover:text-purple-400 transition">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* HEADER HERO */}
      <div className="pt-16 pb-10 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-6">
          <BrainCircuit className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>Sacred Mind AI Academy & Industrial Training</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight max-w-4xl mx-auto">
          Industry-Ready AI & <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">Language Programs</span>
        </h1>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
          Select a course, preview the AI-generated curriculum, and enroll directly into the interactive AI classroom.
        </p>

        {/* TABS */}
        <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition ${filter === 'all' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            All Programs ({ALL_COURSES.length})
          </button>
          <button
            onClick={() => setFilter('tech')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition ${filter === 'tech' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            AI & Tech (5)
          </button>
          <button
            onClick={() => setFilter('language')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition ${filter === 'language' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            AI Languages (4)
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => {
          const IconComponent = course.icon;
          return (
            <div key={course.id} className={`rounded-3xl bg-slate-900/60 border ${course.borderColor} p-6 flex flex-col justify-between hover:border-purple-500/50 hover:scale-[1.01] transition shadow-xl`}>
              <div>
                <div className={`h-40 rounded-2xl bg-gradient-to-br ${course.color} border border-slate-800 mb-6 flex items-center justify-center relative overflow-hidden`}>
                  <IconComponent className="w-14 h-14 text-slate-200" />
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-slate-950/80 border border-slate-700 text-purple-300">
                    {course.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{course.title}</h3>
                <div className="space-y-2 mb-6">
                  {course.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400 mb-6">
                  <span className="text-slate-200 font-semibold block mb-0.5">Best For:</span>
                  {course.bestFor}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between py-3 border-t border-slate-800/80 text-xs text-slate-400 mb-4">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>Duration: <strong className="text-white">{course.duration}</strong></span>
                  </div>
                  <div>Investment: <strong className="text-lg text-white font-black">{course.price}</strong></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => openSyllabusModal(course)}
                    className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition flex items-center justify-center space-x-1.5 border border-slate-700"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>AI Syllabus</span>
                  </button>
                  <button 
                    onClick={() => {
                      setCheckoutCourse(course);
                      setPaymentDone(false);
                    }}
                    className={`py-3 rounded-xl ${course.accentBtn} text-xs font-bold text-white transition text-center shadow-lg flex items-center justify-center space-x-1`}
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DIRECT PAYMENT & ENROLLMENT MODAL */}
      {checkoutCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-purple-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative">
            <button 
              onClick={() => setCheckoutCourse(null)} 
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {paymentDone ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white">Enrollment Successful!</h3>
                <p className="text-sm text-slate-300">Payment of <strong>{checkoutCourse.price}</strong> confirmed.</p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-purple-400">
                  Unlocking Sacred Mind AI Classroom & Video Modules...
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Direct LMS Enrollment</h3>
                    <span className="text-xs text-purple-400">{checkoutCourse.title}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between mb-6">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Fee</span>
                    <p className="text-2xl font-black text-white">{checkoutCourse.price}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold">
                      Instant Access
                    </span>
                  </div>
                </div>

                <form onSubmit={handleEnrollCheckout} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter your name" 
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="you@email.com" 
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Phone / WhatsApp</label>
                    <input 
                      type="tel" 
                      required 
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      placeholder="+91 9876543210" 
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={paymentProcessing}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm transition shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2"
                    >
                      {paymentProcessing ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing Payment & Access...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4" />
                          <span>Pay {checkoutCourse.price} & Enter Classroom</span>
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI SYLLABUS MODAL */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-purple-500/40 rounded-3xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <BrainCircuit className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{activeModal.title}</h3>
                <span className="text-xs text-purple-400 font-mono">Sacred Mind AI-Engineered Roadmap ({activeModal.duration})</span>
              </div>
            </div>

            {aiLoading ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-mono text-purple-300">AI Synthesis Engine mapping complete weekly breakdown...</p>
              </div>
            ) : (
              syllabus && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {syllabus.modules.map((mod: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                        <span className="text-xs font-mono font-bold text-purple-400 block mb-1">{mod.week}</span>
                        <h4 className="font-bold text-white text-sm mb-2">{mod.title}</h4>
                        <ul className="space-y-1.5 text-xs text-slate-400">
                          {mod.topics.map((t: string, i: number) => (
                            <li key={i} className="flex items-start space-x-2">
                              <span className="text-purple-400">•</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-800/40">
                    <h4 className="text-xs font-bold font-mono text-purple-300 uppercase mb-2">Live Practical Capstone Deliverables</h4>
                    <div className="flex flex-wrap gap-2">
                      {syllabus.practicalProjects.map((proj: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-slate-900 rounded-lg text-xs text-slate-200 border border-slate-800">
                          ✓ {proj}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => {
                        setCheckoutCourse(activeModal);
                        setActiveModal(null);
                        setPaymentDone(false);
                      }}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 font-bold text-center text-sm text-white transition shadow-lg shadow-purple-600/25"
                    >
                      Enroll For {activeModal.price}
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
