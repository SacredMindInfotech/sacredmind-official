'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Code2, Bot, Gamepad2, Star, BookOpen, Sparkles, 
  ArrowRight, CheckCircle2, MapPin, Mail, BrainCircuit, 
  Globe, ArrowUpRight, Check, Send, MessageCircle
} from 'lucide-react';

export default function Home() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [interest, setInterest] = useState('AI Programs & Industrial Training');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Direct WhatsApp Message Trigger for 100% Guaranteed Lead Delivery
    const waText = encodeURIComponent(`*New Sacred Mind Inquiry*\n\n*Name:* ${name}\n*Contact:* ${contact}\n*Interested In:* ${interest}\n*Message:* ${message || 'N/A'}`);
    window.open(`https://wa.me/919876543210?text=${waText}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-600 selection:text-white">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-purple-950/40">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative w-14 h-14 flex items-center justify-center transition-transform group-hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="Sacred Mind Logo" 
                width={56} 
                height={56} 
                className="object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                priority
              />
            </div>
            <span className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-400 bg-clip-text text-transparent">
              Sacred Mind
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <Link href="/courses" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition flex items-center space-x-1">
              <span>AI LMS & Courses</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
            </Link>
            <Link href="#services" className="hover:text-purple-400 transition">Services</Link>
            <Link href="#upranko" className="hover:text-purple-400 transition">Upranko Reviews</Link>
            <Link href="#contact" className="hover:text-purple-400 transition">Phase 8 Mohali</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              href="/courses" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm transition shadow-lg shadow-purple-600/30 flex items-center space-x-2"
            >
              <span>Explore All Courses</span>
              <ArrowUpRight className="w-4 h-4" />
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
            Enterprise software development, automated workflow pipelines (Make/n8n), and game engineering alongside our dedicated AI & Language industrial training academy at Phase 8 Mohali.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/courses" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:opacity-95 transition flex items-center justify-center space-x-2 shadow-xl shadow-purple-600/30"
            >
              <BookOpen className="w-5 h-5" />
              <span>Browse AI & Language Courses</span>
              <ArrowUpRight className="w-4 h-4" />
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

      {/* AI LMS ACADEMY SPOTLIGHT */}
      <section className="py-20 border-t border-purple-950/40 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-950/30 via-slate-900 to-slate-950 border border-purple-500/30 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-semibold mb-4">
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>AI LMS & Language Academy</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Industry-Ready AI & Global Language Academy
              </h2>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                Explore our 9 specialized programs in Python & AI Automations, Machine Learning, Data Science, and AI-accelerated language programs (English, Punjabi, French, Dutch) with live syllabus generation and instant classroom access.
              </p>
            </div>
            <Link 
              href="/courses" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold text-sm transition shadow-lg shadow-purple-600/30 flex items-center space-x-2 shrink-0"
            >
              <span>Open Courses Catalog</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

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

      {/* CONTACT FORM */}
      <section id="contact" className="py-24 border-t border-purple-950/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black">Get In Touch With Sacred Mind</h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              Whether you need to scale your company software, build an automated AI workflow, or enroll for hands-on practical training at our Mohali facility.
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
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Inquiry Forwarded!</h4>
                <p className="text-sm text-slate-400">Our team from Phase 8 Mohali will connect with you immediately.</p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Email or Phone</label>
                  <input 
                    type="text" 
                    required 
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="info@yourcompany.com / +91..." 
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Interested In</label>
                  <select 
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-slate-300"
                  >
                    <option>AI Programs & Industrial Training</option>
                    <option>AI Language Academy (English/Punjabi/French/Dutch)</option>
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your requirements..." 
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-white"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm transition shadow-lg shadow-purple-600/25 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Inquiry (Instant Connect)</span>
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
              <div className="relative w-10 h-10">
                <Image 
                  src="/logo.png" 
                  alt="Sacred Mind Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold">Sacred Mind</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Industrial Area, Phase 8, Sahibzada Ajit Singh Nagar, Punjab.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Ecosystem</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/courses" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 flex items-center space-x-1">
                  <span>AI Courses & Language Academy</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
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
