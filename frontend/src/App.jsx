import { Link, Navigate, NavLink, Route, Routes, useLocation } from 'react-router'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import SkillsEducation from './pages/SkillsEducation'
import SingleProject from "./pages/SingleProject";
import './styles/App.css'
import './styles/animations.css'
import { useEffect, useRef, useState } from "react";

const pageOrder = [
  '/',
  '/projects',
  '/experience',
  '/skills-and-education',
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigationRef = useRef(null)
  const menuButtonRef = useRef(null)

  function closeMenu() {
    setMenuOpen(false)
    menuButtonRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => {
    if (!menuOpen) return
    const desktop = window.matchMedia('(min-width: 641px)')
    if (desktop.matches) return
    navigationRef.current?.querySelector('a')?.focus({ preventScroll: true })

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        menuButtonRef.current?.focus({ preventScroll: true })
      } else if (event.key === 'Tab') {
        const controls = [...navigationRef.current.querySelectorAll('a'), menuButtonRef.current]
        const current = controls.indexOf(document.activeElement)
        const next = event.shiftKey
          ? (current <= 0 ? controls.length - 1 : current - 1)
          : (current + 1) % controls.length
        event.preventDefault()
        controls[next]?.focus({ preventScroll: true })
      }
    }

    function handleResize(event) {
      if (event.matches) {
        setMenuOpen(false)
        navigationRef.current?.querySelector('a[aria-current="page"]')?.focus({ preventScroll: true })
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    desktop.addEventListener('change', handleResize)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      desktop.removeEventListener('change', handleResize)
    }
  }, [menuOpen])
  const location = useLocation()
  const currentIndex = pageOrder.indexOf(location.pathname)
  const animatePage = currentIndex >= 0
  const [transition, setTransition] = useState({
    pathname: location.pathname,
    pageIndex: currentIndex,
    slideFrom: '100vw',
  })

  if (transition.pathname !== location.pathname) {
    setTransition({
      pathname: location.pathname,
      pageIndex: animatePage ? currentIndex : transition.pageIndex,
      slideFrom: animatePage && currentIndex < transition.pageIndex ? '-100vw' : '100vw',
    })
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label="Johnny Zhu home">
          <span className="wordmark-name">Johnny Zhu<span aria-hidden="true">.</span></span>
        </Link>
        <nav
          ref={navigationRef}
          id="main-navigation"
          className={`main-navigation ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink to="/" end onClick={() => { if (menuOpen) closeMenu() }}>
            Home
          </NavLink>
          <NavLink to="/projects" onClick={() => { if (menuOpen) closeMenu() }}>
            Projects
          </NavLink>
          <NavLink to="/experience" onClick={() => { if (menuOpen) closeMenu() }}>
            Experience
          </NavLink>
          <NavLink
            to="/skills-and-education"
            onClick={() => { if (menuOpen) closeMenu() }}
          >
            Skills &amp; Education
          </NavLink>
        </nav>
      </header>
      {menuOpen && (
        <button
          className="menu-backdrop"
          type="button"
          aria-label="Close navigation"
          tabIndex={-1}
          onClick={closeMenu}
        />
      )}
      <button
        ref={menuButtonRef}
        className="menu-toggle"
        type="button"
        aria-controls="main-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
      </button>
      <main id="main" className={`page-width${location.pathname === '/' ? ' home-page-width' : ''}`}>
        <div
          className="page-transition"
          style={{ '--slide-from': transition.slideFrom }}
          key={location.pathname}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<SingleProject />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills-and-education" element={<SkillsEducation />} />
            <Route path="/tech-stack" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route
              path="*"
              element={
                <section className="hero">
                  <h1>Page not found</h1>
                  <Link to="/">Return home</Link>
                </section>
              }
            />
          </Routes>
        </div>
      </main>
    </>
  );
}
