import InternationalMovesPageClient from '@/components/pages/InternationalMovesPageClient'
import { getPageContent, getSectionsMap } from '@/lib/getPageContent'

export default async function InternationalMovesPage() {
  const page = await getPageContent('mudancas-internacionais')
  return <InternationalMovesPageClient sections={getSectionsMap(page)} />
}
