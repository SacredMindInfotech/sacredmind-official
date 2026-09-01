import { NextResponse } from 'next/server';

// Course-specific video mappings
const COURSE_VIDEOS: Record<string, string[]> = {
  'advanced-ai-ml': [
    'https://www.youtube-nocookie.com/embed/aircAruvnKk?autoplay=1&rel=0', // ML Intro
    'https://www.youtube-nocookie.com/embed/tPYj3fFJGjk?autoplay=1&rel=0', // Neural Networks
    'https://www.youtube-nocookie.com/embed/843nec-IvW0?autoplay=1&rel=0', // NLP
    'https://www.youtube-nocookie.com/embed/2eebptXfEvw?autoplay=1&rel=0', // Advanced
    'https://www.youtube-nocookie.com/embed/_uQrJ0TkZlc?autoplay=1&rel=0'  // Capstone
  ],
  'lang-punjabi': [
    'https://www.youtube-nocookie.com/embed/3C5h7_jD6kQ?autoplay=1&rel=0', // Punjabi Basics (Example)
    'https://www.youtube-nocookie.com/embed/8_rX0975g7Q?autoplay=1&rel=0', // Grammar
    'https://www.youtube-nocookie.com/embed/U3B9d_1694A?autoplay=1&rel=0', // Vocabulary
    'https://www.youtube-nocookie.com/embed/8jPQjjsBbIc?autoplay=1&rel=0', // Conversations
    'https://www.youtube-nocookie.com/embed/3C5h7_jD6kQ?autoplay=1&rel=0'  // Advanced
  ],
  // Default fallback videos
  'default': [
    'https://www.youtube-nocookie.com/embed/_uQrJ0TkZlc?autoplay=1&rel=0',
    'https://www.youtube-nocookie.com/embed/aircAruvnKk?autoplay=1&rel=0',
    'https://www.youtube-nocookie.com/embed/843nec-IvW0?autoplay=1&rel=0',
    'https://www.youtube-nocookie.com/embed/tPYj3fFJGjk?autoplay=1&rel=0',
    'https://www.youtube-nocookie.com/embed/2eebptXfEvw?autoplay=1&rel=0'
  ]
};

export async function POST(req: Request) {
  try {
    const { courseId, moduleTitle, topic, moduleIndex } = await req.json();
    
    // Select videos based on course ID
    const videoList = COURSE_VIDEOS[courseId] || COURSE_VIDEOS['default'];
    const videoUrl = videoList[moduleIndex % videoList.length];

    // Basic dynamic content generation
    const content = {
      topicTitle: topic || `Core Implementation for ${courseId}`,
      module: moduleTitle || "Module 1",
      videoDetails: {
        duration: "30-45 mins",
        type: "Interactive AI Video Breakdown",
        videoUrl: videoUrl
      },
      smartNotes: {
        summary: `Comprehensive breakdown of ${moduleTitle} for the ${courseId} course.`,
        keyConcepts: [
          `Key principle 1 for ${courseId}`,
          "Performance bottlenecks and optimization",
          "Enterprise best practices applied at Sacred Mind Tech Labs"
        ],
        codeSnippet: `// Implementation for ${courseId}\nconsole.log('Running module ${moduleIndex}');\n// Add relevant code or grammar rules here`,
        practicalTakeaway: "Apply these concepts to your final capstone project."
      },
      quiz: {
         question: `What is a core concept taught in this module for ${courseId}?`,
         options: [
            "A relevant incorrect concept",
            `The primary technique for ${moduleTitle}`,
            "An unrelated concept"
         ],
         correctIndex: 1,
         explanation: `This is the fundamental approach for the ${courseId} curriculum.`
      }
    };

    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate AI course content" }, { status: 500 });
  }
}
