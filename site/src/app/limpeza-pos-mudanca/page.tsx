import PostMoveCleaningPageClient from '@/components/pages/PostMoveCleaningPageClient'
import { getPageContent, getSectionsMap } from '@/lib/getPageContent'

export default async function PostMoveCleaningPage() {
  const page = await getPageContent('limpeza-pos-mudanca')
  return <PostMoveCleaningPageClient sections={getSectionsMap(page)} />
}
