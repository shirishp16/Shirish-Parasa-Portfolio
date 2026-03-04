import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import StarField from '../components/StarField'

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

// ─────────────────────────────────────────────────────────────────────────────
//  HOW TO EDIT EXPERIENCE ENTRIES
//
//  Add, remove, or reorder objects in the array below.
//  Fields:
//    id          — unique string (e.g. 'work-5'); used as React key
//    company     — full company name shown as the card title
//    title       — your job title / role
//    period      — display string for dates (e.g. 'June 2024 – Aug 2024')
//    location    — city, state
//    description — 1–3 sentence summary of what you did
//    logo        — (optional) path to company logo image
//                  · Drop a PNG/SVG into public/assets/ and set:
//                    logo: '/assets/company-logo.png'
//                  · If omitted, the first letter of `company` is shown instead
// ─────────────────────────────────────────────────────────────────────────────
const WORK_ENTRIES: WorkEntry[] = [
  {
    id: 'work-1',
    company: 'Vertiv',
    title: 'Software Engineer Intern',
    period: 'Incoming May 2026',
    location: 'Westerville, OH',
    description:
      'Incomign SWE Intern at Vertiv for Summer 2026',
    logo: 'public/assets/vertiv-logo.png',
  },
  {
    id: 'work-2',
    company: 'Translational Data Analytics Institute (TDAI)',
    title: 'AI Research Assistant',
    period: 'September 2025 – Present',
    location: 'Columbus, OH',
    description:
      'Designed and built UI via TAPIS to serve as a hub for ML teams on multi-model testing, dataset labeling, and IAM/Auth configurations for teams and users',
    logo: 'public/assets/tdai-logo.png',
  },
  {
    id: 'work-3',
    company: 'The Ohio State University - Computer Science Department',
    title: 'Undergraduate Teaching Assistant',
    period: 'August 2025 – Present',
    location: 'Columbus, OH',
    description:
      'Teaching assistant for CSE 2321: Foundations 1 - Data structures, algorithms, and discrete mathematics course in computer science',
    logo: 'public/assets/cse-logo.png',
  },
  {
    id: 'work-4',
    company: 'Wichita Area Metropolitan Planning Organization (WAMPO)',
    title: 'Software Engineer Intern',
    period: 'May 2025 – July 2025',
    location: 'Wichita, KS',
    description:
      'Automating a data pipeline to analyze/output traffic data from road-intersection sensors charted on internal dashboards',
    logo: 'public/assets/wampo-logo.png',
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
      className="glass-panel iridescent-border rounded-xl p-6"
    >
      <div className="flex items-start gap-4">
        <LogoBox company={entry.company} logo={entry.logo} />

        <div className="flex-1 min-w-0">
          {/* Company + date row */}
          <div className="flex items-start justify-between gap-4 mb-0.5">
            <h3
              className="font-semibold text-lg leading-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {entry.company}
            </h3>
            <span
              className="font-mono text-sm shrink-0 mt-0.5"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {entry.period}
            </span>
          </div>

          {/* Title */}
          <p className="text-base mb-3" style={{ color: 'var(--color-text-secondary)' }}>
            {entry.title}
          </p>

          {/* Description */}
          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
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
    <section id="experience" ref={ref} aria-labelledby="experience-heading" className="relative py-24 px-6 overflow-hidden">
      <StarField count={200} seed={1} />
      <div className="relative z-10 max-w-4xl mx-auto">

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
        <div className="space-y-6">
          {WORK_ENTRIES.map((entry, index) => (
            <ExperienceItem key={entry.id} entry={entry} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
