'use client'

import Image from 'next/image'
import {
  Clock,
  HeartHandshake,
  LayoutGrid,
  MessageCircle,
  PackageCheck,
  Sparkles,
  Tag,
  ZoomIn,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import CTAButton from '@/components/CTAButton'
import SectionHeading from '@/components/SectionHeading'
import SectionWrapper from '@/components/SectionWrapper'
import InnerPageHero from '@/components/inner/InnerPageHero'
import { contentText } from '@/lib/contentValue'
import type { SectionsMap } from '@/lib/getPageContent'
import { useLang } from '@/lib/i18n'

interface ServiceCard {
  icon: LucideIcon
  title: string
  description: string
}

interface Props {
  sections?: SectionsMap
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function PersonalOrganizerPageClient({
  sections = {},
}: Props) {
  const { lang, t } = useLang()
  const contactHref = lang === 'pt' ? '/contacto' : '/contact'
  const heroContent = lang === 'pt' ? sections.hero : {}
  const serviceCards: ServiceCard[] = [
    {
      icon: PackageCheck,
      title: t.personalOrganizer.card1Title,
      description: t.personalOrganizer.card1Desc,
    },
    {
      icon: Tag,
      title: t.personalOrganizer.card2Title,
      description: t.personalOrganizer.card2Desc,
    },
    {
      icon: LayoutGrid,
      title: t.personalOrganizer.card3Title,
      description: t.personalOrganizer.card3Desc,
    },
    {
      icon: Sparkles,
      title: t.personalOrganizer.card4Title,
      description: t.personalOrganizer.card4Desc,
    },
    {
      icon: Clock,
      title: t.personalOrganizer.card5Title,
      description: t.personalOrganizer.card5Desc,
    },
    {
      icon: HeartHandshake,
      title: t.personalOrganizer.card6Title,
      description: t.personalOrganizer.card6Desc,
    },
  ]
  const galleryImages = [
    {
      src: '/images/personal-organizer/wardrobe-clothing-organisation.jpeg',
      width: 1077,
      height: 1076,
      alt: t.personalOrganizer.galleryImage1Alt,
    },
    {
      src: '/images/personal-organizer/childrens-wardrobe-organisation.jpeg',
      width: 1069,
      height: 1069,
      alt: t.personalOrganizer.galleryImage2Alt,
    },
    {
      src: '/images/personal-organizer/colour-sorted-wardrobe.jpeg',
      width: 1065,
      height: 804,
      alt: t.personalOrganizer.galleryImage3Alt,
    },
    {
      src: '/images/personal-organizer/organised-shoe-storage.jpeg',
      width: 1080,
      height: 1070,
      alt: t.personalOrganizer.galleryImage4Alt,
    },
  ]
  const whatsappUrl =
    `https://wa.me/447796601194?text=${encodeURIComponent(
      t.personalOrganizer.whatsappMessage
    )}`

  return (
    <>
      <InnerPageHero
        tag={contentText(heroContent, 'tag', t.personalOrganizer.heroTag)}
        title={contentText(heroContent, 'titulo', t.personalOrganizer.heroTitle)}
        subtitle={contentText(
          heroContent,
          'subtitulo',
          t.personalOrganizer.heroSubtitle
        )}
      />

      <SectionWrapper id="o-que-e" bg="white">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <SectionHeading
              tag={t.personalOrganizer.whatTag}
              title={t.personalOrganizer.whatTitle}
              subtitle={t.personalOrganizer.whatSubtitle}
              align="left"
            />
            <div className="space-y-5 font-body text-[16px] leading-8 text-[#444]">
              <p>{t.personalOrganizer.whatP1}</p>
              <p>{t.personalOrganizer.whatP2}</p>
              <p>{t.personalOrganizer.whatP3}</p>
            </div>
            <div className="mt-8">
              <CTAButton href={contactHref}>{t.personalOrganizer.whatCta}</CTAButton>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto h-[520px] w-full max-w-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="absolute left-0 top-0 h-[68%] w-[76%] overflow-hidden rounded-card shadow-md">
              <Image
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                fill
                sizes="(max-width: 1024px) 76vw, 38vw"
                className="object-cover"
              />
            </div>
            <motion.div
              className="absolute bottom-0 right-0 h-[62%] w-[68%] overflow-hidden rounded-card border-4 border-white shadow-md"
              initial={{ rotate: 2 }}
              whileHover={{ y: -6, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                fill
                sizes="(max-width: 1024px) 68vw, 34vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="o-que-inclui" bg="light">
        <SectionHeading
          tag={t.personalOrganizer.inclTag}
          title={t.personalOrganizer.inclTitle}
        />
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {serviceCards.map(({ icon: Icon, title, description }) => (
            <motion.article
              key={title}
              className="rounded-card bg-white p-7 shadow-card"
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: '0 18px 40px rgba(6,58,31,0.12)' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Icon size={32} className="text-accent" strokeWidth={1.8} />
              <h2 className="mt-5 font-heading text-lg font-bold text-primary">
                {title}
              </h2>
              <p className="mt-3 font-body text-[15px] leading-6 text-[#666]">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper id="galeria-personal-organizer" bg="white">
        <SectionHeading
          tag={t.personalOrganizer.galleryTag}
          title={t.personalOrganizer.galleryTitle}
          subtitle={t.personalOrganizer.gallerySubtitle}
        />
        <motion.div
          className="columns-1 gap-4 sm:columns-2 lg:columns-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.src}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{
                opacity: { delay: index * 0.1, duration: 0.45 },
                y: { delay: index * 0.1, duration: 0.45 },
                scale: { duration: 0.3, ease: 'easeOut' },
              }}
              viewport={{ once: true, margin: '-60px' }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-primary/65"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ZoomIn size={32} className="text-white" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper className="relative overflow-hidden !py-0" bg="dark">
        <div className="absolute inset-0">
          <Image
            src={galleryImages[0].src}
            alt={galleryImages[0].alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,58,31,0.92)_0%,rgba(217,26,42,0.75)_100%)]" />
        <motion.div
          className="relative z-10 mx-auto max-w-4xl py-20 text-center md:py-24"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="font-heading text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            {t.personalOrganizer.ctaTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-7 text-white/80 sm:text-lg">
            {t.personalOrganizer.ctaSubtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href={contactHref} variant="white">
              {t.personalOrganizer.ctaBtn1}
            </CTAButton>
            <CTAButton
              href={whatsappUrl}
              variant="outline"
              external
              className="!border-white !text-white hover:!bg-white hover:!text-primary"
            >
              <MessageCircle size={19} />
              {t.personalOrganizer.ctaBtn2}
            </CTAButton>
          </div>
        </motion.div>
      </SectionWrapper>
    </>
  )
}
