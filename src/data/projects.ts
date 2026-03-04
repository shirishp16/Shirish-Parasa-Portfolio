// ─────────────────────────────────────────────────────────────────────────────
//  Projects Data  ·  src/data/projects.ts
//  Edit this file to update the Projects section.
//
//  FIELDS:
//    id            — unique string, e.g. 'proj-5'
//    title         — project name
//    description   — 2–4 sentence summary (shown on the card)
//    image         — path relative to /public (e.g. '/projects/myapp.png')
//                    · Recommended size: 1200 × 630 px
//                    · Drop the file into public/projects/ and update this path
//                    · If no image, the card shows a gradient placeholder
//    imageAlt      — screen-reader alt text for the screenshot
//    tech          — string[] of badge labels (languages, frameworks, tools)
//    category      — 'web' | 'ml' | 'tools'  (used by filter tabs)
//    githubUrl     — (optional) link to the GitHub repo
//    demoVideoUrl  — (optional) YouTube / Loom URL for a demo video
//    liveUrl       — (optional) link to the deployed / live site
//    featured      — set true to pin the card at the top / highlight it
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectCategory = 'web' | 'ml' | 'tools'

export interface Project {
  id: string
  title: string
  description: string      // 2–4 sentences
  image: string            // path relative to /public
  imageAlt: string
  tech: string[]           // badge labels
  category: ProjectCategory
  githubUrl?: string
  demoVideoUrl?: string
  liveUrl?: string
  featured?: boolean
}

// TODO: Replace every entry with your real projects.
//       Replace "yourusername" with your GitHub handle.
export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Maya - Most Technical Award (IBM x OSU AI Hack 2026)',
    description:
      'Maya is an Electron + React + FastAPI AI desktop assistant for Ohio State students that uses an embedded browser with SMS-triggered agentic workflows (Linq/ngrok) to autonomously apply to jobs, scrape Canvas/PDFs for RAG-based quizzes/flashcards/study plans, generate live lecture notes via Deepgram, persist user profiles/sessions and application statuses in SQLite, and produce job-tailored resume PDFs.',
    image: 'public/projects/maya-logo.png',
    imageAlt: 'Maya logo',
    tech: ['Electron', 'React', 'TypeScript', 'Node.js', 'FastAPI', 'Python', 'SQLite', 'Gemini API', 'RAG', 'Playwright', 'Deepgram', 'Linq',],
    category: 'web',
    githubUrl:    'https://github.com/shirishp16/maya',
    demoVideoUrl: 'https://youtu.be/NKmQnOfVuO0',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'LinguaTax',
    description:
      'LingoTax is a multilingual tax assistance platform for 45M+ U.S. immigrants (including F-1/J-1/H-1B filers) that translates complex IRS regulations by combining a GraphSAGE GNN with a LangChain + Gemini 2.5 Flash RAG pipeline and PGVector search over user-uploaded tax documents to deliver document-grounded chat in 20+ languages with PDF form-field bounding box highlights.',
    image: 'public/projects/linguatax.png',
    imageAlt: 'LinguaTax logo',
    tech: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'Python', 'Supabase', 'PostgreSQL', 'PyTorch', 'GraphSage GNN', 'Langchain', 'Gemini API', 'RAG'],
    category: 'web',
    githubUrl:    'https://github.com/shirishp16/linguatax',
    demoVideoUrl: 'https://youtu.be/Y_lS2gHXdqQ',
    liveUrl:      'https://lingo-tax.vercel.app/',
    featured: false,
  },
  {
    id: 'proj-3',
    title: 'NorthStar',
    description:
      'NorthStar is a prompt-driven React/Flask web app that takes any news headline, uses the News API to discover and scrape related coverage, then runs a multi-stage LangChain pipeline with GPT-4o to extract keywords, filter for relevance, score political bias (-1 to 1) with transparent justifications, detect loaded language, and generate cross-source summaries that surface the consistent, verified facts.',
    image: 'public/projects/northstar.png',
    imageAlt: 'NorthStar logo',
    tech: ['React', 'TypeScript', 'Node.js', 'Flask', 'Python', 'Langchain', 'OpenAI API', 'LLMs', 'News API', 'BeautifulSoup', 'Sentiment & Bias Analysis'],
    category: 'web',
    githubUrl: 'https://github.com/shirishp16/northstar',
    demoVideoUrl: 'https://youtu.be/hJsk7HcXi5s',
    featured: false,
  },
  {
    id: 'proj-4',
    title: 'DentalX-AI',
    description:
      'DentalX AI is a multi-page React web app with a Flask backend that uses a custom TensorFlow CNN trained on 5K+ dental X-rays—preprocessed and augmented via a Python pipeline—to upload images and return scored diagnostics and explanations for conditions like implants, fillings, cavities, and impacted teeth.',
    image: 'public/projects/dentalx-ai.png',
    imageAlt: 'DentalX-AI logo',
    tech: ['React', 'Flask', 'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'CNNs', 'Image Preprocessing', 'Data Augmentation'],
    category: 'ml',
    githubUrl:    'https://github.com/shirishp16/dentalx-ai',
    liveUrl:      'https://shirishp16.github.io/DentalX-AI/',
    featured: false,
  },
]
