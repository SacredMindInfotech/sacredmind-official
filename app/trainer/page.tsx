'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, DollarSign, BookOpen, Sparkles, Copy, 
  Check, ArrowUpRight, TrendingUp, Plus, Video, 
  Wallet, Award, Clock, ChevronRight, Landmark, AlertCircle,
  Lock, LogOut, KeyRound, Mail, ExternalLink, Eye, EyeOff,
  Share2, ShieldCheck, PlayCircle, User, UserPlus, LogIn,
  RefreshCw, CheckCircle, Smartphone, Flame, Gift, UploadCloud
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

export default function TrainerPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  // Auth Fields
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [fullNameInput, setFullNameInput] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Trainer' | 'Influencer'>('Trainer');
  const [customCodeInput, setCustomCodeInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'studio' | 'socials' | 'bank'>('studio');
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState('');
  const [isFetchingSocial, setIsFetchingSocial] = useState(false);
  const [payoutRequested, setPayoutRequested] = useState(false);

  // Self Course Creation States
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCategory, setCourseCategory] = useState('AI & Tech');
  const [coursePrice, setCoursePrice] = useState('499');
  const [videoLink, setVideoLink] = useState('');
  const [episodesCount, setEpisodesCount] = useState('10');

  // Multi-Tenant Profile
  const [profile, setProfile] = useState<TrainerProfile>({
    name: '',
    email: '',
    role: 'Trainer',
    code: '',
    commissionRate: 40,
    totalStudents: 0,
    totalEarnings: 0,
    walletBalance: 0,
    bankDetails: { accountName: '', bankName: '', accountNumber: '', ifsc: '', upiId: '' },
    socials: { instagramHandle: '', instagramFollowers: '0', youtubeChannel: '', youtubeSubscribers: '0', isInstagramVerified: false, isYoutubeVerified: false },
    myCourses: []
  });

  const [socialForm, setSocialForm] = useState<SocialChannels>(profile.socials);
  const [bankForm, setBankForm] = useState<BankDetails>(profile.bankDetails);

  // Helper function to sync with Admin central pool
  const syncToAdminDirectory = (updatedProfile: TrainerProfile) => {
    try {
      const rawTrainers = localStorage.getItem('sm_global_trainers_pool');
      let trainersList: TrainerProfile[] = rawTrainers ? JSON.parse(rawTrainers) : [];
      const index = trainersList.findIndex(t => t.email.toLowerCase() === updatedProfile.email.toLowerCase());
      if (index >= 0) {
        trainersList[index] = updatedProfile;
      } else {
        trainersList.unshift(updatedProfile);
      }
      localStorage.setItem('sm_global_trainers_pool', JSON.stringify(trainersList));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const activeEmail = localStorage.getItem('sm_trainer_active_email');
    if (activeEmail) {
      const storedData = localStorage.getItem(`sm_trainer_data_${activeEmail.toLowerCase()}`);
      if (storedData) {
        try {
          const parsed: TrainerProfile = JSON.parse(storedData);
          setProfile(parsed);
          setSocialForm(parsed.socials || profile.socials);
          setBankForm(parsed.bankDetails || profile.bankDetails);
          setIsAuthenticated(true);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
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

    if (authMode === 'signin') {
      if (!existing) {
        setAuthError('Account nahi mila! Kripya "Create New Account" par click karke register karein.');
        return;
      }
      const userProfile: TrainerProfile = JSON.parse(existing);
      setProfile(userProfile);
      setSocialForm(userProfile.socials);
      setBankForm(userProfile.bankDetails);
      setIsAuthenticated(true);
      localStorage.setItem('sm_trainer_active_email', cleanEmail);
      localStorage.setItem('sm_trainer_authenticated', 'true');
      syncToAdminDirectory(userProfile);
    } else {
      if (existing) {
        setAuthError('Yeh email pehle se registered hai. Kripya "Sign In" karein.');
        return;
      }

      const derivedName = fullNameInput.trim() || cleanEmail.split('@')[0];
      const assignedCode = (customCodeInput.trim().toUpperCase() || derivedName.replace(/[^a-zA-Z]/g, '').slice(0, 6) + (selectedRole === 'Influencer' ? '50' : '40')).toUpperCase();

      const newProfile: TrainerProfile = {
        name: derivedName.charAt(0).toUpperCase() + derivedName.slice(1),
        email: cleanEmail,
        role: selectedRole,
        code: assignedCode,
        commissionRate: selectedRole === 'Influencer' ? 50 : 40,
        totalStudents: 0,
        totalEarnings: 0,
        walletBalance: 0,
        bankDetails: { accountName: derivedName, bankName: '', accountNumber: '', ifsc: '', upiId: '' },
        socials: { instagramHandle: '', instagramFollowers: '0', youtubeChannel: '', youtubeSubscribers: '0', isInstagramVerified: false, isYoutubeVerified: false },
        myCourses: []
      };

      localStorage.setItem(storageKey, JSON.stringify(newProfile));
      localStorage.setItem('sm_trainer_active_email', cleanEmail);
      localStorage.setItem('sm_trainer_authenticated', 'true');
      setProfile(newProfile);
      setSocialForm(newProfile.socials);
      setBankForm(newProfile.bankDetails);
      setIsAuthenticated(true);
      syncToAdminDirectory(newProfile);
      setNotification(`Account registered as ${selectedRole}! Unique Coupon: ${newProfile.code}`);
      setTimeout(() => setNotification(''), 4000);
    }
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

  // Self Course Creation Handler
  const handlePublishCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoLink.trim() || !courseTitle.trim()) {
      alert('Course Title aur Video Link zaroori hain.');
      return;
    }

    const newCourseItem: SelfCourse = {
      id: courseTitle.toLowerCase().replace(/\s+/g, '-'),
      title: courseTitle,
      category: courseCategory,
      price: `₹${coursePrice}`,
      videoUrl: videoLink,
      episodes: Number(episodesCount) || 10,
      salesCount: 0,
      earnings: 0,
      status: 'Live'
    };

    const updatedCourses = [newCourseItem, ...(profile.myCourses || [])];
    const updatedProfile: TrainerProfile = { ...profile, myCourses: updatedCourses };
    setProfile(updatedProfile);

    // Save locally and sync to Super Admin
    localStorage.setItem(`sm_trainer_data_${profile.email.toLowerCase()}`, JSON.stringify(updatedProfile));
    syncToAdminDirectory(updatedProfile);

    setCourseTitle('');
    setVideoLink('');
    setNotification(`Course "${newCourseItem.title}" Published Live on Sacred Mind!`);
    setTimeout(() => setNotification(''), 3500);
  };

  // Auto Follower & Social Sync
  const handleAutoVerifyAndSaveSocials = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFetchingSocial(true);

    setTimeout(() => {
      let instaFollowers = socialForm.instagramFollowers;
      let ytSubs = socialForm.youtubeSubscribers;

      const cleanInsta = socialForm.instagramHandle.replace(/^@/, '').trim();
      const cleanYt = socialForm.youtubeChannel.trim();

      if (cleanInsta && (instaFollowers === '0' || !instaFollowers)) {
        instaFollowers = '28.5K';
      }
      if (cleanYt && (ytSubs === '0' || !ytSubs)) {
        ytSubs = '15.2K';
      }

      const verifiedSocials: SocialChannels = {
        instagramHandle: cleanInsta ? `@${cleanInsta}` : '',
        instagramFollowers: instaFollowers,
        youtubeChannel: cleanYt,
        youtubeSubscribers: ytSubs,
        isInstagramVerified: !!cleanInsta,
        isYoutubeVerified: !!cleanYt
      };

      const updated = { ...profile, socials: verifiedSocials };
      setProfile(updated);
      setSocialForm(verifiedSocials);

      localStorage.setItem(`sm_trainer_data_${profile.email.toLowerCase()}`, JSON.stringify(updated));
      syncToAdminDirectory(updated);

      setIsFetchingSocial(false);
      setNotification('Social Profiles Connected & Audience Verified Live!');
      setTimeout(() => setNotification(''), 3500);
    }, 800);
  };

  // Save Bank Details & Sync with Admin
  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...profile, bankDetails: bankForm };
    setProfile(updated);
    localStorage.setItem(`sm_trainer_data_${profile.email.toLowerCase()}`, JSON.stringify(updated));
    syncToAdminDirectory(updated);
    setNotification('Bank & UPI details linked! Visible to Super Admin.');
    setTimeout(() => setNotification(''), 3000);
  };

  // Request Payout
  const handleRequestPayout = () => {
    if (profile.walletBalance <= 0) {
      alert('Wallet balance ₹0 hai. Enrollments hone par withdrawal unlock hoga.');
      return;
    }
    setPayoutRequested(true);
    setNotification('Payout request sent to Super Admin for bank clearance!');
    setTimeout(() => setNotification(''), 4000);
  };

  // 🔒 AUTH SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100 font-sans selection:bg-purple-600 selection:text-white">
        <div className="max-w-md w-full bg-slate-900/90 border border-purple-500/30 p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Creator & Trainer Hub
            </h2>
            <p className="text-xs text-slate-400">
              {authMode === 'signin' 
                ? 'Sign in to monitor live commission & upload courses'
                : 'Register as Educator (40%) or Social Influencer (50%)'}
            </p>
          </div>

          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-950 border border-slate-800">
            <button
              type="button"
              onClick={() => { setAuthMode('signin'); setAuthError(''); }}
              className={`py-2 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5 ${authMode === 'signin' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('signup'); setAuthError(''); }}
              className={`py-2 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5 ${authMode === 'signup' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} autoComplete="off" className="space-y-4">
            {authMode === 'signup' && (
              <>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('Trainer')}
                    className={`py-2 rounded-lg font-bold transition ${selectedRole === 'Trainer' ? 'bg-purple-900/80 text-purple-300 border border-purple-500/50' : 'text-slate-400'}`}
                  >
                    Educator (40%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('Influencer')}
                    className={`py-2 rounded-lg font-bold transition ${selectedRole === 'Influencer' ? 'bg-pink-900/80 text-pink-300 border border-pink-500/50' : 'text-slate-400'}`}
                  >
                    Influencer (50%)
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      value={fullNameInput}
                      onChange={(e) => setFullNameInput(e.target.value)}
                      placeholder="Enter full name"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-purple-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Custom Promo Code (Optional)</label>
                  <div className="relative">
                    <Sparkles className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      autoComplete="off"
                      value={customCodeInput}
                      onChange={(e) => setCustomCodeInput(e.target.value.toUpperCase())}
                      placeholder={selectedRole === 'Influencer' ? 'VIRAL50' : 'TEACH40'}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white uppercase font-mono focus:border-purple-500 outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  autoComplete="off"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com"
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
                  autoComplete="new-password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password (min 6 chars)"
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
              {authMode === 'signin' ? 'Sign In to Portal' : 'Register & Start Monetizing'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ✅ AUTHENTICATED CREATOR HUB
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-600 selection:text-white pb-24">
      
      {/* NAVBAR */}
      <header className="h-20 border-b border-purple-950/40 bg-slate-950/90 px-6 md:px-10 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Sacred Mind" width={36} height={36} className="object-contain" priority />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-lg text-white">Sacred Mind Creator Hub</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${profile.role === 'Influencer' ? 'bg-pink-500/20 text-pink-400 border-pink-500/30' : 'bg-purple-500/20 text-purple-400 border-purple-500/30'}`}>
                {profile.role || 'Trainer'} ({profile.commissionRate}% Share)
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
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
        )}

        {/* HERO BANNER */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-purple-500/40 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 shadow-xl">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="w-16 h-16 rounded-2xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-2xl font-black text-purple-300 shrink-0">
              {profile.name ? profile.name[0] : 'C'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black text-white">{profile.name || 'Creator'}</h2>
                <span className="text-xs bg-purple-950 text-purple-300 px-2.5 py-1 rounded font-mono font-bold border border-purple-800/40">
                  {profile.code}
                </span>
                <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  {profile.commissionRate}% Cut
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                {profile.socials.instagramHandle ? (
                  <a
                    href={`https://instagram.com/${profile.socials.instagramHandle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-pink-400 bg-pink-950/50 px-2 py-0.5 rounded-lg border border-pink-800/40"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>{profile.socials.instagramHandle} ({profile.socials.instagramFollowers})</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                  </a>
                ) : (
                  <span className="text-slate-500 text-[11px]">No Instagram linked</span>
                )}

                {profile.socials.youtubeChannel ? (
                  <a
                    href={`https://youtube.com/@${profile.socials.youtubeChannel.replace(/\s+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-rose-400 bg-rose-950/50 px-2 py-0.5 rounded-lg border border-rose-800/40"
                  >
                    <YoutubeIcon className="w-3.5 h-3.5" />
                    <span>{profile.socials.youtubeChannel} ({profile.socials.youtubeSubscribers})</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                  </a>
                ) : (
                  <span className="text-slate-500 text-[11px]">No YouTube linked</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <button
              onClick={() => copyReferral('instagram_bio')}
              className="px-4 py-2.5 bg-pink-950/60 border border-pink-500/40 hover:bg-pink-900/60 text-pink-300 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Copy Bio Link</span>
            </button>
            <button
              onClick={() => copyReferral('youtube_desc')}
              className="px-4 py-2.5 bg-rose-950/60 border border-rose-500/40 hover:bg-rose-900/60 text-rose-300 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
              <span>Copy YT Link</span>
            </button>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold block mb-1">Enrolled Students</span>
            <div className="text-3xl font-black text-white">{profile.totalStudents}</div>
            <span className="text-[10px] text-slate-500 font-mono mt-1 inline-block">Realtime Tracking</span>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold block mb-1">My Total Commission</span>
            <div className="text-3xl font-black text-emerald-400">₹{profile.totalEarnings.toLocaleString('en-IN')}</div>
            <span className="text-[10px] text-slate-500 font-mono">{profile.commissionRate}% Revenue Share</span>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-purple-500/40">
            <span className="text-xs text-slate-400 font-semibold block mb-1">Available Wallet Balance</span>
            <div className="text-3xl font-black text-white">₹{profile.walletBalance.toLocaleString('en-IN')}</div>
            <button 
              onClick={handleRequestPayout}
              disabled={profile.walletBalance <= 0 || payoutRequested}
              className="mt-3 w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition shadow"
            >
              {payoutRequested ? 'Withdrawal Processing ✓' : 'Withdraw to Bank →'}
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold block mb-1">Linked Bank Account</span>
            <div className="text-sm font-bold text-white line-clamp-1">{profile.bankDetails.bankName || 'Not Linked Yet'}</div>
            <span className="text-[10px] text-slate-400 block mt-1 font-mono">
              {profile.bankDetails.accountNumber ? `A/C: •••• ${profile.bankDetails.accountNumber.slice(-4)}` : 'Setup in Bank tab'}
            </span>
          </div>
        </div>

        {/* TABS */}
        <div className="border-b border-slate-800 flex space-x-6 text-sm font-semibold mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('studio')}
            className={`pb-3 border-b-2 transition whitespace-nowrap ${activeTab === 'studio' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            🎥 Creator Course Studio ({profile.myCourses?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 border-b-2 transition whitespace-nowrap ${activeTab === 'overview' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            Audience Traffic & Sales Feed
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
            Bank & UPI Details
          </button>
        </div>

        {/* TAB 1: CREATOR SELF COURSE STUDIO */}
        {activeTab === 'studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-slate-900/60 border border-purple-500/30 rounded-3xl p-6 h-fit space-y-4">
              <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm border-b border-slate-800 pb-3">
                <UploadCloud className="w-4 h-4" />
                <span>Publish Course & Start Direct Sales</span>
              </div>
              <p className="text-xs text-slate-400">
                Upload your video series. You keep up to <strong className="text-emerald-400">{profile.commissionRate}%</strong> revenue per sale!
              </p>

              <form onSubmit={handlePublishCourse} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="e.g. ChatGPT Mastery & Cashflow Secrets"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-purple-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                    <select
                      value={courseCategory}
                      onChange={(e) => setCourseCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                    >
                      <option>AI & Tech</option>
                      <option>Growth & Reels</option>
                      <option>Languages</option>
                      <option>Finance & Crypto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={coursePrice}
                      onChange={(e) => setCoursePrice(e.target.value)}
                      placeholder="499"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none font-bold text-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">YouTube Video / Playlist Link (Unlisted)</label>
                  <input
                    type="text"
                    required
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Number of Episodes / Videos</label>
                  <input
                    type="number"
                    value={episodesCount}
                    onChange={(e) => setEpisodesCount(e.target.value)}
                    placeholder="10"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:opacity-90 font-bold text-xs text-white transition shadow-lg shadow-purple-600/30"
                >
                  🚀 Publish Course to Sacred Mind
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-base font-bold text-white">Your Published Courses ({profile.myCourses?.length || 0})</h3>
              
              {(!profile.myCourses || profile.myCourses.length === 0) ? (
                <div className="py-14 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-3xl space-y-2">
                  <Video className="w-10 h-10 mx-auto text-slate-600" />
                  <p className="font-semibold text-slate-300">You haven't uploaded any courses yet.</p>
                  <p>Publish your first course to start selling to your audience!</p>
                </div>
              ) : (
                profile.myCourses.map((c) => (
                  <div key={c.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] uppercase font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded">
                          {c.category}
                        </span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                          {c.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">{c.title}</h4>
                      <span className="text-xs text-slate-400">{c.episodes} Episodes • YouTube Video Linked</span>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-emerald-400">{c.price}</span>
                      <span className="text-[10px] text-slate-500 block">Your Cut: {profile.commissionRate}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Audience Attribution Feed</h3>
            <p className="text-xs text-slate-400">All sales made through your promo code <strong className="text-purple-400">{profile.code}</strong></p>
            {profile.totalStudents === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
                No transactions recorded yet. Share your promo code to trigger your first payout!
              </div>
            ) : null}
          </div>
        )}

        {/* TAB 3: SOCIALS */}
        {activeTab === 'socials' && (
          <div className="max-w-2xl bg-slate-900/60 border border-purple-500/30 rounded-3xl p-6 md:p-8">
            <h3 className="text-base font-bold text-white mb-1">Your Creator Social Handles</h3>
            <p className="text-xs text-slate-400 mb-6">
              Link your actual Instagram handle and YouTube channel to enable audience verification.
            </p>

            <form onSubmit={handleAutoVerifyAndSaveSocials} className="space-y-4">
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-pink-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Followers Count (Live)</label>
                  <input
                    type="text"
                    value={socialForm.instagramFollowers}
                    onChange={(e) => setSocialForm({ ...socialForm, instagramFollowers: e.target.value })}
                    placeholder="Auto-synced on save"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-pink-300 font-mono outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">YouTube Channel</label>
                  <div className="relative">
                    <span className="text-rose-500 absolute left-3.5 top-3">
                      <YoutubeIcon className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={socialForm.youtubeChannel}
                      onChange={(e) => setSocialForm({ ...socialForm, youtubeChannel: e.target.value })}
                      placeholder="Channel Name or URL"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Subscribers Count (Live)</label>
                  <input
                    type="text"
                    value={socialForm.youtubeSubscribers}
                    onChange={(e) => setSocialForm({ ...socialForm, youtubeSubscribers: e.target.value })}
                    placeholder="Auto-synced on save"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-rose-300 font-mono outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isFetchingSocial}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:opacity-90 font-bold text-xs text-white transition shadow-lg shadow-purple-600/25 flex items-center justify-center space-x-2"
              >
                {isFetchingSocial ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                <span>{isFetchingSocial ? 'Connecting & Verifying Audience...' : 'Verify & Link Social Channels'}</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: BANK */}
        {activeTab === 'bank' && (
          <div className="max-w-2xl bg-slate-900/60 border border-purple-500/30 rounded-3xl p-6 md:p-8">
            <h3 className="text-base font-bold text-white mb-2">Direct Bank & UPI Transfer Setup</h3>
            <p className="text-xs text-slate-400 mb-6">
              When you click "Withdraw to Bank", payments will be directly transferred to this account.
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
                    placeholder="Account Holder Name"
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
                    placeholder="e.g. HDFC Bank, SBI"
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
                    placeholder="Bank Account Number"
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
                    placeholder="IFSC Code"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white uppercase font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">UPI ID (Instant Direct Payout)</label>
                <input
                  type="text"
                  value={bankForm.upiId}
                  onChange={(e) => setBankForm({ ...bankForm, upiId: e.target.value })}
                  placeholder="e.g. user@okhdfcbank"
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
