'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Play, Bot, Sparkles, CheckCircle2, Lock,
  Send, Code2, FileText, ChevronRight, BrainCircuit, Check,
  HelpCircle, AlertCircle, Award, Volume2, ShieldCheck, Languages
} from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface ModuleData {
  id: number;
  week: string;
  title: string;
  duration: string;
  videoEmbedUrl: string;
  summary: string;
  keyPoints: string[];
  codeSnippet: string;
  quiz: QuizQuestion;
}

// 100% COURSE-SPECIFIC REAL-TIME DATABASE
const COURSES_DATABASE: Record<string, { title: string; category: string; modules: ModuleData[] }> = {
  'lang-punjabi': {
    title: 'Punjabi Language & Cultural Professional Course',
    category: 'Language Academy',
    modules: [
      {
        id: 1,
        week: 'Module 1',
        title: 'Gurmukhi Akhar & Phonetic Foundation (ਪੈਂਤੀ ਅੱਖਰੀ)',
        duration: '22:15 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/8_rX0975g7Q?autoplay=1&rel=0',
        summary: 'Mastering the 35 basic letters of Gurmukhi, proper vocal pronunciation, and tonal modulations.',
        keyPoints: [
          'Vowel sounds and tone markers (ਮਾਤਰਾਵਾਂ - ਕੰਨਾ, ਸਿਹਾਰੀ, ਬਿਹਾਰੀ).',
          'Vocal articulation and nasal sound inflections (ਟਿੱਪੀ, ਬਿੰਦੀ).',
          'Common regional greetings and formal etiquette in Punjab.'
        ],
        codeSnippet: `// Punjabi Basic Sentence Structure (Subject + Object + Verb)\n// ਮੈਂ ਸਕੂਲ ਜਾਂਦਾ ਹਾਂ (I go to school)\nconst sentence = {\n  subject: "ਮੈਂ (I)",\n  object: "ਸਕੂਲ (School)",\n  verb: "ਜਾਂਦਾ ਹਾਂ (Go)"\n};`,
        quiz: {
          question: 'In Punjabi sentence construction, what is the standard grammatical order?',
          options: [
            'Verb + Subject + Object (VSO)',
            'Subject + Object + Verb (SOV)',
            'Object + Verb + Subject (OVS)'
          ],
          correctIndex: 1,
          explanation: 'Punjabi follows the SOV (Subject + Object + Verb) sentence architecture.'
        }
      },
      {
        id: 2,
        week: 'Module 2',
        title: 'Essential Vocabulary & Daily Conversational Drills',
        duration: '28:40 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/3C5h7_jD6kQ?autoplay=1&rel=0',
        summary: 'Practical conversational dialogues for business, travel, and corporate administration.',
        keyPoints: [
          'Formal vs informal addressing (ਤੁਸੀਂ vs ਤੂੰ).',
          'Time, numbers, and transactional bargaining dialogues.',
          'AI-assisted voice accent sparring drills.'
        ],
        codeSnippet: `// Formal Dialogue Matrix\nconst greetings = {\n  morning: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ (Sat Sri Akal)",\n  respect: "ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ? (How are you? - Formal)",\n  acknowledgment: "ਧੰਨਵਾਦ (Thank you)"\n};`,
        quiz: {
          question: 'Which pronoun is used to show respect and formality when addressing someone in Punjabi?',
          options: ['ਤੂੰ (Tu)', 'ਤੁਸੀਂ (Tusi)', 'ਉਹ (Oh)'],
          correctIndex: 1,
          explanation: '"ਤੁਸੀਂ (Tusi)" is the formal and respectful pronoun used in professional settings.'
        }
      },
      {
        id: 3,
        week: 'Module 3',
        title: 'Tenses, Grammar Engines & Sentence Synthesis',
        duration: '32:10 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/U3B9d_1694A?autoplay=1&rel=0',
        summary: 'Comprehensive past, present, and continuous tense formation with gender agreement rules.',
        keyPoints: [
          'Gender inflection in verbs (ਕਰਦਾ ਹੈ vs ਕਰਦੀ ਹੈ).',
          'Pluralization rules for nouns and adjectives.',
          'Forming complex compound sentences with conjunctions.'
        ],
        codeSnippet: `// Gender & Tense Agreement Logic\nfunction getVerbEnding(gender, tense) {\n  if (gender === 'male' && tense === 'present') return 'ਦਾ ਹੈ';\n  if (gender === 'female' && tense === 'present') return 'ਦੀ ਹੈ';\n  return 'ਦੇ ਹਨ';\n}`,
        quiz: {
          question: 'How does the verb ending change for a feminine singular subject in present tense?',
          options: ['-ਦਾ ਹੈ (-da hai)', '-ਦੀ ਹੈ (-di hai)', '-ਦੇ ਹਨ (-de han)'],
          correctIndex: 1,
          explanation: 'Feminine singular subjects take the "-ਦੀ ਹੈ (-di hai)" verb ending.'
        }
      },
      {
        id: 4,
        week: 'Module 4',
        title: 'Corporate & Administrative Business Punjabi',
        duration: '35:00 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/8jPQjjsBbIc?autoplay=1&rel=0',
        summary: 'Official document reading, regional commercial contracts, and presentation skills.',
        keyPoints: [
          'Commercial trade terminology and legal vocabulary.',
          'Drafting formal notices, emails, and press releases.',
          'Handling corporate negotiations in North Indian markets.'
        ],
        codeSnippet: `// Corporate Vocabulary Reference\nconst businessTerms = {\n  contract: "ਇਕਰਾਰਨਾਮਾ (Ikrarnama)",\n  partnership: "ਸਾਂਝੇਦਾਰੀ (Sanjhedari)",\n  transaction: "ਲੈਣ-ਦੇਣ (Len-Den)"\n};`,
        quiz: {
          question: 'What is the formal Punjabi term for an agreement/contract?',
          options: ['ਖਾਤਾ (Khata)', 'ਇਕਰਾਰਨਾਮਾ (Ikrarnama)', 'ਦਫ਼ਤਰ (Daftar)'],
          correctIndex: 1,
          explanation: '"ਇਕਰਾਰਨਾਮਾ (Ikrarnama)" represents a binding contract or mutual agreement.'
        }
      },
      {
        id: 5,
        week: 'Module 5',
        title: 'Live Fluency Assessment & Certification',
        duration: '40:00 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/8_rX0975g7Q?autoplay=1&rel=0',
        summary: 'Final simulated oral exam, translation test, and Sacred Mind Certification issuance.',
        keyPoints: [
          '15-minute simulated live dialogue with AI voice evaluator.',
          'Reading comprehension of contemporary articles.',
          'Certification issuance verified at Sacred Mind Mohali.'
        ],
        codeSnippet: `// Certification Verification\nconst cert = {\n  institution: "Sacred Mind Language Academy",\n  course: "Punjabi Professional Fluency",\n  grade: "Distinction (A+)"\n};`,
        quiz: {
          question: 'What is required to receive the official Sacred Mind Language Certification?',
          options: [
            'Passing all module checkpoint quizzes with practical oral comprehension',
            'Attending only 1 session',
            'No verification needed'
          ],
          correctIndex: 0,
          explanation: 'Certification requires passing the comprehension checkpoints across all curriculum modules.'
        }
      }
    ]
  },
  'advanced-ai-ml': {
    title: 'Advanced AI & Machine Learning Program',
    category: 'AI Engineering',
    modules: [
      {
        id: 1,
        week: 'Module 1',
        title: 'Deep Learning Architectures & PyTorch Foundations',
        duration: '38:20 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/tPYj3fFJGjk?autoplay=1&rel=0',
        summary: 'Neural network layer mechanics, tensor computation, backpropagation, and loss functions.',
        keyPoints: [
          'Tensors and CUDA GPU acceleration with PyTorch.',
          'Gradient descent optimization algorithms (AdamW, SGD).',
          'Preventing overfitting using dropout and weight regularization.'
        ],
        codeSnippet: `import torch\nimport torch.nn as nn\n\nclass DeepNet(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.fc = nn.Sequential(\n            nn.Linear(784, 256),\n            nn.ReLU(),\n            nn.Dropout(0.2),\n            nn.Linear(256, 10)\n        )\n    def forward(self, x):\n        return self.fc(x)`,
        quiz: {
          question: 'What is the primary function of the Dropout layer in deep neural networks?',
          options: [
            'To increase training speed to infinity',
            'To prevent overfitting by randomly deactivating neurons during training',
            'To double the learning rate'
          ],
          correctIndex: 1,
          explanation: 'Dropout forces the network to learn redundant representations, significantly reducing overfitting.'
        }
      },
      {
        id: 2,
        week: 'Module 2',
        title: 'Transformer Architecture & Self-Attention Mechanics',
        duration: '45:10 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/aircAruvnKk?autoplay=1&rel=0',
        summary: 'Deep dive into multi-head attention, positional encodings, and encoder-decoder mechanisms.',
        keyPoints: [
          'Scaled dot-product attention mathematical mechanics.',
          'Masked language modeling and autoregressive sequence generation.',
          'Tokenization strategies with Byte-Pair Encoding (BPE).'
        ],
        codeSnippet: `// Scaled Dot-Product Attention Formula\n// Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V`,
        quiz: {
          question: 'Why is the dot-product scaled by sqrt(d_k) in the Attention mechanism?',
          options: [
            'To prevent gradients from vanishing in extreme softmax regions',
            'To convert tensors into images',
            'To reduce matrix size'
          ],
          correctIndex: 0,
          explanation: 'Scaling prevents extremely large magnitudes that push softmax into regions with vanishingly small gradients.'
        }
      },
      {
        id: 3,
        week: 'Module 3',
        title: 'Fine-Tuning LLMs with LoRA & QLoRA',
        duration: '42:30 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/843nec-IvW0?autoplay=1&rel=0',
        summary: 'Parameter-efficient fine-tuning (PEFT), 4-bit quantization, and domain adaptation.',
        keyPoints: [
          'Low-Rank Adaptation (LoRA) matrix decomposition.',
          'NF4 precision format and GPU VRAM optimization.',
          'Dataset curation and synthetic prompt generation.'
        ],
        codeSnippet: `from peft import LoraConfig, get_peft_model\n\nlora_config = LoraConfig(\n    r=16,\n    lora_alpha=32,\n    target_modules=["q_proj", "v_proj"],\n    lora_dropout=0.05,\n    bias="none",\n    task_type="CAUSAL_LM"\n)`,
        quiz: {
          question: 'What makes LoRA significantly more memory-efficient than full fine-tuning?',
          options: [
            'It deletes 90% of model weights permanently',
            'It freezes base model weights and only trains low-rank adapter matrices',
            'It only works on CPU'
          ],
          correctIndex: 1,
          explanation: 'LoRA keeps original weights frozen and trains small adapter matrices, slashing VRAM usage.'
        }
      },
      {
        id: 4,
        week: 'Module 4',
        title: 'Production RAG & Vector Search Pipelines',
        duration: '50:15 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/_uQrJ0TkZlc?autoplay=1&rel=0',
        summary: 'Hybrid sparse-dense retrieval, reranking algorithms, and sub-second semantic search.',
        keyPoints: [
          'Chunking strategies (semantic, recursive character).',
          'Cross-encoder rerankers (Cohere, BGE) for high precision.',
          'Vector database clustering and index quantization.'
        ],
        codeSnippet: `// Production Hybrid RAG Pipeline\nconst context = await vectorStore.hybridSearch({\n  query: userQuery,\n  topK: 5,\n  rerank: true\n});`,
        quiz: {
          question: 'What is the role of a Reranker in an advanced RAG pipeline?',
          options: [
            'To re-evaluate top retrieved vector results and score them by contextual relevance',
            'To compress PDF files',
            'To translate user queries into German'
          ],
          correctIndex: 0,
          explanation: 'A reranker cross-encodes the query and candidates to reorder documents by highest semantic fidelity.'
        }
      },
      {
        id: 5,
        week: 'Module 5',
        title: 'Enterprise Capstone & 100% Placement Placement Drive',
        duration: '35:00 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/2eebptXfEvw?autoplay=1&rel=0',
        summary: 'End-to-end model deployment on Kubernetes, API stress tests, and interview mocks.',
        keyPoints: [
          'Packaging models into Triton / vLLM high-throughput inferencing servers.',
          'Mock technical AI interviews with real production scenarios.',
          '100% Placement Drive execution at Sacred Mind Tech Labs.'
        ],
        codeSnippet: `// Deployment Health Monitor\nexport async function verifyModelHealth() {\n  return { status: "ONLINE", latency: "18ms", throughput: "450 req/sec" };\n}`,
        quiz: {
          question: 'What is the primary objective of the final enterprise capstone project?',
          options: [
            'To build and deploy a production-grade AI system that passes latency and accuracy thresholds',
            'To submit an empty repository',
            'To read one research paper only'
          ],
          correctIndex: 0,
          explanation: 'The capstone validates your ability to ship robust, scalable AI architectures in live enterprise settings.'
        }
      }
    ]
  },
  'default': {
    title: 'Industry-Ready Technology & AI Program',
    category: 'Sacred Mind Academy',
    modules: [
      {
        id: 1,
        week: 'Module 1',
        title: 'Core Architecture & Project Setup',
        duration: '25:00 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/_uQrJ0TkZlc?autoplay=1&rel=0',
        summary: 'Environment setup, dependencies, clean code patterns, and production baseline configuration.',
        keyPoints: ['Environment variables and security keys.', 'Git workflows for production.', 'Clean project folder structure.'],
        codeSnippet: `// Base Initialization\nconsole.log("Sacred Mind Engine Initialized");`,
        quiz: {
          question: 'What is the first step in setting up an enterprise repository?',
          options: ['Committing API secrets to public git', 'Setting up environment variable files (.env) and gitignore', 'Deleting project files'],
          correctIndex: 1,
          explanation: 'Protecting environment secrets and configuring proper gitignore is critical for security.'
        }
      },
      {
        id: 2,
        week: 'Module 2',
        title: 'API Pipelines & Automation Workflows',
        duration: '30:00 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/aircAruvnKk?autoplay=1&rel=0',
        summary: 'Building automated triggers, webhooks, and high-speed data passing.',
        keyPoints: ['Webhook integration.', 'Error handling & retry mechanisms.', 'Asynchronous processing.'],
        codeSnippet: `// Webhook Handler\nexport async function handleWebhook() { return { status: 200 }; }`,
        quiz: {
          question: 'Why do we use webhooks instead of constant polling?',
          options: ['To save server resources by receiving data instantly when events occur', 'To make the site slower', 'Webhooks are obsolete'],
          correctIndex: 0,
          explanation: 'Webhooks push data in real time upon events, eliminating wasteful polling requests.'
        }
      },
      {
        id: 3,
        week: 'Module 3',
        title: 'Database Architecture & Cloud Scaling',
        duration: '35:00 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/843nec-IvW0?autoplay=1&rel=0',
        summary: 'Relational data modeling, indexing, and high-concurrency cloud scaling.',
        keyPoints: ['Database normalization.', 'Indexing for query speed.', 'Connection pooling.'],
        codeSnippet: `// High Performance Query\nSELECT * FROM client_records WHERE status = 'ACTIVE';`,
        quiz: {
          question: 'What improves database query execution speed on large datasets?',
          options: ['Database Indexing on query filter columns', 'Deleting the database', 'Adding infinite sleep timers'],
          correctIndex: 0,
          explanation: 'Indexes allow the query engine to look up data in logarithmic time without full table scans.'
        }
      },
      {
        id: 4,
        week: 'Module 4',
        title: 'AI Integrations & Workflow Automation',
        duration: '40:00 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/tPYj3fFJGjk?autoplay=1&rel=0',
        summary: 'Integrating LLMs, custom prompts, and automated business agents.',
        keyPoints: ['Prompt engineering.', 'Structured JSON output parsing.', 'Agentic decision loops.'],
        codeSnippet: `// LLM Integration\nconst res = await callAI({ prompt: "Process payload" });`,
        quiz: {
          question: 'What is structured output in AI API integrations?',
          options: ['Guaranteed JSON format response adhering to a schema', 'Plain audio output', 'Random text strings'],
          correctIndex: 0,
          explanation: 'Structured output guarantees the LLM returns schema-valid JSON for direct program consumption.'
        }
      },
      {
        id: 5,
        week: 'Module 5',
        title: 'Live Capstone & Certification Exam',
        duration: '45:00 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/2eebptXfEvw?autoplay=1&rel=0',
        summary: 'Final project review, live deployment at Mohali lab, and certification issuance.',
        keyPoints: ['Production deployment.', 'Performance validation.', 'Certification issuance.'],
        codeSnippet: `// Graduation Verification\nexport const isGraduated = true;`,
        quiz: {
          question: 'How do you graduate from this Sacred Mind Program?',
          options: ['Complete all module checkpoints and verify project deliverables', 'Skip all videos', 'Close the tab'],
          correctIndex: 0,
          explanation: 'Graduation requires completing all interactive checkpoint assessments and project milestones.'
        }
      }
    ]
  }
};

