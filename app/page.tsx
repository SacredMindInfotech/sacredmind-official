'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Code2, Bot, Gamepad2, Star, BookOpen, Sparkles, 
  ArrowRight, CheckCircle2, MapPin, Mail, Play, 
  BrainCircuit, Layers, Video, ShieldCheck, X, 
  MessageSquare, Zap, Check, Users, Clock
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'all' | 'courses' | 'services'>('all');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [generatingSyllabus, setGeneratingSyllabus] = useState(false);
  const [generatedSyllabus, setGeneratedSyllabus] = useState<string[] | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Dynamic AI Syllabus Generator Simulator
  const handleGenerateSyllabus = (courseName: string) => {
    setSelectedCourse(courseName);
    setGeneratingSyllabus(true);
    setGeneratedSyllabus(null);

    setTimeout(() => {
      setGeneratingSyllabus(false);
      if (courseName.includes('Python')) {
        setGeneratedSyllabus([
          'Week 1-2: Advanced Python Syntax, OOP & Memory Optimization',
          'Week 3-4: FastAPI Serverless Microservices & API Architecture',
          'Week 5-6: Make.com & n8n Enterprise Workflow Automation Pipelines',
          'Week 7-8: Custom LLM Fine-tuning & Autonomous Agent Workflows',
          'Week 9-12: Live Production Capstone Deployment at Mohali Lab'
        ]);
      } else if (courseName.includes('Next.js')) {
        setGeneratedSyllabus([
          'Week 1-2: Next.js App Router, Server Components & Suspense',
          'Week 3-4: Tailwind CSS, Framer Motion & Responsive Enterprise UI',
          'Week 5-6: Supabase Auth, PostgreSQL & Row-Level Security (RLS)',
          'Week 7-8: Razorpay Payment Gateways & Edge Functions',
          'Week 9-12: Full SaaS Launch & Cloud Deployment on Vercel'
        ]);
      } else {
        setGeneratedSyllabus([
          'Week 1-2: Core Game Loop Architecture & 2D/3D Asset Optimization',
          'Week 3-4: Physics Engines, Collision Logic & Player State Machines',
          'Week 5-6: Multiplayer WebSockets & Cloud State Synchronization',
          'Week 7-8: Sound Engineering, Particle Effects & UI/UX Polish',
          'Week 9-12: Commercial Title Launch & Asset Store Distribution'
        ]);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-600 selection:text-white">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-purple-950/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="Sacred Mind Logo" 
                width={40} 
                height={40} 
                className="object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.45)]"
                priority
              />
            </div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-400 bg-clip-text text-transparent">
              Sacred Mind
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <Link href="#courses" className="hover:text-purple-400 transition">AI LMS & Academy</Link>
            <Link href="#services" className="hover:text-purple-400 transition">Services</Link>
            <Link href="#upranko" className="hover:text-purple-400 transition">Upranko Reviews</Link>
            <Link href="#contact" className="hover:text-purple-400 transition">Contact & Lab</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              href="#courses" 
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm transition shadow-lg shadow-purple-600/25"
            >
              Explore Academy
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/25 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-8">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>Next-Gen AI Tech Agency & Full-Stack LMS Ecosystem</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight max-w-5xl mx-auto leading-[1.15]">
            Engineering Intelligent Software. <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Empowering Future Tech Leaders.
            </span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Enterprise software development, automated workflow pipelines (Make/n8n), and game engineering alongside our AI-driven industrial training academy at Phase 8 Mohali.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#courses" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:opacity-95 transition flex items-center justify-center space-x-2 shadow-xl shadow-purple-600/30"
            >
              <BookOpen className="w-5 h-5" />
              <span>Browse AI Courses</span>
            </Link>
            <Link 
              href="#services" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-white font-bold transition flex items-center justify-center space-x-2"
            >
              <span>Agency Services</span>
              <ArrowRight className="w-5 h-5 text-purple-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* LMS COURSES & INDUSTRIAL TRAINING HUB */}
      <section id="courses" className="py-24 border-t border-purple-950/40 bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-semibold mb-3">
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>AI-Powered LMS Portal</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black">Industrial Training & Certified Academy</h2>
              <p className="mt-3 text-slate-400 max-w-xl">
                Hands-on practical training with dynamic AI syllabus generators, built-in in-video AI doubt solvers, and production project deployments.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-purple-400 font-mono bg-purple-950/60 px-3 py-1.5 rounded-lg border border-purple-800/50">
                ● Live Cohorts Enrolling Now
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Course Card 1 */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition p-6 flex flex-col justify-between group">
              <div>
                <div className="h-44 rounded-xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-500/20 mb-6 flex items-center justify-center relative overflow-hidden">
                  <Bot className="w-16 h-16 text-purple-400 group-hover:scale-110 transition duration-300" />
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-purple-600 text-white px-2.5 py-1 rounded-full uppercase tracking-wider">AI Powered</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Python & AI Automation</h3>
                <p className="text-slate-400 text-sm mb-4">Core Python, FastAPI microservices, Make.com, n8n automations, and autonomous LLM pipelines.</p>
                <div className="space-y-2 text-xs text-slate-300 mb-6">
                  <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /><span>Dynamic AI Syllabus Mapping</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /><span>In-Player AI Code Tutor</span></div>
                </div>
              </div>
              <button 
                onClick={() => handleGenerateSyllabus('Python & AI Automation Bootcamp')}
                className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-sm transition shadow-lg shadow-purple-600/20 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate AI Syllabus</span>
              </button>
            </div>

            {/* Course Card 2 */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/50 transition p-6 flex flex-col justify-between group">
              <div>
                <div className="h-44 rounded-xl bg-gradient-to-br from-pink-950/60 to-slate-900 border border-pink-500/20 mb-6 flex items-center justify-center relative overflow-hidden">
                  <Code2 className="w-16 h-16 text-pink-400 group-hover:scale-110 transition duration-300" />
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-pink-600 text-white px-2.5 py-1 rounded-full uppercase tracking-wider">Full Stack</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Next.js & Cloud Architecture</h3>
                <p className="text-slate-400 text-sm mb-4">Production full-stack engineering with Next.js App Router, Tailwind, Supabase, and Serverless API design.</p>
                <div className="space-y-2 text-xs text-slate-300 mb-6">
                  <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-pink-400" /><span>Live Client Production Tasks</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-pink-400" /><span>Phase 8 Mohali Practical Lab</span></div>
                </div>
              </div>
              <button 
                onClick={() => handleGenerateSyllabus('Next.js & Cloud Architecture')}
                className="w-full py-3.5 rounded-xl bg-pink-600 hover:bg-pink-500 font-bold text-sm transition shadow-lg shadow-pink-600/20 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate AI Syllabus</span>
              </button>
            </div>

            {/* Course Card 3 */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition p-6 flex flex-col justify-between group">
              <div>
                <div className="h-44 rounded-xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/20 mb-6 flex items-center justify-center relative overflow-hidden">
                  <Gamepad2 className="w-16 h-16 text-indigo-400 group-hover:scale-110 transition duration-300" />
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-indigo-600 text-white px-2.5 py-1 rounded-full uppercase tracking-wider">Creative Tech</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Game Design & Interactive Dev</h3>
                <p className="text-slate-400 text-sm mb-4">Physics mechanics, 2D/3D environment design, and modern high-speed interactive web applications.</p>
                <div className="space-y-2 text-xs text-slate-300 mb-6">
                  <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /><span>Portfolio-Ready Game Builds</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /><span>Direct Mentor Code Reviews</span></div>
                </div>
              </div>
              <button 
                onClick={() => handleGenerateSyllabus('Game Design & Interactive Dev')}
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm transition shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate AI Syllabus</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* AI SYLLABUS MODAL */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-purple-500/40 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative">
            <button 
              onClick={() => setSelectedCourse(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">{selectedCourse}</h3>
            </div>

            {generatingSyllabus ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm font-mono text-purple-300">AI Syllabus Engine synthesizing weekly breakdown...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                  ✓ AI-Verified Modular Curriculum
                </p>
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-2">
                  {generatedSyllabus?.map((item, index) => (
                    <div key={index} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-sm text-slate-200 flex items-start space-x-3">
                      <span className="text-purple-400 font-bold shrink-0">{index + 1}.</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                  <Link 
                    href="#contact" 
                    onClick={() => setSelectedCourse(null)}
                    className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-center text-sm text-white transition"
                  >
                    Enroll In This Batch
                  </Link>
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-sm text-slate-300 transition"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AGENCY SERVICES */}
      <section id="services" className="py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black">Enterprise Agency Capabilities</h2>
            <p className="mt-4 text-slate-400">High-impact engineering tailored for modern businesses and ambitious founders.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-purple-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Custom Software & Apps</h3>
              <p className="text-slate-400 text-sm">Full-cycle Next.js, React Native, and robust serverless backend engineering.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-pink-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-6">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">AI Workflow Automation</h3>
              <p className="text-slate-400 text-sm">Streamlined business operations using Make.com, n8n, and custom API pipelines.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Game Development</h3>
              <p className="text-slate-400 text-sm">Interactive 2D/3D games, gamified product interfaces, and interactive assets.</p>
            </div>

            <div id="upranko" className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-amber-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Upranko Review Engine</h3>
              <p className="text-slate-400 text-sm">AI reputation tracking, automated review collection, and brand sentiment optimization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* UPRANKO REPUTATION SPOTLIGHT */}
      <section className="py-20 border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-amber-950/20 via-slate-900 to-purple-950/20 border border-amber-500/30 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-semibold mb-4">
                <Star className="w-3.5 h-3.5" />
                <span>Upranko Review Engine</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-extrabold text-white">
                Supercharge Your Google & Local Business Ratings with AI
              </h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                Upranko automatically captures positive customer feedback, prevents negative churn with instant sentiment audits, and boosts your local search visibility.
              </p>
            </div>
            <Link 
              href="#contact" 
              className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition shadow-lg shadow-amber-500/20 shrink-0"
            >
              Get Free Reputation Audit
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT & LEAD CAPTURE FORM */}
      <section id="contact" className="py-24 border-t border-purple-950/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black">Get In Touch With Sacred Mind</h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              Whether you need to scale your company software, build an automated AI workflow, or enroll for hands-on industrial training at our Mohali facility.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-300">
              <div className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                <MapPin className="w-5 h-5 text-purple-400 shrink-0" />
                <span>Industrial Area, Phase 8, Sahibzada Ajit Singh Nagar, Punjab</span>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                <Mail className="w-5 h-5 text-purple-400 shrink-0" />
                <span>info@sacredmind.in</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Inquiry Received!</h4>
                <p className="text-sm text-slate-400">Our team from Phase 8 Mohali will connect with you shortly.</p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }} 
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your name" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Email or Phone</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="info@yourcompany.com / +91..." 
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Interested In</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-slate-300">
                    <option>AI LMS / Industrial Training Course</option>
                    <option>Custom Web & App Development</option>
                    <option>AI Workflow Automation (Make / n8n)</option>
                    <option>Game Development</option>
                    <option>Upranko Review Management</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Message</label>
                  <textarea 
                    rows={3} 
                    placeholder="Tell us about your project or course requirements..." 
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-white"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm transition shadow-lg shadow-purple-600/25"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-purple-950/40 bg-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-8 h-8">
                <Image 
                  src="/logo.png" 
                  alt="Sacred Mind Logo" 
                  width={32} 
                  height={32} 
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">Sacred Mind</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Industrial Area, Phase 8, Sahibzada Ajit Singh Nagar, Punjab.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Ecosystem</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#courses" className="hover:text-purple-400">AI LMS & Academy</Link></li>
              <li><Link href="#services" className="hover:text-purple-400">Software & Automation</Link></li>
              <li><Link href="#upranko" className="hover:text-purple-400">Upranko Reputation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Connect</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Phase 8 Industrial Area, Mohali, Punjab</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>info@sacredmind.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Sacred Mind. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
