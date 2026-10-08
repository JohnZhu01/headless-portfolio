import { Link, Navigate, NavLink, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Projects from './pages/Projects'
import TechStack from './pages/TechStack'
import SkillsEducation from './pages/SkillsEducation'
import Experience from './pages/Experience'
import './App.css'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header page-width">
        <Link className="wordmark" to="/" aria-label="John Zhu home">
          John Zhu<span aria-hidden="true">.</span>
        </Link>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/tech-stack">Tech Stack</NavLink>
          <NavLink to="/skills-and-education">Skills &amp; Education</NavLink>
          <NavLink to="/experience">Experience</NavLink>
        </nav>
      </header>
      <main id="main" className="page-width">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tech-stack" element={<TechStack />} />
          <Route path="/skills-and-education" element={<SkillsEducation />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="*" element={
            <section className="hero">
              <h1>Page not found</h1>
              <Link to="/">Return home</Link>
            </section>
          } />
        </Routes>
      </main>
      <footer className="site-footer page-width">
        <p>&copy; {new Date().getFullYear()} John Zhu</p>
      </footer>
    </>
  )
}
