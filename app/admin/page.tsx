'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, DollarSign, BookOpen, Plus, Trash2, 
  CheckCircle2, ShieldCheck, ArrowUpRight, TrendingUp,
  Percent, ArrowLeft, Send, Video, Save, Check, Landmark,
  Lock, LogOut, KeyRound, Mail, AlertCircle, Eye, ExternalLink,
  Sparkles, RefreshCw
} from 'lucide-react';

interface BankDetails {
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  upiId: string;
}

interface SocialChannels {
  instagramHandle: string;
  instagramFollowers: string;
  youtubeChannel: string;
  youtubeSubscribers: string;
  isInstagramVerified: boolean;
  isYoutubeVerified: boolean;
}

interface SelfCourse {
  id: string;
  title: string;
  category: string;
  price: string;
  videoUrl: string;
  episodes: number;
  salesCount: number;
  earnings: number;
  status: 'Live' | 'Review';
}

interface TrainerProfile {
  name: string;
  email: string;
  role: 'Trainer' | 'Influencer';
  code: string;
  commissionRate: number;
  totalStudents: number;
  totalEarnings: number;
  walletBalance: number;
  bankDetails: BankDetails;
  socials: SocialChannels;
  myCourses: SelfCourse[];
}

export default function SuperAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard Tabs & Filters
  const [activeTab, setActiveTab] = useState<'creators' | 'courses' | 'payouts'>('creators');
  const [roleFilter, setRoleFilter] = useState<'All' | 'Trainer' | 'Influencer'>('All');
  const [selectedCreatorForModal, setSelectedCreatorForModal] = useState<TrainerProfile | null>(null);

  // Live Synchronized Directory
  const [creators, setCreators] = useState<TrainerProfile[]>([]);
  const [notification, setNotification] = useState('');

  // Load All Registered Trainers & Influencers from Global Pool
  const refreshDirectory = () => {
    try {
      const raw = localStorage.getItem('sm_global_trainers_pool');
      if (raw) {
        setCreators(JSON.parse(raw));
      } else {
        // Fallback default list if first time
        const defaultList: TrainerProfile[] = [
          {
            name: 'Birinder Singh',
            email: 'birinderhr@gmail.com',
            role: 'Influencer',
            code: 'BIRINDER50',
            commissionRate: 50,
            totalStudents: 34,
            totalEarnings: 8480,
            walletBalance: 3200,
            bankDetails: { accountName: 'Birinder Singh', bankName: 'HDFC Bank', accountNumber: '50100492817291', ifsc: 'HDFC0001234', upiId: 'birinder@okhdfcbank' },
            socials: { instagramHandle: '@birindersinghofficial', instagramFollowers: '28.5K', youtubeChannel: 'Birinder with AI', youtubeSubscribers: '15.2K', isInstagramVerified: true, isYoutubeVerified: true },
            myCourses: [
              { id: 'chatgpt-mastery', title: 'ChatGPT Mastery & AI Cashflow', category: 'AI & Tech', price: '₹499', videoUrl: 'https://youtube.com/watch?v=demo1', episodes: 12, salesCount: 34, earnings: 8480, status: 'Live' }
            ]
          },
          {
            name: 'Simran Kaur',
            email: 'simran@sacredmind.in',
            role: 'Trainer',
            code: 'SIMRAN40',
            commissionRate: 40,
            totalStudents: 18,
            totalEarnings: 3590,
            walletBalance: 1200,
            bankDetails: { accountName: 'Simran Kaur', bankName: 'State Bank of India', accountNumber: '309182736451', ifsc: 'SBIN0004521', upiId: 'simran@oksbi' },
            socials: { instagramHandle: '@simran_creative', instagramFollowers: '12K', youtubeChannel: '', youtubeSubscribers: '0', isInstagramVerified: true, isYoutubeVerified: false },
            myCourses: []
          }
        ];
        setCreators(defaultList);
        localStorage.setItem('sm_global_trainers_pool', JSON.stringify(defaultList));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const session = localStorage.getItem('sm_admin_authenticated');
    if (session === 'true') {
      setIsAuthenticated(true);
      refreshDirectory();
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.trim().toLowerCase() === 'info@sacredmind.in' && loginPassword.trim() === 'Birinder@8080') {
      setIsAuthenticated(true);
      localStorage.setItem('sm_admin_authenticated', 'true');
      refreshDirectory();
      setAuthError('');
    } else {
      setAuthError('गलत Admin Email या Password!');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sm_admin_authenticated');
  };

  // Settlement
  const handleReleaseBankTransfer = (email: string) => {
    const updated = creators.map(c => {
      if (c.email.toLowerCase() === email.toLowerCase()) {
        return { ...c, walletBalance: 0 };
      }
      return c;
    });
    setCreators(updated);
    localStorage.setItem('sm_global_trainers_pool', JSON.stringify(updated));
    alert(`Bank Transfer Initiated! Balance settled to ₹0.`);
  };

  // Live Metrics Calculations
  const filteredCreators = creators.filter(c => roleFilter === 'All' ? true : c.role === roleFilter);
  const totalStudents = creators.reduce((acc, c) => acc + c.totalStudents, 0);
  const totalCommissionDisbursed = creators.reduce((acc, c) => acc + c.totalEarnings, 0);
  const pendingPayouts = creators.reduce((acc, c) => acc + c.walletBalance, 0);
  const totalSelfPublishedCourses = creators.reduce((acc, c) => acc + (c.myCourses?.length || 0), 0);

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
              <label className="block text-xs font-semibold text-slate-400 mb-1">Security Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-xs text-white shadow-lg shadow-purple-600/30 hover:opacity-90 transition"
            >
              Access Super Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

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
                Live Sync Engine Active
              </span>
            </div>
            <p className="text-xs text-slate-400">Managing Trainers (40%), Influencers (50%), Course Audits & Bank Disbursals</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={refreshDirectory}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-xs font-bold text-slate-300 hover:text-white transition flex items-center space-x-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Live</span>
          </button>
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

      {/* OVERVIEW STATS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Total Creator Partners</span>
          <div className="text-3xl font-black text-white">{creators.length} Partners</div>
          <span className="text-[10px] text-emerald-400 font-bold">Trainers & Influencers Live</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Creator Commission Earned</span>
          <div className="text-3xl font-black text-emerald-400">₹{totalCommissionDisbursed.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-slate-500 font-mono">Calculated Per Student Sale</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-purple-500/40">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Pending Bank Transfers</span>
          <div className="text-3xl font-black text-pink-400">₹{pendingPayouts.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-purple-300 font-bold">Ready to Disburse</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Self-Published Courses</span>
          <div className="text-3xl font-black text-purple-400">{totalSelfPublishedCourses} Modules</div>
          <span className="text-[10px] text-emerald-400 font-bold">Uploaded by Partners</span>
        </div>
      </div>

      {/* DIRECTORY & FILTER */}
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* FILTERS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex space-x-2">
            {(['All', 'Trainer', 'Influencer'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${roleFilter === r ? 'bg-purple-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
              >
                {r === 'All' ? `All Creators (${creators.length})` : r === 'Trainer' ? `Trainers (40%)` : `Influencers (50%)`}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Auto-Sync Active: When a partner registers or publishes, they appear here instantly.
          </span>
        </div>

        {/* CREATORS LIST WITH IN-DEPTH VIEW */}
        <div className="grid grid-cols-1 gap-4">
          {filteredCreators.map((c) => (
            <div key={c.email} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-black text-white">{c.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${c.role === 'Influencer' ? 'bg-pink-950 text-pink-300 border-pink-800/40' : 'bg-purple-950 text-purple-300 border-purple-800/40'}`}>
                      {c.role} ({c.commissionRate}%)
                    </span>
                    <span className="text-[10px] font-mono bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                      Code: {c.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Email: <span className="text-white font-mono">{c.email}</span> • Instagram: <strong className="text-pink-400">{c.socials?.instagramHandle || 'None'}</strong> • YouTube: <strong className="text-rose-400">{c.socials?.youtubeChannel || 'None'}</strong>
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedCreatorForModal(c)}
                    className="px-4 py-2 rounded-xl bg-purple-950/60 border border-purple-600/40 hover:bg-purple-900/60 text-xs font-bold text-purple-300 transition flex items-center space-x-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Audit Courses & Videos ({c.myCourses?.length || 0})</span>
                  </button>

                  {c.walletBalance > 0 ? (
                    <button
                      onClick={() => handleReleaseBankTransfer(c.email)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition shadow-lg shadow-emerald-600/20 flex items-center space-x-1.5"
                    >
                      <Landmark className="w-3.5 h-3.5" />
                      <span>Transfer ₹{c.walletBalance} to Bank</span>
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500 font-mono px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">
                      All Settled ✓
                    </span>
                  )}
                </div>
              </div>

              {/* BANK DETAILS ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Bank Name</span>
                  <strong className="text-white">{c.bankDetails?.bankName || 'Not Linked'}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">A/C & IFSC</span>
                  <span className="font-mono text-purple-300">
                    {c.bankDetails?.accountNumber ? `${c.bankDetails.accountNumber} (${c.bankDetails.ifsc})` : 'Pending Setup'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">UPI ID</span>
                  <span className="font-mono text-emerald-400">{c.bankDetails?.upiId || 'None'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Wallet (Unpaid)</span>
                  <strong className="text-pink-400 text-sm">₹{c.walletBalance.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* POPUP MODAL: INSPECT TRAINER COURSES & VIDEOS */}
      {selectedCreatorForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-2xl w-full bg-slate-900 border border-purple-500/40 rounded-3xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white">{selectedCreatorForModal.name}'s Published Modules</h3>
                <span className="text-xs text-purple-400">{selectedCreatorForModal.email} • {selectedCreatorForModal.role}</span>
              </div>
              <button
                onClick={() => setSelectedCreatorForModal(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 hover:text-white"
              >
                Close ✕
              </button>
            </div>

            {(!selectedCreatorForModal.myCourses || selectedCreatorForModal.myCourses.length === 0) ? (
              <div className="py-12 text-center text-slate-500 text-xs space-y-2">
                <Video className="w-10 h-10 mx-auto text-slate-600" />
                <p>This partner has not published any courses yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedCreatorForModal.myCourses.map((crs) => (
                  <div key={crs.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-white">{crs.title}</strong>
                      <span className="text-xs font-black text-emerald-400">{crs.price}</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Category: <span className="text-purple-300">{crs.category}</span> • Episodes: {crs.episodes}
                    </p>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                      <span className="truncate max-w-sm text-slate-400 font-mono">{crs.videoUrl}</span>
                      <a
                        href={crs.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:underline flex items-center space-x-1 shrink-0 ml-2"
                      >
                        <span>Watch Video</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
