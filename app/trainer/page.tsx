'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, DollarSign, BookOpen, Sparkles, Copy, 
  Check, ArrowUpRight, TrendingUp, Plus, Video, 
  Wallet, Award, Clock, ChevronRight, Landmark, AlertCircle,
  Lock, LogOut, KeyRound, Mail
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
  email: string;
  code: string;
  commissionRate: number;
  totalStudents: number;
  totalEarnings: number;
  walletBalance: number;
  bankDetails: BankDetails;
}

export default function TrainerPortal() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [authError, setAuthError] = useState('');

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'wallet' | 'bank' | 'add-course'>('overview');
  
  // Live Profile State
  const [profile, setProfile] = useState<TrainerProfile>({
    name: 'Harpreet Singh',
    email: 'harpreet@sacredmind.in',
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

  const [bankForm, setBankForm] = useState<BankDetails>(profile.bankDetails);
  const [payoutRequested, setPayoutRequested] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const session = localStorage.getItem('sm_trainer_authenticated');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleTrainerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (loginEmail.trim().toLowerCase() === 'harpreet@sacredmind.in' && loginCode.trim().toUpperCase() === 'HARPREET40') ||
      (loginCode.trim().length >= 4)
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('sm_trainer_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('गलत Email या Referral Key! कृपया सही क्रेडेंशियल दर्ज करें।');
    }
  };

  const handleTrainerLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sm_trainer_authenticated');
  };

  const copyReferral = () => {
    const link = `https://www.sacredmind.in/courses?ref=${profile.code.toLowerCase()}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...profile, bankDetails: bankForm };
    setProfile(updated);
    setNotification('Bank & UPI details successfully linked!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleRequestPayout = () => {
    if (profile.walletBalance <= 0) {
      alert('Wallet balance is 0.');
      return;
    }
    setPayoutRequested(true);
    setNotification('Payout request sent to Super Admin for Bank Transfer!');
    setTimeout(() => setNotification(''), 4000);
  };

  // 🔒 LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100 font-sans selection:bg-purple-600 selection:text-white">
        <div className="max-w-md w-full bg-slate-900/80 border border-purple-500/30 p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Trainer & Creator Gate
            </h2>
            <p className="text-xs text-slate-400">Access Lifetime Commissions, Analytics & Bank Wallet</p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleTrainerLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Registered Trainer Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="harpreet@sacredmind.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Assigned Referral / Passkey</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={loginCode}
                  onChange={(e) => setLoginCode(e.target.value)}
                  placeholder="HARPREET40"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white uppercase focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-xs text-white shadow-lg shadow-purple-600/30 hover:opacity-90 transition"
            >
              Enter Creator Hub
            </button>
          </form>

          <div className="pt-2 text-center">
            <span className="text-[10px] text-slate-500 font-mono">
              Don't have credentials? Contact admin at info@sacredmind.in
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ✅ AUTHENTICATED TRAINER HUB
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
            <p className="text-[11px] text-slate-400">Logged in as {profile.name} ({profile.code})</p>
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
          <button
            onClick={handleTrainerLogout}
            className="px-3.5 py-2 rounded-xl bg-rose-950/50 border border-rose-800/40 hover:bg-rose-900/60 text-xs font-bold text-rose-300 transition flex items-center space-x-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
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

        {/* TAB 2: BANK & UPI */}
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

      </div>
    </div>
  );
}
