import { useEffect, useState } from 'react'
import './App.css'

function plainText(html = '') {
  const document = new DOMParser().parseFromString(html, 'text/html')
  document.querySelectorAll('p, h1, h2, h3, h4, li, blockquote').forEach((element) => {
    element.append('\n\n')
  })
  document.querySelectorAll('br').forEach((element) => element.replaceWith('\n'))
  return (document.body.textContent || '').trim()
}

export default function App() {
  const [home, setHome] = useState(null)
  const [techCategories, setTechCategories] = useState([])
  const [techError, setTechError] = useState('')
  const [techLoading, setTechLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadHome() {
      try {
        const apiBase = import.meta.env.VITE_WP_API_URL?.replace(/\/$/, '')
        if (!apiBase) throw new Error('The WordPress API URL is missing.')

        const response = await fetch(`${apiBase}/pages?slug=home`, {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`WordPress returned ${response.status}.`)

        const pages = await response.json()
        if (!Array.isArray(pages)) throw new Error('WordPress returned an unexpected response.')
        if (!pages.length) throw new Error('The Home page is not published yet.')
        if (!controller.signal.aborted) setHome(pages[0])
      } catch (error) {
        if (!controller.signal.aborted) setError(error.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadHome()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    async function loadTechStack() {
      try {
        const apiBase = import.meta.env.VITE_WP_API_URL?.replace(/\/$/, '')
        if (!apiBase) throw new Error('The WordPress API URL is missing.')
        const response = await fetch(`${apiBase}/tech-stack-category?per_page=100&hide_empty=false&acf_format=standard`, {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`WordPress returned ${response.status}.`)
        const categories = await response.json()
        if (!Array.isArray(categories)) throw new Error('WordPress returned an unexpected response.')
        if (!controller.signal.aborted) setTechCategories(categories)
      } catch (error) {
        if (!controller.signal.aborted) setTechError(error.message)
      } finally {
        if (!controller.signal.aborted) setTechLoading(false)
      }
    }
    loadTechStack()
    return () => controller.abort()
  }, [])

  const populatedCategories = techCategories.filter(
    (category) => Array.isArray(category.acf?.tools) && category.acf.tools.length,
  )

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header page-width">
        <a className="wordmark" href="/" aria-label="John Zhu home">
          John Zhu<span aria-hidden="true">.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="/" aria-current="page">Home</a>
        </nav>
      </header>
      <main id="main" className="page-width">
        {loading && <p className="status" role="status">Loading home page...</p>}
        {error && <p className="status" role="alert">Could not load the home page: {error}</p>}
        {home && (
          <article className="hero" aria-labelledby="home-title">
            <h1 id="home-title">{plainText(home.title?.rendered) || 'Home'}</h1>
            <div className="home-content">{plainText(home.content?.rendered)}</div>
          </article>
        )}
        <section className="tech-stack-section" aria-labelledby="tech-stack-title">
          <div className="section-heading"><h2 id="tech-stack-title">Tech Stack</h2></div>
          {techLoading && <p className="status" role="status">Loading tech stack...</p>}
          {techError && <p className="status" role="alert">Could not load the tech stack: {techError}</p>}
          {!techLoading && !techError && !populatedCategories.length && (
            <p className="status">No tools have been added yet.</p>
          )}
          {populatedCategories.map((category) => (
            <div className="tech-category" key={category.id}>
              <h3>{plainText(category.name)}</h3>
              <ul className="tech-tools">
                {category.acf.tools.map((tool, index) => {
                  const logoUrl = typeof tool.logo === 'string' ? tool.logo : tool.logo?.url
                  return (
                    <li className="tech-tool" key={`${category.id}-${index}`}>
                      {logoUrl && <img className="tech-logo" src={logoUrl} alt="" loading="lazy" />}
                      <div>
                        <h4>{tool.tool_name}</h4>
                        {tool.short_description && <p>{tool.short_description}</p>}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </section>
      </main>
      <footer className="site-footer page-width">
        <p>&copy; {new Date().getFullYear()} John Zhu</p>
      </footer>
    </>
  )
}
