import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle } from 'lucide-react'

const CONTACT_INFO = [
  {
    Icon: Mail,
    label: 'Email',
    href: 'mailto:shirishparasa@gmail.com',
    color: '#3df0c2',
    tint: 'rgba(61,240,194,0.1)',
  },
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shirish-parasa-537266362',
    color: '#8b5cf6',
    tint: 'rgba(139,92,246,0.1)',
  },
  {
    Icon: Github,
    label: 'GitHub',
    href: 'https://github.com/shirishp16',
    color: '#38bdf8',
    tint: 'rgba(56,189,248,0.1)',
  },
]

type Status = 'idle' | 'success' | 'error'

interface FormFields {
  name: string
  email: string
  message: string
}

// ─── Field wrapper ─────────────────────────────────────────────────────────────
function Field({
  id, label, error, children,
}: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-[var(--color-error)]" role="alert">{error}</p>
      )}
    </div>
  )
}

// ─── Contact form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormFields>>({})
  const [status, setStatus] = useState<Status>('idle')

  const validate = (): boolean => {
    const errs: Partial<FormFields> = {}
    if (!fields.name.trim())                              errs.name    = 'Name is required'
    if (!fields.email.trim())                             errs.email   = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
                                                          errs.email   = 'Enter a valid email'
    if (!fields.message.trim())                           errs.message = 'Message is required'
    else if (fields.message.trim().length < 10)           errs.message = 'Message must be at least 10 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const subject = encodeURIComponent(`Portfolio Contact from ${fields.name}`)
    const body    = encodeURIComponent(`Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`)
    window.location.href = `mailto:shirishparasa@gmail.com?subject=${subject}&body=${body}`
    setStatus('success')
    setFields({ name: '', email: '', message: '' })
  }

  const inputStyle = (err?: string): React.CSSProperties => ({
    width: '100%',
    background: 'rgba(6,9,15,0.75)',
    border: `1px solid ${err ? '#f87171' : 'rgba(61,240,194,0.15)'}`,
    borderRadius: '0.5rem',
    padding: '0.625rem 1rem',
    fontSize: '0.875rem',
    color: 'var(--color-text-primary)',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  })

  const focusHandlers = (err?: string) => ({
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = err ? '#f87171' : '#3df0c2'
      e.currentTarget.style.boxShadow = err ? '0 0 0 2px rgba(248,113,113,0.2)' : '0 0 0 2px rgba(61,240,194,0.15)'
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = err ? '#f87171' : 'rgba(61,240,194,0.15)'
      e.currentTarget.style.boxShadow = 'none'
    },
  })

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-4">
      <Field id="contact-name" label="Name" error={errors.name}>
        <input
          id="contact-name" type="text" autoComplete="name"
          aria-required="true" aria-invalid={!!errors.name}
          placeholder="Your name"
          value={fields.name}
          onChange={(e) => { setFields(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })) }}
          style={inputStyle(errors.name)}
          {...focusHandlers(errors.name)}
        />
      </Field>

      <Field id="contact-email" label="Email" error={errors.email}>
        <input
          id="contact-email" type="email" autoComplete="email"
          aria-required="true" aria-invalid={!!errors.email}
          placeholder="yourname@example.com"
          value={fields.email}
          onChange={(e) => { setFields(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })) }}
          style={inputStyle(errors.email)}
          {...focusHandlers(errors.email)}
        />
      </Field>

      <Field id="contact-message" label="Message" error={errors.message}>
        <textarea
          id="contact-message" rows={5}
          aria-required="true" aria-invalid={!!errors.message}
          placeholder="Hi Shirish, I'd love to connect about…"
          value={fields.message}
          onChange={(e) => { setFields(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: '' })) }}
          style={{ ...inputStyle(errors.message), resize: 'none' }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = errors.message ? '#f87171' : '#3df0c2'
            e.currentTarget.style.boxShadow = errors.message ? '0 0 0 2px rgba(248,113,113,0.2)' : '0 0 0 2px rgba(61,240,194,0.15)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = errors.message ? '#f87171' : 'rgba(61,240,194,0.15)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
      </Field>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.97 }}
        className="btn-primary w-full justify-center py-3 text-sm"
      >
        <Send size={15} /> Send Message
      </motion.button>

      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm"
          role="status"
          style={{ color: '#3df0c2' }}
        >
          <CheckCircle size={16} /> Thanks for reaching out — your email client should be open!
        </motion.p>
      )}
      {status === 'error' && (
        <p className="flex items-center gap-2 text-sm text-[var(--color-error)]" role="alert">
          <AlertCircle size={16} /> Something went wrong. Please email me directly.
        </p>
      )}
    </form>
  )
}

