'use client'

import Image from 'next/image'
import {
  BadgeCheck,
  Globe,
  MessageSquare,
  Shield,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import CTAButton from '@/components/CTAButton'
import SectionHeading from '@/components/SectionHeading'
import SectionWrapper from '@/components/SectionWrapper'
import { useLang } from '@/lib/i18n'
import { contentImage, contentText } from '@/lib/contentValue'
import type { SectionContent } from '@/lib/getPageContent'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

const benefitVariants = {
  hidden: { opacity: 0, x: 35 },
  visible: { opacity: 1, x: 0 },
}

interface Props {
  content?: SectionContent
}

export default function WhyUsSection({ content = {} }: Props) {
  const { lang, t } = useLang()
  const c = lang === 'pt' ? content : {}
  const fleetImage = contentImage(
    content,
    'imagem_frota',
    '/images/client/two-van-fleet-parked.jpeg'
  )

  const benefits: Benefit[] = [
    {
      icon: Globe,
      title: contentText(c, 'beneficio1_titulo', t.home.why1Title),
      description: contentText(c, 'beneficio1_desc', t.home.why1Desc),
    },
    {
      icon: MessageSquare,
      title: contentText(c, 'beneficio2_titulo', t.home.why2Title),
      description: contentText(c, 'beneficio2_desc', t.home.why2Desc),
    },
    {
      icon: BadgeCheck,
      title: contentText(c, 'beneficio3_titulo', t.home.why3Title),
      description: contentText(c, 'beneficio3_desc', t.home.why3Desc),
    },
    {
      icon: Shield,
      title: contentText(c, 'beneficio4_titulo', t.home.why4Title),
      description: contentText(c, 'beneficio4_desc', t.home.why4Desc),
    },
  ]

  return (
    <SectionWrapper id="porque-nos" bg="white">
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeading
            tag={contentText(c, 'tag', t.home.whyTag)}
            title={contentText(c, 'titulo', t.home.whyTitle)}
            subtitle={contentText(c, 'subtitulo', t.home.whySubtitle)}
            align="left"
          />

          <CTAButton href="/contacto" variant="primary">
            {t.home.whyCta}
          </CTAButton>
          <p className="mt-4 font-body text-sm italic text-[#666]">
            {t.home.whyStatement}
          </p>

          <motion.div
            className="relative mt-9 aspect-[4/3] overflow-hidden rounded-card shadow-[0_18px_45px_rgba(6,58,31,0.14)]"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Image
              src={fleetImage}
              alt={t.home.fleetImageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-5 sm:grid-cols-2"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {benefits.map(({ icon: Icon, title, description }) => (
            <motion.article
              key={title}
              className="rounded-[10px] bg-[#F9F9F9] p-5"
              variants={benefitVariants}
              whileHover={{
                y: -6,
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon size={24} strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 font-heading text-xl font-bold text-primary">
                {title}
              </h3>
              <p className="mt-2 font-body text-[15px] leading-6 text-dark/70">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
