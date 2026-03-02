import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Briefcase } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
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
    coursework:
      'Data Structures, Algorithms, Operating Systems, Databases, Computer Networks, Software Engineering',
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

// ─── Sub-component: single timeline card ─────────────────────────────────────
function TimelineCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const isLeft = index % 2 === 0

  const Icon = entry.type === 'education' ? GraduationCap : Briefcase

  const badgeStyle =
    entry.type === 'education'
      ? {
          background: 'rgba(139,92,246,0.12)',
          color: '#8b5cf6',
          border: '1px solid rgba(139,92,246,0.3)',
        }
      : {
          background: 'rgba(61,240,194,0.1)',
          color: '#3df0c2',
          border: '1px solid rgba(61,240,194,0.25)',
        }

  return (
    <div ref={ref} className="relative flex md:justify-center mb-10 last:mb-0">
      {/* Glowing dot */}
      <div
        className="absolute top-5 left-4 md:left-1/2 md:-translate-x-1/2 w-3.5 h-3.5 rounded-full z-10"
        style={{
          background: '#3df0c2',
          border: '2px solid #06090f',
          boxShadow: '0 0 12px rgba(61,240,194,0.7), 0 0 4px rgba(61,240,194,0.5)',
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={[
          'glass-panel iridescent-border ml-12 md:ml-0 md:w-[46%] rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(61,240,194,0.08)]',
          isLeft ? 'md:mr-auto md:text-right' : 'md:ml-auto',
        ].join(' ')}
      >
        {/* Badge + icon */}
        <div
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
          style={badgeStyle}
        >
          <Icon size={12} aria-hidden="true" />
          {entry.type === 'education' ? 'Education' : 'Experience'}
        </div>

        <h3 className="text-[var(--color-text-primary)] font-semibold text-base leading-snug">
          {entry.role}
        </h3>
        <p className="font-medium text-sm mt-0.5" style={{ color: '#38bdf8' }}>
          {entry.institution}
        </p>
        <p className="text-[var(--color-text-muted)] text-xs mt-1 mb-3">
          {entry.period} · {entry.location}
        </p>

        <ul className={`space-y-1.5 ${isLeft ? 'md:text-right' : ''}`} aria-label="Details">
          {entry.description.map((point, i) => (
            <li
              key={i}
              className={`flex gap-2 text-sm text-[var(--color-text-secondary)] ${isLeft ? 'md:flex-row-reverse' : ''}`}
            >
              <span
                className="mt-1.5 shrink-0 rounded-full"
                aria-hidden="true"
                style={{
                  width: '5px',
                  height: '5px',
                  background: '#3df0c2',
                  boxShadow: '0 0 4px rgba(61,240,194,0.5)',
                }}
              />
              {point}
            </li>
          ))}
        </ul>

        {entry.coursework && (
          <p className="mt-3 text-xs text-[var(--color-text-muted)] italic leading-relaxed">
            <span className="not-italic font-medium text-[var(--color-text-secondary)]">Coursework: </span>
            {entry.coursework}
          </p>
        )}
      </motion.div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Timeline() {
  return (
    <section id="timeline" aria-labelledby="timeline-heading" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2
            id="timeline-heading"
            className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
          >
            Education &amp; Experience
          </h2>
          <div className="aurora-bar" aria-hidden="true" />
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical glowing line — desktop center, mobile left */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-px w-px"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(61,240,194,0.4), rgba(139,92,246,0.3), rgba(61,240,194,0.2), transparent)',
              boxShadow: '0 0 10px rgba(61,240,194,0.2)',
            }}
          />

          {ENTRIES.map((entry, index) => (
            <TimelineCard key={entry.id} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
