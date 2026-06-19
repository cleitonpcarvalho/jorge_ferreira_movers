'use client'

import { MouseEvent, useMemo } from 'react'
import Image from 'next/image'
import { Globe, Shield, Star } from 'lucide-react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import CTAButton from '@/components/CTAButton'
import SectionWrapper from '@/components/SectionWrapper'
import { useLang } from '@/lib/i18n'
import { contentImage, contentText } from '@/lib/contentValue'
import type { SectionContent } from '@/lib/getPageContent'

interface Props {
  content?: SectionContent
}

export default function HeroSection({ content = {} }: Props) {
  const { lang, t } = useLang()
  const textContent = lang === 'pt' ? content : {}
  const heroTag = contentText(textContent, 'tag', t.home.heroTag)
  const heroTitle = contentText(textContent, 'titulo', t.home.heroTitle)
  const heroSubtitle = contentText(
    textContent,
    'subtitulo',
    t.home.heroSubtitle
  )
  const heroCta1 = contentText(
    textContent,
    'botao_orcamento',
    t.home.heroCta1
  )
  const heroCta2 = contentText(
    textContent,
    'botao_servicos',
    t.home.heroCta2
  )
  const principalImage = contentImage(
    content,
    'imagem_principal',
    '/images/client/van-loading-boxes-and-luggage.jpeg'
  )
  const secondaryImage = contentImage(
    content,
    'imagem_secundaria',
    '/images/client/movers-team-with-van-fleet.jpeg'
  )
  const reduceMotion = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5])
  const titleLines = useMemo(() => heroTitle.split('\n'), [heroTitle])

  const trustItems = [
    { icon: Globe, label: t.home.heroRoute },
    { icon: Shield, label: t.home.heroInsurance },
    { icon: Star, label: t.home.heroRating },
  ]

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    mouseX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    mouseY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  const resetTilt = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  let wordIndex = 0

  return (
    <SectionWrapper
      id="inicio"
      className="relative overflow-hidden !py-0"
      bg="white"
    >
      <motion.div
        className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-primary opacity-[0.05] blur-[100px]"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 30, -20, 0], y: [0, -20, 30, 0] }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden lg:block">
        <Image
          src="/images/pexels-hero-accent.jpeg"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover opacity-[0.045] mix-blend-multiply"
        />
      </div>

      <div className="relative z-10 grid min-h-[calc(100vh-5rem)] items-center gap-14 py-14 lg:grid-cols-[3fr_2fr] lg:gap-16 lg:py-16">
        <div>
          <motion.span
            className="inline-block max-w-full rounded-btn bg-primary/10 px-5 py-2 text-center font-body text-xs font-medium uppercase leading-5 tracking-[0.16em] text-primary sm:text-sm"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
          >
            {heroTag}
          </motion.span>

          <h1 className="mt-7 font-heading text-[clamp(3rem,6vw,4.25rem)] font-black leading-[0.98] tracking-[-0.035em] text-primary">
            {titleLines.map((line, lineIndex) => (
              <span key={`${line}-${lineIndex}`} className="block">
                {line.split(' ').map((word) => {
                  const delayIndex = wordIndex++
                  return (
                    <motion.span
                      key={`${word}-${delayIndex}`}
                      className="mr-[0.24em] inline-block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: delayIndex * 0.05,
                        duration: 0.4,
                        ease: 'easeOut',
                      }}
                    >
                      {word}
                    </motion.span>
                  )
                })}
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-2xl font-body text-base leading-8 text-[#4a4a4a] sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {heroSubtitle}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
          >
            <CTAButton href="/contacto" variant="primary">
              {heroCta1}
            </CTAButton>
            <CTAButton href="/servicos" variant="outline">
              {heroCta2}
            </CTAButton>
          </motion.div>

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-4 border-t border-dark/10 pt-6">
            {trustItems.map(({ icon: Icon, label }, index) => (
              <motion.div
                key={label}
                className="flex items-center gap-2 font-body text-sm font-medium text-dark/70"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.12, duration: 0.4 }}
              >
                <Icon size={18} className="text-accent" />
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-xl pb-12 pt-8 [perspective:1200px]"
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
        >
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-card shadow-[0_24px_70px_rgba(6,58,31,0.2)] sm:aspect-[5/6]"
            style={{
              rotateX: reduceMotion ? 0 : rotateX,
              rotateY: reduceMotion ? 0 : rotateY,
              transformStyle: 'preserve-3d',
            }}
          >
            <Image
              src={principalImage}
              alt={t.home.heroImageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 38vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            className="absolute -right-2 top-0 w-36 overflow-hidden rounded-card border-[3px] border-white shadow-xl sm:-right-8 sm:w-44"
            initial={{ opacity: 0, scale: 0.85, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ rotate: 0, scale: 1.04 }}
          >
            <Image
              src={secondaryImage}
              alt={t.home.teamImageAlt}
              width={440}
              height={330}
              sizes="176px"
              className="aspect-[4/3] w-full object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 rounded-card bg-primary px-6 py-5 text-white shadow-xl sm:-left-8"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5 }}
          >
            <strong className="block font-heading text-2xl font-black sm:text-3xl">
              {t.home.heroBadgeNumber}
            </strong>
            <span className="mt-1 block font-body text-xs text-white/75 sm:text-sm">
              {t.home.heroBadgeText}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
