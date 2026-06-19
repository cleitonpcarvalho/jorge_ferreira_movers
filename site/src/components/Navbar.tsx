'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { clsx } from 'clsx'
import { useLang } from '@/lib/i18n'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const pathname = usePathname()
  const { lang, setLang, t } = useLang()

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.services, href: '/servicos' },
    { label: t.nav.about, href: '/sobre-nos' },
    {
      label: t.nav.international,
      href: '/mudancas-internacionais',
    },
    { label: t.nav.contact, href: '/contacto' },
  ]

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 80)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === href : pathname.startsWith(href)

  const toggleLanguage = () => setLang(lang === 'pt' ? 'en' : 'pt')
  const quoteHref = lang === 'pt' ? '/contacto' : '/contact'

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ease-in-out',
        hasScrolled && 'shadow-[0_2px_20px_rgba(0,0,0,0.08)]'
      )}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8"
        aria-label="Navegação principal"
      >
        <Link
          href="/"
          className="relative z-10 shrink-0"
          aria-label="Jorge Ferreira Movers"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Jorge Ferreira Movers"
            width={239}
            height={48}
            className="h-auto w-[199px] sm:w-[239px]"
            style={{ height: 'auto' }}
            priority
            loading="eager"
          />
        </Link>

        <div className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'relative py-2 font-body text-sm font-medium text-dark transition-colors duration-300 hover:text-primary',
                'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:bg-primary after:transition-transform after:duration-300',
                isActive(link.href)
                  ? 'text-primary after:scale-x-100'
                  : 'after:scale-x-0 hover:after:scale-x-100'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-4 xl:flex">
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-btn border border-primary/20 px-4 py-2 font-body text-sm font-medium text-primary transition-colors hover:bg-light"
            aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
          >
            <span className={lang === 'pt' ? 'font-bold' : 'opacity-50'}>
              🇵🇹 PT
            </span>
            <span className="mx-2 text-dark/30">|</span>
            <span className={lang === 'en' ? 'font-bold' : 'opacity-50'}>
              🇬🇧 EN
            </span>
          </button>

          <Link
            href={quoteHref}
            className="rounded-btn bg-accent px-6 py-3 font-body text-sm font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg"
          >
            {t.nav.quote}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-full p-2 text-primary transition-colors hover:bg-light xl:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-dark/10 bg-white xl:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-5 lg:px-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'border-l-2 px-4 py-3 font-body text-base font-medium transition-colors',
                    isActive(link.href)
                      ? 'border-primary bg-light text-primary'
                      : 'border-transparent text-dark hover:border-primary hover:bg-light hover:text-primary'
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-3 border-t border-dark/10 pt-5 sm:flex-row">
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="rounded-btn border border-primary px-5 py-3 font-body font-medium text-primary transition-colors hover:bg-light"
                >
                  <span className={lang === 'pt' ? 'font-bold' : 'opacity-50'}>
                    🇵🇹 PT
                  </span>
                  <span className="mx-2 opacity-30">|</span>
                  <span className={lang === 'en' ? 'font-bold' : 'opacity-50'}>
                    🇬🇧 EN
                  </span>
                </button>

                <Link
                  href={quoteHref}
                  onClick={() => setIsOpen(false)}
                  className="rounded-btn bg-accent px-6 py-3 text-center font-body font-medium text-white transition-colors hover:bg-red-700"
                >
                  {t.nav.quote}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
