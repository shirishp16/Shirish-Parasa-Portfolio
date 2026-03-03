import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Linkedin, FileText } from 'lucide-react'

// Shared spring preset
const spring = { type: 'spring' as const, stiffness: 220, damping: 22 }

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.08 })

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="py-24 px-6 bg-[var(--color-bg-secondary)]"
    >
      <div className="max-w-5xl mx-auto">

        {/* Section heading — clip-path wipe + y spring */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
          className="text-center mb-16"
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              id="about-heading"
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ ...spring, delay: 0.05 }}
              className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
            >
              About Me
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* ── Left: photo — scale + rotate spring entrance ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, rotate: -5, x: -30 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0, x: 0 } : {}}
            transition={{ ...spring, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="relative iridescent-border rounded-2xl">
              <img
                src="/assets/profile.jpg"
                alt="Shirish Parasa — profile photo"
                width={360}
                height={360}
                className="rounded-2xl w-72 h-72 md:w-80 md:h-80 object-cover shadow-xl block"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const fb = e.currentTarget.nextElementSibling as HTMLElement | null
                  if (fb) fb.hidden = false
                }}
              />
              <div
                hidden
                aria-hidden="true"
                className="rounded-2xl w-72 h-72 md:w-80 md:h-80 flex items-center justify-center shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(61,240,194,0.15), rgba(139,92,246,0.12), rgba(56,189,248,0.1))',
                }}
              >
                <span className="text-7xl font-extrabold select-none font-display" style={{ color: 'rgba(61,240,194,0.4)' }}>
                  SP
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: bio — staggered paragraphs ── */}
          <div className="space-y-5">
            {/* Overflow-clip each paragraph for a clean wipe-up reveal */}
            {[
              <>
                Hi! I'm{' '}
                <strong className="text-[var(--color-text-primary)] font-semibold">Shirish Parasa</strong>,
                a passionate software engineer with 3+ years of experience building full-stack web
                applications. I love turning complex problems into simple, elegant solutions that
                make a real impact for users.
              </>,
              <>
                My journey in tech started when I wrote my first "Hello, World!" in a college dorm
                room and never looked back. Today I specialize in React, TypeScript, and cloud-native
                backend systems — always chasing the intersection of great UX and solid engineering.
                Outside of work I enjoy open-source contributions and the occasional hiking trail.
              </>,
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...spring, delay: 0.2 + i * 0.14 }}
                className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed"
              >
                {text}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...spring, delay: 0.48 }}
              className="flex items-center gap-5 mt-6"
            >
              {[
                { Icon: Github,   href: 'https://github.com/shirishp16',                     label: 'GitHub',   color: '#3df0c2', tint: 'rgba(61,240,194,0.1)',   glow: 'rgba(61,240,194,0.35)'  },
                { Icon: Linkedin, href: 'https://linkedin.com/in/shirish-parasa-537266362',   label: 'LinkedIn', color: '#8b5cf6', tint: 'rgba(139,92,246,0.12)',  glow: 'rgba(139,92,246,0.35)' },
                { Icon: FileText, href: '/resume.pdf',                                        label: 'Resume',   color: '#38bdf8', tint: 'rgba(56,189,248,0.1)',   glow: 'rgba(56,189,248,0.35)'  },
              ].map(({ Icon, href, label, color, tint, glow }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12, transition: { duration: 0.12 } }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-panel iridescent-border flex flex-col items-center justify-center gap-2 w-20 h-20 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] transition-shadow duration-200"
                  style={{ background: tint }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 24px ${glow}` }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  <Icon size={26} style={{ color }} />
                  <span className="text-xs font-semibold" style={{ color }}>{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
