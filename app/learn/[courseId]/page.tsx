'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, Bot, Sparkles, CheckCircle2, 
  Send, Code2, FileText, ChevronRight, BrainCircuit, Check,
  Volume2, Maximize2, RotateCcw
} from 'lucide-react';

const SAMPLE_MODULES = [
  { 
    id: 1, 
    week: 'Week 1', 
    title: 'Foundations & Environment Architecture', 
    duration: '15 mins', 
    completed: true,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    summary: 'Deep dive into fundamental project setup, architecture isolation, and API gateway configurations.',
    keyPoints: [
      'Understand asynchronous microservice request lifecycles.',
      'Configure environment secrets and security headers.',
      'Set up Git branching strategies for production pipelines.'
    ],
    code: `// Environment Setup & Microservice Handler\nimport { createServer } from '@sacredmind/core';\n\nexport const handler = async (req: Request) => {\n  console.log("Initializing Sacred Mind Pipeline...");\n  return new Response(JSON.stringify({ status: "READY" }));\n};`
  },
  { 
    id: 2, 
    week: 'Week 2', 
    title: 'Core AI Logic & Autonomous Workflows', 
    duration: '22 mins', 
    active: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    summary: 'Building automated workflow triggers with Make.com/n8n webhooks and custom agentic loops.',
    keyPoints: [
      'Trigger webhooks from external CRM & databases with sub-second latency.',
      'Handle error fallbacks and retry logic in mission-critical pipelines.',
      'Integrate LLM structured JSON output for seamless API passing.'
    ],
    code: `// Autonomous Agent Pipeline\nexport async function runAgentWorkflow(payload: any) {\n  const res = await fetch("https://api.sacredmind.in/v1/agent", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ task: payload.task })\n  });\n  return await res.json();\n}`
  },
  { 
    id: 3, 
    week: 'Week 3', 
    title: 'Database State Synchronization & RLS', 
    duration: '28 mins',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    summary: 'Mastering real-time databases, Row-Level Security (RLS) policies, and high-concurrency connection pooling.',
    keyPoints: [
      'Design normalized relational schemas for scalable SaaS platforms.',
      'Implement strict user data access policies using PostgreSQL RLS.',
      'Optimize complex database queries using composite indexing.'
    ],
    code: `// Supabase Database Query with RLS\nimport { supabase } from '@/lib/supabase';\n\nexport async function getStudentData(userId: string) {\n  const { data, error } = await supabase\n    .from('enrollments')\n    .select('*')\n    .eq('user_id', userId);\n  return { data, error };\n}`
  },
  { 
    id: 4, 
    week: 'Week 4', 
    title: 'LLM Fine-Tuning & Multi-Agent Systems', 
    duration: '35 mins',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    summary: 'Training custom AI agents with specialized context windows and vector retrieval systems.',
    keyPoints: [
      'Set up embeddings and vector index searching with cosine similarity.',
      'Chain multi-agent decision trees for autonomous execution.',
      'Deploy low-latency inferencing microservices to edge clouds.'
    ],
    code: `// Vector Search Retrieval Chain\nexport async function queryVectorStore(prompt: string) {\n  const vector = await generateEmbeddings(prompt);\n  const matches = await pinecone.query({ topK: 5, vector });\n  return matches;\n}`
  },
  { 
    id: 5, 
    week: 'Week 5', 
    title: 'Live Client Capstone Launch at Mohali Lab', 
    duration: '45 mins',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    summary: 'Final staging deployment, load stress testing, security audits, and certificate issuance.',
    keyPoints: [
      'Run end-to-end automated test suites before production rollout.',
      'Perform security auditing and SSL/DNS propagation checks.',
      'Receive official Sacred Mind Industrial Training Certification.'
    ],
    code: `// Production CI/CD Health Check\nexport async function checkSystemHealth() {\n  return { status: "HEALTHY", uptime: process.uptime(), lab: "Phase 8 Mohali" };\n}`
  }
];

