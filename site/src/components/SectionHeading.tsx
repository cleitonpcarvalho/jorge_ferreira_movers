'use client'

import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface Props {
  tag?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionHeading({
  tag,
  title,
  subtitle,
  align = 'center',
  light = false,
}: Props) {
  return (
    <motion.div
      className={clsx(
        'mb-12',
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'text-left'
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {tag && (
        <span className="mb-3 inline-block font-body text-sm font-medium uppercase tracking-[0.2em] text-accent">
          {tag}
        </span>
      )}

      <h2
        className={clsx(
          'whitespace-pre-line font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl',
          light ? 'text-white' : 'text-primary'
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={clsx(
            'mt-5 font-body text-base leading-7 sm:text-lg',
            light ? 'text-white/75' : 'text-dark/70'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
