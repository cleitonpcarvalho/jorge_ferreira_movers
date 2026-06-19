import AboutPageClient from '@/components/pages/AboutPageClient'
import { getPageContent, getSectionsMap } from '@/lib/getPageContent'

export default async function AboutPage() {
  const page = await getPageContent('sobre-nos')
  return <AboutPageClient sections={getSectionsMap(page)} />
}