// Variants for staggered contact info rows
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}
const rowVariants = {
  hidden:   { opacity: 0, x: -24 },
  visible:  { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 22 } },
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.08 })

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      className="py-24 px-6 bg-[var(--color-bg-secondary)]"
    >
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="text-center mb-16"
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              id="contact-heading"
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.06 }}
              className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
            >
              Contact
            </motion.h2>
          </div>
          <motion.div
            className="aurora-bar"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            style={{ originX: 0.5 }}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-5 text-[var(--color-text-secondary)] max-w-lg mx-auto text-base"
          >
            Whether you have a project in mind, a job opportunity, or just want to say hi —
            I'd love to hear from you!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* ── Left: unified contact card ── */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.96 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 220, damping: 24, delay: 0.1 }}
          >
            <div
              className="glass-panel iridescent-border rounded-2xl overflow-hidden"
              style={{ padding: '2rem' }}
            >
              {/* Card header */}
              <div className="mb-6 pb-5" style={{ borderBottom: '1px solid rgba(61,240,194,0.1)' }}>
                <h3
                  className="font-display text-xl font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Let's Connect
                </h3>
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                </p>
              </div>

              {/* Contact rows */}
              <motion.ul
                variants={listVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="space-y-0"
                aria-label="Contact information"
              >
                {CONTACT_INFO.map(({ Icon, label, href, color, tint }, i) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    aria-label={label}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] rounded-xl"
                  >
                    <motion.li
                      variants={rowVariants}
                      className={`flex items-center gap-4 py-4 group${i < CONTACT_INFO.length - 1 ? ' border-b' : ''}`}
                      style={i < CONTACT_INFO.length - 1 ? { borderColor: 'rgba(61,240,194,0.07)' } : {}}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-150 group-hover:scale-110"
                        style={{ background: tint }}
                      >
                        <Icon size={19} aria-hidden="true" style={{ color }} />
                      </div>
                      <p
                        className="text-base font-semibold transition-colors duration-150 group-hover:text-[var(--color-text-primary)]"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {label}
                      </p>
                      <div className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: tint }}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <path d="M1 9L9 1M9 1H3M9 1V7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </motion.li>
                  </a>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* ── Right: contact form ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 220, damping: 24, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 text-center" style={{ borderTop: '1px solid rgba(61,240,194,0.08)' }}>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Designed &amp; built by{' '}
            <span style={{ color: '#3df0c2', fontWeight: 500 }}>Shirish Parasa</span>
            {' '}· © {new Date().getFullYear()}
          </p>
          <div className="flex justify-center gap-5 mt-4">
            {[
              { label: 'GitHub',   href: 'https://github.com/shirishp16',                        Icon: Github   },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/shirish-parasa-537266362',      Icon: Linkedin },
              { label: 'Email',    href: 'mailto:shirishparasa@gmail.com',                        Icon: Mail     },
            ].map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                whileHover={{ scale: 1.2, y: -2, filter: 'drop-shadow(0 0 6px rgba(61,240,194,0.6))', transition: { duration: 0.1 } }}
                whileTap={{ scale: 0.95 }}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] rounded"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </footer>
      </div>
    </section>
  )
}
