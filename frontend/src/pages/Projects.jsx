import useWordPress from '../hooks/useWordPress'
import plainText from '../utils/plainText'
import projectOverview from '../utils/projectOverview'
import { Link } from "react-router";
export default function Projects() {
  const { data: projects, loading, error } = useWordPress('project?_embed=1')
  return (
    <section className="content-page" aria-labelledby="projects-title">
      <div className="section-heading"><h1 id="projects-title">Projects</h1></div>
      {loading && <p className="status" role="status">Loading projects...</p>}
      {error && <p className="status" role="alert">Could not load projects: {error}</p>}
      {!loading && !error && !projects.length && <p className="status">Projects are coming soon.</p>}
      <div className="project-grid">
        {projects.map((project) => {
          const title = plainText(project.title?.rendered) || 'Untitled project'
          const image = project._embedded?.['wp:featuredmedia']?.[0]
          return (
            <article className="project-card" key={project.id}>
              {image?.source_url && (
                <div className="project-visual">
                  <img
                    src={image.source_url}
                    alt={image.alt_text || ""}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="project-heading">
                <h2>{title}</h2>
              </div>
              <p className="project-description">
                {projectOverview(project.content?.rendered)}
              </p>
              <Link
                className="project-details-link"
                to={`/projects/${project.slug}`}
              >
                View details
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  )
}
