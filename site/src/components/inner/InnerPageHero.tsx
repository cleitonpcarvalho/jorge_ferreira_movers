'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionWrapper from '@/components/SectionWrapper'

interface Props {
  tag: string
  title: string
  subtitle: string
  image?: string
  imageAlt?: string
}

export default function InnerPageHero({
  tag,
  title,
  subtitle,
  image,
  imageAlt = '',
}: Props) {
  return (
    <SectionWrapper className="relative min-h-[420px] overflow-hidden !py-0">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#063A1F_0%,#0a5c31_100%)]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_14px)]" />

      {image && (
        <motion.div
          className="absolute inset-y-0 right-0 hidden w-[42%] lg:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            loading="eager"
            sizes="42vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/55 to-transparent" />
        </motion.div>
      )}

      <div
        className={
          image
            ? 'relative z-10 flex min-h-[420px] max-w-3xl flex-col justify-center py-16 text-left'
            : 'relative z-10 mx-auto flex min-h-[420px] max-w-4xl flex-col items-center justify-center py-16 text-center'
        }
      >
        <motion.span
          className={`inline-flex rounded-btn bg-white/10 px-5 py-2 font-body text-xs font-medium uppercase tracking-[0.18em] text-white ring-1 ring-white/15 ${
            image ? 'self-start' : ''
          }`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {tag}
        </motion.span>
        <motion.h1
          className="mt-6 whitespace-pre-line font-heading text-4xl font-black leading-[1.02] text-white sm:text-5xl lg:text-[52px]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl font-body text-base leading-8 text-white/80 sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.55 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </SectionWrapper>
  )
}
