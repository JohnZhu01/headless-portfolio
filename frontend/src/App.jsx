import useMobileMenu from './hooks/useMobileMenu'
import { Link, Navigate, NavLink, Route, Routes, useLocation } from 'react-router'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import SkillsEducation from './pages/SkillsEducation'
import NotFound from './pages/NotFound'
import SingleProject from "./pages/SingleProject";
import './styles/animations.css'
import { useEffect, useRef, useState } from "react";

const pageOrder = [
  '/',
  '/projects',
  '/experience',
  '/skills-and-education',
]
export default function App() {
  const { menuOpen, navigationRef, menuButtonRef, closeMenu, toggleMenu } = useMobileMenu()

  const location = useLocation()
  const previousPath = useRef(location.pathname)

  useEffect(() => {
    if (previousPath.current === location.pathname) return

    previousPath.current = location.pathname
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [location.pathname])

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
          <span className="wordmark-name">Johnny Zhu</span>
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
        onClick={toggleMenu}
      >
        <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
      </button>
      <main id="main" tabIndex={-1} className={`page-width${location.pathname === '/' ? ' home-page-width' : ''}`}>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
