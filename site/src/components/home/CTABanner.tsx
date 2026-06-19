'use client'

import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import CTAButton from '@/components/CTAButton'
import SectionWrapper from '@/components/SectionWrapper'
import { useLang } from '@/lib/i18n'
import { contentImage, contentText } from '@/lib/contentValue'
import type { SectionContent } from '@/lib/getPageContent'

interface Props {
  content?: SectionContent
}

export default function CTABanner({ content = {} }: Props) {
  const { lang, t } = useLang()
  const c = lang === 'pt' ? content : {}
  const backgroundImage = contentImage(
    content,
    'imagem_fundo',
    '/images/client/two-moving-vans-residential-road.jpeg'
  )
  const message = encodeURIComponent(t.whatsapp.message)
  const whatsappUrl = `https://wa.me/447796601194?text=${message}`

  return (
    <SectionWrapper
      id="orcamento"
      className="relative overflow-hidden !py-0"
      bg="dark"
    >
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={t.home.ctaBannerImageAlt}
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
          {contentText(c, 'titulo', t.home.ctaBannerTitle)}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-7 text-white/80 sm:text-lg">
          {contentText(c, 'subtitulo', t.home.ctaBannerSubtitle)}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CTAButton href="/contacto" variant="white">
            {contentText(c, 'botao_orcamento', t.home.ctaBannerCta1)}
          </CTAButton>
          <CTAButton
            href={whatsappUrl}
            variant="outline"
            external
            className="!border-white !text-white hover:!bg-white hover:!text-primary"
          >
            <MessageCircle size={19} />
            {contentText(c, 'botao_whatsapp', t.home.ctaBannerCta2)}
          </CTAButton>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
