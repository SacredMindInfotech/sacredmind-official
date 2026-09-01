'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, Bot, Sparkles, CheckCircle2, Lock,
  Send, Code2, FileText, ChevronRight, BrainCircuit, Check,
  HelpCircle, AlertCircle, Award, Globe2
} from 'lucide-react';

interface QuizQuestion {
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctIndex: number;
  explanationEn: string;
  explanationHi: string;
}

interface ModuleData {
  id: number;
  week: string;
  titleEn: string;
  titleHi: string;
  duration: string;
  videoEmbedUrl: string;
  summaryEn: string;
  summaryHi: string;
  keyPointsEn: string[];
  keyPointsHi: string[];
  codeSnippet: string;
  quiz: QuizQuestion;
}

interface CourseSchema {
  id: string;
  titleEn: string;
  titleHi: string;
  category: string;
  modules: ModuleData[];
}

const COURSES_REGISTRY: Record<string, CourseSchema> = {
  // 1. PUNJABI LANGUAGE
  'lang-punjabi': {
    id: 'lang-punjabi',
    titleEn: 'Punjabi Language & Professional Cultural Communication',
    titleHi: 'ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਅਤੇ ਪੇਸ਼ੇਵਰ ਸੰਚਾਰ (Punjabi Fluency Course)',
    category: 'Language Academy',
    modules: [
      {
        id: 1,
        week: 'Module 1',
        titleEn: 'Gurmukhi Script & Phonetic System (ਪੈਂਤੀ ਅੱਖਰੀ)',
        titleHi: 'ਗੁਰਮੁਖੀ ਅੱਖਰ ਅਤੇ ਉਚਾਰਨ (35 Letters)',
        duration: '22:15 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/8_rX0975g7Q?autoplay=1&rel=0',
        summaryEn: 'Foundational Gurmukhi characters, vowel tone signs (ਮਾਤਰਾਵਾਂ), and Punjabi pronunciation basics.',
        summaryHi: 'ਗੁਰਮੁਖੀ ਦੇ ਮੂਲ ਅੱਖਰ, ਕੰਨਾ-ਸਿਹਾਰੀ-ਬਿਹਾਰੀ ਮਾਤਰਾਵਾਂ ਅਤੇ ਸ਼ੁੱਧ ਉਚਾਰਨ ਦੇ ਨਿਯਮ।',
        keyPointsEn: [
          'Mastering all 35 letters of Gurmukhi.',
          'Nasal tones and symbol placement (ਟਿੱਪੀ, ਬਿੰਦੀ, ਅੱਧਕ).',
          'Standard courteous greetings across Punjab.'
        ],
        keyPointsHi: [
          'ਪੈਂਤੀ ਅੱਖਰੀ ਦੀ ਪਛਾਣ ਅਤੇ ਲਿਖਣ ਦਾ ਅਭਿਆਸ।',
          'ਟਿੱਪੀ, ਬਿੰਦੀ ਅਤੇ ਅੱਧਕ ਦੀ ਸਹੀ ਵਰਤੋਂ।',
          'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਅਤੇ ਸਤਿਕਾਰਯੋਗ ਸ਼ਬਦਾਵਲੀ।'
        ],
        codeSnippet: `// Punjabi Sentence Architecture (Subject + Object + Verb)\n// ਮੈਂ (Subject) + ਦਫ਼ਤਰ (Object) + ਜਾਂਦਾ ਹਾਂ (Verb)\nconst punjabiSOV = {\n  subject: "ਮੈਂ",\n  object: "ਦਫ਼ਤਰ",\n  verb: "ਜਾਂਦਾ ਹਾਂ"\n};`,
        quiz: {
          questionEn: 'In Punjabi sentence syntax, what is the standard grammatical structure?',
          questionHi: 'ਪੰਜਾਬੀ ਵਾਕ ਬਣਤਰ ਦਾ ਸਹੀ ਨਿਯਮ ਕੀ ਹੈ?',
          optionsEn: ['Verb + Subject + Object (VSO)', 'Subject + Object + Verb (SOV)', 'Object + Verb + Subject (OVS)'],
          optionsHi: ['ਕਿਰਿਆ + ਕਰਤਾ + ਕਰਮ (VSO)', 'ਕਰਤਾ + ਕਰਮ + ਕਿਰਿਆ (SOV)', 'ਕਰਮ + ਕਿਰਿਆ + ਕਰਤਾ (OVS)'],
          correctIndex: 1,
          explanationEn: 'Punjabi follows the SOV (Subject + Object + Verb) pattern.',
          explanationHi: 'ਪੰਜਾਬੀ ਵਾਕਾਂ ਵਿੱਚ ਪਹਿਲਾਂ ਕਰਤਾ (Subject), ਫਿਰ ਕਰਮ (Object) ਅਤੇ ਅੰਤ ਵਿੱਚ ਕਿਰਿਆ (Verb) ਆਉਂਦੀ ਹੈ।'
        }
      },
      {
        id: 2,
        week: 'Module 2',
        titleEn: 'Business Vocabulary & Professional Corporate Dialogue',
        titleHi: 'ਦਫ਼ਤਰੀ ਸ਼ਬਦਾਵਲੀ ਅਤੇ ਪੇਸ਼ੇਵਰ ਗੱਲਬਾਤ',
        duration: '28:40 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/3C5h7_jD6kQ?autoplay=1&rel=0',
        summaryEn: 'Corporate terminology, official agreement phrasing, and regional North Indian trade negotiations.',
        summaryHi: 'ਕਾਰੋਬਾਰੀ ਸ਼ਬਦਾਵਲੀ, ਇਕਰਾਰਨਾਮੇ ਦੀ ਭਾਸ਼ਾ ਅਤੇ ਮੀਟਿੰਗਾਂ ਵਿੱਚ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਸੰਚਾਰ।',
        keyPointsEn: [
          'Formal pronoun usage (ਤੁਸੀਂ vs ਤੂੰ).',
          'Commercial contracts, billing, and accounting vocabulary.',
          'AI-powered pronunciation sparring drills.'
        ],
        keyPointsHi: [
          'ਦਫ਼ਤਰਾਂ ਵਿੱਚ ਸਤਿਕਾਰਯੋਗ ਸੰਬੋਧਨ (ਤੁਸੀਂ)।',
          'ਵਪਾਰਕ ਇਕਰਾਰਨਾਮੇ (Contracts) ਅਤੇ ਲੈਣ-ਦੇਣ ਦੀ ਸ਼ਬਦਾਵਲੀ।',
          'AI ਨਾਲ ਰੋਜ਼ਾਨਾ ਬੋਲਣ ਦਾ ਅਭਿਆਸ।'
        ],
        codeSnippet: `// Corporate Vocabulary Matrix\nconst terms = {\n  contract: "ਇਕਰਾਰਨਾਮਾ",\n  partnership: "ਸਾਂਝੇਦਾਰੀ",\n  invoice: "ਬਿੱਲ / ਰਸੀਦ"\n};`,
        quiz: {
          questionEn: 'Which Punjabi pronoun is appropriate for formal business meetings?',
          questionHi: 'ਦਫ਼ਤਰੀ ਅਤੇ ਕਾਰੋਬਾਰੀ ਮੀਟਿੰਗਾਂ ਵਿੱਚ ਕਿਹੜਾ ਪੜਨਾਂਵ (Pronoun) ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ?',
          optionsEn: ['ਤੂੰ (Tu)', 'ਤੁਸੀਂ (Tusi)', 'ਉਹ (Oh)'],
          optionsHi: ['ਤੂੰ', 'ਤੁਸੀਂ', 'ਉਹ'],
          correctIndex: 1,
          explanationEn: '"ਤੁਸੀਂ (Tusi)" is the formal and respectful pronoun.',
          explanationHi: '"ਤੁਸੀਂ" ਸ਼ਬਦ ਸਤਿਕਾਰ ਅਤੇ ਪੇਸ਼ੇਵਰ ਮਾਣ-ਮਰਿਆਦਾ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।'
        }
      }
    ]
  },

  // 2. ENGLISH FLUENCY
  'lang-english': {
    id: 'lang-english',
    titleEn: 'English Fluency & Global Business Communication',
    titleHi: 'इंग्लिश फ्लूएंसी और इंटरनेशनल बिजनेस कम्युनिकेशन',
    category: 'Language Academy',
    modules: [
      {
        id: 1,
        week: 'Module 1',
        titleEn: 'Accent Neutralization & Confidence Sparring',
        titleHi: 'एक्सेंट न्यूट्रलाइजेशन और आत्मविश्वास के साथ बोलना',
        duration: '25:15 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/juKd26qkNAw?autoplay=1&rel=0',
        summaryEn: 'Overcoming Mother Tongue Influence (MTI), intonation cadence, and professional speech pacing.',
        summaryHi: 'मातृभाषा के प्रभाव (MTI) को हटाना, सही वोकल पिच और बिना झिझक अंग्रेजी में बात करना।',
        keyPointsEn: [
          'Voiced vs unvoiced consonant clarity.',
          'Rhythm and stress patterns in multinational presentations.',
          '24/7 AI conversational dialogue partner drills.'
        ],
        keyPointsHi: [
          'शब्दों का साफ और स्पष्ट वोकल उच्चारण।',
          'प्रेजेंटेशन के दौरान सही शब्दों पर जोर (Word Stress)।',
          'AI के साथ रोज लाइव प्रैक्टिस करके झिझक खत्म करना।'
        ],
        codeSnippet: `// Communication Flow\n// Statement: Falling Pitch (↓) | Question: Rising Pitch (↑)`,
        quiz: {
          questionEn: 'What happens to pitch inflection at the conclusion of a standard English statement?',
          questionHi: 'अंग्रेजी में सामान्य वाक्य (Statement) समाप्त होते समय पिच (Pitch) का क्या होता है?',
          optionsEn: ['Pitch naturally drops downwards', 'Pitch remains high', 'Pitch goes silent'],
          optionsHi: ['पिच स्वाभाविक रूप से नीचे आती है (Downward inflection)', 'पिच हमेशा ऊपर रहती है', 'आवाज बंद हो जाती है'],
          correctIndex: 0,
          explanationEn: 'Statements end with falling intonation in standard English.',
          explanationHi: 'कथन (Statements) के अंत में टोन नीचे आती है, जबकि सवालों में टोन ऊपर उठती है।'
        }
      },
      {
        id: 2,
        week: 'Module 2',
        titleEn: 'Executive Email Drafting & Diplomatic Negotiations',
        titleHi: 'एग्जीक्यूटिव ईमेल ड्राफ्टिंग और कॉर्पोरेट नेगोशिएशन',
        duration: '31:20 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/8jPQjjsBbIc?autoplay=1&rel=0',
        summaryEn: 'Crafting persuasive business emails, cross-cultural diplomacy, and handling client objections.',
        summaryHi: 'प्रोफेशनल ईमेल लिखना, क्लाइंट्स के साथ बातचीत और बिना टकराव के अपनी बात मनवाना।',
        keyPointsEn: [
          'Diplomatic phrasing ("I see your perspective, however...").',
          'Direct subject line writing and call-to-action structure.',
          'Closing global client proposals.'
        ],
        keyPointsHi: [
          'विनम्र और प्रभावी भाषा का चुनाव ("I would suggest" vs "You must").',
          'सटीक सब्जेक्ट लाइन और प्रोफेशनल फॉर्मेटिंग।',
          'विदेशी क्लाइंट्स के साथ आत्मविश्वास से मीटिंग्स करना।'
        ],
        codeSnippet: `// Executive Email Opening\nconst greeting = "I hope this email finds you well. I am reaching out regarding...";`,
        quiz: {
          questionEn: 'Which phrase represents polite, diplomatic phrasing in a corporate disagreement?',
          questionHi: 'ऑफिस मीटिंग में असहमति जताने का सबसे सही और विनम्र तरीका कौन सा है?',
          optionsEn: ['"I see your point, however we might consider..."', '"You are completely mistaken"', '"I reject your proposal"'],
          optionsHi: ['"I see your point, however we might consider..."', '"You are completely mistaken"', '"I reject your proposal"'],
          correctIndex: 0,
          explanationEn: 'Diplomatic phrasing acknowledges the other viewpoint while introducing alternatives.',
          explanationHi: 'प्रोफेशनल बातचीत में पहले सामने वाले की बात समझी जाती है, फिर अपना सुझाव रखा जाता है।'
        }
      }
    ]
  },

  // 3. FRENCH LANGUAGE
  'lang-french': {
    id: 'lang-french',
    titleEn: 'French Language Mastery (A1-B2 CEFR Accelerated)',
    titleHi: 'फ्रेंच लैंग्वेज मास्टरी (CEFR A1-B2 लेवल)',
    category: 'Language Academy',
    modules: [
      {
        id: 1,
        week: 'Module 1',
        titleEn: 'French Phonetics, Nasal Sounds & Daily Salutations',
        titleHi: 'फ्रेंच फोनेटिक्स, नेजल साउंड्स और बुनियादी बातचीत',
        duration: '27:30 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/ujDtm0hZyII?autoplay=1&rel=0',
        summaryEn: 'Silent terminal consonants, liaison linking rules, and standard everyday French greetings.',
        summaryHi: 'साइलेंट लेटर्स के नियम, नेजल वोवेल्स का उच्चारण और फ्रांस/कनाडा में काम आने वाले अभिवादन।',
        keyPointsEn: [
          'Nasal vowel production (un, on, in, an).',
          'Liaison connecting ending consonants to beginning vowels.',
          'Formal vs informal addressing (Vous vs Tu).'
        ],
        keyPointsHi: [
          'नेजल वोवेल्स का सही उच्चारण।',
          'Liaison: एक शब्द के आखिरी अक्षर को अगले शब्द से जोड़ना।',
          'फॉर्मल (Vous) और इनफॉर्मल (Tu) का सही उपयोग।'
        ],
        codeSnippet: `// French Courtesy Matrix\nconst french = { morning: "Bonjour", evening: "Bonsoir", thankYou: "Merci beaucoup" };`,
        quiz: {
          questionEn: 'Which pronoun is used to address someone with formal respect in French?',
          questionHi: 'फ्रेंच में किसी को सम्मान देने या बिजनेस मीटिंग में किस सर्वनाम (Pronoun) का उपयोग होता है?',
          optionsEn: ['Vous (Formal)', 'Tu (Informal)', 'Il (He)'],
          optionsHi: ['Vous (फॉर्मल)', 'Tu (इनफॉर्मल)', 'Il (वह)'],
          correctIndex: 0,
          explanationEn: '"Vous" is the formal pronoun used in professional settings.',
          explanationHi: '"Vous" का उपयोग बड़ों, नए लोगों और ऑफिस में आदर देने के लिए किया जाता है।'
        }
      }
    ]
  },

  // 4. DUTCH LANGUAGE
  'lang-dutch': {
    id: 'lang-dutch',
    titleEn: 'Dutch Language Immersion (Relocation & Business)',
    titleHi: 'डच लैंग्वेज इमर्शन (नीदरलैंड्स वर्क वीजा व बिजनेस)',
    category: 'Language Academy',
    modules: [
      {
        id: 1,
        week: 'Module 1',
        titleEn: 'Dutch Throat Phonetics (G/CH) & Definite Articles',
        titleHi: 'डच उच्चारण (G/CH ध्वनियां) और आर्टिकल्स (De/Het)',
        duration: '26:00 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/6_5QZ3gW5qU?autoplay=1&rel=0',
        summaryEn: 'Mastering guttural sounds, diphthongs (ui, ij), and Dutch noun gender classification.',
        summaryHi: 'डच भाषा की खास गले से निकलने वाली आवाजें (G), De और Het आर्टिकल्स के नियम।',
        keyPointsEn: [
          'Guttural "G" and "CH" pronunciation technique.',
          'Using "De" (common gender) vs "Het" (neuter gender).',
          'Essential phrases for Netherlands immigration.'
        ],
        keyPointsHi: [
          'गले से "G" का सही डच उच्चारण निकालना।',
          'संज्ञा के आगे "De" या "Het" लगाने का सिस्टम।',
          'नीदरलैंड्स में जॉब और रहने के लिए रोजमर्रा की बातचीत।'
        ],
        codeSnippet: `// Dutch Articles\n// De man (The man) | Het huis (The house)`,
        quiz: {
          questionEn: 'What are the two definite articles used for "the" in Dutch grammar?',
          questionHi: 'डच व्याकरण में "The" के लिए कौन से दो आर्टिकल्स उपयोग होते हैं?',
          optionsEn: ['De and Het', 'Le and La', 'Der and Die'],
          optionsHi: ['De और Het', 'Le और La', 'Der और Die'],
          correctIndex: 0,
          explanationEn: 'Dutch uses "De" and "Het" as definite articles.',
          explanationHi: 'डच भाषा में हर संज्ञा के साथ "De" या "Het" का प्रयोग किया जाता है।'
        }
      }
    ]
  },

  // 5. ADVANCED AI & MACHINE LEARNING
  'advanced-ai-ml': {
    id: 'advanced-ai-ml',
    titleEn: 'Advanced AI & Machine Learning Engineering',
    titleHi: 'एडवांस्ड AI और मशीन लर्निंग इंजीनियरिंग',
    category: 'Tech Program',
    modules: [
      {
        id: 1,
        week: 'Module 1',
        titleEn: 'Deep Learning Architectures & PyTorch Foundations',
        titleHi: 'डीप लर्निंग आर्किटेक्चर और PyTorch की नींव',
        duration: '38:20 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/tPYj3fFJGjk?autoplay=1&rel=0',
        summaryEn: 'Neural layer mechanics, GPU tensor computation, backpropagation, and loss functions in PyTorch.',
        summaryHi: 'न्यूरल नेटवर्क लेयर्स, टेंसर कंप्यूटेशन, बैकप्रोपेगेशन और PyTorch में लॉस फंक्शन्स।',
        keyPointsEn: [
          'GPU Tensor acceleration with CUDA.',
          'Gradient descent optimization (AdamW, SGD).',
          'Preventing overfitting using Dropout layers.'
        ],
        keyPointsHi: [
          'CUDA और GPU पर टेंसर ऑपरेशन्स को तेज करना।',
          'AdamW और SGD जैसे ग्रेडिएंट डिसेंट ऑप्टिमाइज़र्स।',
          'मॉडल को ओवरफिट होने से बचाने के लिए Dropout लेयर का उपयोग।'
        ],
        codeSnippet: `import torch\nimport torch.nn as nn\n\nclass DeepNet(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.fc = nn.Sequential(nn.Linear(784, 256), nn.ReLU(), nn.Dropout(0.2), nn.Linear(256, 10))\n    def forward(self, x):\n        return self.fc(x)`,
        quiz: {
          questionEn: 'What is the primary function of the Dropout layer in neural networks?',
          questionHi: 'न्यूरल नेटवर्क में Dropout लेयर का मुख्य काम क्या होता है?',
          optionsEn: ['To double the download speed', 'To prevent model overfitting during training', 'To delete dataset records'],
          optionsHi: ['डाउनलोड स्पीड बढ़ाना', 'ट्रेनिंग के दौरान मॉडल को ओवरफिटिंग से बचाना', 'डेटाबेस रिकॉर्ड्स डिलीट करना'],
          correctIndex: 1,
          explanationEn: 'Dropout randomly deactivates neurons to force robust feature learning.',
          explanationHi: 'Dropout न्यूरॉन्स को रैंडम तरीके से डीएक्टिवेट करके मॉडल को रट्टा मारने (Overfitting) से रोकता है।'
        }
      },
      {
        id: 2,
        week: 'Module 2',
        titleEn: 'Fine-Tuning LLMs with LoRA & RAG Vector Pipelines',
        titleHi: 'LoRA और RAG वेक्टर पाइपलाइन से LLM को फाइन-ट्यून करना',
        duration: '45:10 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/_uQrJ0TkZlc?autoplay=1&rel=0',
        summaryEn: 'Parameter-efficient fine-tuning (PEFT), vector similarity indexing, and real-time retrieval generation.',
        summaryHi: 'कम VRAM में LoRA से मॉडल को ट्रेन करना और Pinecone वेक्टर डेटाबेस से सर्च पाइपलाइन बनाना।',
        keyPointsEn: [
          '4-bit QLoRA matrix adapters for low VRAM training.',
          'Cosine similarity search on high-dimensional embeddings.',
          'Cross-encoder reranking for context accuracy.'
        ],
        keyPointsHi: [
          'QLoRA के साथ कम खर्च में अपने कस्टम डेटा पर AI मॉडल ट्रेन करना।',
          'वेक्टर एम्बेडिंग्स और सिमिलैरिटी सर्च से तेज डेटा रिट्रीवल।',
          'Rerankers की मदद से सटीक और सही जवाब निकालना।'
        ],
        codeSnippet: `// RAG Vector Retrieval\nconst context = await vectorStore.similaritySearch(userQuery, 4);`,
        quiz: {
          questionEn: 'Why is LoRA preferred over full model fine-tuning for enterprises?',
          questionHi: 'कंपनियों में पूरे मॉडल को दोबारा ट्रेन करने की जगह LoRA क्यों चुना जाता है?',
          optionsEn: ['It trains small adapter matrices while freezing base weights, saving massive GPU memory', 'It works without any data', 'It converts code into HTML'],
          optionsHi: ['यह बेस मॉडल को लॉक करके छोटे एडेप्टर ट्रेन करता है, जिससे 90% GPU मेमोरी बचती है', 'यह बिना डेटा के काम करता है', 'यह कोड को HTML में बदल देता है'],
          correctIndex: 0,
          explanationEn: 'LoRA freezes existing weights and only trains low-rank adapter matrices.',
          explanationHi: 'LoRA पुराने मॉडल को छेड़े बिना छोटे लेयर्स जोड़कर ट्रेन करता है जिससे भारी GPU खर्चा बचता है।'
        }
      }
    ]
  },

  // 6. AI FOUNDATION
  'ai-foundation': {
    id: 'ai-foundation',
    titleEn: 'AI Foundation (For Beginners)',
    titleHi: 'AI फाउंडेशन (शुरुआती छात्रों के लिए प्रैक्टिकल कोर्स)',
    category: 'Tech Program',
    modules: [
      {
        id: 1,
        week: 'Module 1',
        titleEn: 'Introduction to GenAI & Prompt Engineering Basics',
        titleHi: 'GenAI और प्रॉम्प्ट इंजीनियरिंग की बुनियादी बातें',
        duration: '24:10 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/jC4v5AS4RIM?autoplay=1&rel=0',
        summaryEn: 'Understanding how Large Language Models work, token mechanics, and core prompt crafting techniques.',
        summaryHi: 'LLMs कैसे काम करते हैं, टोकन सिस्टम क्या है और सही प्रॉम्प्ट कैसे तैयार किए जाते हैं।',
        keyPointsEn: [
          'Zero-shot vs Few-shot prompt patterns.',
          'Avoiding hallucinations with strict system guardrails.',
          'Daily productivity workflows using ChatGPT & Claude.'
        ],
        keyPointsHi: [
          'Zero-shot और Few-shot प्रॉम्प्टिंग के सही तरीके।',
          'AI को गलत जवाब देने से रोकने के लिए सिस्टम रूल्स सेट करना।',
          'रोजमर्रा के ऑफिस और स्टडी वर्क को AI से 10x तेज करना।'
        ],
        codeSnippet: `// System Prompt Structure\nconst systemPrompt = {\n  role: "system",\n  instruction: "You are a professional business analyst. Answer in concise bullet points only."\n};`,
        quiz: {
          questionEn: 'What is Few-Shot Prompting in Generative AI?',
          questionHi: 'Generative AI में Few-Shot Prompting का क्या मतलब होता है?',
          optionsEn: ['Providing a few input-output examples to guide the model', 'Running 3 models at the same time', 'Deleting the prompt cache'],
          optionsHi: ['मॉडल को सही दिशा देने के लिए कुछ उदाहरण (Examples) देना', 'एक साथ 3 AI मॉडल चलाना', 'प्रॉम्प्ट हिस्ट्री को डिलीट कर देना'],
          correctIndex: 0,
          explanationEn: 'Few-shot prompting provides examples to help the LLM understand expected structure.',
          explanationHi: 'Few-shot प्रॉम्प्टिंग में मॉडल को उदाहरण दिए जाते हैं ताकि वो सटीक फॉर्मेट में जवाब दे सके।'
        }
      }
    ]
  },

  // 7. NEXT-GEN AI IN DIGITAL MARKETING
  'nextgen-ai-marketing': {
    id: 'nextgen-ai-marketing',
    titleEn: 'Next-Gen AI in Digital Marketing',
    titleHi: 'डिजिटल मार्केटिंग में नेक्स्ट-जेन AI तकनीक',
    category: 'Tech Program',
    modules: [
      {
        id: 1,
        week: 'Module 1',
        titleEn: 'High-Converting Copywriting & AI Ad Creatives',
        titleHi: 'AI से हाई-कन्वर्टिंग ऐड कॉपी और क्रिएटिव बनाना',
        duration: '26:45 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/843nec-IvW0?autoplay=1&rel=0',
        summaryEn: 'Automating multi-angle ad copywriting, A/B copy generation, and dynamic viral hooks.',
        summaryHi: 'मेटा और गूगल ऐड्स के लिए वायरल हेडलाइन्स और सेल्स कॉपी AI से सेकंड्स में बनाना।',
        keyPointsEn: [
          'AIDA & PAS framework generation using custom GPTs.',
          'Predictive CTR analytics and audience hook testing.',
          'Automated ad variation testing across Facebook & Google.'
        ],
        keyPointsHi: [
          'AIDA और PAS फॉर्मूले पर आधारित सेल्स स्क्रिप्ट तैयार करना।',
          'ऐड्स पर ज्यादा क्लिक्स लाने के लिए हुक टेस्टिंग करना।',
          'मेटा और गूगल ऐड्स के लिए अलग-अलग वैरिएशन्स जनरेट करना।'
        ],
        codeSnippet: `// Ad Generation Pipeline\nconst adCopy = generateAd({ framework: "PAS", audience: "B2B Founders", tone: "Urgent" });`,
        quiz: {
          questionEn: 'In copywriting, what does the PAS framework stand for?',
          questionHi: 'कॉपीराइटिंग में PAS फॉर्मूले का पूरा नाम क्या है?',
          optionsEn: ['Problem - Agitate - Solution', 'Print - Author - Send', 'Password - Access - System'],
          optionsHi: ['प्रॉब्लम (Problem) - एगिटेट (Agitate) - सॉल्यूशन (Solution)', 'प्रिंट - ऑथर - सेंड', 'पासवर्ड - एक्सेस - सिस्टम'],
          correctIndex: 0,
          explanationEn: 'PAS identifies the prospect pain point, highlights consequences, and offers your solution.',
          explanationHi: 'PAS पहले ग्राहक की समस्या दिखाता है, फिर उसके नुकसान बताता है और अंत में अपना समाधान देता है।'
        }
      }
    ]
  },

  // 8. DATA SCIENCE & APPLIED AI
  'data-science-ai': {
    id: 'data-science-ai',
    titleEn: 'Data Science & Applied AI Masterclass',
    titleHi: 'डेटा साइंस और एप्लाइड AI मास्टरक्लास',
    category: 'Tech Program',
    modules: [
      {
        id: 1,
        week: 'Module 1',
        titleEn: 'Pandas, NumPy & Exploratory Data Analysis (EDA)',
        titleHi: 'Pandas, NumPy और एक्सप्लोरेटरी डेटा एनालिसिस (EDA)',
        duration: '35:00 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/r-uOLxNrNk8?autoplay=1&rel=0',
        summaryEn: 'High-speed dataset manipulation, missing value imputation, and statistical distribution modeling.',
        summaryHi: 'Pandas और NumPy से बड़े डेटा को साफ करना, कमियों को भरना और स्टेटिस्टिकल एनालिसिस करना।',
        keyPointsEn: [
          'Vectorized arithmetic and boolean indexing in NumPy.',
          'Dataframe aggregation, groupby, and pivot transformations.',
          'Outlier detection using IQR and Z-score methods.'
        ],
        keyPointsHi: [
          'NumPy की मदद से करोड़ों डेटा रोस पर तेज कैलकुलेशन करना।',
          'Pandas Dataframe में ग्रुपिंग और डेटा फिल्टरिंग।',
          'डेटा में से गलत या आउटलायर एंट्रीज को पहचान कर हटाना।'
        ],
        codeSnippet: `import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv("client_data.csv")\nclean_df = df.dropna().query("revenue > 50000")`,
        quiz: {
          questionEn: 'Which Pandas function calculates descriptive summary statistics for numeric columns?',
          questionHi: 'Pandas में सभी न्यूमेरिक कॉलम्स की स्टेटिस्टिक्स समरी निकालने के लिए क्या इस्तेमाल होता है?',
          optionsEn: ['df.describe()', 'df.delete()', 'df.loop()'],
          optionsHi: ['df.describe()', 'df.delete()', 'df.loop()'],
          correctIndex: 0,
          explanationEn: 'df.describe() outputs count, mean, std, min, and quartiles in one step.',
          explanationHi: 'df.describe() से एक क्लिक में मीन, मीडियन, मिनिमम और मैक्सिमम स्टेट्स निकल आते हैं।'
        }
      }
    ]
  },

  // 9. AI AUTOMATION & WORKFLOW ENGINEERING
  'ai-automation-engineering': {
    id: 'ai-automation-engineering',
    titleEn: 'AI Automation & Workflow Engineering',
    titleHi: 'AI ऑटोमेशन और वर्कफ़्लो इंजीनियरिंग',
    category: 'Tech Program',
    modules: [
      {
        id: 1,
        week: 'Module 1',
        titleEn: 'Enterprise Webhook Pipelines & Make.com Architectures',
        titleHi: 'एंटरप्राइज वेबहुक पाइपलाइन और Make.com आर्किटेक्चर',
        duration: '32:00 mins',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/2eebptXfEvw?autoplay=1&rel=0',
        summaryEn: 'Creating multi-step automated workflows connecting CRMs, databases, and communication channels.',
        summaryHi: 'Make.com और n8n की मदद से CRM, गूगल शीट्स और व्हाट्सएप को बिना कोडिंग के आपस में जोड़ना।',
        keyPointsEn: [
          'Instant webhook triggers vs Scheduled polling.',
          'Error handlers, routers, and fallback notification channels.',
          'Rate limits and batch payload processing.'
        ],
        keyPointsHi: [
          'इवेंट होते ही तुरंत एक्शन लेना (Webhooks)।',
          'अगर कोई स्टेप फेल हो जाए तो एरर हैंडलर से बैकअप मैसेज भेजना।',
          'हजारों कॉल्स को एक साथ बिना ब्लॉक हुए प्रोसेस करना।'
        ],
        codeSnippet: `// Webhook Receiver Controller\nexport async function POST(req: Request) {\n  const payload = await req.json();\n  await triggerMakePipeline(payload);\n  return new Response("OK");\n}`,
        quiz: {
          questionEn: 'What makes webhooks faster and more efficient than polling?',
          questionHi: 'वेबहुक्स (Webhooks) बार-बार चेक करने (Polling) से तेज और बेहतर क्यों होते हैं?',
          optionsEn: ['Webhooks push data instantly when an event occurs without wasted requests', 'Webhooks only work on weekends', 'Webhooks delete old database records'],
          optionsHi: ['वेबहुक्स घटना घटते ही तुरंत डेटा भेजते हैं, जिससे सर्वर पर लोड नहीं पड़ता', 'वेबहुक्स सिर्फ वीकेंड पर चलते हैं', 'वेबहुक्स डेटाबेस को डिलीट कर देते हैं'],
          correctIndex: 0,
          explanationEn: 'Webhooks use event-driven push architecture, delivering payloads in real time.',
          explanationHi: 'वेबहुक्स रियल-टाइम में डेटा पुश करते हैं, जिससे सेकंड्स में काम पूरा हो जाता है।'
        }
      }
    ]
  }
};

