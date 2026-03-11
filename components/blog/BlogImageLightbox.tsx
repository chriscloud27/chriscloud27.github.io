'use client'

import { type MouseEvent, useCallback, useEffect, useState } from 'react'

type ActiveImage = {
  src: string
  alt: string
}

type BlogImageLightboxProps = {
  contentHtml: string
  coverImage?: string
  coverAlt: string
}

export default function BlogImageLightbox({
  contentHtml,
  coverImage,
  coverAlt,
}: BlogImageLightboxProps) {
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null)

  const openImage = useCallback((src: string, alt: string) => {
    setActiveImage({ src, alt })
  }, [])

  const closeImage = useCallback(() => {
    setActiveImage(null)
  }, [])

  const onContentClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement
      const imageElement = target.closest('img')

      if (!imageElement) {
        return
      }

      const src = imageElement.getAttribute('src')
      if (!src) {
        return
      }

      event.preventDefault()
      const alt = imageElement.getAttribute('alt') || 'Blog image'
      openImage(src, alt)
    },
    [openImage],
  )

  useEffect(() => {
    if (!activeImage) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeImage()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeImage, closeImage])

  return (
    <>
      {coverImage && (
        <div className="blog-post-cover">
          <button
            type="button"
            className="w-full border-0 bg-transparent p-0 text-left"
            onClick={() => openImage(coverImage, coverAlt)}
            aria-label="Open cover image"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt={coverAlt}
              loading="eager"
              className="blog-clickable-image"
            />
          </button>
        </div>
      )}

      <div
        className="blog-post-content"
        onClick={onContentClick}
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {activeImage && (
        <div
          className="fixed inset-0 z-[400] bg-deep-blue/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged blog image"
          onClick={closeImage}
        >
          <button
            type="button"
            onClick={closeImage}
            className="absolute right-4 top-4 border border-white/20 bg-deep-blue/90 px-3 py-2 font-mono text-[11px] tracking-[0.08em] text-electric-cyan uppercase"
            aria-label="Close enlarged image"
          >
            Close
          </button>

          <div className="flex h-full w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[88vh] max-w-[95vw] h-auto w-auto rounded-card border border-white/10"
            />
          </div>
        </div>
      )}
    </>
  )
}
