import useWordPress from '../hooks/useWordPress'
import plainText from '../utils/plainText'

export default function Home() {
  const { data: pages, loading, error } = useWordPress('pages?slug=about')
  const home = pages[0]
  return (
    <article className="hero" aria-labelledby="home-title">
      <h1 id="home-title">{plainText(home?.title?.rendered) || 'John Zhu'}</h1>
      {loading && <p className="status" role="status">Loading home page...</p>}
      {error && <p className="status" role="alert">Could not load the home page: {error}</p>}
      {home && <div className="home-content">{plainText(home.content?.rendered)}</div>}
      {!loading && !error && !home && (
        <p className="home-content">Front-end web developer building responsive, user-friendly websites.</p>
      )}
    </article>
  )
}
