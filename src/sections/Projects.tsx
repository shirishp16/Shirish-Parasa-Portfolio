import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Play } from 'lucide-react'
import { projects, type ProjectCategory } from '../data/projects'

// Badge color per category — adds aurora variety
const BADGE_COLORS: Record<ProjectCategory, { color: string; border: string; bg: string }> = {
  web:   { color: '#3df0c2', border: 'rgba(61,240,194,0.3)',  bg: 'rgba(61,240,194,0.08)'  },
  ml:    { color: '#8b5cf6', border: 'rgba(139,92,246,0.3)',  bg: 'rgba(139,92,246,0.08)'  },
  tools: { color: '#38bdf8', border: 'rgba(56,189,248,0.3)',  bg: 'rgba(56,189,248,0.08)'  },
}

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const badge = BADGE_COLORS[project.category]

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(61,240,194,0.1)' }}
      transition={{ duration: 0.25 }}
      className="glass-panel iridescent-border rounded-xl overflow-hidden flex flex-col shadow-lg"
      aria-label={`Project: ${project.title}`}
    >
      {/* Project image — taller than before */}
      <div
        className="relative overflow-hidden h-60"
        style={{ background: 'rgba(26,40,64,0.8)' }}
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            const fb = e.currentTarget.nextElementSibling as HTMLElement | null
            if (fb) fb.hidden = false
          }}
        />
        {/* Fallback when image is missing */}
        <div
          hidden
          aria-hidden="true"
          className="w-full h-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${badge.bg} 0%, rgba(11,18,32,1) 100%)`,
          }}
        >
          <span
            className="text-5xl font-bold select-none font-display"
            style={{ color: `${badge.color}44` }}
          >
            {project.title[0]}
          </span>
        </div>

        {/* Category badge */}
        <span
          className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full font-mono"
          style={{
            background: 'rgba(6,9,15,0.85)',
            backdropFilter: 'blur(8px)',
            color: badge.color,
            border: `1px solid ${badge.border}`,
          }}
        >
          {project.category.toUpperCase()}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[var(--color-text-primary)] font-semibold text-base mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mt-4" aria-label="Technologies used">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded font-mono"
              style={{
                background: 'rgba(61,240,194,0.06)',
                color: 'var(--color-text-muted)',
                border: '1px solid rgba(61,240,194,0.12)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action links */}
        <div
          className="flex flex-wrap gap-2 mt-4 pt-4"
          style={{ borderTop: '1px solid rgba(61,240,194,0.1)' }}
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
              style={{ border: '1px solid rgba(61,240,194,0.15)', color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(61,240,194,0.4)'; e.currentTarget.style.color = 'var(--color-text-primary)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(61,240,194,0.15)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <Github size={13} /> Code
            </a>
          )}
          {project.demoVideoUrl && (
            <a
              href={project.demoVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
              style={{ border: '1px solid rgba(56,189,248,0.2)', color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(56,189,248,0.5)'; e.currentTarget.style.color = '#38bdf8' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(56,189,248,0.2)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
              aria-label={`Watch ${project.title} demo video`}
            >
              <Play size={13} /> Demo
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
              aria-label={`Open ${project.title} live site`}
            >
              <ExternalLink size={13} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section
      id="projects"
      ref={ref}
      aria-labelledby="projects-heading"
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            id="projects-heading"
            className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
          >
            Projects
          </h2>
          <div className="aurora-bar" aria-hidden="true" />
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
