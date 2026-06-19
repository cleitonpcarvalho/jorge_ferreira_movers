import type { SectionContent } from '@/lib/getPageContent'

export function contentText(
  content: SectionContent | undefined,
  key: string,
  fallback: string
) {
  const value = content?.[key]
  return typeof value === 'string' && value.trim() ? value : fallback
}

export function contentImage(
  content: SectionContent | undefined,
  key: string,
  fallback: string
) {
  const value = contentText(content, key, fallback)

  if (value.startsWith('http://') || value.startsWith('https://')) {
    try {
      const url = new URL(value)
      if (url.pathname.startsWith('/images/')) return url.pathname
    } catch {
      return fallback
    }
  }

  return value
}
