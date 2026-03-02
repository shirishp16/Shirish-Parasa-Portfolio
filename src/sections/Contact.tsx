import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'

// Aurora color per contact item for variety
const AURORA_COLORS = ['#3df0c2', '#8b5cf6', '#38bdf8', '#3df0c2'] as const

const CONTACT_INFO = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'shirishparasa@gmail.com',
    href: 'mailto:shirishparasa@gmail.com',
  },
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/shirish-parasa',
    href: 'https://www.linkedin.com/in/shirish-parasa-537266362',
  },
  {
    Icon: Github,
    label: 'GitHub',
    value: 'github.com/shirishp16',
    href: 'https://github.com/shirishp16',
  },
  {
    Icon: MapPin,
    label: 'Location',
    value: 'Powell, Ohio, United States',
    href: undefined,
  },
]

type Status = 'idle' | 'success' | 'error'

interface FormFields {
  name: string
  email: string
  message: string
}

// ─── Field wrapper — defined at module scope to avoid recreating on each render ─
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
    transition: 'border-color 0.2s, box-shadow 0.2s',
  })

  const inputFocusHandlers = (err?: string) => ({
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = err ? '#f87171' : '#3df0c2'
      e.currentTarget.style.boxShadow = err
        ? '0 0 0 2px rgba(248,113,113,0.2)'
        : '0 0 0 2px rgba(61,240,194,0.15)'
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = err ? '#f87171' : 'rgba(61,240,194,0.15)'
      e.currentTarget.style.boxShadow = 'none'
    },
  })

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-4">
      {/* Note about mailto behaviour */}
      <p
        className="text-xs rounded-lg px-4 py-3"
        style={{
          color: 'var(--color-text-muted)',
          background: 'rgba(61,240,194,0.04)',
          border: '1px solid rgba(61,240,194,0.12)',
          borderLeft: '3px solid rgba(61,240,194,0.4)',
        }}
      >
        📬 Submitting will open your email client pre-filled with your message — no backend required.
      </p>

      <Field id="contact-name" label="Name" error={errors.name}>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          aria-required="true"
          aria-invalid={!!errors.name}
          placeholder="Your name"
          value={fields.name}
          onChange={(e) => { setFields(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })) }}
          style={inputStyle(errors.name)}
          {...inputFocusHandlers(errors.name)}
        />
      </Field>

      <Field id="contact-email" label="Email" error={errors.email}>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          placeholder="yourname@example.com"
          value={fields.email}
          onChange={(e) => { setFields(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })) }}
          style={inputStyle(errors.email)}
          {...inputFocusHandlers(errors.email)}
        />
      </Field>

      <Field id="contact-message" label="Message" error={errors.message}>
        <textarea
          id="contact-message"
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
          placeholder="Hi! I'd love to connect about…"
          value={fields.message}
          onChange={(e) => { setFields(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: '' })) }}
          style={{ ...inputStyle(errors.message), resize: 'none' }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = errors.message ? '#f87171' : '#3df0c2'
            e.currentTarget.style.boxShadow = errors.message
              ? '0 0 0 2px rgba(248,113,113,0.2)'
              : '0 0 0 2px rgba(61,240,194,0.15)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = errors.message ? '#f87171' : 'rgba(61,240,194,0.15)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
      </Field>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="btn-primary w-full justify-center py-3 text-sm"
      >
        <Send size={15} /> Send Message
      </motion.button>

      {/* Status messages */}
      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm"
          role="status"
          style={{ color: '#3df0c2' }}
        >
          <CheckCircle size={16} /> Your email client should have opened — thanks for reaching out!
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

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      className="py-24 px-6 bg-[var(--color-bg-secondary)]"
    >
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2
            id="contact-heading"
            className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
          >
            Get in Touch
          </h2>
          <div className="aurora-bar" aria-hidden="true" />
          <p className="mt-5 text-[var(--color-text-secondary)] max-w-lg mx-auto">
            Whether you have a project in mind, a job opportunity, or just want to say hi —
            I'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* ── Left: contact info ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="space-y-3"
          >
            {CONTACT_INFO.map(({ Icon, label, value, href }, index) => {
              const color = AURORA_COLORS[index]
              const content = (
                <div
                  className="glass-panel iridescent-border flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                  style={{ '--hover-glow': `${color}14` } as React.CSSProperties}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{ background: `${color}18` }}
                  >
                    <Icon
                      size={18}
                      aria-hidden="true"
                      style={{ color }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-xs font-medium uppercase tracking-wider"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-sm font-medium transition-colors duration-200"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {value}
                    </p>
                  </div>
                </div>
              )
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={`${label}: ${value}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] rounded-xl"
                >
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              )
            })}
          </motion.div>

          {/* ── Right: contact form ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.15 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 text-center" style={{ borderTop: '1px solid rgba(61,240,194,0.1)' }}>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Designed &amp; built by{' '}
            <span style={{ color: '#3df0c2', fontWeight: 500 }}>Shirish Parasa</span>
            {' '}· © {new Date().getFullYear()}
          </p>
          <div className="flex justify-center gap-5 mt-4">
            {[
              { label: 'GitHub',   href: 'https://github.com/shirishp16',      Icon: Github   },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/shirish-parasa-537266362', Icon: Linkedin },
              { label: 'Email',    href: 'mailto:shirishparasa@gmail.com',        Icon: Mail     },
            ].map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                whileHover={{ scale: 1.2, y: -2, filter: 'drop-shadow(0 0 6px rgba(61,240,194,0.6))' }}
                whileTap={{ scale: 0.95 }}
                className="transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] rounded"
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
