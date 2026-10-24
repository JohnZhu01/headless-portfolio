import "../styles/SingleProject.css";
import { Link, useParams } from "react-router";
import useWordPress from "../hooks/useWordPress.js";
import plainText from "../utils/plainText.js";
import LoadingState from "../components/LoadingState";
import SEO from "../components/SEO";
import projectOverview from "../utils/projectOverview";
export default function SingleProject() {
  const { slug } = useParams();

  const {
    data: projects,
    loading,
    error,
  } = useWordPress(`project?slug=${encodeURIComponent(slug)}&_embed=1`);

  const project = projects[0];
  let seoTitle = "Project not found";

  if (loading) {
    seoTitle = "Loading project";
  } else if (error) {
    seoTitle = "Project unavailable";
  } else if (project) {
    seoTitle = plainText(project.title?.rendered) || "Project";
  }

  const seoDescription = project
    ? projectOverview(project.content?.rendered) ||
      `Explore ${seoTitle}, a web development project by Johnny Zhu.`
    : "Explore Johnny Zhu’s web development projects.";
  const image = project?._embedded?.["wp:featuredmedia"]?.[0];
  const liveUrl = project?.acf?.live_project_url;
  const repoUrl = project?.acf?.repository_url;

  return (
    <article className="content-page single-project">
      <SEO title={seoTitle} description={seoDescription} />
      <Link className="project-back-link" to="/projects">
        <span className="back-arrow" aria-hidden="true">
          ←
        </span>{" "}
        Back to projects
      </Link>

      {loading && <LoadingState label="Loading project…" />}

      {error && (
        <p className="status" role="alert">
          Could not load project: {error}
        </p>
      )}

      {!loading && !error && !project && <h1>Project not found</h1>}

      {project && (
        <>
          <div className="section-heading">
            <h1>{plainText(project.title?.rendered)}</h1>
          </div>

          {image?.source_url && (
            <img
              className={`project-featured-image${project.slug === "personal-portfolio-website" ? " project-featured-image--portfolio" : ""}`}
              src={image.source_url}
              alt={image.alt_text || ""}
              width={image.media_details?.width}
              height={image.media_details?.height}
            />
          )}
          <div className="project-links">
            {liveUrl && (
              <a className="project-details-link" href={liveUrl}>
                View Live Project
              </a>
            )}

            {repoUrl && (
              <a className="project-details-link" href={repoUrl}>
                View Code
              </a>
            )}
          </div>
          <div
            className="project-content"
            dangerouslySetInnerHTML={{
              __html: project.content?.rendered || "",
            }}
          />
        </>
      )}
    </article>
  );
}
