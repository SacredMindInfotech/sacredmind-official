import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic, duration = "2 Months", category = "tech" } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    let modules = [];
    let practicalProjects = [];

    if (category === 'language') {
      modules = [
        {
          week: "Phase 1",
          title: "Phonetics, Vocabulary & AI Accent Training",
          topics: [`Core conversational fundamentals in ${topic}`, "Interactive AI voice tutor pronunciation drills", "Daily essential vocabulary mapping"]
        },
        {
          week: "Phase 2",
          title: "Grammar Frameworks & Sentence Synthesis",
          topics: ["Contextual grammar engines & error correction", "Reading comprehension with AI-assisted translation", "Listening comprehension simulations"]
        },
        {
          week: "Phase 3",
          title: "Professional & Corporate Communication",
          topics: ["Email drafting, presentation & interview prep", "Idiomatic expressions and cultural business etiquette", "Real-time AI conversational sparring"]
        },
        {
          week: "Phase 4",
          title: "Fluency Certification & Live Assessment",
          topics: ["CEFR level benchmark assessment", "Live simulated mock interviews", "Official Sacred Mind certification test"]
        }
      ];
      practicalProjects = [
        `Live AI Conversational Mastery in ${topic}`,
        "Corporate Presentation & Business Pitch",
        "CEFR Benchmark Fluency Assessment"
      ];
    } else {
      modules = [
        {
          week: "Phase 1",
          title: "Foundations & Core Architectures",
          topics: [`In-depth introduction to ${topic}`, "Tooling setup, environments & prompt architectures", "Practical baseline assignments"]
        },
        {
          week: "Phase 2",
          title: "Advanced Engineering & Pipeline Design",
          topics: ["Building production-ready workflows & algorithms", "Automation webhooks, API integrations & data processing", "Performance benchmarking & optimization"]
        },
        {
          week: "Phase 3",
          title: "Enterprise Deployment & Agentic Systems",
          topics: ["Autonomous agent pipelines & microservices", "Database state synchronization & cloud scaling", "Security audits and client deliverables"]
        },
        {
          week: "Phase 4",
          title: "Live Production Capstone & Placement Drive",
          topics: ["Real-world client project execution at Mohali Lab", "Portfolio code reviews & interview preparation", "Guaranteed placement support & certification"]
        }
      ];
      practicalProjects = [
        `Production Enterprise Deployment for ${topic}`,
        "Autonomous Multi-Agent Workflow Engine",
        "Live Client Capstone Project"
      ];
    }

    const generatedData = {
      courseTitle: topic,
      duration: duration,
      overview: `A complete, industry-grade practical curriculum designed for deployment at Sacred Mind Mohali.`,
      modules,
      practicalProjects
    };

    return NextResponse.json({ success: true, data: generatedData });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate AI syllabus" }, { status: 500 });
  }
}
