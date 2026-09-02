'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, DollarSign, BookOpen, Sparkles, Copy, 
  Check, ArrowUpRight, TrendingUp, Plus, Video, 
  Wallet, Award, Clock, ChevronRight
} from 'lucide-react';

export default function TrainerPortal() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'payouts' | 'add-course'>('overview');

  // Dummy Trainer Profile (Will connect with Auth/Backend)
  const trainerData = {
    name: 'Harpreet Singh',
    handle: '@harpreet_ai',
    referralCode: 'HARPREET40',
    referralLink: 'https://sacredmind.in/courses?ref=harpreet40',
    commissionRate: '40% Lifetime',
    totalStudents: 142,
    totalEarnings: '₹42,850',
    pendingPayout: '₹14,200',
    tier: 'Silver Creator (40% Slab)',
    courses: [
      { id: 1, title: 'AI Tools & ChatGPT Earning Hacks', students: 94, price: '₹499', earned: '₹18,760', status: 'Live' },
      { id: 2, title: 'Instagram Growth & Viral Reels with AI', students: 48, price: '₹599', earned: '₹11,500', status: 'Live' },
    ]
  };

  // New Course Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('AI & Tech');
  const [newPrice, setNewPrice] = useState('₹499');
  const [videoLink, setVideoLink] = useState('');
  const [courseSubmitted, setCourseSubmitted] = useState(false);

  const copyReferral = () => {
    navigator.clipboard.writeText(trainerData.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setCourseSubmitted(true);
    setTimeout(() => {
      setCourseSubmitted(false);
      setActiveTab('courses');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-600 selection:text-white pb-20">
      
      {/* NAVBAR */}
      <header className="h-20 border-b border-purple-950/40 bg-slate-950/90 px-6 md:px-10 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Sacred Mind" width={36} height={36} className="object-contain" priority />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-lg text-white">Sacred Mind Creator Hub</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold border border-purple-500/30">
                Trainer & Influencer
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Welcome, {trainerData.name}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('add-course')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 font-bold text-xs text-white transition flex items-center space-x-1.5 shadow-lg shadow-purple-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Course</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8">
        
        {/* REFERRAL LINK BANNER */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-950 border border-purple-500/40 flex flex-col md:flex-row items-center justify-between gap-4 mb-8 shadow-xl">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950 px-2.5 py-1 rounded border border-purple-800/40">
              Your Lifetime Commission Link ({trainerData.commissionRate})
            </span>
            <h2 className="text-xl font-bold text-white mt-2">
              Share your link with your audience & earn on every enrollment
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Promo Code: <strong className="text-emerald-400 font-mono">{trainerData.referralCode}</strong> (Students get instant access, you get {trainerData.commissionRate} lifetime)
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input 
              readOnly 
              value={trainerData.referralLink} 
              className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 w-full md:w-64 font-mono select-all"
            />
            <button
              onClick={copyReferral}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold">Total Students Enrolled</span>
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-white">{trainerData.totalStudents}</div>
            <span className="text-[10px] text-emerald-400 font-bold mt-1 inline-block">↑ 24 this week</span>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold">Total Lifetime Earnings</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">{trainerData.totalEarnings}</div>
            <span className="text-[10px] text-slate-500 font-mono">Commission Share: 40%</span>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold">Pending Wallet Payout</span>
              <Wallet className="w-5 h-5 text-pink-400" />
            </div>
            <div className="text-3xl font-black text-white">{trainerData.pendingPayout}</div>
            <button className="mt-2 text-[11px] text-purple-400 hover:text-purple-300 font-bold underline">
              Request Bank Transfer →
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold">Creator Tier</span>
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-lg font-bold text-amber-300">{trainerData.tier}</div>
            <span className="text-[10px] text-slate-400 block mt-1">Next Slab: Gold at 200+ students (50%)</span>
          </div>
        </div>

        {/* TABS */}
        <div className="border-b border-slate-800 flex space-x-6 text-sm font-semibold mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 border-b-2 transition ${activeTab === 'overview' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            Audience & Sales Activity
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`pb-3 border-b-2 transition ${activeTab === 'courses' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            My Published Courses ({trainerData.courses.length})
          </button>
          <button
            onClick={() => setActiveTab('add-course')}
            className={`pb-3 border-b-2 transition ${activeTab === 'add-course' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            + Submit New Course
          </button>
        </div>

        {/* TAB 1: OVERVIEW & RECENT COMMISSIONS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4">Recent Student Commission Log</h3>
              <div className="space-y-3">
                {[
                  { student: 'Simranjeet Kaur', course: 'AI Tools & ChatGPT Earning Hacks', date: 'Today, 11:20 AM', amount: '+ ₹199.60', status: 'Credited' },
                  { student: 'Rahul Verma', course: 'Instagram Growth & Viral Reels', date: 'Yesterday', amount: '+ ₹239.60', status: 'Credited' },
                  { student: 'Aman Deep', course: 'AI Tools & ChatGPT Earning Hacks', date: '01 Sep 2026', amount: '+ ₹199.60', status: 'Credited' },
                  { student: 'Priya Sharma', course: 'Instagram Growth & Viral Reels', date: '30 Aug 2026', amount: '+ ₹239.60', status: 'Credited' },
                ].map((log, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-white text-sm block">{log.student}</strong>
                      <span className="text-slate-400">{log.course} • {log.date}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-black text-sm block">{log.amount}</span>
                      <span className="text-[10px] text-purple-400 font-mono">{log.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY COURSES */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainerData.courses.map((c) => (
              <div key={c.id} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {c.status}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-2">{c.title}</h4>
                    <span className="text-xs text-slate-400">Course Price: {c.price}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Your Students</span>
                    <strong className="text-white text-base">{c.students}</strong>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Your Commission</span>
                    <strong className="text-emerald-400 text-base">{c.earned}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: SUBMIT NEW COURSE (FOR TRAINERS) */}
        {activeTab === 'add-course' && (
          <div className="max-w-2xl bg-slate-900/60 border border-purple-500/30 rounded-3xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-1">Submit Course for Sacred Mind Hosting</h3>
            <p className="text-xs text-slate-400 mb-6">
              Upload your video series (Unlisted YouTube or Google Drive link). Once approved by Super Admin, it will go live with your commission code.
            </p>

            {courseSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-base">Course Submitted For Review!</h4>
                <p className="text-xs text-slate-400">Sacred Mind Admin team will verify and activate your commission within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitCourse} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Freelancing with AI & Canva Mastery"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-purple-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 outline-none"
                    >
                      <option>AI & Tech</option>
                      <option>Content & Instagram</option>
                      <option>Languages</option>
                      <option>Finance & Stocks</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Suggested Price</label>
                    <input
                      type="text"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="₹499"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Lectures Video Playlist Link (YouTube Unlisted)</label>
                  <input
                    type="text"
                    required
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    placeholder="https://www.youtube.com/playlist?list=... or video link"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-xs text-white transition shadow-lg shadow-purple-600/25"
                >
                  Submit Course for Sacred Mind Listing
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
