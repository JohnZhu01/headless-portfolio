import {Link, useParams} from 'react-router'
import useWordPress from '../hooks/useWordPress.js'
import plainText from '../utils/plainText.js'

export default function SingleProject() {
  const { slug } = useParams()

  const { data: projects, loading, error } = useWordPress(
    `project?slug=${encodeURIComponent(slug)}&_embed=1`,
  )

  const project = projects[0]
  const image = project?._embedded?.['wp:featuredmedia']?.[0]

  return (
    <article className="content-page">
      <Link to="/projects">← Back to projects</Link>

      {loading && (
        <p className="status" role="status">Loading project...</p>
      )}

      {error && (
        <p className="status" role="alert">
          Could not load project: {error}
        </p>
      )}

      {!loading && !error && !project && (
        <h1>Project not found</h1>
      )}

      {project && (
        <>
          <div className="section-heading">
            <h1>{plainText(project.title?.rendered)}</h1>
          </div>

          {image?.source_url && (
            <img
              src={image.source_url}
              alt={image.alt_text || ''}
            />
          )}

          <div className="page-copy">
            {plainText(project.content?.rendered)}
          </div>
        </>
      )}
    </article>
  )
}
