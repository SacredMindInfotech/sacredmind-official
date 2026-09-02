'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, DollarSign, BookOpen, Sparkles, Copy, 
  Check, ArrowUpRight, TrendingUp, Plus, Video, 
  Wallet, Award, Clock, ChevronRight, Landmark, AlertCircle
} from 'lucide-react';

interface BankDetails {
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  upiId: string;
}

interface TrainerProfile {
  name: string;
  code: string;
  commissionRate: number;
  totalStudents: number;
  totalEarnings: number;
  walletBalance: number;
  bankDetails: BankDetails;
}

export default function TrainerPortal() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'wallet' | 'bank' | 'add-course'>('overview');
  
  // Live Profile State
  const [profile, setProfile] = useState<TrainerProfile>({
    name: 'Harpreet Singh',
    code: 'HARPREET40',
    commissionRate: 40,
    totalStudents: 142,
    totalEarnings: 42850,
    walletBalance: 14200,
    bankDetails: {
      accountName: 'Harpreet Singh',
      bankName: 'HDFC Bank',
      accountNumber: '50100492817291',
      ifsc: 'HDFC0001234',
      upiId: 'harpreet@okhdfcbank'
    }
  });

  // Local Form States
  const [bankForm, setBankForm] = useState<BankDetails>(profile.bankDetails);
  const [payoutRequested, setPayoutRequested] = useState(false);
  const [notification, setNotification] = useState('');

  // Course Submission Form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('AI & Tech');
  const [newPrice, setNewPrice] = useState('₹499');
  const [videoLink, setVideoLink] = useState('');
  const [courseSubmitted, setCourseSubmitted] = useState(false);

  // Sync with global shared storage
  useEffect(() => {
    const savedProfile = localStorage.getItem('sm_trainer_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        setBankForm(parsed.bankDetails);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const copyReferral = () => {
    const link = `https://www.sacredmind.in/courses?ref=${profile.code.toLowerCase()}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Save Bank Details
  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...profile, bankDetails: bankForm };
    setProfile(updated);
    localStorage.setItem('sm_trainer_profile', JSON.stringify(updated));
    setNotification('Bank & UPI details successfully linked!');
    setTimeout(() => setNotification(''), 3000);
  };

  // Request Payout
  const handleRequestPayout = () => {
    if (profile.walletBalance <= 0) {
      alert('Wallet balance is 0.');
      return;
    }
    if (!profile.bankDetails.accountNumber && !profile.bankDetails.upiId) {
      alert('Please fill your Bank Account or UPI details first!');
      setActiveTab('bank');
      return;
    }

    // Push request to shared admin payout queue
    const payoutReq = {
      id: String(Date.now()),
      trainerName: profile.name,
      code: profile.code,
      amount: profile.walletBalance,
      bank: profile.bankDetails,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending'
    };

    const existingReqs = JSON.parse(localStorage.getItem('sm_payout_requests') || '[]');
    localStorage.setItem('sm_payout_requests', JSON.stringify([payoutReq, ...existingReqs]));

    setPayoutRequested(true);
    setNotification('Payout request sent to Super Admin for Bank Transfer!');
    setTimeout(() => setNotification(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-600 selection:text-white pb-24">
      
      {/* NAVBAR */}
      <header className="h-20 border-b border-purple-950/40 bg-slate-950/90 px-6 md:px-10 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Sacred Mind" width={36} height={36} className="object-contain" priority />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-lg text-white">Sacred Mind Creator Hub</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold border border-purple-500/30">
                Live Wallet Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Welcome, {profile.name}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="https://www.sacredmind.in/courses"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition"
          >
            Live Catalog ↗
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8">
        
        {notification && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-2">
            <Check className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* REFERRAL LINK BANNER */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-950 border border-purple-500/40 flex flex-col md:flex-row items-center justify-between gap-4 mb-8 shadow-xl">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950 px-2.5 py-1 rounded border border-purple-800/40">
              Your Referral Code: {profile.code} ({profile.commissionRate}% Lifetime Cut)
            </span>
            <h2 className="text-xl font-bold text-white mt-2">
              Share link with students. Commission automatically enters your wallet.
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live link: <span className="text-purple-300 font-mono">https://www.sacredmind.in/courses?ref={profile.code.toLowerCase()}</span>
            </p>
          </div>

          <button
            onClick={copyReferral}
            className="px-5 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-lg shadow-purple-600/20 shrink-0"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Copy Referral Link'}</span>
          </button>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold">Total Referred Students</span>
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-white">{profile.totalStudents}</div>
            <span className="text-[10px] text-emerald-400 font-bold mt-1 inline-block">Realtime Verified</span>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold">Total Lifetime Commission</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">₹{profile.totalEarnings.toLocaleString('en-IN')}</div>
            <span className="text-[10px] text-slate-500 font-mono">{profile.commissionRate}% Revenue Share</span>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-purple-500/40 shadow-lg shadow-purple-950/40">
            <div className="flex items-center justify-between text-purple-300 mb-3">
              <span className="text-xs font-semibold">Ready Wallet Balance</span>
              <Wallet className="w-5 h-5 text-pink-400" />
            </div>
            <div className="text-3xl font-black text-white">₹{profile.walletBalance.toLocaleString('en-IN')}</div>
            <button 
              onClick={handleRequestPayout}
              disabled={profile.walletBalance <= 0 || payoutRequested}
              className="mt-3 w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition shadow"
            >
              {payoutRequested ? 'Request Sent ✓' : 'Withdraw to Bank →'}
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold">Linked Bank Account</span>
              <Landmark className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-sm font-bold text-white line-clamp-1">{profile.bankDetails.bankName || 'Not Set'}</div>
            <span className="text-[10px] text-slate-400 block mt-1 font-mono">
              A/C: •••• {profile.bankDetails.accountNumber ? profile.bankDetails.accountNumber.slice(-4) : 'None'}
            </span>
          </div>
        </div>

        {/* TABS */}
        <div className="border-b border-slate-800 flex space-x-6 text-sm font-semibold mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 border-b-2 transition ${activeTab === 'overview' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            Live Referral Logs
          </button>
          <button
            onClick={() => setActiveTab('bank')}
            className={`pb-3 border-b-2 transition ${activeTab === 'bank' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            Bank & UPI Settings
          </button>
          <button
            onClick={() => setActiveTab('add-course')}
            className={`pb-3 border-b-2 transition ${activeTab === 'add-course' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            + Upload Course Series
          </button>
        </div>

        {/* TAB 1: LOGS */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4">Realtime Commission Feed (Student Purchases)</h3>
              <div className="space-y-3">
                {[
                  { student: 'Gurpreet Singh', course: 'AI Tools & ChatGPT Earning Hacks', date: 'Today, 01:05 PM', cut: '+ ₹199.60', status: 'In Wallet' },
                  { student: 'Aman Deep', course: 'Instagram Growth & Viral Reels', date: 'Today, 11:20 AM', cut: '+ ₹239.60', status: 'In Wallet' },
                  { student: 'Rahul Sharma', course: 'Punjabi Speaking & Cultural Fluency', date: 'Yesterday', cut: '+ ₹199.60', status: 'In Wallet' },
                ].map((log, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-white text-sm block">{log.student}</strong>
                      <span className="text-slate-400">{log.course} • {log.date}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-black text-sm block">{log.cut}</span>
                      <span className="text-[10px] text-purple-400 font-mono">{log.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BANK & UPI DETAILS */}
        {activeTab === 'bank' && (
          <div className="max-w-2xl bg-slate-900/60 border border-purple-500/30 rounded-3xl p-6 md:p-8">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-base mb-1">
              <Landmark className="w-5 h-5" />
              <span>Payout Bank & UPI Account Details</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              When you click "Withdraw to Bank", Super Admin will directly transfer funds to this verified account.
            </p>

            <form onSubmit={handleSaveBank} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Beneficiary Name</label>
                  <input
                    type="text"
                    required
                    value={bankForm.accountName}
                    onChange={(e) => setBankForm({ ...bankForm, accountName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Bank Name</label>
                  <input
                    type="text"
                    required
                    value={bankForm.bankName}
                    onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Account Number</label>
                  <input
                    type="text"
                    required
                    value={bankForm.accountNumber}
                    onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">IFSC Code</label>
                  <input
                    type="text"
                    required
                    value={bankForm.ifsc}
                    onChange={(e) => setBankForm({ ...bankForm, ifsc: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white uppercase font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">UPI ID (Optional Instant Transfer)</label>
                <input
                  type="text"
                  value={bankForm.upiId}
                  onChange={(e) => setBankForm({ ...bankForm, upiId: e.target.value })}
                  placeholder="username@okhdfcbank"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs text-white transition shadow-lg shadow-purple-600/25"
              >
                Save & Lock Bank Details
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: ADD COURSE */}
        {activeTab === 'add-course' && (
          <div className="max-w-2xl bg-slate-900/60 border border-purple-500/30 rounded-3xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-1">Submit Course for Sacred Mind Hosting</h3>
            <p className="text-xs text-slate-400 mb-6">
              Upload your video series (Unlisted YouTube or Drive link). Admin will activate it with your commission code.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Course submitted for Admin review!'); }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Prompting Masterclass"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">YouTube Unlisted Video / Playlist</label>
                <input
                  type="text"
                  required
                  placeholder="https://youtube.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-xs text-white transition"
              >
                Submit Course
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
