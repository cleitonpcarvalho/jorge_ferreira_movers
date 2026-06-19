'use client'

import Image from 'next/image'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import CTAButton from '@/components/CTAButton'
import SectionHeading from '@/components/SectionHeading'
import SectionWrapper from '@/components/SectionWrapper'
import InnerPageHero from '@/components/inner/InnerPageHero'
import PageCTABanner from '@/components/inner/PageCTABanner'
import { useLang } from '@/lib/i18n'
import { contentImage, contentText } from '@/lib/contentValue'
import type { SectionsMap } from '@/lib/getPageContent'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

interface Props {
  sections?: SectionsMap
}

export default function ServicesPageClient({ sections = {} }: Props) {
  const { lang, t } = useLang()
  const text = (section: string, key: string, fallback: string) =>
    contentText(lang === 'pt' ? sections[section] : {}, key, fallback)
  const image = (section: string, key: string, fallback: string) =>
    contentImage(sections[section], key, fallback)

  const prices = [
    {
      title: text('pricing', 'preco1_titulo', t.services.price1Title),
      value: text('pricing', 'preco1_valor', t.services.price1Value),
      unit: t.services.price1Unit,
      minimum: text('pricing', 'preco1_minimo', t.services.price1Min),
    },
    {
      title: text('pricing', 'preco2_titulo', t.services.price2Title),
      value: text('pricing', 'preco2_valor', t.services.price2Value),
      unit: t.services.price2Unit,
      minimum: text('pricing', 'preco2_minimo', t.services.price2Min),
    },
    {
      title: text('pricing', 'preco3_titulo', t.services.price3Title),
      value: text('pricing', 'preco3_valor', t.services.price3Value),
      unit: t.services.price3Unit,
      minimum: text('pricing', 'preco3_minimo', t.services.price3Min),
    },
    {
      title: text('pricing', 'preco4_titulo', t.services.price4Title),
      value: text('pricing', 'preco4_valor', t.services.price4Value),
      unit: t.services.price4Unit,
      minimum: text('pricing', 'preco4_minimo', t.services.price4Min),
    },
  ]

  const included = [
    text('included', 'item1', t.services.incl1),
    text('included', 'item2', t.services.incl2),
    text('included', 'item3', t.services.incl3),
    text('included', 'item4', t.services.incl4),
    text('included', 'item5', t.services.incl5),
  ]

  const additionalServices = [
    {
      title: text(
        'additional-services',
        'servico1_titulo',
        t.services.intlTitle
      ),
      description: text(
        'additional-services',
        'servico1_desc',
        t.services.intlDesc
      ),
      cta: t.services.intlCta,
      href: '/mudancas-internacionais',
      image: image(
        'additional-services',
        'imagem_internacional',
        '/images/client/moving-van-on-seafront-road.jpeg'
      ),
      alt: t.international.heroImageAlt,
      bg: 'white' as const,
    },
    {
      title: text(
        'additional-services',
        'servico2_titulo',
        t.services.packTitle
      ),
      description: text(
        'additional-services',
        'servico2_desc',
        t.services.packDesc
      ),
      cta: t.services.packCta,
      href: '/contacto',
      image: image(
        'additional-services',
        'imagem_embalagem',
        '/images/client/labelled-moving-boxes-inside-van.jpeg'
      ),
      alt: t.services.heroImageAlt,
      bg: 'light' as const,
    },
    {
      title: text(
        'additional-services',
        'servico3_titulo',
        t.services.storageTitle
      ),
      description: text(
        'additional-services',
        'servico3_desc',
        t.services.storageDesc
      ),
      cta: t.services.storageCta,
      href: '/contacto',
      image: image(
        'additional-services',
        'imagem_armazenamento',
        '/images/client/van-at-big-yellow-storage.jpeg'
      ),
      alt: t.services.storageTitle,
      bg: 'white' as const,
    },
  ]

  return (
    <>
      <InnerPageHero
        tag={text('hero', 'tag', t.services.heroTag)}
        title={text('hero', 'titulo', t.services.heroTitle)}
        subtitle={text('hero', 'subtitulo', t.services.heroSub)}
        image={image(
          'hero',
          'imagem_hero',
          '/images/client/labelled-moving-boxes-inside-van.jpeg'
        )}
        imageAlt={t.services.heroImageAlt}
      />

      <SectionWrapper id="man-and-van" bg="white">
        <SectionHeading
          tag={text('pricing', 'tag', t.services.manvanTag)}
          title={text('pricing', 'titulo', t.services.manvanTitle)}
          subtitle={text('pricing', 'descricao', t.services.manvanDesc)}
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
          {prices.map((price) => {
            const message = encodeURIComponent(
              `${t.whatsapp.message} ${price.title}`
            )
            const whatsappUrl = `https://wa.me/447796601194?text=${message}`

            return (
              <motion.article
                key={price.title}
                className="relative overflow-hidden rounded-card border border-[#e8e8e8] bg-white p-8"
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  borderColor: '#D91A2A',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-accent" />
                <h2 className="font-body text-base font-medium text-[#666]">
                  {price.title}
                </h2>
                <div className="mt-5 flex items-end gap-2">
                  <strong className="font-heading text-5xl font-black text-accent">
                    {price.value}
                  </strong>
                  <span className="pb-1 font-body text-sm text-[#999]">
                    {price.unit}
                  </span>
                </div>
                <span className="mt-5 inline-flex rounded-btn bg-light px-4 py-2 font-body text-xs font-medium text-primary">
                  {price.minimum}
                </span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 flex items-center gap-2 font-body text-sm font-medium text-accent transition-[gap] hover:gap-3"
                >
                  {t.services.priceCta}
                  <ArrowRight size={17} />
                </a>
              </motion.article>
            )
          })}
        </motion.div>

        <motion.div
          className="mt-14 rounded-card bg-light p-7 sm:p-9"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <h2 className="font-heading text-2xl font-bold text-primary">
            {text('included', 'titulo', t.services.inclTitle)}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {included.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 font-body text-[15px] leading-6 text-dark/75"
              >
                <CheckCircle2
                  size={21}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 font-body text-sm font-medium text-accent">
            {text('pricing', 'nota', t.services.manvanNote)}
          </p>
        </motion.div>
      </SectionWrapper>

      {additionalServices.map((service, index) => (
        <SectionWrapper
          key={service.title}
          bg={service.bg}
          className="!py-20"
        >
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              className={index % 2 === 1 ? 'lg:order-2' : ''}
              initial={{ opacity: 0, x: index % 2 === 1 ? 35 : -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <SectionHeading
                tag={t.services.additionalTag}
                title={service.title}
                subtitle={service.description}
                align="left"
              />
              <CTAButton href={service.href} variant="primary">
                {service.cta}
              </CTAButton>
            </motion.div>

            <motion.div
              className={`relative aspect-[4/3] overflow-hidden rounded-card shadow-[0_18px_45px_rgba(6,58,31,0.16)] ${
                index % 2 === 1 ? 'lg:order-1' : ''
              }`}
              initial={{ opacity: 0, x: index % 2 === 1 ? -35 : 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <Image
                src={service.image}
                alt={service.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </SectionWrapper>
      ))}

      <PageCTABanner
        title={t.services.ctaTitle}
        subtitle={t.services.ctaSub}
        button={t.services.ctaBtn}
        image="/images/pexels-packing.jpeg"
        imageAlt={t.services.heroImageAlt}
      />
    </>
  )
}
