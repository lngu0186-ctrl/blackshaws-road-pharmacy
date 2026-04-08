import { useEffect } from 'react'

export interface SeoInput {
  title: string
  description: string
  robots?: string
  canonicalPath?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
}

function ensureMeta(selector: string, create: () => HTMLElement): HTMLElement {
  const existing = document.head.querySelector(selector) as HTMLElement | null
  if (existing) return existing
  const node = create()
  document.head.appendChild(node)
  return node
}

export function applySeo({
  title,
  description,
  robots = 'index, follow',
  canonicalPath,
  ogTitle,
  ogDescription,
  ogImage = '/logo-mark-512.png',
}: SeoInput) {
  document.title = title

  const metaDescription = ensureMeta('meta[name="description"]', () => {
    const node = document.createElement('meta')
    node.setAttribute('name', 'description')
    return node
  })
  metaDescription.setAttribute('content', description)

  const metaRobots = ensureMeta('meta[name="robots"]', () => {
    const node = document.createElement('meta')
    node.setAttribute('name', 'robots')
    return node
  })
  metaRobots.setAttribute('content', robots)

  const ogTitleMeta = ensureMeta('meta[property="og:title"]', () => {
    const node = document.createElement('meta')
    node.setAttribute('property', 'og:title')
    return node
  })
  ogTitleMeta.setAttribute('content', ogTitle || title)

  const ogDescriptionMeta = ensureMeta('meta[property="og:description"]', () => {
    const node = document.createElement('meta')
    node.setAttribute('property', 'og:description')
    return node
  })
  ogDescriptionMeta.setAttribute('content', ogDescription || description)

  const ogImageMeta = ensureMeta('meta[property="og:image"]', () => {
    const node = document.createElement('meta')
    node.setAttribute('property', 'og:image')
    return node
  })
  ogImageMeta.setAttribute('content', ogImage)

  if (canonicalPath) {
    const canonical = ensureMeta('link[rel="canonical"]', () => {
      const node = document.createElement('link')
      node.setAttribute('rel', 'canonical')
      return node
    }) as HTMLLinkElement
    const origin = window.location.origin.replace(/\/$/, '')
    canonical.setAttribute('href', `${origin}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`)
  }
}

export function usePageSeo({
  title,
  description,
  robots,
  canonicalPath,
  ogTitle,
  ogDescription,
  ogImage,
}: SeoInput) {
  useEffect(() => {
    applySeo({ title, description, robots, canonicalPath, ogTitle, ogDescription, ogImage })
  }, [title, description, robots, canonicalPath, ogTitle, ogDescription, ogImage])
}
