'use client'

import { RefObject, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionWrapper from '@/components/SectionWrapper'
import { useLang } from '@/lib/i18n'
import { contentText } from '@/lib/contentValue'
import type { SectionContent } from '@/lib/getPageContent'

function useCountUp(target: number, duration = 2000) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let frame = 0
    const startedAt = performance.now()

    const tick = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * eased))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [duration, isInView, target])

  return { ref, count }
}

interface CountItemProps {
  target: number
  label: string
  prefix?: string
  suffix?: string
  index: number
}

function CountItem({
  target,
  label,
  prefix = '',
  suffix = '',
  index,
}: CountItemProps) {
  const { ref, count } = useCountUp(target)

  return (
    <motion.div
      ref={ref as RefObject<HTMLDivElement>}
      className="relative px-5 py-9 text-center md:py-10 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-white/20 sm:[&:not(:last-child)]:border-b-0 sm:[&:not(:last-child)]:border-r"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.55, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <strong className="block font-heading text-4xl font-black text-white md:text-5xl">
        {prefix}
        {count}
        {suffix}
      </strong>
      <span className="mt-2 block font-body text-sm text-white/70">
        {label}
      </span>
    </motion.div>
  )
}

interface Props {
  content?: SectionContent
}

function parseStat(value: string) {
  const number = Number(value.match(/\d+/)?.[0] ?? 0)
  return {
    target: number,
    prefix: value.trim().startsWith('+') ? '+' : '',
    suffix: value.includes('★') ? '★' : '',
  }
}

export default function TrustBar({ content = {} }: Props) {
  const { lang, t } = useLang()
  const c = lang === 'pt' ? content : {}

  const items = [
    {
      ...parseStat(contentText(c, 'anos', '+10')),
      label: contentText(c, 'anos_label', t.home.trustYearsLabel),
    },
    {
      ...parseStat(contentText(c, 'mudancas', '+500')),
      label: contentText(c, 'mudancas_label', t.home.trustMovesLabel),
    },
    {
      ...parseStat(contentText(c, 'paises', '2')),
      label: contentText(c, 'paises_label', t.home.trustCountriesLabel),
    },
    {
      ...parseStat(contentText(c, 'avaliacao', '5★')),
      label: contentText(c, 'avaliacao_label', t.home.trustRatingLabel),
    },
  ]

  return (
    <SectionWrapper id="confianca" bg="primary" className="!py-0">
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {items.map((item, index) => (
          <CountItem key={item.label} {...item} index={index} />
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
