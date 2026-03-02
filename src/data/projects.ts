// ─────────────────────────────────────────────────────────────────────────────
//  Projects Data  ·  src/data/projects.ts
//  Edit this file to update the Projects section.
//  Images → public/projects/<filename>.png  (recommended: 1200 × 630)
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
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce application with product listings, shopping cart, Stripe checkout, and an admin dashboard for inventory management. Optimized with lazy loading and server-side rendering for sub-2-second page loads.',
    image: '/projects/ecommerce.png',
    imageAlt: 'Screenshot of the e-commerce platform product listing page',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'Stripe'],
    category: 'web',
    githubUrl:    'https://github.com/yourusername/ecommerce-platform',
    demoVideoUrl: 'https://youtube.com/watch?v=placeholder',
    liveUrl:      'https://ecommerce.yourdomain.com',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'AI Task Summarizer',
    description:
      'A machine-learning web app that condenses long meeting notes and task lists into concise action items. Integrates a fine-tuned transformer model via a FastAPI backend with real-time streaming output.',
    image: '/projects/ai-summarizer.png',
    imageAlt: 'Screenshot of the AI task summarizer showing a condensed summary',
    tech: ['Python', 'FastAPI', 'React', 'OpenAI API', 'Docker'],
    category: 'ml',
    githubUrl:    'https://github.com/yourusername/ai-summarizer',
    demoVideoUrl: 'https://youtube.com/watch?v=placeholder',
    featured: false,
  },
  {
    id: 'proj-3',
    title: 'Dev CLI Toolkit',
    description:
      'A command-line toolkit that automates common project setup — scaffolding, linting config, git hooks, and CI/CD templates. Cuts boilerplate time from hours to seconds for every new project.',
    image: '/projects/cli-toolkit.png',
    imageAlt: 'Terminal screenshot showing the CLI toolkit in action',
    tech: ['Node.js', 'TypeScript', 'Commander.js', 'GitHub Actions'],
    category: 'tools',
    githubUrl: 'https://github.com/yourusername/dev-cli-toolkit',
    liveUrl:   'https://npmjs.com/package/@yourusername/dev-cli',
    featured: false,
  },
  {
    id: 'proj-4',
    title: 'Real-Time Chat App',
    description:
      'A real-time messaging application with WebSocket support, persistent chat rooms, user authentication, and emoji reactions. Mobile-first responsive UI with dark mode built-in.',
    image: '/projects/chat-app.png',
    imageAlt: 'Screenshot of the real-time chat app showing a conversation thread',
    tech: ['React', 'Socket.io', 'Express', 'MongoDB', 'JWT'],
    category: 'web',
    githubUrl:    'https://github.com/yourusername/realtime-chat',
    demoVideoUrl: 'https://youtube.com/watch?v=placeholder',
    liveUrl:      'https://chat.yourdomain.com',
    featured: false,
  },
]
