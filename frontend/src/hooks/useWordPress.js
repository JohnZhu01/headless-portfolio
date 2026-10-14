import { useEffect, useState } from 'react'
import { loadWordPress, readWordPressCache } from '../utils/wordpressData'

export default function useWordPress(path) {
  const [result, setResult] = useState(() => {
    const cached = readWordPressCache(path)
    return { path, data: cached || [], loading: cached === undefined, error: '' }
  })

  useEffect(() => {
    let active = true
    loadWordPress(path).then(
      (data) => { if (active) setResult({ path, data, loading: false, error: '' }) },
      (error) => { if (active) setResult({ path, data: [], loading: false, error: error.message }) },
    )
    return () => { active = false }
  }, [path])

  return result.path === path ? result : { data: [], loading: true, error: '' }
}
