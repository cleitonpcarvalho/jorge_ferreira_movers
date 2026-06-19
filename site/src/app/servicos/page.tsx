import ServicesPageClient from '@/components/pages/ServicesPageClient'
import { getPageContent, getSectionsMap } from '@/lib/getPageContent'

export default async function ServicesPage() {
  const page = await getPageContent('servicos')
  return <ServicesPageClient sections={getSectionsMap(page)} />
}
