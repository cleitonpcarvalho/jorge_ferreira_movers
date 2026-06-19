'use client'

import Image from 'next/image'
import {
  Clock,
  Heart,
  MessageCircle,
  Shield,
  ZoomIn,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'
import SectionWrapper from '@/components/SectionWrapper'
import InnerPageHero from '@/components/inner/InnerPageHero'
import PageCTABanner from '@/components/inner/PageCTABanner'
import { useLang } from '@/lib/i18n'
import { contentImage, contentText } from '@/lib/contentValue'
import type { SectionsMap } from '@/lib/getPageContent'

interface Value {
  icon: LucideIcon
  title: string
  description: string
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const defaultFleetImages = [
  '/images/client/branded-van-roadside-profile.jpeg',
  '/images/client/two-van-fleet-parked.jpeg',
  '/images/client/two-vans-roadside-fleet.jpeg',
  '/images/client/branded-van-country-property.jpeg',
  '/images/client/branded-van-under-trees.jpeg',
  '/images/client/van-commercial-delivery-theatre.jpeg',
]

interface Props {
  sections?: SectionsMap
}

export default function AboutPageClient({ sections = {} }: Props) {
  const { lang, t } = useLang()
  const text = (section: string, key: string, fallback: string) =>
    contentText(lang === 'pt' ? sections[section] : {}, key, fallback)
  const image = (section: string, key: string, fallback: string) =>
    contentImage(sections[section], key, fallback)

  const values: Value[] = [
    {
      icon: Heart,
      title: text('values', 'valor1_titulo', t.about.val1Title),
      description: text('values', 'valor1_desc', t.about.val1Desc),
    },
    {
      icon: Clock,
      title: text('values', 'valor2_titulo', t.about.val2Title),
      description: text('values', 'valor2_desc', t.about.val2Desc),
    },
    {
      icon: Shield,
      title: text('values', 'valor3_titulo', t.about.val3Title),
      description: text('values', 'valor3_desc', t.about.val3Desc),
    },
    {
      icon: MessageCircle,
      title: text('values', 'valor4_titulo', t.about.val4Title),
      description: text('values', 'valor4_desc', t.about.val4Desc),
    },
  ]

  const fleetImages = defaultFleetImages.map((fallback, index) =>
    image('fleet', `imagem_${index + 1}`, fallback)
  )

  return (
    <>
      <InnerPageHero
        tag={text('hero', 'tag', t.about.heroTag)}
        title={text('hero', 'titulo', t.about.heroTitle)}
        subtitle={text('hero', 'subtitulo', t.about.heroSub)}
        image={image(
          'hero',
          'imagem_hero',
          '/images/client/movers-team-with-van-fleet.jpeg'
        )}
        imageAlt={t.about.heroImageAlt}
      />

      <SectionWrapper id="historia" bg="white">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <SectionHeading
              tag={text('story', 'tag', t.about.storyTag)}
              title={text('story', 'titulo', t.about.storyTitle)}
              align="left"
            />
            <div className="space-y-5 font-body text-[17px] leading-[1.8] text-[#444]">
              <p className="first-letter:float-left first-letter:mr-2 first-letter:font-heading first-letter:text-[64px] first-letter:font-black first-letter:leading-[0.85] first-letter:text-primary">
                {text('story', 'paragrafo1', t.about.storyP1)}
              </p>
              <p>{text('story', 'paragrafo2', t.about.storyP2)}</p>
              <p>{text('story', 'paragrafo3', t.about.storyP3)}</p>
            </div>
          </motion.div>

          <motion.div
            className="relative pb-10 pr-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-[0_18px_45px_rgba(6,58,31,0.16)]">
              <Image
                src={image(
                  'story',
                  'imagem_principal',
                  '/images/client/branded-van-roadside-profile.jpeg'
                )}
                alt={t.about.storyImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <motion.div
              className="absolute bottom-0 right-0 rounded-[10px] bg-accent px-7 py-5 text-white shadow-xl"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <strong className="block font-heading text-3xl font-black">
                {t.about.storyStat}
              </strong>
              <span className="font-body text-sm text-white/80">
                {t.about.storyStatLabel}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="valores" bg="primary">
        <SectionHeading
          tag={text('values', 'tag', t.about.valuesTag)}
          title={text('values', 'titulo', t.about.valuesTitle)}
          subtitle={t.about.valuesSubtitle}
          light
        />
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {values.map(({ icon: Icon, title, description }) => (
            <motion.article
              key={title}
              className="rounded-card border border-white/15 bg-white/[0.08] p-8"
              variants={cardVariants}
              whileHover={{
                y: -4,
                backgroundColor: 'rgba(255,255,255,0.14)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.16)',
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Icon size={32} className="text-accent" strokeWidth={1.8} />
              <h2 className="mt-5 font-heading text-xl font-bold text-white">
                {title}
              </h2>
              <p className="mt-3 font-body text-[15px] leading-6 text-white/75">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper id="equipa" bg="white">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div
            className="relative aspect-[16/10] overflow-hidden rounded-card shadow-[0_18px_45px_rgba(6,58,31,0.16)]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Image
              src="/images/client/movers-team-with-van-fleet.jpeg"
              alt={t.about.heroImageAlt}
              fill
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <SectionHeading
              tag={t.about.teamTag}
              title={t.about.teamTitle}
              subtitle={t.about.teamDesc}
              align="left"
            />
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="frota" bg="light">
        <SectionHeading
          tag={text('fleet', 'tag', t.about.fleetTag)}
          title={text('fleet', 'titulo', t.about.fleetTitle)}
          subtitle={text('fleet', 'descricao', t.about.fleetDesc)}
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
          {fleetImages.map((image, index) => (
            <motion.div
              key={image}
              className="group relative aspect-video min-w-[82vw] snap-center overflow-hidden rounded-card sm:min-w-[48vw] lg:min-w-0"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Image
                src={image}
                alt={`${t.about.fleetImageAlt} ${index + 1}`}
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

      <PageCTABanner
        title={t.about.ctaTitle}
        subtitle={t.about.ctaSub}
        button={t.about.ctaBtn}
        image="/images/pexels-portugal-road.jpeg"
        imageAlt={t.about.storyImageAlt}
      />
    </>
  )
}
