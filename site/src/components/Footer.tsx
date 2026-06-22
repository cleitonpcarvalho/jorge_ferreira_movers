'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { useSettings } from '@/lib/useSettings'

const mapsUK = 'https://maps.app.goo.gl/rsZ4LnypTW7KRin18'
const mapsPT = 'https://maps.app.goo.gl/RAMQ4xXXL4LUrMWc9'

export default function Footer() {
  const { lang, t } = useLang()
  const { settings } = useSettings()
  const year = new Date().getFullYear()

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.services, href: '/servicos' },
    { label: t.nav.about, href: '/sobre-nos' },
    {
      label: t.nav.international,
      href: '/mudancas-internacionais',
    },
    { label: t.nav.personalOrganizer, href: '/personal-organizer' },
    { label: t.nav.limpeza, href: '/limpeza-pos-mudanca' },
    { label: t.nav.contact, href: '/contacto' },
  ]

  const phone = settings.contact_phone ?? '+44 7796 601194'
  const email =
    settings.contact_email ?? 'ferreiramovers.uk@gmail.com'
  const addressUK = settings.contact_address_uk ?? t.footer.addressUK
  const addressPT = settings.contact_address_pt ?? t.footer.addressPT
  const tagline =
    settings.site_tagline ??
    (lang === 'pt'
      ? 'Mudanças com Confiança, Portugal ao Reino Unido'
      : 'Trusted Moves Between Portugal and the United Kingdom')
  const description =
    lang === 'pt'
      ? 'Serviço de mudanças de confiança entre Portugal e o Reino Unido há mais de uma década.'
      : 'Trusted removal service between Portugal and the United Kingdom for over a decade.'

  return (
    <motion.footer
      className="bg-primary text-white"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 lg:px-8">
        <div>
          <Link href="/" aria-label="Jorge Ferreira Movers">
            <Image
              src="/logo.png"
              alt="Jorge Ferreira Movers"
              width={239}
              height={48}
              className="h-auto w-[239px] brightness-0 invert"
              style={{ height: 'auto' }}
            />
          </Link>
          <p className="mt-6 font-heading text-xl font-bold">{tagline}</p>
          <p className="mt-3 max-w-sm font-body text-sm leading-6 text-white/75">
            {description}
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold">
            {t.footer.quickLinks}
          </h2>
          <ul className="mt-6 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-white/80 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold">
            {t.footer.contactUs}
          </h2>
          <ul className="mt-6 space-y-4 font-body text-sm text-white/80">
            <li>
              <a
                href={settings.contact_maps_uk ?? mapsUK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors hover:text-accent"
              >
                <MapPin className="mt-0.5 shrink-0" size={18} />
                <span>{addressUK}</span>
              </a>
            </li>
            <li>
              <a
                href={settings.contact_maps_pt ?? mapsPT}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors hover:text-accent"
              >
                <MapPin className="mt-0.5 shrink-0" size={18} />
                <span>{addressPT}</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 transition-colors hover:text-accent"
              >
                <Phone className="shrink-0" size={18} />
                <span>
                  {t.footer.phone}: {phone}
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 transition-colors hover:text-accent"
              >
                <Mail className="shrink-0" size={18} />
                <span>
                  {t.footer.email}: {email}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-6 text-center font-body text-xs text-white/70 lg:flex-row lg:px-8 lg:text-left">
          <p>
            &copy; {year} Jorge Ferreira Movers. {t.footer.rights}.
          </p>

          <div className="flex items-center gap-3">
            <span>{t.footer.madeWith}</span>
            <a
              href="https://effectidea.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Effect Idea"
              className="transition-opacity hover:opacity-80"
            >
              <Image
                src="/effect-idea-dark.png"
                alt="Effect Idea"
                width={64}
                height={24}
                className="h-6 w-auto"
              />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link
              href="/politica-de-privacidade"
              className="underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/termos-de-uso"
              className="underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
