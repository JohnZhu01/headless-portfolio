import { Link } from 'react-router'

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <p className="not-found-code">404</p>
      <h1 id="not-found-title">Page not found</h1>
      <p>This page doesn’t exist or may have moved.</p>

      <div className="not-found-links">
        <Link className="project-details-link" to="/">
          Return home
        </Link>
        <Link className="project-details-link" to="/projects">
          View projects
        </Link>
      </div>
    </section>
  )
}
