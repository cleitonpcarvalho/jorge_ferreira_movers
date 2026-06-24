'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Home,
  MessageCircle,
  Shield,
  Sparkles,
  Zap,
  ZoomIn,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import CTAButton from '@/components/CTAButton'
import SectionHeading from '@/components/SectionHeading'
import SectionWrapper from '@/components/SectionWrapper'
import { contentText } from '@/lib/contentValue'
import type { SectionsMap } from '@/lib/getPageContent'
import { useLang } from '@/lib/i18n'

interface Benefit {
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

export default function PostMoveCleaningPageClient({
  sections = {},
}: Props) {
  const { lang, t } = useLang()
  const contactHref = lang === 'pt' ? '/contacto' : '/contact'
  const heroContent = lang === 'pt' ? sections.hero : {}
  const preMoveItems = [
    t.limpeza.preItem1,
    t.limpeza.preItem2,
    t.limpeza.preItem3,
    t.limpeza.preItem4,
    t.limpeza.preItem5,
  ]
  const postMoveItems = [
    t.limpeza.postItem1,
    t.limpeza.postItem2,
    t.limpeza.postItem3,
    t.limpeza.postItem4,
    t.limpeza.postItem5,
  ]
  const benefits: Benefit[] = [
    {
      icon: Zap,
      title: t.limpeza.why1Title,
      description: t.limpeza.why1Desc,
    },
    {
      icon: Shield,
      title: t.limpeza.why2Title,
      description: t.limpeza.why2Desc,
    },
    {
      icon: BadgeCheck,
      title: t.limpeza.why3Title,
      description: t.limpeza.why3Desc,
    },
    {
      icon: Calendar,
      title: t.limpeza.why4Title,
      description: t.limpeza.why4Desc,
    },
  ]
  const cleaningImages = [
    {
      src: '/images/limpeza/clean-empty-apartment.jpeg',
      alt: t.limpeza.image1Alt,
    },
    {
      src: '/images/limpeza/professional-cleaning-room.jpeg',
      alt: t.limpeza.image2Alt,
    },
    {
      src: '/images/limpeza/clean-kitchen-apartment.jpeg',
      alt: t.limpeza.image3Alt,
    },
    {
      src: '/images/limpeza/clean-living-room.jpeg',
      alt: t.limpeza.image4Alt,
    },
    {
      src: '/images/limpeza/clean-bathroom.jpeg',
      alt: t.limpeza.image5Alt,
    },
  ]
  const whatsappUrl =
    `https://wa.me/447796601194?text=${encodeURIComponent(
      t.limpeza.whatsappMessage
    )}`

  return (
    <>
      <SectionWrapper className="relative min-h-[420px] overflow-hidden !py-0">
        <div className="absolute inset-0">
          <Image
            src={cleaningImages[0].src}
            alt={cleaningImages[0].alt}
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[rgba(6,58,31,0.82)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_14px)]" />
        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-4xl flex-col items-center justify-center py-16 text-center">
          <motion.span
            className="inline-flex rounded-btn bg-white/10 px-5 py-2 font-body text-xs font-medium uppercase tracking-[0.18em] text-white ring-1 ring-white/15"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {contentText(heroContent, 'tag', t.limpeza.heroTag)}
          </motion.span>
          <motion.h1
            className="mt-6 font-heading text-4xl font-black leading-[1.02] text-white sm:text-5xl lg:text-[52px]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            {contentText(
              heroContent,
              'titulo',
              t.limpeza.heroTitle
            )}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-3xl font-body text-base leading-8 text-white/85 sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.55 }}
          >
            {contentText(
              heroContent,
              'subtitulo',
              t.limpeza.heroSubtitle
            )}
          </motion.p>
        </div>
      </SectionWrapper>

      <SectionWrapper id="servicos-limpeza" bg="white">
        <div className="grid gap-7 lg:grid-cols-2">
          <motion.article
            className="rounded-card bg-primary p-8 text-white sm:p-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <Sparkles size={36} strokeWidth={1.8} />
            <h2 className="mt-6 font-heading text-3xl font-bold">
              {t.limpeza.preTitle}
            </h2>
            <p className="mt-3 font-body text-[15px] leading-6 text-white/75">
              {t.limpeza.preSubtitle}
            </p>
            <ul className="mt-7 space-y-4">
              {preMoveItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-body text-[15px] leading-6 text-white/90"
                >
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={contactHref}
              className="mt-8 inline-block font-body font-medium text-white underline-offset-4 hover:underline"
            >
              {t.limpeza.preCta}
            </Link>
          </motion.article>

          <motion.article
            className="rounded-card border-2 border-primary bg-white p-8 text-primary sm:p-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <Home size={36} strokeWidth={1.8} />
            <h2 className="mt-6 font-heading text-3xl font-bold">
              {t.limpeza.postTitle}
            </h2>
            <p className="mt-3 font-body text-[15px] leading-6 text-dark/65">
              {t.limpeza.postSubtitle}
            </p>
            <ul className="mt-7 space-y-4">
              {postMoveItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-body text-[15px] leading-6 text-dark/80"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={contactHref}
              className="mt-8 inline-block font-body font-medium text-accent underline-offset-4 hover:underline"
            >
              {t.limpeza.postCta}
            </Link>
          </motion.article>
        </div>
      </SectionWrapper>

      <SectionWrapper id="porque-escolher" bg="light">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <SectionHeading
              tag={t.limpeza.whyTag}
              title={t.limpeza.whyTitle}
              align="left"
            />
            <div className="space-y-5">
              {benefits.map(({ icon: Icon, title, description }, index) => (
                <motion.div
                  key={title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.45 }}
                  viewport={{ once: true, margin: '-40px' }}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-card">
                    <Icon size={22} strokeWidth={1.9} />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-primary">
                      {title}
                    </h2>
                    <p className="mt-1 font-body text-[15px] leading-6 text-[#555]">
                      {description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-9">
              <CTAButton href={contactHref} variant="primary">
                {t.limpeza.whyCta}
              </CTAButton>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto h-[500px] w-full max-w-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="absolute left-0 top-0 h-[66%] w-[78%] overflow-hidden rounded-card shadow-md">
              <Image
                src={cleaningImages[1].src}
                alt={cleaningImages[1].alt}
                fill
                sizes="(max-width: 1024px) 78vw, 39vw"
                className="object-cover"
              />
            </div>
            <motion.div
              className="absolute bottom-0 right-0 h-[58%] w-[70%] overflow-hidden rounded-card border-4 border-light shadow-md"
              initial={{ rotate: 2 }}
              whileHover={{ y: -6, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={cleaningImages[2].src}
                alt={cleaningImages[2].alt}
                fill
                sizes="(max-width: 1024px) 70vw, 35vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="resultados-limpeza" bg="white">
        <SectionHeading
          tag={t.limpeza.galleryTag}
          title={t.limpeza.galleryTitle}
        />
        <motion.div
          className="-mx-6 flex snap-x gap-5 overflow-x-auto px-6 pb-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {cleaningImages.map((image) => (
            <motion.div
              key={image.src}
              className="group relative aspect-video min-w-[82vw] snap-center overflow-hidden rounded-card sm:min-w-[48vw] lg:min-w-0"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 82vw, (max-width: 1024px) 48vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
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
            src="/images/limpeza/clean-living-room.jpeg"
            alt={t.limpeza.ctaImageAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,58,31,0.90)_0%,rgba(217,26,42,0.72)_100%)]" />
        <motion.div
          className="relative z-10 mx-auto max-w-4xl py-20 text-center md:py-24"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="font-heading text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            {t.limpeza.ctaTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-7 text-white/80 sm:text-lg">
            {t.limpeza.ctaSubtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href={contactHref} variant="white">
              {t.limpeza.ctaBtn1}
            </CTAButton>
            <CTAButton
              href={whatsappUrl}
              variant="outline"
              external
              className="!border-white !text-white hover:!bg-white hover:!text-primary"
            >
              <MessageCircle size={19} />
              {t.limpeza.ctaBtn2}
            </CTAButton>
          </div>
        </motion.div>
      </SectionWrapper>
    </>
  )
}
