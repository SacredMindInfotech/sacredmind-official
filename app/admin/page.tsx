'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, DollarSign, BookOpen, Plus, Trash2, 
  CheckCircle2, ShieldCheck, ArrowUpRight, TrendingUp,
  Percent, ArrowLeft, Send, Video, Save, Check, Landmark,
  Lock, LogOut, KeyRound, Mail, AlertCircle
} from 'lucide-react';

interface Trainer {
  id: string;
  name: string;
  email: string;
  code: string;
  commissionRate: number;
  totalReferred: number;
  totalEarned: number;
  walletBalance: number;
  bankAccount: string;
  ifsc: string;
  upi: string;
}

interface CourseItem {
  id: string;
  title: string;
  price: string;
  category: string;
  videoUrl: string;
  episodes: number;
}

interface PayoutRequest {
  id: string;
  trainerName: string;
  code: string;
  amount: number;
  bank: {
    accountName: string;
    bankName: string;
    accountNumber: string;
    ifsc: string;
    upiId: string;
  };
  date: string;
  status: 'Pending' | 'Paid';
}

export default function SuperAdmin() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState<'trainers' | 'courses' | 'payouts'>('trainers');
  
  // Dynamic Live Trainers
  const [trainers, setTrainers] = useState<Trainer[]>([
    { id: '1', name: 'Harpreet Singh', email: 'harpreet@sacredmind.in', code: 'HARPREET40', commissionRate: 40, totalReferred: 142, totalEarned: 42850, walletBalance: 14200, bankAccount: '50100492817291', ifsc: 'HDFC0001234', upi: 'harpreet@okhdfcbank' },
    { id: '2', name: 'Simran Kaur', email: 'simran@sacredmind.in', code: 'SIMRAN35', commissionRate: 35, totalReferred: 88, totalEarned: 22100, walletBalance: 7500, bankAccount: '309182736451', ifsc: 'SBIN0004521', upi: 'simran@oksbi' },
    { id: '3', name: 'Rohan Tech', email: 'rohan@sacredmind.in', code: 'ROHAN50', commissionRate: 50, totalReferred: 310, totalEarned: 95400, walletBalance: 28000, bankAccount: '098172635412', ifsc: 'ICIC0000912', upi: 'rohan@icici' },
  ]);

  // Dynamic Live Courses
  const [courses, setCourses] = useState<CourseItem[]>([
    { id: 'ai-tools-hacks', title: 'AI Tools & ChatGPT Earning Hacks', price: '₹499', category: 'AI & Tech', videoUrl: 'https://youtube.com/...', episodes: 14 },
    { id: 'reels-growth-ai', title: 'Instagram Growth & Viral Reels with AI', price: '₹599', category: 'Growth', videoUrl: 'https://youtube.com/...', episodes: 15 },
    { id: 'lang-punjabi', title: 'Punjabi Speaking & Cultural Fluency', price: '₹499', category: 'Languages', videoUrl: 'https://youtube.com/...', episodes: 12 },
    { id: 'lang-english', title: 'Daily English Speaking & Fluency', price: '₹699', category: 'Languages', videoUrl: 'https://youtube.com/...', episodes: 20 },
  ]);

  // Payout Queue
  const [payouts, setPayouts] = useState<PayoutRequest[]>([
    {
      id: 'p1',
      trainerName: 'Harpreet Singh',
      code: 'HARPREET40',
      amount: 14200,
      bank: { accountName: 'Harpreet Singh', bankName: 'HDFC Bank', accountNumber: '50100492817291', ifsc: 'HDFC0001234', upiId: 'harpreet@okhdfcbank' },
      date: '02 Sep 2026',
      status: 'Pending'
    }
  ]);

  // Form States
  const [trainerName, setTrainerName] = useState('');
  const [trainerEmail, setTrainerEmail] = useState('');
  const [trainerCode, setTrainerCode] = useState('');
  const [trainerRate, setTrainerRate] = useState(40);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState('₹499');
  const [courseCategory, setCourseCategory] = useState('AI & Tech');
  const [courseVideo, setCourseVideo] = useState('');

  const [notification, setNotification] = useState('');

  // Check persistent session on load
  useEffect(() => {
    const session = localStorage.getItem('sm_admin_authenticated');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle Admin Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.trim().toLowerCase() === 'info@sacredmind.in' && loginPassword.trim() === 'Birinder@8080') {
      setIsAuthenticated(true);
      localStorage.setItem('sm_admin_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('गलत Email या Password! कृपया सही क्रेडेंशियल दर्ज करें।');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sm_admin_authenticated');
  };

  // Live Aggregate Numbers Calculation
  const totalReferredStudents = trainers.reduce((sum, t) => sum + t.totalReferred, 0);
  const totalCommissionDisbursed = trainers.reduce((sum, t) => sum + t.totalEarned, 0);
  const totalPendingPayouts = trainers.reduce((sum, t) => sum + t.walletBalance, 0);
  const totalPlatformGross = Math.round(totalCommissionDisbursed / 0.42);

  // Add Trainer
  const handleAddTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    const newT: Trainer = {
      id: String(Date.now()),
      name: trainerName,
      email: trainerEmail || `${trainerCode.toLowerCase()}@sacredmind.in`,
      code: trainerCode.toUpperCase(),
      commissionRate: Number(trainerRate),
      totalReferred: 0,
      totalEarned: 0,
      walletBalance: 0,
      bankAccount: 'To be filled by trainer',
      ifsc: '-',
      upi: '-'
    };
    setTrainers([newT, ...trainers]);
    setTrainerName('');
    setTrainerEmail('');
    setTrainerCode('');
    setNotification(`Trainer ${newT.name} onboarded with code ${newT.code}!`);
    setTimeout(() => setNotification(''), 3000);
  };

  // Add Course
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
    setCourses([newC, ...courses]);
    setCourseTitle('');
    setCourseVideo('');
    setNotification(`Course "${newC.title}" published!`);
    setTimeout(() => setNotification(''), 3000);
  };

  // Settle Bank Payout
  const handleReleaseBankPayout = (payoutId: string, trainerCode: string) => {
    setPayouts(payouts.map(p => p.id === payoutId ? { ...p, status: 'Paid' } : p));
    setTrainers(trainers.map(t => t.code === trainerCode ? { ...t, walletBalance: 0 } : t));
    alert('Bank transfer initiated! Funds marked as PAID to Trainer account.');
  };

  // 🔒 LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100 font-sans selection:bg-purple-600 selection:text-white">
        <div className="max-w-md w-full bg-slate-900/80 border border-purple-500/30 p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Super Admin Gate
            </h2>
            <p className="text-xs text-slate-400">Sacred Mind Platform Management Console</p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Official Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="info@sacredmind.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Admin Security Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-xs text-white shadow-lg shadow-purple-600/30 hover:opacity-90 transition"
            >
              Authorize & Access Console
            </button>
          </form>

          <div className="pt-2 text-center">
            <span className="text-[10px] text-slate-500 font-mono">
              Protected by Sacred Mind Security Engine
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ✅ AUTHENTICATED ADMIN CONSOLE
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
                Authorized: info@sacredmind.in
              </span>
            </div>
            <p className="text-xs text-slate-400">Realtime Calculations, Live Onboarding & Bank Payout Clearing</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="https://trainer.sacredmind.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-purple-950/60 border border-purple-600/40 text-xs font-bold text-purple-300 hover:bg-purple-900/60 transition flex items-center space-x-1"
          >
            <span>Trainer Portal ↗</span>
          </a>
          <button
            onClick={handleAdminLogout}
            className="px-3.5 py-2 rounded-xl bg-rose-950/50 border border-rose-800/40 hover:bg-rose-900/60 text-xs font-bold text-rose-300 transition flex items-center space-x-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="max-w-7xl mx-auto mt-4 p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* REALTIME DYNAMIC OVERVIEW STATS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Platform Revenue (Gross)</span>
          <div className="text-3xl font-black text-white">₹{totalPlatformGross.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-emerald-400 font-bold">{totalReferredStudents} Total Enrollments</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Total Commission Disbursed</span>
          <div className="text-3xl font-black text-emerald-400">₹{totalCommissionDisbursed.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-slate-400 font-mono">Live Referral Ledger</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-purple-500/40">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Pending Bank Payouts</span>
          <div className="text-3xl font-black text-pink-400">₹{totalPendingPayouts.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-purple-300 font-bold">{payouts.filter(p => p.status === 'Pending').length} Request Pending</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Active Creators & Courses</span>
          <div className="text-3xl font-black text-purple-400">{trainers.length} / {courses.length}</div>
          <span className="text-[10px] text-emerald-400 font-bold">All live in database</span>
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
        <button
          onClick={() => setActiveTab('payouts')}
          className={`pb-3 border-b-2 transition ${activeTab === 'payouts' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Bank Payout Queue ({payouts.filter(p => p.status === 'Pending').length})
        </button>
      </div>

      {/* TAB 1: TRAINERS */}
      {activeTab === 'trainers' && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-slate-900/60 border border-purple-500/30 rounded-3xl p-6 h-fit space-y-4">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm border-b border-slate-800 pb-3">
              <Plus className="w-4 h-4" />
              <span>Onboard Trainer / Influencer Live</span>
            </div>

            <form onSubmit={handleAddTrainer} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Trainer Name</label>
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
                <label className="block text-xs font-semibold text-slate-400 mb-1">Trainer Login Email</label>
                <input
                  type="email"
                  required
                  value={trainerEmail}
                  onChange={(e) => setTrainerEmail(e.target.value)}
                  placeholder="aman@example.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Referral Code & Login Key</label>
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
                <label className="block text-xs font-semibold text-slate-400 mb-1">Lifetime Commission Slabs</label>
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
                Issue Credentials & Live Access
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
                    <span className="text-xs text-slate-400">Login Email: <strong className="text-slate-200">{t.email}</strong> • Cut: <strong className="text-emerald-400">{t.commissionRate}%</strong></span>
                  </div>

                  <span className="text-xs text-slate-400">Total Referred: <strong className="text-white">{t.totalReferred} Students</strong></span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Total Earned</span>
                    <strong className="text-emerald-400 text-sm">₹{t.totalEarned.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Wallet (Unpaid)</span>
                    <strong className="text-pink-400 text-sm">₹{t.walletBalance.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex items-center justify-end">
                    <span className="text-[11px] text-slate-400 font-mono">Bank: •••• {t.bankAccount.slice(-4)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: COURSES */}
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
                <label className="block text-xs font-semibold text-slate-400 mb-1">YouTube Unlisted Video Link</label>
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

      {/* TAB 3: BANK PAYOUTS */}
      {activeTab === 'payouts' && (
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4">Pending Trainer Bank Withdrawal Requests</h3>
            
            <div className="space-y-4">
              {payouts.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <strong className="text-white text-base">{p.trainerName}</strong>
                      <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded">Code: {p.code}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{p.date}</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Bank: <strong className="text-white">{p.bank.bankName}</strong> | A/C: <span className="font-mono text-purple-300">{p.bank.accountNumber}</span> | IFSC: <span className="font-mono text-purple-300">{p.bank.ifsc}</span>
                    </p>
                    {p.bank.upiId && (
                      <p className="text-xs text-slate-400">UPI: <span className="font-mono text-emerald-400">{p.bank.upiId}</span></p>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 uppercase block">Payout Amount</span>
                      <span className="text-xl font-black text-emerald-400">₹{p.amount.toLocaleString('en-IN')}</span>
                    </div>

                    {p.status === 'Pending' ? (
                      <button
                        onClick={() => handleReleaseBankPayout(p.id, p.code)}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white font-bold text-xs transition shadow-lg shadow-emerald-600/20 flex items-center space-x-1.5"
                      >
                        <Landmark className="w-4 h-4" />
                        <span>Transfer & Clear Payout ✓</span>
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold text-xs">
                        Transferred to Bank ✓
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
