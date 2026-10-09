import { useEffect, useState } from 'react'

function plainText(html = '') {
  const document = new DOMParser().parseFromString(html, 'text/html')
  document.querySelectorAll('p, h1, h2, h3, h4, li, blockquote').forEach((element) => {
    element.append('\n\n')
  })
  document.querySelectorAll('br').forEach((element) => element.replaceWith('\n'))
  return (document.body.textContent || '').trim()
}

export default function TechStack() {
  const [techCategories, setTechCategories] = useState([])
  const [techError, setTechError] = useState('')
  const [techLoading, setTechLoading] = useState(true)

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

  const populatedCategories = techCategories
    .filter(
      (category) => Array.isArray(category.acf?.tools) && category.acf.tools.length,
    )
    .sort(
      (a, b) =>
        Number(a.acf.display_order ?? 50) -
          Number(b.acf.display_order ?? 50) ||
        a.name.localeCompare(b.name),
    )

  return (
        <section className="tech-stack-section" aria-labelledby="tech-stack-title">
          <div className="section-heading"><h1 id="tech-stack-title">Tech Stack</h1></div>
          {techLoading && <p className="status" role="status">Loading tech stack...</p>}
          {techError && <p className="status" role="alert">Could not load the tech stack: {techError}</p>}
          {!techLoading && !techError && !populatedCategories.length && (
            <p className="status">No tools have been added yet.</p>
          )}
          {populatedCategories.map((category) => (
            <div className="tech-category" key={category.id}>
              <h2>{plainText(category.name)}</h2>
              <ul className="tech-tools">
                {category.acf.tools.map((tool, index) => {
                  const logoUrl = typeof tool.logo === 'string' ? tool.logo : tool.logo?.url
                  return (
                    <li className="tech-tool" key={`${category.id}-${index}`}>
                      {logoUrl && <img className="tech-logo" src={logoUrl} alt="" loading="lazy" />}
                      <div>
                        <h3>{tool.tool_name}</h3>
                        {tool.short_description && <p>{tool.short_description}</p>}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </section>
  )
}
