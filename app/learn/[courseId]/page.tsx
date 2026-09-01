'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, Bot, Sparkles, CheckCircle2, 
  Send, Code2, FileText, ChevronRight, BrainCircuit, Check
} from 'lucide-react';

const SAMPLE_MODULES = [
  { id: 1, week: 'Week 1', title: 'Foundations & Architecture Setup', duration: '20 mins', completed: true },
  { id: 2, week: 'Week 2', title: 'Core Logic & Autonomous Workflows', duration: '25 mins', active: true },
  { id: 3, week: 'Week 3', title: 'Database Sync & Webhook Pipeline', duration: '30 mins' },
  { id: 4, week: 'Week 4', title: 'AI Fine-tuning & Agent Deployment', duration: '40 mins' },
  { id: 5, week: 'Week 5', title: 'Live Client Capstone Launch', duration: '45 mins' },
];

export default function StudentClassroom({ params }: { params: { courseId: string } }) {
  const [activeTab, setActiveTab] = useState<'notes' | 'code'>('notes');
  const [activeModule, setActiveModule] = useState(SAMPLE_MODULES[1]);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'Hello! I am your Sacred Mind AI In-Class Tutor. Ask me any doubt regarding this lesson or code syntax.' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendQuery = () => {
    if (!userInput.trim()) return;
    const q = userInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: q }]);
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, {
        sender: 'ai',
        text: `Regarding "${q}" in ${activeModule.title}: Make sure your environment variables are configured with async error handlers. You can test this directly in the code tab!`
      }]);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      
      {/* TOP BAR */}
      <header className="h-16 border-b border-purple-950/40 bg-slate-950/90 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/courses" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Sacred Mind" width={32} height={32} className="object-contain" />
            <span className="font-bold text-lg text-white">Sacred Mind LMS</span>
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-xs text-purple-400 font-mono bg-purple-950/50 px-2.5 py-1 rounded-md border border-purple-800/40">
            Enrolled: AI Practical Mastery
          </span>
        </div>
        <Link href="/courses" className="text-xs text-slate-400 hover:text-white transition">
          Exit Classroom ✕
        </Link>
      </header>

      {/* MAIN LEARNING ARENA */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* LEFT: SYLLABUS MODULES */}
        <div className="lg:col-span-3 border-r border-slate-800/80 bg-slate-950/60 p-4 overflow-y-auto">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Course Modules</h3>
          <div className="space-y-2">
            {SAMPLE_MODULES.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod)}
                className={`w-full text-left p-3 rounded-2xl transition border flex items-center justify-between ${
                  activeModule.id === mod.id 
                    ? 'bg-purple-950/40 border-purple-500/50 text-white' 
                    : 'bg-slate-900/40 border-slate-800/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono text-purple-400 block">{mod.week}</span>
                  <span className="text-xs font-bold block">{mod.title}</span>
                  <span className="text-[10px] text-slate-500">{mod.duration}</span>
                </div>
                {mod.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* MIDDLE: AI VIDEO & NOTES */}
        <div className="lg:col-span-6 p-6 overflow-y-auto border-r border-slate-800/80 flex flex-col space-y-6">
          <div className="rounded-3xl overflow-hidden border border-purple-500/30 bg-slate-900 shadow-2xl relative">
            <div className="aspect-video bg-gradient-to-tr from-purple-950 via-slate-950 to-slate-900 flex flex-col items-center justify-center p-8 text-center relative group">
              <div className="w-16 h-16 rounded-full bg-purple-600/80 flex items-center justify-center text-white shadow-xl shadow-purple-600/40 cursor-pointer group-hover:scale-110 transition">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-slate-400 bg-slate-950/80 px-4 py-2 rounded-xl backdrop-blur-sm border border-slate-800">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span>AI Lecture: {activeModule.title}</span>
                </div>
                <span className="font-mono text-purple-400">1080p HD • AI Audio</span>
              </div>
            </div>
          </div>

          <div className="border-b border-slate-800 flex space-x-6 text-sm font-semibold">
            <button 
              onClick={() => setActiveTab('notes')}
              className={`pb-3 border-b-2 transition flex items-center space-x-2 ${activeTab === 'notes' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              <FileText className="w-4 h-4" />
              <span>AI Smart Notes</span>
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`pb-3 border-b-2 transition flex items-center space-x-2 ${activeTab === 'code' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              <Code2 className="w-4 h-4" />
              <span>Live Code Snippets</span>
            </button>
          </div>

          {activeTab === 'notes' && (
            <div className="space-y-4 bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
              <h4 className="text-base font-bold text-white flex items-center space-x-2">
                <BrainCircuit className="w-5 h-5 text-purple-400" />
                <span>AI Topic Breakdown</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                In this session for <strong>{activeModule.title}</strong>, we cover production architecture, pipeline isolation, and automated webhook handling.
              </p>
              <div className="space-y-2 pt-2">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Implement clean separation between API route controllers and database logic.</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Configure webhook signatures to prevent unauthorized replay attacks.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-purple-300 overflow-x-auto">
              <pre>{`// Sacred Mind Modular Pipeline\nimport { createServer } from '@sacredmind/ai-engine';\n\nexport const handler = async (req) => {\n  const session = await createServer.auth(req);\n  return session.dispatch({\n    action: '${activeModule.title}',\n    status: 'ACTIVE_EXECUTION'\n  });\n};`}</pre>
            </div>
          )}
        </div>

        {/* RIGHT: IN-CLASS AI DOUBT SOLVER */}
        <div className="lg:col-span-3 bg-slate-950 p-4 flex flex-col justify-between border-t lg:border-t-0">
          <div>
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
              <Bot className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-bold text-white">In-Class AI Tutor</span>
              <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full">24/7 Active</span>
            </div>

            <div className="mt-4 space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`p-3 rounded-2xl text-xs ${msg.sender === 'ai' ? 'bg-slate-900 border border-purple-500/20 text-slate-200' : 'bg-purple-600 text-white ml-6'}`}>
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="text-[10px] text-purple-400 animate-pulse font-mono">
                  AI Tutor is typing...
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
                placeholder="Ask doubt about this lesson..."
                className="flex-1 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleSendQuery}
                className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
