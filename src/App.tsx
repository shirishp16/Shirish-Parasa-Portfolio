import { useState, useEffect } from 'react'
import Navbar     from './components/Navbar'
import Intro      from './sections/Intro'
import About      from './sections/About'
import Experience from './sections/Experience'
import Education  from './sections/Education'
import TechStack  from './sections/TechStack'
import Projects   from './sections/Projects'
import Contact    from './sections/Contact'

// IDs of every section — must match the id="" on each <section> element
const SECTION_IDS = ['intro', 'about', 'experience', 'education', 'techstack', 'projects', 'contact']

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('intro')
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark',
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  // ── Scrollspy via IntersectionObserver ─────────────────────────────────────
  // rootMargin '-40% 0px -50% 0px' means a section becomes "active" when its
  // top edge is within the middle band (40%–50%) of the viewport, preventing
  // rapid toggling near section boundaries.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )

    const elements = document.querySelectorAll('section[id]')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Pre-verify all expected section IDs are present after mount (dev-time only)
  useEffect(() => {
    if (import.meta.env.DEV) {
      SECTION_IDS.forEach((id) => {
        if (!document.getElementById(id)) {
          console.warn(`[scrollspy] Missing section with id="${id}"`)
        }
      })
    }
  }, [])

  return (
    <>
      {/* Skip-to-content for keyboard / screen-reader users */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Navbar activeSection={activeSection} theme={theme} onToggleTheme={toggleTheme} />

      <main id="main-content">
        <Intro      />
        <About      />
        <Experience />
        <Education  />
        <TechStack  />
        <Projects   />
        <Contact    />
      </main>
    </>
  )
}
