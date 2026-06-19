'use client'

import { FormEvent, ReactNode, useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import CTAButton from '@/components/CTAButton'
import SectionHeading from '@/components/SectionHeading'
import SectionWrapper from '@/components/SectionWrapper'
import { useLang } from '@/lib/i18n'
import { contentText } from '@/lib/contentValue'
import type { SectionsMap } from '@/lib/getPageContent'

const mapsUK = 'https://maps.app.goo.gl/rsZ4LnypTW7KRin18'
const mapsPT = 'https://maps.app.goo.gl/RAMQ4xXXL4LUrMWc9'
const whatsappHref =
  'https://wa.me/447796601194?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20um%20or%C3%A7amento.'
const ukMapEmbed =
  'https://www.google.com/maps?q=51.3826065,-0.1225427&z=17&output=embed'
const ptMapEmbed =
  'https://www.google.com/maps?q=39.691663,-8.8224467&z=17&output=embed'

interface InfoCardProps {
  icon: LucideIcon
  label: string
  href?: string
  external?: boolean
  children: ReactNode
}

function InfoCard({
  icon: Icon,
  label,
  href,
  external = false,
  children,
}: InfoCardProps) {
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-sm">
        <Icon size={20} />
      </span>
      <span>
        <strong className="block font-body text-sm font-semibold text-primary">
          {label}
        </strong>
        <span className="mt-1 block font-body text-sm leading-6 text-dark/70">
          {children}
        </span>
      </span>
    </>
  )

  const classes =
    'flex items-start gap-4 rounded-card border border-dark/5 bg-white/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_25px_rgba(6,58,31,0.08)]'

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
      >
        {content}
      </a>
    )
  }

  return <div className={classes}>{content}</div>
}

interface Props {
  sections?: SectionsMap
}

