import PersonalOrganizerPageClient from '@/components/pages/PersonalOrganizerPageClient'
import { getPageContent, getSectionsMap } from '@/lib/getPageContent'

export default async function PersonalOrganizerPage() {
  const page = await getPageContent('personal-organizer')
  return <PersonalOrganizerPageClient sections={getSectionsMap(page)} />
}
