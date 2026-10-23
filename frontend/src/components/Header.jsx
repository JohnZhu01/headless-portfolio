import { Link, NavLink } from 'react-router'
import useMobileMenu from '../hooks/useMobileMenu'

export default function Header() {
  const { menuOpen, navigationRef, menuButtonRef, closeMenu, toggleMenu } = useMobileMenu()

  return (
    <>
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
    </>
  )
}
