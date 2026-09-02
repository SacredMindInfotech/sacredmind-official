'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, DollarSign, BookOpen, Plus, Trash2, 
  CheckCircle2, ShieldCheck, ArrowUpRight, TrendingUp,
  Percent, ArrowLeft, Send, Video, Save, Check
} from 'lucide-react';

interface Trainer {
  id: string;
  name: string;
  code: string;
  commissionRate: number;
  totalReferred: number;
  totalEarned: string;
  pendingPayout: string;
  status: 'Active' | 'Pending';
}

interface CourseItem {
  id: string;
  title: string;
  price: string;
  category: string;
  videoUrl: string;
  episodes: number;
}

export default function SuperAdmin() {
  const [activeTab, setActiveTab] = useState<'trainers' | 'courses' | 'payouts'>('trainers');
  
  // Trainers Pool
  const [trainers, setTrainers] = useState<Trainer[]>([
    { id: '1', name: 'Harpreet Singh', code: 'HARPREET40', commissionRate: 40, totalReferred: 142, totalEarned: '₹42,850', pendingPayout: '₹14,200', status: 'Active' },
    { id: '2', name: 'Simran Kaur (Creator)', code: 'SIMRAN35', commissionRate: 35, totalReferred: 88, totalEarned: '₹22,100', pendingPayout: '₹7,500', status: 'Active' },
    { id: '3', name: 'Rohan Tech (Influencer)', code: 'ROHAN50', commissionRate: 50, totalReferred: 310, totalEarned: '₹95,400', pendingPayout: '₹28,000', status: 'Active' },
  ]);

  // Courses Pool
  const [courses, setCourses] = useState<CourseItem[]>([
    { id: 'ai-tools-hacks', title: 'AI Tools & ChatGPT Earning Hacks', price: '₹499', category: 'AI & Tech', videoUrl: 'https://youtube.com/...', episodes: 14 },
    { id: 'reels-growth-ai', title: 'Instagram Growth & Viral Reels with AI', price: '₹599', category: 'Growth', videoUrl: 'https://youtube.com/...', episodes: 15 },
    { id: 'lang-punjabi', title: 'Punjabi Speaking & Cultural Fluency', price: '₹499', category: 'Languages', videoUrl: 'https://youtube.com/...', episodes: 12 },
    { id: 'lang-english', title: 'Daily English Speaking & Fluency', price: '₹699', category: 'Languages', videoUrl: 'https://youtube.com/...', episodes: 20 },
  ]);

  // Form States
  const [trainerName, setTrainerName] = useState('');
  const [trainerCode, setTrainerCode] = useState('');
  const [trainerRate, setTrainerRate] = useState(40);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState('₹499');
  const [courseCategory, setCourseCategory] = useState('AI & Tech');
  const [courseVideo, setCourseVideo] = useState('');

  const [notification, setNotification] = useState('');

  const handleAddTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    const newT: Trainer = {
      id: String(Date.now()),
      name: trainerName,
      code: trainerCode.toUpperCase(),
      commissionRate: Number(trainerRate),
      totalReferred: 0,
      totalEarned: '₹0',
      pendingPayout: '₹0',
      status: 'Active'
    };
    setTrainers([...trainers, newT]);
    setTrainerName('');
    setTrainerCode('');
    setNotification(`Trainer code ${newT.code} created successfully!`);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = courseTitle.toLowerCase().replace(/\s+/g, '-');
    const newC: CourseItem = {
      id: cleanId,
      title: courseTitle,
      price: coursePrice,
      category: courseCategory,
      videoUrl: courseVideo,
      episodes: 12
    };
    setCourses([...courses, newC]);
    setCourseTitle('');
    setCourseVideo('');
    setNotification(`Course "${newC.title}" published!`);
    setTimeout(() => setNotification(''), 3000);
  };

  const handlePayTrainer = (id: string) => {
    setTrainers(trainers.map(t => t.id === id ? { ...t, pendingPayout: '₹0' } : t));
    alert('Payout marked as TRANSFERRED to Trainer Bank Account!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-10 selection:bg-purple-600 selection:text-white pb-24">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-purple-950/40">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Sacred Mind" width={40} height={40} className="object-contain" priority />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-white">Sacred Mind Super Admin</h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30">
                Master Control
              </span>
            </div>
            <p className="text-xs text-slate-400">Manage Course Inventory, Influencer Lifetime Commissions & Payouts</p>
          </div>
        </div>

        {/* FIXED ABSOLUTE EXTERNAL URLS (PREVENTS 404) */}
        <div className="flex items-center space-x-3">
          <a
            href="https://trainer.sacredmind.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-purple-950/60 border border-purple-600/40 text-xs font-bold text-purple-300 hover:bg-purple-900/60 transition flex items-center space-x-1"
          >
            <span>Open Trainer Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.sacredmind.in/courses"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition"
          >
            Live Site ↗
          </a>
        </div>
      </div>

      {notification && (
        <div className="max-w-7xl mx-auto mt-4 p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* OVERVIEW STATS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Platform Revenue (Gross)</span>
          <div className="text-3xl font-black text-white">₹3,48,200</div>
          <span className="text-[10px] text-emerald-400 font-bold">540 Total Enrollments</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Trainer Commission Disbursed</span>
          <div className="text-3xl font-black text-emerald-400">₹1,60,350</div>
          <span className="text-[10px] text-slate-400 font-mono">Average 40% Creator Share</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Pending Creator Payouts</span>
          <div className="text-3xl font-black text-pink-400">₹49,700</div>
          <span className="text-[10px] text-purple-300 font-bold">Ready for bank release</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Active Influencer / Trainers</span>
          <div className="text-3xl font-black text-purple-400">{trainers.length} Creators</div>
          <span className="text-[10px] text-emerald-400 font-bold">All codes active</span>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto border-b border-slate-800 flex space-x-6 text-sm font-semibold mb-6">
        <button
          onClick={() => setActiveTab('trainers')}
          className={`pb-3 border-b-2 transition ${activeTab === 'trainers' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Trainers & Commission Rules ({trainers.length})
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-3 border-b-2 transition ${activeTab === 'courses' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Courses & Video Manager ({courses.length})
        </button>
      </div>

      {/* TAB 1: TRAINERS */}
      {activeTab === 'trainers' && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-slate-900/60 border border-purple-500/30 rounded-3xl p-6 h-fit space-y-4">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm border-b border-slate-800 pb-3">
              <Plus className="w-4 h-4" />
              <span>Onboard Trainer / Influencer</span>
            </div>

            <form onSubmit={handleAddTrainer} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Trainer / Influencer Name</label>
                <input
                  type="text"
                  required
                  value={trainerName}
                  onChange={(e) => setTrainerName(e.target.value)}
                  placeholder="e.g. Aman Sharma"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Referral Code (Unique Coupon)</label>
                <input
                  type="text"
                  required
                  value={trainerCode}
                  onChange={(e) => setTrainerCode(e.target.value)}
                  placeholder="AMAN40"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white uppercase focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Lifetime Commission Percentage</label>
                <select
                  value={trainerRate}
                  onChange={(e) => setTrainerRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 outline-none"
                >
                  <option value={30}>30% Revenue Share (Bronze)</option>
                  <option value={40}>40% Revenue Share (Silver)</option>
                  <option value={50}>50% Revenue Share (Gold)</option>
                  <option value={60}>60% Revenue Share (Top Partner)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition shadow-lg shadow-purple-600/20"
              >
                Issue Commission Code & Access
              </button>
            </form>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {trainers.map((t) => (
              <div key={t.id} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-white">{t.name}</h3>
                      <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800/40">
                        Code: {t.code}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">Assigned Commission: <strong className="text-emerald-400">{t.commissionRate}% Lifetime</strong></span>
                  </div>

                  <span className="text-xs text-slate-400">Total Referred: <strong className="text-white">{t.totalReferred} Students</strong></span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Total Earned</span>
                    <strong className="text-emerald-400 text-sm">{t.totalEarned}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Pending Payout</span>
                    <strong className="text-pink-400 text-sm">{t.pendingPayout}</strong>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex items-center justify-end">
                    {t.pendingPayout !== '₹0' ? (
                      <button
                        onClick={() => handlePayTrainer(t.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                      >
                        Release Payout ✓
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-mono">All Settled ✓</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: COURSES & VIDEOS */}
      {activeTab === 'courses' && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-slate-900/60 border border-purple-500/30 rounded-3xl p-6 h-fit space-y-4">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm border-b border-slate-800 pb-3">
              <Plus className="w-4 h-4" />
              <span>Add / Publish Micro-Course</span>
            </div>

            <form onSubmit={handleAddCourse} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="e.g. WhatsApp Automation Mastery"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Rate / Price</label>
                  <input
                    type="text"
                    required
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(e.target.value)}
                    placeholder="₹499"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                  <select
                    value={courseCategory}
                    onChange={(e) => setCourseCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 outline-none"
                  >
                    <option>AI & Tech</option>
                    <option>Growth & Reels</option>
                    <option>Languages</option>
                    <option>Finance & Crypto</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">YouTube Unlisted Video / Playlist Link</label>
                <input
                  type="text"
                  required
                  value={courseVideo}
                  onChange={(e) => setCourseVideo(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold text-white transition shadow-lg shadow-purple-600/20"
              >
                Publish Course Live
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {courses.map((c) => (
              <div key={c.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded">
                    {c.category}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">{c.title}</h4>
                  <span className="text-xs text-slate-400">{c.episodes} Episodes • YouTube Linked</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-emerald-400 block">{c.price}</span>
                  <a
                    href={`https://www.sacredmind.in/learn/${c.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-purple-400 hover:underline"
                  >
                    Preview LMS →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