export default function StudentClassroom() {
  // Extract course ID directly from window pathname or route fallback
  const [activeCourseId, setActiveCourseId] = useState<string>('advanced-ai-ml');
  const [langMode, setLangMode] = useState<'hi' | 'en'>('hi');
  const [unlockedModules, setUnlockedModules] = useState<number[]>([1]);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'quiz' | 'notes' | 'code'>('quiz');
  
  // Quiz State
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  // AI Tutor State
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const parts = window.location.pathname.split('/');
      const lastPart = parts[parts.length - 1];
      if (lastPart && COURSES_REGISTRY[lastPart]) {
        setActiveCourseId(lastPart);
      }
    }
  }, []);

  const courseData = COURSES_REGISTRY[activeCourseId] || COURSES_REGISTRY['advanced-ai-ml'];
  const modules = courseData.modules;
  const currentModule = modules[activeModuleIndex] || modules[0];

  useEffect(() => {
    setChatMessages([
      { 
        sender: 'ai', 
        text: langMode === 'hi' 
          ? `नमस्ते! मैं आपका सेक्रेड माइंड AI ट्यूटर हूँ। ${courseData.titleHi} के इस पाठ के बारे में कोई भी सवाल पूछें!`
          : `Hello! I am your Sacred Mind AI Tutor. Ask me any question regarding this ${courseData.titleEn} lesson!`
      }
    ]);
  }, [activeCourseId, langMode]);

  // Switch Module
  const handleSelectModule = (index: number) => {
    if (!unlockedModules.includes(modules[index].id)) {
      alert(langMode === 'hi' ? "🔒 कृपया अगला चैप्टर अनलॉक करने के लिए वर्तमान क्विज़ पास करें!" : "🔒 Please pass current module's checkpoint quiz to unlock this chapter!");
      return;
    }
    setActiveModuleIndex(index);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setQuizPassed(false);
    setActiveTab('quiz');
  };

  // Submit Quiz
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

  // Move Next
  const handleNextModule = () => {
    if (activeModuleIndex < modules.length - 1) {
      handleSelectModule(activeModuleIndex + 1);
    }
  };

  // Dynamic AI Doubt Solver
  const handleSendQuery = () => {
    if (!userInput.trim()) return;
    const q = userInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: q }]);
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const exp = langMode === 'hi' ? currentModule.quiz.explanationHi : currentModule.quiz.explanationEn;
      setChatMessages(prev => [...prev, {
        sender: 'ai',
        text: `${langMode === 'hi' ? 'आपके सवाल पर:' : 'Regarding your query:'} "${q}" — ${exp} ${langMode === 'hi' ? 'आप स्मार्ट नोट्स और लाइव सिंटैक्स टैब में भी इसकी डिटेल्स देख सकते हैं।' : 'You can review exact details inside the Notes & Code tab!'}`
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
            {langMode === 'hi' ? courseData.titleHi : courseData.titleEn}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* BILINGUAL LANGUAGE SWITCHER */}
          <button 
            onClick={() => setLangMode(langMode === 'hi' ? 'en' : 'hi')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-600/50 text-xs font-bold text-purple-300 hover:bg-purple-900/60 transition shadow-lg shadow-purple-950/40"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>{langMode === 'hi' ? '🇮🇳 हिन्दी / Hinglish' : '🇬🇧 English'}</span>
          </button>

          <div className="text-xs text-slate-400 hidden md:block">
            Progress: <strong className="text-white">{Math.round((unlockedModules.length / modules.length) * 100)}%</strong>
          </div>

          <Link href="/courses" className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition">
            Exit ✕
          </Link>
        </div>
      </header>

      {/* MAIN LEARNING ARENA */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* LEFT: SYLLABUS MODULES SIDEBAR */}
        <div className="lg:col-span-3 border-r border-slate-800/80 bg-slate-950/70 p-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {langMode === 'hi' ? 'कोर्स सिलेबस' : 'Course Syllabus'}
            </h3>
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
                    <span className="text-xs font-bold block leading-snug line-clamp-1">
                      {langMode === 'hi' ? mod.titleHi : mod.titleEn}
                    </span>
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

        {/* MIDDLE: THEATER HD VIDEO PLAYER + QUIZ GATE */}
        <div className="lg:col-span-6 p-6 overflow-y-auto max-h-[calc(100vh-4rem)] flex flex-col space-y-6">
          
          {/* HD EMBED VIDEO PLAYER */}
          <div className="rounded-3xl overflow-hidden border border-purple-500/40 bg-slate-900 shadow-2xl relative">
            <div className="aspect-video w-full bg-black">
              <iframe 
                key={currentModule.videoEmbedUrl}
                src={currentModule.videoEmbedUrl} 
                title={currentModule.titleEn}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-xs font-bold text-white line-clamp-1">
                  {langMode === 'hi' ? currentModule.titleHi : currentModule.titleEn}
                </span>
              </div>
              <span className="text-[11px] font-mono text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-md border border-purple-800/40 shrink-0">
                {currentModule.duration}
              </span>
            </div>
          </div>

          {/* INTERACTIVE LEARNING TABS */}
          <div className="border-b border-slate-800 flex space-x-6 text-sm font-semibold">
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`pb-3 border-b-2 transition flex items-center space-x-2 ${activeTab === 'quiz' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>{langMode === 'hi' ? 'अनिवार्य क्विज़ (Checkpoint)' : 'Mandatory Checkpoint Quiz'}</span>
            </button>
            <button 
              onClick={() => setActiveTab('notes')}
              className={`pb-3 border-b-2 transition flex items-center space-x-2 ${activeTab === 'notes' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              <FileText className="w-4 h-4" />
              <span>{langMode === 'hi' ? 'AI स्मार्ट नोट्स' : 'AI Smart Notes'}</span>
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`pb-3 border-b-2 transition flex items-center space-x-2 ${activeTab === 'code' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              <Code2 className="w-4 h-4" />
              <span>{langMode === 'hi' ? 'लाइव सिंटैक्स / कोड' : 'Live Syntax & Code'}</span>
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
                    {langMode === 'hi' ? currentModule.quiz.questionHi : currentModule.quiz.questionEn}
                  </h4>
                </div>
                <span className="p-2 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                  <BrainCircuit className="w-5 h-5" />
                </span>
              </div>

              {/* OPTIONS */}
              <div className="space-y-3">
                {(langMode === 'hi' ? currentModule.quiz.optionsHi : currentModule.quiz.optionsEn).map((option, optIdx) => (
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

              {/* QUIZ FEEDBACK */}
              {quizSubmitted && (
                <div className={`p-4 rounded-2xl border text-xs ${quizPassed ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/30 border-rose-500/40 text-rose-300'}`}>
                  <div className="flex items-center space-x-2 font-bold mb-1">
                    {quizPassed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{langMode === 'hi' ? 'सही उत्तर! अगला चैप्टर अनलॉक हो गया है 🎉' : 'Correct Answer! Next chapter unlocked 🎉'}</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span>{langMode === 'hi' ? 'गलत उत्तर। कृपया दोबारा कोशिश करें।' : 'Incorrect answer. Please review and try again!'}</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300 mt-1">
                    {langMode === 'hi' ? currentModule.quiz.explanationHi : currentModule.quiz.explanationEn}
                  </p>
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
                    {langMode === 'hi' ? 'उत्तर सबमिट करें और जांचें' : 'Submit & Verify Answer'}
                  </button>
                ) : (
                  activeModuleIndex < modules.length - 1 ? (
                    <button
                      onClick={handleNextModule}
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white transition shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2"
                    >
                      <span>{langMode === 'hi' ? `अगले मॉड्यूल पर जाएं (${modules[activeModuleIndex + 1].week})` : `Proceed to Next Module (${modules[activeModuleIndex + 1].week})`}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-900 to-pink-900 border border-purple-500/40 text-center space-y-1">
                      <div className="flex items-center justify-center space-x-2 text-white font-bold text-sm">
                        <Award className="w-5 h-5 text-amber-400" />
                        <span>{langMode === 'hi' ? 'बधाई हो! सभी मॉड्यूल पूरे हो चुके हैं' : 'Congratulations! All Modules Completed'}</span>
                      </div>
                      <p className="text-[11px] text-purple-200">{langMode === 'hi' ? 'सेक्रेड माइंड इंडस्ट्रियल ट्रेनिंग सर्टिफिकेशन वेरीफाई हो गया है।' : 'Official Sacred Mind Certification verified.'}</p>
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
                <span>{langMode === 'hi' ? 'पाठ का सार और मुख्य बिंदु' : 'AI Lesson Summary & Key Principles'}</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {langMode === 'hi' ? currentModule.summaryHi : currentModule.summaryEn}
              </p>
              
              <div className="space-y-2 pt-2">
                {(langMode === 'hi' ? currentModule.keyPointsHi : currentModule.keyPointsEn).map((point, idx) => (
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
                  AI Tutor is analyzing lesson context...
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
                placeholder={langMode === 'hi' ? "इस पाठ के बारे में सवाल पूछें..." : "Ask doubt about this lesson..."}
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
