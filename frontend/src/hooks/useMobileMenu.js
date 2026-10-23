import { useEffect, useRef, useState } from 'react'

export default function useMobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigationRef = useRef(null)
  const menuButtonRef = useRef(null)

  function closeMenu() {
    setMenuOpen(false)
    menuButtonRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => {
    if (!menuOpen) return
    const desktop = window.matchMedia('(min-width: 641px)')
    if (desktop.matches) return
    navigationRef.current?.querySelector('a')?.focus({ preventScroll: true })

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        menuButtonRef.current?.focus({ preventScroll: true })
      } else if (event.key === 'Tab') {
        const controls = [...navigationRef.current.querySelectorAll('a'), menuButtonRef.current]
        const current = controls.indexOf(document.activeElement)
        const next = event.shiftKey
          ? (current <= 0 ? controls.length - 1 : current - 1)
          : (current + 1) % controls.length
        event.preventDefault()
        controls[next]?.focus({ preventScroll: true })
      }
    }

    function handleResize(event) {
      if (event.matches) {
        setMenuOpen(false)
        navigationRef.current?.querySelector('a[aria-current="page"]')?.focus({ preventScroll: true })
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    desktop.addEventListener('change', handleResize)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      desktop.removeEventListener('change', handleResize)
    }
  }, [menuOpen])

  function toggleMenu() {
    setMenuOpen((open) => !open)
  }

  return { menuOpen, navigationRef, menuButtonRef, closeMenu, toggleMenu }
}
