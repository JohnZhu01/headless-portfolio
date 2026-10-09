import { Link, Navigate, NavLink, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Projects from './pages/Projects'
import TechStack from './pages/TechStack'
import SkillsEducation from './pages/SkillsEducation'
import Experience from './pages/Experience'
import './App.css'
import { useState } from "react";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header page-width">
        <Link className="wordmark" to="/" aria-label="John Zhu home">
          John Zhu<span aria-hidden="true">.</span>
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tech-stack" element={<TechStack />} />
          <Route path="/skills-and-education" element={<SkillsEducation />} />
          <Route path="/experience" element={<Experience />} />
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
      </main>
      <footer className="site-footer page-width">
        <p>&copy; {new Date().getFullYear()} John Zhu</p>
      </footer>
    </>
  );
}
