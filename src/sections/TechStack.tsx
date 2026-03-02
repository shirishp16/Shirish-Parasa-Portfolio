import { Icon } from '@iconify/react'
import { motion, type Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills } from '../data/techStack'

// Three aurora colors cycling across the grid
const AURORA = ['#3df0c2', '#8b5cf6', '#38bdf8'] as const

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.035 } },
}

const cardVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.8, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
}

function SkillCard({ skill, index }: { skill: { name: string; icon: string }; index: number }) {
  const color = AURORA[index % AURORA.length]

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.08,
        y: -4,
        boxShadow: `0 0 22px ${color}44, 0 0 6px ${color}22`,
      }}
      className="glass-panel iridescent-border rounded-2xl flex flex-col items-center justify-center gap-2.5 p-4 cursor-default select-none transition-all duration-200"
      style={{ minHeight: '90px' }}
    >
      {/* Brand icon */}
      <Icon
        icon={skill.icon}
        width={34}
        height={34}
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      />
      {/* Skill name */}
      <span
        className="font-mono text-[10px] leading-tight text-center"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {skill.name}
      </span>
    </motion.div>
  )
}

export default function TechStack() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section
      id="techstack"
      ref={ref}
      aria-labelledby="stack-heading"
      className="py-24 px-6 bg-[var(--color-bg-secondary)]"
    >
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <h2
            id="stack-heading"
            className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
          >
            Tech Stack
          </h2>
          <div className="aurora-bar" aria-hidden="true" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3"
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
