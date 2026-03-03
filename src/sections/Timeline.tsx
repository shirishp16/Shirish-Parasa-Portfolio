import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Briefcase } from 'lucide-react'

const spring = { type: 'spring' as const, stiffness: 220, damping: 22 }

interface TimelineEntry {
  id: string
  type: 'education' | 'work'
  institution: string
  role: string
  period: string
  location: string
  description: string[]
  coursework?: string
}

const ENTRIES: TimelineEntry[] = [
  {
    id: 'edu-1',
    type: 'education',
    institution: 'The Ohio State University',
    role: 'B.S. Information Security, Minor in Computer Science & Statistics',
    period: 'May 2027',
    location: 'Columbus, OH',
    description: [
      'Teaching assistant for Data Structures & Algorithms',
      'Led the university ACM chapter and organized two hackathons',
    ],
    coursework: 'Data Structures, Algorithms, Operating Systems, Databases, Computer Networks, Software Engineering',
  },
  {
    id: 'edu-2',
    type: 'education',
    institution: 'Tech Bootcamp',
    role: 'Full-Stack Web Development Certificate',
    period: 'Jun 2022 – Sep 2022',
    location: 'Remote',
    description: [
      'Intensive 16-week program covering React, Node.js, and PostgreSQL',
      'Built and shipped 5 full-stack projects in a collaborative team setting',
    ],
  },
  {
    id: 'work-1',
    type: 'work',
    institution: 'Acme Corp',
    role: 'Software Engineer II',
    period: 'Oct 2022 – Present',
    location: 'San Francisco, CA',
    description: [
      'Led migration of legacy monolith to microservices, reducing p99 latency by 40%',
      'Owned the checkout redesign project, increasing conversion rate by 12%',
      'Mentored 3 junior engineers through bi-weekly 1:1s and code reviews',
      'Introduced E2E testing with Playwright, cutting production bugs by 60%',
    ],
  },
  {
    id: 'work-2',
    type: 'work',
    institution: 'Startup Inc.',
    role: 'Frontend Engineer Intern',
    period: 'May 2021 – Aug 2021',
    location: 'New York, NY',
    description: [
      'Rebuilt the company dashboard in React, improving load time by 2×',
      'Collaborated with design team to implement a new component library',
      'Shipped 3 user-facing features within the first 4 weeks',
    ],
  },
]

const bulletContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}
const bulletItem = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: spring },
}

function TimelineCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.12 })

  const isEducation = entry.type === 'education'
  const accentColor  = isEducation ? '#8b5cf6' : '#3df0c2'
  const accentGlow   = isEducation ? 'rgba(139,92,246,0.25)' : 'rgba(61,240,194,0.25)'
  const borderColor  = isEducation ? 'rgba(139,92,246,0.55)' : 'rgba(61,240,194,0.55)'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay: index * 0.08 }}
      className="glass-panel rounded-xl overflow-hidden"
      style={{
        borderLeft: `3px solid ${borderColor}`,
        boxShadow: inView ? `0 0 0 0 ${accentGlow}` : undefined,
      }}
    >
      {/* Card inner */}
      <div className="p-5">
        <h3 className="text-[var(--color-text-primary)] font-semibold text-sm leading-snug mb-1">
          {entry.role}
        </h3>
        <p className="font-medium text-sm" style={{ color: accentColor }}>
          {entry.institution}
        </p>
        <p className="text-[var(--color-text-muted)] text-xs mt-1 mb-4">
          {entry.period} · {entry.location}
        </p>

        <motion.ul
          variants={bulletContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-1.5"
          aria-label="Details"
        >
          {entry.description.map((point, i) => (
            <motion.li
              key={i}
              variants={bulletItem}
              className="flex gap-2 text-sm text-[var(--color-text-secondary)]"
            >
              <span
                className="mt-1.5 shrink-0 rounded-full"
                aria-hidden="true"
                style={{
                  width: '4px', height: '4px',
                  background: accentColor,
                  boxShadow: `0 0 4px ${accentGlow}`,
                  flexShrink: 0,
                }}
              />
              {point}
            </motion.li>
          ))}
        </motion.ul>

        {entry.coursework && (
          <p className="mt-3 text-xs text-[var(--color-text-muted)] italic leading-relaxed">
            <span className="not-italic font-medium text-[var(--color-text-secondary)]">Coursework: </span>
            {entry.coursework}
          </p>
        )}
      </div>
    </motion.div>
  )
}

function ColumnHeader({
  icon: Icon,
  label,
  color,
  tint,
  inView,
  delay,
}: {
  icon: typeof GraduationCap
  label: string
  color: string
  tint: string
  inView: boolean
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay }}
      className="flex items-center gap-3 mb-6 pb-4"
      style={{ borderBottom: `1px solid ${tint}` }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: tint.replace('0.15', '0.12') }}
      >
        <Icon size={17} style={{ color }} aria-hidden="true" />
      </div>
      <span className="font-display font-bold text-lg" style={{ color }}>
        {label}
      </span>
    </motion.div>
  )
}

const educationEntries = ENTRIES.filter(e => e.type === 'education')
const workEntries      = ENTRIES.filter(e => e.type === 'work')

export default function Timeline() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.04 })

  return (
    <section id="timeline" ref={ref} aria-labelledby="timeline-heading" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
          className="text-center mb-16"
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              id="timeline-heading"
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ ...spring, delay: 0.05 }}
              className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
            >
              Education &amp; Experience
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

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* ── Education column ── */}
          <div>
            <ColumnHeader
              icon={GraduationCap}
              label="Education"
              color="#8b5cf6"
              tint="rgba(139,92,246,0.15)"
              inView={inView}
              delay={0.15}
            />
            <div className="space-y-5">
              {educationEntries.map((entry, i) => (
                <TimelineCard key={entry.id} entry={entry} index={i} />
              ))}
            </div>
          </div>

          {/* ── Experience column ── */}
          <div>
            <ColumnHeader
              icon={Briefcase}
              label="Experience"
              color="#3df0c2"
              tint="rgba(61,240,194,0.15)"
              inView={inView}
              delay={0.22}
            />
            <div className="space-y-5">
              {workEntries.map((entry, i) => (
                <TimelineCard key={entry.id} entry={entry} index={i} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