export default function ContactPageClient({ sections = {} }: Props) {
  const { lang, t } = useLang()
  const text = (section: string, key: string, fallback: string) =>
    contentText(lang === 'pt' ? sections[section] : {}, key, fallback)
  const contactPhone = text(
    'contact-info',
    'telefone',
    '+44 7796 601194'
  )
  const contactEmail = text(
    'contact-info',
    'email',
    'ferreiramovers.uk@gmail.com'
  )
  const addressUK = text(
    'contact-info',
    'morada_uk',
    t.footer.addressUK
  )
  const addressPT = text(
    'contact-info',
    'morada_pt',
    t.footer.addressPT
  )
  const openingHours = text(
    'contact-info',
    'horario',
    t.contact.hours
  )
  const openingHoursNote = text(
    'contact-info',
    'horario_nota',
    t.contact.hoursNote
  )
  const phoneHref = `tel:${contactPhone.replace(/[^\d+]/g, '')}`
  const emailHref = `mailto:${contactEmail}`
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [assunto, setAssunto] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError(false)

    const apiBase =
      process.env.NEXT_PUBLIC_ADMIN_API_BASE ?? 'http://localhost:3001'

    try {
      const response = await fetch(`${apiBase}/api/email/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, assunto, mensagem }),
      })

      if (response.status !== 200) {
        throw new Error(`Contact request failed with ${response.status}`)
      }

      setNome('')
      setEmail('')
      setAssunto('')
      setMensagem('')
      setSuccess(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const fieldClass =
    'w-full rounded-lg border-[1.5px] border-[#e0e0e0] bg-white px-4 py-3 font-body text-base text-dark outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-dark/35 focus:border-primary focus:shadow-[0_0_0_3px_rgba(6,58,31,0.1)]'
  const labelClass = 'mb-2 block font-body text-sm font-medium text-[#444]'

  return (
    <>
      <SectionWrapper className="relative min-h-[380px] overflow-hidden !py-0 [&>div]:max-w-none [&>div]:px-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#063A1F_0%,#0a5c31_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(217,26,42,0.14),transparent_30%)]" />
        <div className="relative z-10 mx-auto flex min-h-[380px] max-w-4xl flex-col items-center justify-center px-6 py-14 text-center">
          <motion.span
            className="inline-flex rounded-btn bg-white/10 px-5 py-2 font-body text-xs font-medium uppercase tracking-[0.18em] text-white ring-1 ring-white/15"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {text('hero', 'tag', t.contact.heroTag)}
          </motion.span>
          <motion.h1
            className="mt-6 whitespace-pre-line font-heading text-4xl font-black leading-[1.02] text-white sm:text-5xl lg:text-[52px]"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            {text('hero', 'titulo', t.contact.heroTitle)}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl font-body text-base leading-8 text-white/80 sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.5 }}
          >
            {text('hero', 'subtitulo', t.contact.heroSub)}
          </motion.p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="!py-0 [&>div]:max-w-none [&>div]:px-0">
        <div className="grid lg:grid-cols-[55%_45%]">
          <motion.div
            className="bg-white px-6 py-14 sm:px-10 lg:px-16 lg:py-16"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="mx-auto max-w-2xl">
              <h2 className="font-heading text-[28px] font-bold text-primary">
                {t.contact.formTitle}
              </h2>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="nome" className={labelClass}>
                    {t.contact.formName}
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    required
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    placeholder={t.contact.formNamePh}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    {t.contact.formEmail}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={t.contact.formEmailPh}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="assunto" className={labelClass}>
                    {t.contact.formSubject}
                  </label>
                  <input
                    id="assunto"
                    name="assunto"
                    type="text"
                    required
                    value={assunto}
                    onChange={(event) => setAssunto(event.target.value)}
                    placeholder={t.contact.formSubjectPh}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="mensagem" className={labelClass}>
                    {t.contact.formMessage}
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    value={mensagem}
                    onChange={(event) => setMensagem(event.target.value)}
                    placeholder={t.contact.formMsgPh}
                    className={`${fieldClass} min-h-[140px] resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-btn bg-accent px-8 py-3 font-body text-base font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0"
                >
                  {loading && <Loader2 size={19} className="animate-spin" />}
                  {t.contact.formBtn}
                </button>

                <AnimatePresence mode="wait">
                  {success && (
                    <motion.div
                      key="success"
                      role="status"
                      aria-live="polite"
                      className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 font-body text-sm leading-6 text-emerald-800"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                      <span>{t.contact.formSuccess}</span>
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      key="error"
                      role="alert"
                      className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 font-body text-sm leading-6 text-red-800"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <AlertCircle size={20} className="mt-0.5 shrink-0" />
                      <span>{t.contact.formError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          <motion.div
            className="bg-light px-6 py-14 sm:px-10 lg:px-16 lg:py-16"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="mx-auto max-w-xl">
              <span className="font-body text-xs font-medium uppercase tracking-[0.18em] text-accent">
                {t.contact.infoTag}
              </span>
              <h2 className="mt-2 font-heading text-2xl font-bold text-primary">
                {text('contact-info', 'titulo', t.contact.infoTitle)}
              </h2>

              <div className="mt-7 space-y-3.5">
                <InfoCard
                  icon={MapPin}
                  label={t.contact.ukOffice}
                  href={mapsUK}
                  external
                >
                  {addressUK}
                </InfoCard>
                <InfoCard
                  icon={MapPin}
                  label={t.contact.ptOffice}
                  href={mapsPT}
                  external
                >
                  {addressPT}
                </InfoCard>
                <InfoCard
                  icon={Phone}
                  label={t.contact.phone}
                  href={phoneHref}
                >
                  {contactPhone}
                </InfoCard>
                <InfoCard
                  icon={Mail}
                  label={t.contact.emailLabel}
                  href={emailHref}
                >
                  {contactEmail}
                </InfoCard>
                <InfoCard icon={Clock} label={t.contact.hoursTitle}>
                  {openingHours}
                  <em className="mt-1.5 block text-xs text-dark/50">
                    {openingHoursNote}
                  </em>
                </InfoCard>
              </div>

              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-btn bg-[#25D366] px-7 py-3.5 font-body font-medium text-white shadow-md transition-colors duration-300 hover:bg-[#1da851]"
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle size={20} />
                {t.contact.whatsappBtn}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="localizacoes" bg="white">
        <SectionHeading
          tag={t.contact.mapsTag}
          title={t.contact.mapsTitle}
          subtitle={t.contact.mapsSubtitle}
        />

        <motion.div
          className="grid gap-8 lg:grid-cols-2"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {[
            {
              label: t.contact.ukMapLabel,
              embed: ukMapEmbed,
              maps: mapsUK,
            },
            {
              label: t.contact.ptMapLabel,
              embed: ptMapEmbed,
              maps: mapsPT,
            },
          ].map((location) => (
            <motion.div
              key={location.label}
              className="overflow-hidden rounded-card bg-light p-4 shadow-card sm:p-5"
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h3 className="mb-4 font-heading text-xl font-bold text-primary">
                {location.label}
              </h3>
              <iframe
                src={location.embed}
                title={location.label}
                width="100%"
                height="400"
                className="h-[400px] w-full rounded-card border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <CTAButton
                href={location.maps}
                external
                variant="outline"
                className="mt-5"
              >
                <MapPin size={18} />
                {t.contact.openMaps}
              </CTAButton>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>
    </>
  )
}
