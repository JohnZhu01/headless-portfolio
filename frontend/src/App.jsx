import { Link, Navigate, NavLink, Route, Routes, useLocation } from 'react-router'
import Home from './pages/Home'
import Experience from './pages/Experience'
import SkillsEducation from './pages/SkillsEducation'
import TechStack from './pages/TechStack'
import Projects from './pages/Projects'
import SingleProject from "./pages/SingleProject";
import './styles/App.css'
import { useState } from "react";

const pageOrder = [
  '/',
  '/experience',
  '/skills-and-education',
  '/tech-stack',
  '/projects',
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
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
          <span className="wordmark-role">Frontend Web Developer</span>
        </Link>
        <nav
          id="main-navigation"
          className={`main-navigation ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/experience" onClick={() => setMenuOpen(false)}>
            Experience
          </NavLink>
          <NavLink
            to="/skills-and-education"
            onClick={() => setMenuOpen(false)}
          >
            Skills &amp; Education
          </NavLink>
          <NavLink to="/tech-stack" onClick={() => setMenuOpen(false)}>
            Tech Stack
          </NavLink>
          <NavLink to="/projects" onClick={() => setMenuOpen(false)}>
            Projects
          </NavLink>
        </nav>
      </header>
      {menuOpen && (
        <button
          className="menu-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <button
        className="menu-toggle"
        type="button"
        aria-controls="main-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
      </button>
      <main id="main" className="page-width">
        <div
          className={animatePage ? "page-transition" : undefined}
          style={{ '--slide-from': transition.slideFrom }}
          key={location.pathname}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills-and-education" element={<SkillsEducation />} />
            <Route path="/tech-stack" element={<TechStack />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<SingleProject />} />
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
