'use client'

import { useEffect } from 'react'

/**
 * Client component that sets up an IntersectionObserver to add the
 * "on" class to any `.reveal` elements when they scroll into view.
 * Rendered once at the locale layout level.
 */
export default function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
