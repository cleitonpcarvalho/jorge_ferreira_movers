'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface Props {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'white'
  external?: boolean
  className?: string
  onClick?: () => void
}

export default function CTAButton({
  href,
  children,
  variant = 'primary',
  external = false,
  className,
  onClick,
}: Props) {
  const base =
    'inline-flex items-center gap-2 px-8 py-3 rounded-btn font-body font-medium text-base transition-all duration-300 ease-in-out'

  const variants = {
    primary:
      'bg-accent text-white hover:bg-red-700 shadow-md hover:shadow-lg hover:-translate-y-0.5',
    outline:
      'border-2 border-accent text-accent hover:bg-accent hover:text-white',
    white:
      'bg-white text-primary hover:bg-light shadow-md hover:shadow-lg hover:-translate-y-0.5',
  }

  const classes = clsx(base, variants[variant], className)

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.div className="inline-flex" whileTap={{ scale: 0.98 }}>
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    </motion.div>
  )
}
