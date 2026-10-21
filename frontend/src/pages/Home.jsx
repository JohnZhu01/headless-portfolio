import TechStack from '../components/TechStack'
import LoadingState from '../components/LoadingState'
import useWordPress from '../hooks/useWordPress'
import plainText from '../utils/plainText'
import githubIcon from 'devicon/icons/github/github-original.svg'
import linkedinIcon from 'devicon/icons/linkedin/linkedin-original.svg'
import emailIcon from '../assets/email.svg'


const contact = {
  email: "jz95zhu@gmail.com",
  github: "https://github.com/JohnZhu01",
  linkedin:
    "https://www.linkedin.com/in/johnny-zhu-7b6a54218/",
};

export default function Home() {
  const { data: pages, loading, error } = useWordPress('pages?slug=about&_embed=1')
  const home = pages[0]
  const photo = home?._embedded?.['wp:featuredmedia']?.[0]
  return (
    <article className="hero" aria-labelledby="home-title">
        <div className="home-layout">
          <aside className="home-profile" aria-label="Profile and contact">
            {photo?.source_url ? (
              <img className="profile-photo" src={photo.source_url} alt={photo.alt_text || 'Johnny Zhu'} />
            ) : (
              <div className="profile-photo profile-placeholder" aria-label="Profile photo placeholder">JZ</div>
            )}
            <p className="profile-role">Front End Web Developer</p>
            <h2>Contact</h2>
            <ul className="contact-links">
              <li>
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} aria-label="Email Johnny Zhu">
                    <img src={emailIcon} alt="" />
                  </a>
                ) : (
                  <span className="contact-placeholder" aria-label="Email link coming soon">
                    <img src={emailIcon} alt="" />
                  </span>
                )}
              </li>
              <li>
                <a href={contact.github} aria-label="Johnny Zhu on GitHub">
                  <img src={githubIcon} alt="" />
                </a>
              </li>
              <li>
                {contact.linkedin ? (
                  <a href={contact.linkedin} aria-label="Johnny Zhu on LinkedIn">
                    <img src={linkedinIcon} alt="" />
                  </a>
                ) : (
                  <span className="contact-placeholder" aria-label="LinkedIn link coming soon">
                    <img src={linkedinIcon} alt="" />
                  </span>
                )}
              </li>
            </ul>
          </aside>
          <div className="home-main">
            <h1 id="home-title">{plainText(home?.title?.rendered) || 'Johnny Zhu'}</h1>
            <div className="home-content">
            {loading && <LoadingState label="Loading home page…" />}
            {error && <p className="status" role="alert">Could not load the home page: {error}</p>}
            {home && (
              <div
                className="home-rich-content"
                dangerouslySetInnerHTML={{
                  __html: home.content?.rendered || '',
                }}
              />
            )}
            {!loading && !error && !home && (
              <p>Front-end web developer building responsive, user-friendly websites.</p>
            )}
            </div>
            <TechStack />
          </div>
        </div>
    </article>
  )
}
