import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Linkedin, FileText } from 'lucide-react'
import StarField from '../components/StarField'

// Shared spring preset
const spring = { type: 'spring' as const, stiffness: 220, damping: 22 }

// ─────────────────────────────────────────────────────────────────────────────
//  HOW TO CUSTOMIZE THE ABOUT SECTION
//
//  Profile photo:
//    · Replace public/assets/profile.jpg with your own photo (any aspect ratio
//      works; the image is cropped to a square via object-cover)
//    · Keep the filename profile.jpg, OR update the src prop on the <img> below
//
//  Bio text:
//    · Edit the two paragraph strings inside the .map() call below (~line 92)
//    · You can add a third paragraph by pushing another <> ... </> element
//
//  Social / link buttons (GitHub, LinkedIn, Resume):
//    · Find the array near the bottom of this component (~line 123)
//    · Update the `href` values with your real URLs
//    · Resume: replace public/resume.pdf with your file and keep href: '/resume.pdf'
//    · To add a new link, add an object: { Icon, href, label, color, tint, glow }
//      Import the icon from lucide-react (https://lucide.dev/icons)
// ─────────────────────────────────────────────────────────────────────────────
export default function About() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.08 })

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 70% 45% at 90% 8%, rgba(139,92,246,0.07), transparent), var(--color-bg-secondary)' }}
    >
      <StarField count={140} seed={4} />
      <div className="relative z-10 max-w-6xl mx-auto">

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
              className="about-socials flex items-center gap-3 mt-6"
            >
              {[
                { Icon: Github,   href: 'https://github.com/shirishp16',                   label: 'GitHub',   color: '#3df0c2', tint: 'rgba(61,240,194,0.1)',  glow: 'rgba(61,240,194,0.4)'  },
                { Icon: Linkedin, href: 'https://linkedin.com/in/shirish-parasa-537266362', label: 'LinkedIn', color: '#8b5cf6', tint: 'rgba(139,92,246,0.1)', glow: 'rgba(139,92,246,0.4)' },
                { Icon: FileText, href: '/resume.pdf',                                      label: 'Resume',   color: '#38bdf8', tint: 'rgba(56,189,248,0.1)',  glow: 'rgba(56,189,248,0.4)'  },
              ].map(({ Icon, href, label, color, tint, glow }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, transition: { duration: 0.12 } }}
                  whileTap={{ scale: 0.92 }}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] transition-shadow duration-200"
                  style={{ background: tint }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 20px ${glow}` }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  <Icon size={20} style={{ color }} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
