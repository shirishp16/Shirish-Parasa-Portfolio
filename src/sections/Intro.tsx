import { useRef, useMemo } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowRight, MessageSquare } from 'lucide-react'

const container: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}
const item: Variants = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/shirishp16',                      Icon: Github,   glowColor: '#3df0c2' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/shirish-parasa-537266362',    Icon: Linkedin, glowColor: '#8b5cf6' },
  { label: 'Email',    href: 'mailto:shirishparasa@gmail.com',                      Icon: Mail,     glowColor: '#38bdf8' },
]

// Deterministic star positions — no Math.random(), stable across renders
function useStars(count: number) {
  return useMemo(() => {
    // Use coprime multipliers to spread stars evenly without clustering
    return Array.from({ length: count }, (_, i) => ({
      id:       i,
      x:        ((i * 137.508 + 11) % 100),          // golden-angle derived
      y:        ((i * 73.19 + 23)   % 100),
      size:     0.8 + ((i * 3) % 3) * 0.6,           // 0.8–2px
      opacity:  0.3 + ((i * 7) % 5) * 0.1,           // 0.3–0.7 base
      duration: 2 + ((i * 0.37) % 3),                // 2–5s twinkle cycle
      delay:    (i * 0.23) % 5,                       // staggered starts
    }))
  }, [count])
}

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null)

  const stars = useStars(90)

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  // Mouse tracking — updates CSS custom properties directly (no re-render)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width)  * 100
    const y = ((e.clientY - rect.top)  / rect.height) * 100
    el.style.setProperty('--mx', `${x}%`)
    el.style.setProperty('--my', `${y}%`)
  }

  const handleMouseEnter = () => {
    sectionRef.current?.style.setProperty('--aurora-boost', '1.5')
  }
  const handleMouseLeave = () => {
    sectionRef.current?.style.setProperty('--aurora-boost', '1')
    // Reset cursor aurora to center
    sectionRef.current?.style.setProperty('--mx', '50%')
    sectionRef.current?.style.setProperty('--my', '50%')
  }

  return (
    <section
      id="intro"
      ref={sectionRef}
      aria-label="Introduction"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden"
      style={{
        '--mx': '50%',
        '--my': '50%',
        '--aurora-boost': '1',
      } as React.CSSProperties}
    >

      {/* ── Base conic aurora mesh ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'conic-gradient(from 0deg at 50% 45%, rgba(61,240,194,0.05) 0deg, rgba(56,189,248,0.035) 90deg, rgba(139,92,246,0.045) 180deg, rgba(61,240,194,0.025) 270deg, rgba(61,240,194,0.05) 360deg)',
          animation: 'aurora-drift 65s linear infinite',
          transformOrigin: '50% 45%',
        }}
      />

      {/* ── Aurora Band 1 — mint, wide horizontal sweep, top-center ── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: '110%',
          height: '280px',
          top: '5%',
          left: '-5%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(61,240,194,0.13) 0%, rgba(56,189,248,0.06) 50%, transparent 100%)',
          filter: 'blur(45px)',
          opacity: `calc(1 * var(--aurora-boost, 1))`,
          animation: 'float 9s ease-in-out infinite',
        }}
      />

      {/* ── Aurora Band 2 — violet, narrower, mid-left ── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: '80%',
          height: '200px',
          top: '35%',
          left: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,92,246,0.14) 0%, rgba(61,240,194,0.04) 55%, transparent 100%)',
          filter: 'blur(55px)',
          opacity: `calc(0.85 * var(--aurora-boost, 1))`,
          animation: 'float 12s ease-in-out infinite reverse',
          animationDelay: '1.5s',
        }}
      />

      {/* ── Aurora Band 3 — sky, lower-right ── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: '75%',
          height: '220px',
          bottom: '10%',
          right: '-5%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(56,189,248,0.11) 0%, rgba(139,92,246,0.05) 55%, transparent 100%)',
          filter: 'blur(50px)',
          opacity: `calc(0.75 * var(--aurora-boost, 1))`,
          animation: 'float 14s ease-in-out infinite',
          animationDelay: '3s',
        }}
      />

      {/* ── Cursor aurora — follows mouse, intensifies on hover ── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(61,240,194,0.18) 0%, rgba(56,189,248,0.08) 40%, transparent 70%)',
          filter: 'blur(50px)',
          opacity: `calc(0.6 * var(--aurora-boost, 1))`,
          left: 'var(--mx)',
          top: 'var(--my)',
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.35s ease, top 0.35s ease, opacity 0.4s ease',
        }}
      />

      {/* ── Star field ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left:             `${star.x}%`,
              top:              `${star.y}%`,
              width:            `${star.size}px`,
              height:           `${star.size}px`,
              background:       '#fff',
              opacity:          star.opacity,
              animation:        `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Greeting badge */}
        <motion.div variants={item} className="flex items-center justify-center mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase"
            style={{
              background: 'rgba(61,240,194,0.07)',
              border: '1px solid rgba(61,240,194,0.22)',
              color: '#3df0c2',
            }}
          >
            <span
              style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#3df0c2',
                boxShadow: '0 0 8px #3df0c2',
                display: 'inline-block',
              }}
            />
            Hello, I'm
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-display text-6xl sm:text-7xl md:text-8xl font-extrabold leading-none mb-5 tracking-tight"
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #3df0c2 0%, #38bdf8 45%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Shirish Parasa
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-xl md:text-2xl font-light max-w-2xl mx-auto mb-12 tracking-wide"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Software Engineer
          <span className="mx-3" style={{ color: 'rgba(139,92,246,0.5)' }}>·</span>
          Building impactful products
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('projects')}
            className="btn-primary px-7 py-3.5 text-sm font-bold"
          >
            View Projects <ArrowRight size={15} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
            style={{ border: '1px solid rgba(61,240,194,0.35)', color: '#3df0c2', background: 'transparent' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(61,240,194,0.07)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(61,240,194,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Contact Me <MessageSquare size={15} />
          </motion.button>
        </motion.div>

        {/* Social links — each gets its own aurora glow color */}
        <motion.div variants={item} className="flex items-center justify-center gap-6">
          {SOCIALS.map(({ label, href, Icon, glowColor }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              whileHover={{
                scale: 1.25,
                y: -3,
                filter: `drop-shadow(0 0 8px ${glowColor})`,
              }}
              whileTap={{ scale: 0.95 }}
              className="transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] rounded"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{
            width: '1px', height: '36px',
            background: 'linear-gradient(to bottom, #38bdf8, transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
