import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  activeSection: string
}

const NAV_LINKS = [
  { label: 'Home',       href: '#intro'      },
  { label: 'About',      href: '#about'      },
  { label: 'Experience', href: '#experience' },
  { label: 'Education',  href: '#education'  },
  { label: 'Skills',     href: '#techstack'  },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar({ activeSection }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={
        scrolled
          ? {
              background: 'rgba(6,9,15,0.82)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(61,240,194,0.12)',
              boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
            }
          : { background: 'transparent' }
      }
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <button
          onClick={() => scrollTo('#intro')}
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] rounded"
          aria-label="Scroll to top"
        >
          <span
            className="font-display text-xl font-extrabold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #3df0c2, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            SP
          </span>
          <span
            className="hidden sm:inline text-sm font-medium tracking-wide"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            · Shirish Parasa
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.slice(1)
            const isActive  = activeSection === sectionId
            return (
              <li key={href}>
                <button
                  onClick={() => scrollTo(href)}
                  aria-current={isActive ? 'page' : undefined}
                  className="relative px-3 py-2 rounded text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                  style={{ color: isActive ? '#3df0c2' : 'var(--color-text-secondary)' }}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute bottom-0 left-2 right-2 h-px rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #3df0c2, #8b5cf6)',
                        boxShadow: '0 0 8px rgba(61,240,194,0.5)',
                      }}
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollTo('#contact')}
          className="btn-primary hidden md:inline-flex px-4 py-2 text-sm"
        >
          Hire Me
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(v => !v)}
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden px-6 pb-5"
            style={{
              background: 'rgba(11,18,32,0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(61,240,194,0.1)',
            }}
          >
            <ul className="flex flex-col gap-1 pt-3" role="list">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = activeSection === href.slice(1)
                return (
                  <li key={href}>
                    <button
                      role="menuitem"
                      onClick={() => scrollTo(href)}
                      aria-current={isActive ? 'page' : undefined}
                      className="w-full text-left px-3 py-2.5 rounded text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                      style={{
                        color: isActive ? '#3df0c2' : 'var(--color-text-secondary)',
                        background: isActive ? 'rgba(61,240,194,0.06)' : 'transparent',
                      }}
                    >
                      {label}
                    </button>
                  </li>
                )
              })}
            </ul>
            <div
              className="mt-3 pt-3"
              style={{ borderTop: '1px solid rgba(61,240,194,0.1)' }}
            >
              <button
                onClick={() => scrollTo('#contact')}
                className="btn-primary w-full justify-center py-2.5 text-sm"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
