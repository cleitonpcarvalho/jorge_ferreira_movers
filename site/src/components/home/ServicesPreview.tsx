'use client'

import Link from 'next/link'
import {
  Archive,
  ArrowRight,
  MapPin,
  Package,
  Truck,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import CTAButton from '@/components/CTAButton'
import SectionHeading from '@/components/SectionHeading'
import SectionWrapper from '@/components/SectionWrapper'
import { useLang } from '@/lib/i18n'
import { contentText } from '@/lib/contentValue'
import type { SectionContent } from '@/lib/getPageContent'

interface Service {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

interface Props {
  content?: SectionContent
}

export default function ServicesPreview({ content = {} }: Props) {
  const { lang, t } = useLang()
  const c = lang === 'pt' ? content : {}

  const services: Service[] = [
    {
      icon: Truck,
      title: contentText(c, 'servico1_titulo', t.home.service1Title),
      description: contentText(c, 'servico1_desc', t.home.service1Desc),
      href: '/mudancas-internacionais',
    },
    {
      icon: Package,
      title: contentText(c, 'servico2_titulo', t.home.service2Title),
      description: contentText(c, 'servico2_desc', t.home.service2Desc),
      href: '/servicos',
    },
    {
      icon: MapPin,
      title: contentText(c, 'servico3_titulo', t.home.service3Title),
      description: contentText(c, 'servico3_desc', t.home.service3Desc),
      href: '/servicos',
    },
    {
      icon: Archive,
      title: contentText(c, 'servico4_titulo', t.home.service4Title),
      description: contentText(c, 'servico4_desc', t.home.service4Desc),
      href: '/servicos',
    },
  ]

  return (
    <SectionWrapper id="servicos-preview" bg="light">
      <SectionHeading
        tag={contentText(c, 'tag', t.home.servicesTag)}
        title={contentText(c, 'titulo', t.home.servicesTitle)}
        subtitle={contentText(c, 'subtitulo', t.home.servicesSubtitle)}
      />

      <motion.div
        className="grid gap-6 md:grid-cols-2"
        variants={{
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {services.map(({ icon: Icon, title, description, href }) => (
          <motion.article
            key={title}
            className="flex min-h-72 flex-col rounded-card bg-white p-7 shadow-card sm:p-8"
            variants={cardVariants}
            whileHover={{
              y: -6,
              boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Icon size={32} strokeWidth={1.8} />
            </div>
            <h3 className="mt-6 font-heading text-2xl font-bold text-primary">
              {title}
            </h3>
            <p className="mt-3 flex-1 font-body text-base leading-7 text-[#555]">
              {description}
            </p>
            <Link
              href={href}
              className="mt-6 inline-flex items-center gap-2 self-start font-body text-sm font-medium text-accent transition-[gap] hover:gap-3"
            >
              {t.home.learnMore}
              <ArrowRight size={17} />
            </Link>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-60px' }}
      >
        <CTAButton href="/servicos" variant="primary">
          {t.home.servicesCta}
        </CTAButton>
      </motion.div>
    </SectionWrapper>
  )
}
