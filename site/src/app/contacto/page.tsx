import ContactPageClient from '@/components/pages/ContactPageClient'
import { getPageContent, getSectionsMap } from '@/lib/getPageContent'

export default async function ContactPage() {
  const page = await getPageContent('contacto')
  return <ContactPageClient sections={getSectionsMap(page)} />
}