export default function StudentClassroom() {
  const params = useParams();
  const rawCourseId = params?.courseId ? String(params.courseId) : 'advanced-ai-ml';
  
  // Select exact course or fallback
  const courseData = COURSES_DATABASE[rawCourseId] || COURSES_DATABASE['default'];
  const modules = courseData.modules;

  const [unlockedModules, setUnlockedModules] = useState<number[]>([1]);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'quiz' | 'notes' | 'code'>('quiz');
  
  // Quiz State
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  // In-Class AI Tutor Chat State
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: `Welcome to Sacred Mind! I am your AI In-Class Tutor for ${courseData.title}. Watch the full video lecture, solve the checkpoint question below to unlock the next module, and ask any doubts anytime!` }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const currentModule = modules[activeModuleIndex];

  // Switch Module handler
  const handleSelectModule = (index: number) => {
    if (!unlockedModules.includes(modules[index].id)) {
      alert("🔒 Please pass the current module's checkpoint quiz to unlock this chapter!");
      return;
    }
    setActiveModuleIndex(index);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setQuizPassed(false);
    setActiveTab('quiz');
  };

  // Submit Quiz Question
  const handleQuizSubmit = () => {
    if (selectedAnswer === null) return;
    setQuizSubmitted(true);
    
    if (selectedAnswer === currentModule.quiz.correctIndex) {
      setQuizPassed(true);
      const nextModuleId = currentModule.id + 1;
      if (!unlockedModules.includes(nextModuleId) && nextModuleId <= modules.length) {
        setUnlockedModules(prev => [...prev, nextModuleId]);
      }
    } else {
      setQuizPassed(false);
    }
  };

  // Move to next unlocked module
  const handleNextModule = () => {
    if (activeModuleIndex < modules.length - 1) {
      handleSelectModule(activeModuleIndex + 1);
    }
  };

  // AI Doubt Solver
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
        text: `Regarding "${q}" in ${currentModule.title}: ${currentModule.quiz.explanation} You can also review the Code & Notes tab right here for exact implementation syntax!`
      }]);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-purple-600 selection:text-white">
      
      {/* TOP BAR */}
      <header className="h-16 border-b border-purple-950/40 bg-slate-950/90 px-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <Link href="/courses" className="flex items-center space-x-2 group">
            <Image src="/logo.png" alt="Sacred Mind" width={32} height={32} className="object-contain" priority />
            <span className="font-black text-lg text-white group-hover:text-purple-400 transition">Sacred Mind LMS</span>
          </Link>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="text-xs text-purple-300 font-mono bg-purple-950/50 px-3 py-1 rounded-md border border-purple-800/40 hidden sm:inline">
            {courseData.title}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-xs text-slate-400">
            Progress: <strong className="text-white">{Math.round((unlockedModules.length / modules.length) * 100)}%</strong>
          </div>
          <Link href="/courses" className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition">
            Exit ✕
          </Link>
        </div>
      </header>

      {/* MAIN LEARNING ARENA */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* LEFT: CURRICULUM & MODULE LOCK STATE */}
        <div className="lg:col-span-3 border-r border-slate-800/80 bg-slate-950/70 p-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Course Modules</h3>
            <span className="text-[10px] text-purple-400 font-mono">{unlockedModules.length}/{modules.length} Unlocked</span>
          </div>

          <div className="space-y-2.5">
            {modules.map((mod, idx) => {
              const isUnlocked = unlockedModules.includes(mod.id);
              const isActive = activeModuleIndex === idx;

              return (
                <button
                  key={mod.id}
                  onClick={() => handleSelectModule(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl transition border flex items-center justify-between ${
                    isActive 
                      ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg shadow-purple-950/60' 
                      : isUnlocked 
                        ? 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-purple-500/40' 
                        : 'bg-slate-950 border-slate-900 text-slate-600 cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className="pr-2">
                    <span className="text-[10px] font-mono text-purple-400 block font-semibold">{mod.week}</span>
                    <span className="text-xs font-bold block leading-snug line-clamp-1">{mod.title}</span>
                    <span className="text-[10px] text-slate-500">{mod.duration}</span>
                  </div>

                  {isUnlocked ? (
                    unlockedModules.includes(mod.id + 1) || (idx === modules.length - 1 && quizPassed) ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-purple-400 shrink-0" />
                    )
                  ) : (
                    <Lock className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* MIDDLE: THEATER-SIZED VIDEO PLAYER + MANDATORY CHECKPOINT QUIZ */}
        <div className="lg:col-span-6 p-6 overflow-y-auto max-h-[calc(100vh-4rem)] flex flex-col space-y-6">
          
          {/* LARGE HD EMBED VIDEO PLAYER */}
          <div className="rounded-3xl overflow-hidden border border-purple-500/40 bg-slate-900 shadow-2xl relative">
            <div className="aspect-video w-full bg-black">
              <iframe 
                key={currentModule.videoEmbedUrl}
                src={currentModule.videoEmbedUrl} 
                title={currentModule.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-xs font-bold text-white line-clamp-1">{currentModule.title}</span>
              </div>
              <span className="text-[11px] font-mono text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-md border border-purple-800/40 shrink-0">
                {currentModule.duration}
              </span>
            </div>
          </div>

          {/* INTERACTIVE TABS */}
          <div className="border-b border-slate-800 flex space-x-6 text-sm font-semibold">
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`pb-3 border-b-2 transition flex items-center space-x-2 ${activeTab === 'quiz' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Mandatory Checkpoint Quiz</span>
            </button>
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
              <span>Live Code / Syntax</span>
            </button>
          </div>

          {/* TAB 1: MANDATORY QUIZ CHECKPOINT */}
          {activeTab === 'quiz' && (
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-purple-500/30 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-wider">
                    {currentModule.week} Checkpoint Verification
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">
                    {currentModule.quiz.question}
                  </h4>
                </div>
                <span className="p-2 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                  <BrainCircuit className="w-5 h-5" />
                </span>
              </div>

              {/* OPTIONS */}
              <div className="space-y-3">
                {currentModule.quiz.options.map((option, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => {
                      if (!quizPassed) {
                        setSelectedAnswer(optIdx);
                        setQuizSubmitted(false);
                      }
                    }}
                    className={`w-full text-left p-4 rounded-2xl border text-xs transition flex items-center space-x-3 ${
                      selectedAnswer === optIdx
                        ? 'bg-purple-950/60 border-purple-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-purple-500/40'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${selectedAnswer === optIdx ? 'border-purple-400 bg-purple-600 text-white' : 'border-slate-600 text-slate-400'}`}>
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span className="flex-1">{option}</span>
                  </button>
                ))}
              </div>

              {/* FEEDBACK */}
              {quizSubmitted && (
                <div className={`p-4 rounded-2xl border text-xs ${quizPassed ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/30 border-rose-500/40 text-rose-300'}`}>
                  <div className="flex items-center space-x-2 font-bold mb-1">
                    {quizPassed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Correct Answer! Next chapter unlocked 🎉</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span>Incorrect answer. Review the video lecture or AI Notes and try again!</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300 mt-1">{currentModule.quiz.explanation}</p>
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {!quizPassed ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={selectedAnswer === null}
                    className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs text-white transition shadow-lg shadow-purple-600/25"
                  >
                    Submit & Verify Answer
                  </button>
                ) : (
                  activeModuleIndex < modules.length - 1 ? (
                    <button
                      onClick={handleNextModule}
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white transition shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2"
                    >
                      <span>Proceed to Next Module ({modules[activeModuleIndex + 1].week})</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-900 to-pink-900 border border-purple-500/40 text-center space-y-1">
                      <div className="flex items-center justify-center space-x-2 text-white font-bold text-sm">
                        <Award className="w-5 h-5 text-amber-400" />
                        <span>Congratulations! All Modules Completed</span>
                      </div>
                      <p className="text-[11px] text-purple-200">Official Sacred Mind Certification verified.</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* TAB 2: AI SMART NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4 bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
              <h4 className="text-base font-bold text-white flex items-center space-x-2">
                <BrainCircuit className="w-5 h-5 text-purple-400" />
                <span>AI Lesson Summary & Key Principles</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentModule.summary}
              </p>
              
              <div className="space-y-2 pt-2">
                {currentModule.keyPoints.map((point, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CODE & SYNTAX */}
          {activeTab === 'code' && (
            <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 font-mono text-xs text-purple-300 overflow-x-auto leading-relaxed">
              <pre>{currentModule.codeSnippet}</pre>
            </div>
          )}

        </div>

        {/* RIGHT: 24/7 IN-CLASS AI DOUBT SOLVER */}
        <div className="lg:col-span-3 bg-slate-950 p-4 flex flex-col justify-between border-t lg:border-t-0 max-h-[calc(100vh-4rem)]">
          <div>
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
              <Bot className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-bold text-white">In-Class AI Tutor</span>
              <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full font-mono">Live 24/7</span>
            </div>

            <div className="mt-4 space-y-3 max-h-[48vh] overflow-y-auto pr-1">
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
