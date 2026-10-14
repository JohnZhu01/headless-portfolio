import useWordPress from '../hooks/useWordPress'
import toolIcon from '../utils/toolIcons'

function plainText(html = '') {
  const document = new DOMParser().parseFromString(html, 'text/html')
  document.querySelectorAll('p, h1, h2, h3, h4, li, blockquote').forEach((element) => {
    element.append('\n\n')
  })
  document.querySelectorAll('br').forEach((element) => element.replaceWith('\n'))
  return (document.body.textContent || '').trim()
}

export default function TechStack() {
  const { data: techCategories, loading: techLoading, error: techError } = useWordPress(
    'tech-stack-category?hide_empty=false&acf_format=standard',
  )

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
                  const logoUrl = toolIcon(tool)
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
  )
}
