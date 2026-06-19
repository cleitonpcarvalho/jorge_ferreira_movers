'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface Props {
  children: ReactNode
  className?: string
  bg?: 'white' | 'light' | 'primary' | 'dark'
  id?: string
}

const bgMap = {
  white: 'bg-white',
  light: 'bg-light',
  primary: 'bg-primary text-white',
  dark: 'bg-dark text-white',
}

export default function SectionWrapper({
  children,
  className,
  bg = 'white',
  id,
}: Props) {
  return (
    <motion.section
      id={id}
      className={clsx('scroll-mt-20 py-20 md:py-28', bgMap[bg], className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
    </motion.section>
  )
}
