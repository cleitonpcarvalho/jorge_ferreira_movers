export type SectionContent = Record<string, unknown>

export interface Section {
  id: number
  slug: string
  title: string
  content: SectionContent
  order_num: number
}

export interface PageData {
  id: number
  slug: string
  title: string
  description: string
  order_num: number
  sections: Section[]
}

export type SectionsMap = Record<string, SectionContent>

export async function getPageContent(slug: string): Promise<PageData | null> {
  const base =
    process.env.NEXT_PUBLIC_ADMIN_API_BASE ?? 'http://localhost:3001'

  try {
    const response = await fetch(
      `${base}/api/content/pages/${encodeURIComponent(slug)}`,
      { cache: 'no-store' }
    )
    if (!response.ok) return null
    return (await response.json()) as PageData
  } catch {
    return null
  }
}

export function getSection(
  page: PageData | null,
  sectionSlug: string
): SectionContent {
  if (!page) return {}
  return page.sections.find((section) => section.slug === sectionSlug)?.content ?? {}
}

export function getSectionsMap(page: PageData | null): SectionsMap {
  if (!page) return {}
  return Object.fromEntries(
    page.sections.map((section) => [section.slug, section.content ?? {}])
  )
}
