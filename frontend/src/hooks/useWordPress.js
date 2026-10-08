import { useEffect, useState } from 'react'

export default function useWordPress(path) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        const apiBase = import.meta.env.VITE_WP_API_URL?.replace(/\/$/, '')
        if (!apiBase) throw new Error('The WordPress API URL is missing.')
        let entries = []
        let page = 1
        let totalPages = 1
        do {
          const url = new URL(apiBase + '/' + path)
          url.searchParams.set('per_page', '100')
          url.searchParams.set('page', String(page))
          const response = await fetch(url, { signal: controller.signal })
          if (!response.ok) throw new Error('WordPress returned ' + response.status + '.')
          const batch = await response.json()
          if (!Array.isArray(batch)) throw new Error('WordPress returned an unexpected response.')
          entries = entries.concat(batch)
          totalPages = Number(response.headers.get('X-WP-TotalPages')) || 1
          page += 1
        } while (page <= totalPages)
        if (!controller.signal.aborted) setData(entries)
      } catch (error) {
        if (!controller.signal.aborted) setError(error.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    load()
    return () => controller.abort()
  }, [path])

  return { data, loading, error }
}
