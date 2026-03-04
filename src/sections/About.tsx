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
//      works; the image is cropped to a circle via object-cover + rounded-full)
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* ── Left: photo — scale + rotate spring entrance ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, rotate: -5, x: -30 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0, x: 0 } : {}}
            transition={{ ...spring, delay: 0.1 }}
            className="flex justify-center pt-8"
          >
            <div className="relative iridescent-border rounded-full">
              <img
                src="public/assets/profile.jpg"
                alt="Shirish Parasa — profile photo"
                width={384}
                height={384}
                className="rounded-full w-80 h-80 md:w-96 md:h-96 object-cover shadow-xl block"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const fb = e.currentTarget.nextElementSibling as HTMLElement | null
                  if (fb) fb.hidden = false
                }}
              />
              <div
                hidden
                aria-hidden="true"
                className="rounded-full w-80 h-80 md:w-96 md:h-96 flex items-center justify-center shadow-xl"
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
                Hi there! I'm{' '}
                <strong className="text-[var(--color-text-primary)] font-semibold">Shirish Parasa</strong>,
                a junior at The Ohio State University majoring in Information Security, minoring in Computer Information Science and Statistics. 
                I'm passionate about creating innovative solutions to real-world problems, and I'm always looking for new opportunities to learn and grow.
              </>,
              <>
                I have hands-on experience with a multitude of technologies, specializing in Python, Java, SQL, React, TypeScript, and ML frameworks like TensorFlow and PyTorch. 
                Throughout my career and academic journey, I've worked on backend systems, full-stack web applications, implemented security solutions, and trained machine learning models to improve accuracy in real-world applications. 
              </>,
              <>
                When I'm not coding, you can find me dancing with my team, OSU Origins, cooking delicious meals, weightlifting, gaming, bird-watching, or spending time with my wonderful friends and family. 
                I am committed to building applications that make a positive impact and transform lives, starting with my community and those around me.
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
