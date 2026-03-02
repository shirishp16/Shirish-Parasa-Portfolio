import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download } from 'lucide-react'

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="py-24 px-6 bg-[var(--color-bg-secondary)]"
    >
      <div className="max-w-5xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-14">
          <h2
            id="about-heading"
            className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
          >
            About Me
          </h2>
          <div className="aurora-bar" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* ── Left: photo ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut' }}
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
              {/* Fallback gradient when image missing */}
              <div
                hidden
                aria-hidden="true"
                className="rounded-2xl w-72 h-72 md:w-80 md:h-80 flex items-center justify-center shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(61,240,194,0.15), rgba(139,92,246,0.12), rgba(56,189,248,0.1))',
                }}
              >
                <span
                  className="text-7xl font-extrabold select-none font-display"
                  style={{ color: 'rgba(61,240,194,0.4)' }}
                >
                  SP
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: bio ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.15 }}
            className="space-y-5"
          >
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
              Hi! I'm{' '}
              <strong className="text-[var(--color-text-primary)] font-semibold">Shirish Parasa</strong>,
              a passionate software engineer with 3+ years of experience building full-stack web
              applications. I love turning complex problems into simple, elegant solutions that
              make a real impact for users.
            </p>
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
              My journey in tech started when I wrote my first "Hello, World!" in a college dorm
              room and never looked back. Today I specialize in React, TypeScript, and cloud-native
              backend systems — always chasing the intersection of great UX and solid engineering.
              Outside of work I enjoy open-source contributions and the occasional hiking trail.
            </p>

            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary inline-flex mt-4 px-6 py-3 text-sm"
            >
              <Download size={16} /> Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
