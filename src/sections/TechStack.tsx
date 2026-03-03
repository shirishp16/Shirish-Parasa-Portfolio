import { Icon } from '@iconify/react'
import { motion, type Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills } from '../data/techStack'

// Three aurora colors cycling across the grid — each with tint and top-border rgba
const AURORA = [
  { color: '#3df0c2', tint: 'rgba(61,240,194,0.07)',  top: 'rgba(61,240,194,0.25)'  },
  { color: '#8b5cf6', tint: 'rgba(139,92,246,0.07)', top: 'rgba(139,92,246,0.25)' },
  { color: '#38bdf8', tint: 'rgba(56,189,248,0.07)',  top: 'rgba(56,189,248,0.25)'  },
] as const

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.045 } },
}

const cardVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.75, y: 16, rotateY: 12 },
  visible: {
    opacity: 1, scale: 1, y: 0, rotateY: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 18 },
  },
}

function SkillCard({ skill, index }: { skill: { name: string; icon: string }; index: number }) {
  const aurora = AURORA[index % AURORA.length]

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.1,
        y: -6,
        boxShadow: `0 0 28px ${aurora.color}55, 0 0 8px ${aurora.color}33`,
      }}
      transition={{ duration: 0.12 }}
      className="glass-panel iridescent-border rounded-2xl flex flex-col items-center justify-center gap-3 cursor-default select-none"
      style={{
        width: '108px',
        minHeight: '100px',
        padding: '20px 12px',
        background: aurora.tint,
        borderTop: `2px solid ${aurora.top}`,
      }}
    >
      {/* Brand icon */}
      <Icon
        icon={skill.icon}
        width={40}
        height={40}
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      />
      {/* Skill name */}
      <span
        className="font-mono text-xs font-medium tracking-wide leading-tight text-center"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {skill.name}
      </span>
    </motion.div>
  )
}

export default function TechStack() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.08 })

  return (
    <section
      id="techstack"
      ref={ref}
      aria-labelledby="stack-heading"
      className="py-24 px-6 bg-[var(--color-bg-secondary)]"
    >
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="text-center mb-14"
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              id="stack-heading"
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.06 }}
              className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
            >
              Tech Stack
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-4"
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
