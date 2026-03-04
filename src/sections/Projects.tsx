import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Play } from 'lucide-react'
import { projects, type ProjectCategory } from '../data/projects'
import StarField from '../components/StarField'

// Fallback gradient colors per category
const FALLBACK_COLORS: Record<ProjectCategory, { color: string; bg: string }> = {
  web:   { color: '#3df0c2', bg: 'rgba(61,240,194,0.12)'  },
  ml:    { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)'  },
  tools: { color: '#38bdf8', bg: 'rgba(56,189,248,0.12)'  },
}

// ─── Action button helpers (module-scope to satisfy ESLint static-component rule) ─
function CodeBtn({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${label} source code on GitHub`}
      className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-150"
      style={{ border: '1px solid rgba(61,240,194,0.25)', color: 'var(--color-text-secondary)' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(61,240,194,0.55)'; e.currentTarget.style.color = '#3df0c2' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(61,240,194,0.25)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
    >
      <Github size={14} /> Code
    </a>
  )
}
function DemoBtn({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${label} demo`}
      className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-150"
      style={{ border: '1px solid rgba(56,189,248,0.25)', color: 'var(--color-text-secondary)' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(56,189,248,0.55)'; e.currentTarget.style.color = '#38bdf8' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(56,189,248,0.25)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
    >
      <Play size={14} /> Demo
    </a>
  )
}
function LiveBtn({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${label} live site`}
      className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-150"
      style={{ border: '1px solid rgba(139,92,246,0.25)', color: 'var(--color-text-secondary)' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.55)'; e.currentTarget.style.color = '#8b5cf6' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.25)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
    >
      <ExternalLink size={14} /> Live
    </a>
  )
}

// ─── Horizontal project card ───────────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const fb = FALLBACK_COLORS[project.category]
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.08 })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(61,240,194,0.1)', transition: { duration: 0.15 } }}
      className="glass-panel iridescent-border rounded-2xl overflow-hidden flex flex-col md:flex-row"
      aria-label={`Project: ${project.title}`}
    >
      {/* ── LEFT: project image ── */}
      <div
        className="md:w-2/5 shrink-0 h-64 md:h-auto md:min-h-[240px] relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${fb.bg} 0%, rgba(11,18,32,1) 100%)` }}
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        {/* Category tint overlay — always present, adds depth even when image loads */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(to right, transparent 60%, rgba(11,18,32,0.35))` }}
        />
      </div>

      {/* ── RIGHT: text content ── */}
      <div className="flex-1 p-8 flex flex-col min-w-0">

        {/* Title row + action buttons */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display text-lg font-bold leading-snug" style={{ color: 'var(--color-text-primary)' }}>
            {project.title}
          </h3>
          <div className="flex gap-1.5 shrink-0 pt-0.5">
            {project.demoVideoUrl && <DemoBtn href={project.demoVideoUrl} label={project.title} />}
            {project.githubUrl    && <CodeBtn href={project.githubUrl}    label={project.title} />}
            {project.liveUrl      && <LiveBtn href={project.liveUrl}      label={project.title} />}
          </div>
        </div>

        {/* Description */}
        <p className="text-base leading-relaxed flex-1" style={{ color: 'var(--color-text-secondary)' }}>
          {project.description}
        </p>

        {/* Tech badges */}
        <div
          className="flex flex-wrap gap-1.5 mt-4 pt-4"
          style={{ borderTop: '1px solid rgba(61,240,194,0.08)' }}
          aria-label="Technologies used"
        >
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-0.5 rounded-full font-mono"
              style={{
                background: 'rgba(61,240,194,0.05)',
                color: 'var(--color-text-muted)',
                border: '1px solid rgba(61,240,194,0.1)',
              }}
            >
              {t}
            </span>
          ))}
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
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 65% 40% at 15% 20%, rgba(56,189,248,0.05), transparent), var(--color-bg-secondary)' }}
    >
      <StarField count={210} seed={3} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="text-center mb-12"
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

        {/* Single-column card list — horizontal layout */}
        <div className="flex flex-col gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
