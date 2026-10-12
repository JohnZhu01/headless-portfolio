import useWordPress from '../hooks/useWordPress'
import plainText from '../utils/plainText'

export default function ContentCollection({ title, endpoint, headingId, variant, priorityIds = [] }) {
  const { data: entries, loading, error } = useWordPress(endpoint + '?_embed=1')
  const orderedEntries = [...entries].sort((a, b) => {
    const aIndex = priorityIds.indexOf(a.id)
    const bIndex = priorityIds.indexOf(b.id)
    return (aIndex < 0 ? priorityIds.length : aIndex) -
      (bIndex < 0 ? priorityIds.length : bIndex)
  })
  return (
    <section className="content-page" aria-labelledby={headingId}>
      <div className="section-heading"><h1 id={headingId}>{title}</h1></div>
      {loading && <p className="status" role="status">Loading {title.toLowerCase()}...</p>}
      {error && <p className="status" role="alert">Could not load {title.toLowerCase()}: {error}</p>}
      {!loading && !error && !entries.length && <p className="status">{title} content is coming soon.</p>}
      <div className={`content-entries ${variant}`}>
        {orderedEntries.map((entry) => {
          const image = entry._embedded?.['wp:featuredmedia']?.[0]
          return (
            <article className="content-entry" key={entry.id}>
              <h2>{plainText(entry.title?.rendered)}</h2>
              {image?.source_url && <img className="entry-image" src={image.source_url} alt={image.alt_text || ''} loading="lazy" />}
              <div
                className="entry-content"
                dangerouslySetInnerHTML={{ __html: entry.content?.rendered || '' }}
              />
            </article>
          )
        })}
      </div>
    </section>
  )
}
