import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import StarField from '../components/StarField'

const spring = { type: 'spring' as const, stiffness: 220, damping: 22 }

interface EduEntry {
  id: string
  institution: string
  degree: string
  period: string
  location: string
  gpa?: string
  coursework?: string[]
  logo?: string
}

// ─────────────────────────────────────────────────────────────────────────────
//  HOW TO EDIT EDUCATION ENTRIES
//
//  Add, remove, or reorder objects in the array below.
//  Fields:
//    id          — unique string (e.g. 'edu-2'); used as React key
//    institution — full school name
//    degree      — degree + major/minor string
//    period      — graduation date or range (e.g. 'May 2027')
//    location    — city, state
//    gpa         — (optional) display GPA string (e.g. '3.9 / 4.0')
//    coursework  — (optional) string[] of course names shown as chips
//                  Add as many as you like — they wrap automatically
//    logo        — (optional) path to institution logo image
//                  · Drop a PNG/SVG into public/assets/ and set:
//                    logo: '/assets/osu-logo.png'
//                  · If omitted, the first letter of `institution` is shown
// ─────────────────────────────────────────────────────────────────────────────
const EDU_ENTRIES: EduEntry[] = [
  {
    id: 'edu-1',
    institution: 'The Ohio State University',
    degree: 'B.S. Information Security, Minor in Computer Science & Statistics',
    period: 'May 2027',
    location: 'Columbus, OH',
    coursework: [
      'Data Structures & Algorithms',
      'Operating Systems',
      'Databases & Computer Networks',
      'Software Engineering',
      'Statistics & Probability',
    ],
  },
]

function LogoBox({ institution, logo }: { institution: string; logo?: string }) {
  if (logo) {
    return (
      <div
        className="w-10 h-10 rounded-xl shrink-0 overflow-hidden flex items-center justify-center"
        style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.22)' }}
      >
        <img src={logo} alt={institution} className="w-full h-full object-cover" />
      </div>
    )
  }
  return (
    <div
      className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-sm font-bold font-display"
      style={{
        background: 'rgba(139,92,246,0.1)',
        border: '1px solid rgba(139,92,246,0.22)',
        color: '#8b5cf6',
      }}
    >
      {institution.charAt(0)}
    </div>
  )
}

function EducationCard({ entry, index }: { entry: EduEntry; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay: index * 0.1 }}
      className="glass-panel iridescent-border rounded-xl p-6"
    >
      {/* Header row: logo + institution + degree */}
      <div className="flex items-start gap-4 mb-5">
        <LogoBox institution={entry.institution} logo={entry.logo} />
        <div className="min-w-0">
          <h3
            className="font-semibold text-lg leading-snug"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {entry.institution}
          </h3>
          <p className="text-base mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
            {entry.degree}
          </p>
          <p className="text-sm mt-1 font-mono" style={{ color: 'var(--color-text-muted)' }}>
            {entry.period} · {entry.location}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(139,92,246,0.12)', marginBottom: '1.25rem' }} />

      {entry.gpa && (
        <p className="text-base mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>GPA: </span>
          <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{entry.gpa}</span>
        </p>
      )}

      {entry.coursework && entry.coursework.length > 0 && (
        <div>
          <p className="text-base font-semibold mb-2.5" style={{ color: 'var(--color-text-primary)' }}>
            Relevant Coursework
          </p>
          {/* Chip/tag layout — wraps automatically, no long vertical list */}
          <div className="flex flex-wrap gap-2">
            {entry.coursework.map((course) => (
              <span
                key={course}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(139,92,246,0.1)',
                  border: '1px solid rgba(139,92,246,0.22)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default function Education() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.06 })

  return (
    <section
      id="education"
      ref={ref}
      aria-labelledby="education-heading"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 65% 40% at 10% 15%, rgba(61,240,194,0.05), transparent), var(--color-bg-secondary)' }}
    >
      <StarField count={115} seed={5} />
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Heading — left-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
          className="mb-12"
        >
          <motion.h2
            id="education-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.05 }}
            className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-3"
          >
            Education
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

        {/* Cards */}
        <div className="space-y-6">
          {EDU_ENTRIES.map((entry, index) => (
            <EducationCard key={entry.id} entry={entry} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
