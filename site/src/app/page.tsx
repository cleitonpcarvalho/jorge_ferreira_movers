import HeroSection from '@/components/home/HeroSection'
import TrustBar from '@/components/home/TrustBar'
import ServicesPreview from '@/components/home/ServicesPreview'
import WhyUsSection from '@/components/home/WhyUsSection'
import GallerySection from '@/components/home/GallerySection'
import CTABanner from '@/components/home/CTABanner'
import { getPageContent, getSection } from '@/lib/getPageContent'

export default async function HomePage() {
  const page = await getPageContent('home')

  return (
    <>
      <HeroSection content={getSection(page, 'hero')} />
      <TrustBar content={getSection(page, 'trust-bar')} />
      <ServicesPreview content={getSection(page, 'services-preview')} />
      <WhyUsSection content={getSection(page, 'why-us')} />
      <GallerySection content={getSection(page, 'gallery')} />
      <CTABanner content={getSection(page, 'cta-banner')} />
    </>
  )
}
