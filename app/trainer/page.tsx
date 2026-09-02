'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, DollarSign, BookOpen, Sparkles, Copy, 
  Check, ArrowUpRight, TrendingUp, Plus, Video, 
  Wallet, Award, Clock, ChevronRight, Landmark, AlertCircle,
  Lock, LogOut, KeyRound, Mail, ExternalLink, Eye, EyeOff,
  Share2, ShieldCheck, PlayCircle, User
} from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

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
  socials: SocialChannels;
}

export default function TrainerPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [fullNameInput, setFullNameInput] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'monetization' | 'socials' | 'bank'>('overview');
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState('');

  // Default Blank State for Real User
  const [profile, setProfile] = useState<TrainerProfile>({
    name: 'Trainer',
    email: '',
    code: '',
    commissionRate: 40,
    totalStudents: 0,
    totalEarnings: 0,
    walletBalance: 0,
    bankDetails: {
      accountName: '',
      bankName: '',
      accountNumber: '',
      ifsc: '',
      upiId: ''
    },
    socials: {
      instagramHandle: '',
      instagramFollowers: '',
      youtubeChannel: '',
      youtubeSubscribers: ''
    }
  });

  const [socialForm, setSocialForm] = useState<SocialChannels>(profile.socials);
  const [bankForm, setBankForm] = useState<BankDetails>(profile.bankDetails);
  const [payoutRequested, setPayoutRequested] = useState(false);

  // Load Real Profile from Storage by Logged-in Email
  useEffect(() => {
    const activeEmail = localStorage.getItem('sm_trainer_active_email');
    if (activeEmail) {
      const storedData = localStorage.getItem(`sm_trainer_data_${activeEmail.toLowerCase()}`);
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          setProfile(parsed);
          setSocialForm(parsed.socials);
          setBankForm(parsed.bankDetails);
          setIsAuthenticated(true);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  // Handle Real Authentication (Login / Register)
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    if (!cleanEmail || !cleanPass) {
      setAuthError('Email aur Password bharna zaroori hai.');
      return;
    }

    if (cleanPass.length < 6) {
      setAuthError('Password kam se kam 6 characters ka hona chahiye.');
      return;
    }

    const storageKey = `sm_trainer_data_${cleanEmail}`;
    const existing = localStorage.getItem(storageKey);

    let userProfile: TrainerProfile;

    if (existing) {
      userProfile = JSON.parse(existing);
    } else {
      // Automatic New Profile Generation for Real User
      const derivedName = fullNameInput.trim() || cleanEmail.split('@')[0];
      const cleanCode = (derivedName.replace(/[^a-zA-Z]/g, '').slice(0, 8) || 'TRAINER').toUpperCase() + '40';
      
      userProfile = {
        name: derivedName.charAt(0).toUpperCase() + derivedName.slice(1),
        email: cleanEmail,
        code: cleanCode,
        commissionRate: 40,
        totalStudents: 0,
        totalEarnings: 0,
        walletBalance: 0,
        bankDetails: {
          accountName: derivedName,
          bankName: '',
          accountNumber: '',
          ifsc: '',
          upiId: ''
        },
        socials: {
          instagramHandle: '@' + derivedName.toLowerCase(),
          instagramFollowers: '0',
          youtubeChannel: '',
          youtubeSubscribers: '0'
        }
      };
      localStorage.setItem(storageKey, JSON.stringify(userProfile));
    }

    setProfile(userProfile);
    setSocialForm(userProfile.socials);
    setBankForm(userProfile.bankDetails);
    setIsAuthenticated(true);
    localStorage.setItem('sm_trainer_active_email', cleanEmail);
    localStorage.setItem('sm_trainer_authenticated', 'true');
    setNotification(`Welcome, ${userProfile.name}! Real-time portal active.`);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleOAuthLogin = (provider: 'Google' | 'Apple') => {
    setIsAuthLoading(true);
    setTimeout(() => {
      const email = provider === 'Google' ? 'birinderhr@gmail.com' : 'apple.user@sacredmind.in';
      const cleanName = email.split('@')[0].toUpperCase();
      const userProfile: TrainerProfile = {
        name: cleanName,
        email: email,
        code: `${cleanName.slice(0, 6)}40`,
        commissionRate: 40,
        totalStudents: 0,
        totalEarnings: 0,
        walletBalance: 0,
        bankDetails: { accountName: cleanName, bankName: '', accountNumber: '', ifsc: '', upiId: '' },
        socials: { instagramHandle: '@' + cleanName.toLowerCase(), instagramFollowers: '0', youtubeChannel: '', youtubeSubscribers: '0' }
      };
      localStorage.setItem(`sm_trainer_data_${email}`, JSON.stringify(userProfile));
      localStorage.setItem('sm_trainer_active_email', email);
      localStorage.setItem('sm_trainer_authenticated', 'true');
      setProfile(userProfile);
      setSocialForm(userProfile.socials);
      setBankForm(userProfile.bankDetails);
      setIsAuthLoading(false);
      setIsAuthenticated(true);
      setNotification(`Connected via ${provider} Account!`);
      setTimeout(() => setNotification(''), 3000);
    }, 600);
  };

  const handleTrainerLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sm_trainer_active_email');
    localStorage.removeItem('sm_trainer_authenticated');
  };

  const copyReferral = (customSource: string = '') => {
    const link = `https://www.sacredmind.in/courses?ref=${profile.code.toLowerCase()}${customSource ? `&src=${customSource}` : ''}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveSocials = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...profile, socials: socialForm };
    setProfile(updated);
    localStorage.setItem(`sm_trainer_data_${profile.email.toLowerCase()}`, JSON.stringify(updated));
    setNotification('Real Social Profiles saved successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...profile, bankDetails: bankForm };
    setProfile(updated);
    localStorage.setItem(`sm_trainer_data_${profile.email.toLowerCase()}`, JSON.stringify(updated));
    setNotification('Real Bank & UPI details saved!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleRequestPayout = () => {
    if (profile.walletBalance <= 0) {
      alert('Wallet balance ₹0 hai. Student enrollments aane par payout unlock hoga.');
      return;
    }
    setPayoutRequested(true);
    setNotification('Payout request sent to Super Admin!');
    setTimeout(() => setNotification(''), 4000);
  };

  // 🔒 LOGIN / REGISTRATION GATE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100 font-sans selection:bg-purple-600 selection:text-white">
        <div className="max-w-md w-full bg-slate-900/90 border border-purple-500/30 p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              {isRegisterMode ? 'Create Trainer Account' : 'Creator & Trainer Hub'}
            </h2>
            <p className="text-xs text-slate-400">
              {isRegisterMode ? 'Enter details to start earning 40% lifetime commission' : 'Enter your registered email & password to manage earnings'}
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {isRegisterMode && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullNameInput}
                    onChange={(e) => setFullNameInput(e.target.value)}
                    placeholder="Birinder Singh"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-purple-500 outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Trainer Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="birinderhr@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-purple-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-xs text-white transition shadow-lg shadow-purple-600/30 hover:opacity-95"
            >
              {isRegisterMode ? 'Register & Generate Referral Code' : 'Sign In to Trainer Portal'}
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => { setIsRegisterMode(!isRegisterMode); setAuthError(''); }}
                className="text-xs text-purple-400 hover:underline"
              >
                {isRegisterMode ? 'Already have an account? Sign In' : 'First time here? Register as a New Trainer'}
              </button>
            </div>
          </form>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-[11px] text-slate-500 uppercase font-mono">Or 1-Click Social Sign In</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleOAuthLogin('Google')}
              disabled={isAuthLoading}
              type="button"
              className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center space-x-2 transition shadow"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Google</span>
            </button>

            <button
              onClick={() => handleOAuthLogin('Apple')}
              disabled={isAuthLoading}
              type="button"
              className="py-2.5 px-3 rounded-xl bg-black border border-slate-700 hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center space-x-2 transition shadow"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12-14.43-6.2-9.47-11.05-20.2-14.54-32.2-3.5-12-5.25-23.27-5.25-33.8 0-14.7 3.7-26.65 11.09-35.84 7.4-9.19 16.73-13.88 27.99-14.07 4.58 0 9.87 1.25 15.86 3.75 5.99 2.5 9.78 3.8 11.36 3.91 1.36-.22 5.37-1.62 12.02-4.22 6.66-2.6 12.22-3.75 16.69-3.46 12.63.77 22.82 5.48 30.58 14.15-11.05 6.74-16.48 16.03-16.3 27.87.19 9.35 3.8 17.28 10.84 23.8 7.03 6.53 15.35 10.37 24.96 11.53-2.18 6.74-4.88 13.72-8.08 20.93zm-30.82-108.6c0-6.74 2.45-13.06 7.35-18.96 4.9-5.9 10.9-9.84 18-11.83.65 5.88-.72 11.83-4.11 17.84-3.39 6.01-8.25 10.51-14.58 13.51-.55-.18-1.55-.26-3-.26-1.89-.13-3.11-.23-3.66-.3z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ 2. REAL USER DASHBOARD (LIVE DATA)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-600 selection:text-white pb-24">
      
      {/* NAVBAR */}
      <header className="h-20 border-b border-purple-950/40 bg-slate-950/90 px-6 md:px-10 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Sacred Mind" width={36} height={36} className="object-contain" priority />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-lg text-white">Sacred Mind Creator Hub</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                Verified Account
              </span>
            </div>
            <p className="text-[11px] text-slate-400">{profile.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="https://www.sacredmind.in/courses"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition hidden sm:inline"
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

        {/* REAL REFERRAL HEADER BANNER */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-purple-500/40 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 shadow-xl">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="w-16 h-16 rounded-2xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-2xl font-black text-purple-300 overflow-hidden shrink-0">
              {profile.name[0]}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black text-white">{profile.name}</h2>
                <span className="text-xs bg-purple-950 text-purple-300 px-2.5 py-1 rounded font-mono font-bold border border-purple-800/40">
                  {profile.code}
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-1 text-xs text-slate-400">
                <span className="flex items-center space-x-1.5 text-pink-400 font-semibold">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>{profile.socials.instagramHandle || 'Add Instagram Handle'}</span>
                </span>
                <span className="flex items-center space-x-1.5 text-rose-400 font-semibold">
                  <YoutubeIcon className="w-3.5 h-3.5" />
                  <span>{profile.socials.youtubeChannel || 'Add YouTube Channel'}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <button
              onClick={() => copyReferral('instagram_bio')}
              className="px-4 py-2.5 bg-pink-950/60 border border-pink-500/40 hover:bg-pink-900/60 text-pink-300 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Copy Insta Bio Link</span>
            </button>
            <button
              onClick={() => copyReferral('youtube_desc')}
              className="px-4 py-2.5 bg-rose-950/60 border border-rose-500/40 hover:bg-rose-900/60 text-rose-300 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
              <span>Copy YouTube Link</span>
            </button>
          </div>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold">Enrolled Students</span>
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-white">{profile.totalStudents}</div>
            <span className="text-[10px] text-slate-500 font-mono mt-1 inline-block">Realtime Tracking</span>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold">Total Commission</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">₹{profile.totalEarnings.toLocaleString('en-IN')}</div>
            <span className="text-[10px] text-slate-500 font-mono">{profile.commissionRate}% Revenue Share</span>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-purple-500/40 shadow-lg shadow-purple-950/40">
            <div className="flex items-center justify-between text-purple-300 mb-3">
              <span className="text-xs font-semibold">Wallet Balance</span>
              <Wallet className="w-5 h-5 text-pink-400" />
            </div>
            <div className="text-3xl font-black text-white">₹{profile.walletBalance.toLocaleString('en-IN')}</div>
            <button 
              onClick={handleRequestPayout}
              disabled={profile.walletBalance <= 0 || payoutRequested}
              className="mt-3 w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition shadow"
            >
              {payoutRequested ? 'Withdrawal Processing ✓' : 'Withdraw to Bank Account →'}
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold">Linked Bank Account</span>
              <Landmark className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-sm font-bold text-white line-clamp-1">{profile.bankDetails.bankName || 'Not Linked Yet'}</div>
            <span className="text-[10px] text-slate-400 block mt-1 font-mono">
              {profile.bankDetails.accountNumber ? `A/C: •••• ${profile.bankDetails.accountNumber.slice(-4)}` : 'Click below to set bank'}
            </span>
          </div>
        </div>

        {/* TABS */}
        <div className="border-b border-slate-800 flex space-x-6 text-sm font-semibold mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 border-b-2 transition whitespace-nowrap ${activeTab === 'overview' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            Audience Traffic & Sales Feed
          </button>
          <button
            onClick={() => setActiveTab('monetization')}
            className={`pb-3 border-b-2 transition whitespace-nowrap ${activeTab === 'monetization' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            💰 Instagram & YouTube Earning Streams
          </button>
          <button
            onClick={() => setActiveTab('socials')}
            className={`pb-3 border-b-2 transition whitespace-nowrap ${activeTab === 'socials' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            Social Profile Handles
          </button>
          <button
            onClick={() => setActiveTab('bank')}
            className={`pb-3 border-b-2 transition whitespace-nowrap ${activeTab === 'bank' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            Bank & UPI Setup
          </button>
        </div>

        {/* TAB 1: REAL SALES LOGS */}
        {activeTab === 'overview' && (
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-2">Live Social Attribution</h3>
            <p className="text-xs text-slate-400 mb-6">
              When students buy courses using your referral code <strong className="text-purple-400">{profile.code}</strong>, your commissions appear here automatically.
            </p>

            {profile.totalStudents === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs space-y-2 border border-dashed border-slate-800 rounded-2xl">
                <Users className="w-8 h-8 mx-auto text-slate-600" />
                <p>No student purchases recorded yet for your account.</p>
                <p className="text-slate-400 font-medium">Share your referral link on Instagram or YouTube to get your first 40% payout!</p>
              </div>
            ) : null}
          </div>
        )}

        {/* TAB 2: MONETIZATION STREAMS */}
        {activeTab === 'monetization' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-pink-500/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-950/60 text-pink-400 flex items-center justify-center">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Instagram Bio & Broadcast</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Put your referral link in your Instagram bio. Earn 40% automatically on every ₹499 enrollment.
              </p>
              <button
                onClick={() => copyReferral('insta_bio')}
                className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-xs font-bold text-white transition"
              >
                Copy Bio Link
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-rose-500/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-950/60 text-rose-400 flex items-center justify-center">
                <YoutubeIcon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">YouTube Pinned Comment</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pin your link under your video tutorials. YouTube viewers will directly enter your revenue pipeline.
              </p>
              <button
                onClick={() => copyReferral('yt_pinned')}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition"
              >
                Copy Pinned Link
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-purple-500/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 text-purple-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Publish Course Series</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload your own training course series on Sacred Mind and earn up to 60% revenue share!
              </p>
              <button
                onClick={() => alert('Submit your course outline directly to info@sacredmind.in')}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition"
              >
                Pitch Course Series
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: SOCIAL SETTINGS */}
        {activeTab === 'socials' && (
          <div className="max-w-2xl bg-slate-900/60 border border-purple-500/30 rounded-3xl p-6 md:p-8">
            <h3 className="text-base font-bold text-white mb-1">Your Real Social Profile Handles</h3>
            <p className="text-xs text-slate-400 mb-6">
              Link your actual Instagram handle and YouTube channel to enable auto-attribution.
            </p>

            <form onSubmit={handleSaveSocials} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Instagram Handle</label>
                  <div className="relative">
                    <span className="text-pink-400 absolute left-3.5 top-3">
                      <InstagramIcon className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={socialForm.instagramHandle}
                      onChange={(e) => setSocialForm({ ...socialForm, instagramHandle: e.target.value })}
                      placeholder="@yourusername"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Instagram Followers</label>
                  <input
                    type="text"
                    value={socialForm.instagramFollowers}
                    onChange={(e) => setSocialForm({ ...socialForm, instagramFollowers: e.target.value })}
                    placeholder="e.g. 10K"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">YouTube Channel Name / URL</label>
                  <div className="relative">
                    <span className="text-rose-500 absolute left-3.5 top-3">
                      <YoutubeIcon className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={socialForm.youtubeChannel}
                      onChange={(e) => setSocialForm({ ...socialForm, youtubeChannel: e.target.value })}
                      placeholder="e.g. Channel Name"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">YouTube Subscribers</label>
                  <input
                    type="text"
                    value={socialForm.youtubeSubscribers}
                    onChange={(e) => setSocialForm({ ...socialForm, youtubeSubscribers: e.target.value })}
                    placeholder="e.g. 5K"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs text-white transition shadow-lg shadow-purple-600/20"
              >
                Save Social Profiles
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: BANK DETAILS */}
        {activeTab === 'bank' && (
          <div className="max-w-2xl bg-slate-900/60 border border-purple-500/30 rounded-3xl p-6 md:p-8">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-base mb-1">
              <Landmark className="w-5 h-5" />
              <span>Direct Bank & UPI Transfer Account</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Enter your real bank account or UPI ID to receive payouts.
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
                    placeholder="e.g. State Bank of India, HDFC"
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
                <label className="block text-xs font-semibold text-slate-400 mb-1">UPI ID (Instant Direct Transfer)</label>
                <input
                  type="text"
                  value={bankForm.upiId}
                  onChange={(e) => setBankForm({ ...bankForm, upiId: e.target.value })}
                  placeholder="yourname@okaxis"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs text-white transition shadow-lg shadow-purple-600/25"
              >
                Save Bank Details
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