export default function StudentClassroom() {
  const [activeTab, setActiveTab] = useState<'notes' | 'code'>('notes');
  const [activeModule, setActiveModule] = useState(SAMPLE_MODULES[0]);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'Hello! I am your Sacred Mind AI In-Class Tutor. Play the video and ask me any doubts regarding the concepts or code snippets!' }
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
        text: `Regarding "${q}" in ${activeModule.title}: Make sure your asynchronous calls include try/catch error boundaries. You can check the exact syntax right here in the 'Live Code Snippets' tab!`
      }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      
      {/* TOP BAR */}
      <header className="h-16 border-b border-purple-950/40 bg-slate-950/90 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/courses" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Sacred Mind" width={32} height={32} className="object-contain" priority />
            <span className="font-bold text-lg text-white">Sacred Mind LMS</span>
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-xs text-purple-400 font-mono bg-purple-950/50 px-2.5 py-1 rounded-md border border-purple-800/40">
            Active Classroom • Phase 8 Mohali Lab
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
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Course Modules ({SAMPLE_MODULES.length})</h3>
          <div className="space-y-2">
            {SAMPLE_MODULES.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod)}
                className={`w-full text-left p-3.5 rounded-2xl transition border flex items-center justify-between ${
                  activeModule.id === mod.id 
                    ? 'bg-purple-950/50 border-purple-500/60 text-white shadow-lg shadow-purple-950/50' 
                    : 'bg-slate-900/40 border-slate-800/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono text-purple-400 block">{mod.week}</span>
                  <span className="text-xs font-bold block text-slate-100">{mod.title}</span>
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

        {/* MIDDLE: REAL WORKING VIDEO PLAYER & AI NOTES */}
        <div className="lg:col-span-6 p-6 overflow-y-auto border-r border-slate-800/80 flex flex-col space-y-6">
          
          {/* WORKING HTML5 VIDEO PLAYER */}
          <div className="rounded-3xl overflow-hidden border border-purple-500/40 bg-slate-900 shadow-2xl relative">
            <video 
              key={activeModule.videoUrl}
              controls 
              autoPlay
              className="w-full aspect-video object-cover bg-black"
            >
              <source src={activeModule.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-xs font-bold text-white">{activeModule.title}</span>
              </div>
              <span className="text-[11px] font-mono text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-md border border-purple-800/40">
                AI Interactive Stream • {activeModule.duration}
              </span>
            </div>
          </div>

          {/* TABS: NOTES / CODE */}
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

          {/* AI NOTES TAB */}
          {activeTab === 'notes' && (
            <div className="space-y-4 bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
              <h4 className="text-base font-bold text-white flex items-center space-x-2">
                <BrainCircuit className="w-5 h-5 text-purple-400" />
                <span>AI Lesson Summary & Key Takeaways</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeModule.summary}
              </p>
              
              <div className="space-y-2 pt-2">
                {activeModule.keyPoints.map((point, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CODE TAB */}
          {activeTab === 'code' && (
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-purple-300 overflow-x-auto leading-relaxed">
              <pre>{activeModule.code}</pre>
            </div>
          )}

        </div>

        {/* RIGHT: IN-CLASS AI DOUBT SOLVER */}
        <div className="lg:col-span-3 bg-slate-950 p-4 flex flex-col justify-between border-t lg:border-t-0">
          <div>
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
              <Bot className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-bold text-white">In-Class AI Tutor</span>
              <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full font-mono">24/7 Active</span>
            </div>

            <div className="mt-4 space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`p-3 rounded-2xl text-xs leading-relaxed ${msg.sender === 'ai' ? 'bg-slate-900 border border-purple-500/20 text-slate-200' : 'bg-purple-600 text-white ml-6'}`}>
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="text-[10px] text-purple-400 animate-pulse font-mono">
                  AI Tutor is reviewing lesson context...
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
