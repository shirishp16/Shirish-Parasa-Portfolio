import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const spring = { type: 'spring' as const, stiffness: 220, damping: 22 }

interface WorkEntry {
  id: string
  company: string
  title: string
  period: string
  location: string
  description: string
  logo?: string  // URL to company logo image — falls back to first letter
}

const WORK_ENTRIES: WorkEntry[] = [
  {
    id: 'work-1',
    company: 'Acme Corp',
    title: 'Software Engineer II',
    period: 'Oct 2022 – Present',
    location: 'San Francisco, CA',
    description:
      'Led migration of legacy monolith to microservices, reducing p99 latency by 40%. Owned the checkout redesign project, increasing conversion rate by 12%. Mentored 3 junior engineers through bi-weekly 1:1s and code reviews. Introduced E2E testing with Playwright, cutting production bugs by 60%.',
  },
  {
    id: 'work-2',
    company: 'Startup Inc.',
    title: 'Frontend Engineer Intern',
    period: 'May 2021 – Aug 2021',
    location: 'New York, NY',
    description:
      'Rebuilt the company dashboard in React, improving load time by 2×. Collaborated with design team to implement a new component library. Shipped 3 user-facing features within the first 4 weeks.',
  },
]

function LogoBox({ company, logo }: { company: string; logo?: string }) {
  if (logo) {
    return (
      <div
        className="w-10 h-10 rounded-xl shrink-0 overflow-hidden flex items-center justify-center"
        style={{ background: 'rgba(61,240,194,0.08)', border: '1px solid rgba(61,240,194,0.18)' }}
      >
        <img src={logo} alt={company} className="w-full h-full object-cover" />
      </div>
    )
  }
  return (
    <div
      className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-sm font-bold font-display"
      style={{
        background: 'rgba(61,240,194,0.08)',
        border: '1px solid rgba(61,240,194,0.18)',
        color: '#3df0c2',
      }}
    >
      {company.charAt(0)}
    </div>
  )
}

function ExperienceItem({ entry, index }: { entry: WorkEntry; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay: index * 0.1 }}
      className="py-6"
      style={index > 0 ? { borderTop: '1px solid rgba(61,240,194,0.08)' } : {}}
    >
      <div className="flex items-start gap-4">
        <LogoBox company={entry.company} logo={entry.logo} />

        <div className="flex-1 min-w-0">
          {/* Company + date row */}
          <div className="flex items-start justify-between gap-4 mb-0.5">
            <h3
              className="font-semibold text-base leading-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {entry.company}
            </h3>
            <span
              className="font-mono text-xs shrink-0 mt-0.5"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {entry.period}
            </span>
          </div>

          {/* Title */}
          <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
            {entry.title}
          </p>

          {/* Description */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {entry.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.06 })

  return (
    <section id="experience" ref={ref} aria-labelledby="experience-heading" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Heading — left-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
          className="mb-12"
        >
          <motion.h2
            id="experience-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.05 }}
            className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-3"
          >
            Experience
          </motion.h2>
          <motion.div
            className="aurora-bar"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.6, ease: 'easeOut' }}
            style={{ originX: 0, marginLeft: 0 }}
          />
        </motion.div>

        {/* Entry list */}
        <div>
          {WORK_ENTRIES.map((entry, index) => (
            <ExperienceItem key={entry.id} entry={entry} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
