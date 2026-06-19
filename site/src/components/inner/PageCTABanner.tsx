'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import CTAButton from '@/components/CTAButton'
import SectionWrapper from '@/components/SectionWrapper'

interface Props {
  title: string
  subtitle: string
  button: string
  image: string
  imageAlt: string
  href?: string
}

export default function PageCTABanner({
  title,
  subtitle,
  button,
  image,
  imageAlt,
  href = '/contacto',
}: Props) {
  return (
    <SectionWrapper className="relative overflow-hidden !py-0" bg="dark">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,58,31,0.94)_0%,rgba(217,26,42,0.78)_100%)]" />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl py-20 text-center md:py-24"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="font-heading text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-7 text-white/80 sm:text-lg">
          {subtitle}
        </p>
        <div className="mt-8">
          <CTAButton href={href} variant="white">
            {button}
          </CTAButton>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
