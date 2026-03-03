import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Play } from 'lucide-react'
import { projects, type ProjectCategory } from '../data/projects'

// Used only for the image fallback gradient — no badge rendered
const FALLBACK_COLORS: Record<ProjectCategory, { color: string; bg: string }> = {
  web:   { color: '#3df0c2', bg: 'rgba(61,240,194,0.12)'  },
  ml:    { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)'  },
  tools: { color: '#38bdf8', bg: 'rgba(56,189,248,0.12)'  },
}

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const fb = FALLBACK_COLORS[project.category]
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(61,240,194,0.12)', transition: { duration: 0.15 } }}
      className="glass-panel iridescent-border rounded-2xl overflow-hidden flex flex-col shadow-lg"
      aria-label={`Project: ${project.title}`}
    >
      {/* Project image */}
      <div
        className="relative overflow-hidden h-72"
        style={{ background: 'rgba(26,40,64,0.8)' }}
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            const fallback = e.currentTarget.nextElementSibling as HTMLElement | null
            if (fallback) fallback.hidden = false
          }}
        />
        {/* Fallback gradient */}
        <div
          hidden
          aria-hidden="true"
          className="w-full h-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${fb.bg} 0%, rgba(11,18,32,1) 100%)`,
          }}
        >
          <span
            className="text-6xl font-bold select-none font-display"
            style={{ color: `${fb.color}44` }}
          >
            {project.title[0]}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-[var(--color-text-primary)] font-semibold text-lg mb-2 leading-snug">
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
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
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
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
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
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.05 })

  return (
    <section
      id="projects"
      ref={ref}
      aria-labelledby="projects-heading"
      className="py-24 px-6"
    >
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="text-center mb-14"
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              id="projects-heading"
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.06 }}
              className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
            >
              Projects
            </motion.h2>
          </div>
          <motion.div
            className="aurora-bar"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.65, ease: 'easeOut' }}
            style={{ originX: 0.5 }}
          />
        </motion.div>

        {/* 2-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
