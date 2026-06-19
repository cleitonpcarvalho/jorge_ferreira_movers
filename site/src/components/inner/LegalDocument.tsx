'use client'

import { ArrowRight, CalendarDays, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import CTAButton from '@/components/CTAButton'
import SectionHeading from '@/components/SectionHeading'
import SectionWrapper from '@/components/SectionWrapper'
import InnerPageHero from '@/components/inner/InnerPageHero'

export interface LegalSection {
  id: string
  title: string
  paragraphs: readonly string[]
  bullets?: readonly string[]
}

interface Props {
  heroTag: string
  heroTitle: string
  heroSubtitle: string
  documentTag: string
  documentTitle: string
  documentIntro: string
  lastUpdatedLabel: string
  lastUpdated: string
  contentsTitle: string
  sections: readonly LegalSection[]
  questionTitle: string
  questionText: string
  questionButton: string
}

export default function LegalDocument({
  heroTag,
  heroTitle,
  heroSubtitle,
  documentTag,
  documentTitle,
  documentIntro,
  lastUpdatedLabel,
  lastUpdated,
  contentsTitle,
  sections,
  questionTitle,
  questionText,
  questionButton,
}: Props) {
  return (
    <>
      <InnerPageHero
        tag={heroTag}
        title={heroTitle}
        subtitle={heroSubtitle}
      />

      <SectionWrapper bg="white">
        <SectionHeading
          tag={documentTag}
          title={documentTitle}
          subtitle={documentIntro}
        />

        <motion.div
          className="mx-auto mb-12 flex w-fit items-center gap-2 rounded-btn bg-light px-5 py-2.5 font-body text-sm text-dark/70"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
        >
          <CalendarDays size={17} className="text-accent" />
          <span>
            {lastUpdatedLabel}: <strong>{lastUpdated}</strong>
          </span>
        </motion.div>

        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[280px_minmax(0,1fr)]">
          <motion.aside
            className="rounded-card bg-light p-6 lg:sticky lg:top-28"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 className="font-heading text-xl font-bold text-primary">
              {contentsTitle}
            </h2>
            <nav className="mt-5" aria-label={contentsTitle}>
              <ol className="space-y-1.5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex items-start gap-2 rounded-lg px-3 py-2 font-body text-sm leading-5 text-dark/70 transition-colors hover:bg-white hover:text-primary"
                    >
                      <ArrowRight
                        size={15}
                        className="mt-0.5 shrink-0 text-accent transition-transform group-hover:translate-x-0.5"
                      />
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </motion.aside>

          <motion.div
            className="divide-y divide-dark/10"
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {sections.map((section) => (
              <motion.article
                id={section.id}
                key={section.id}
                className="scroll-mt-28 py-8 first:pt-0"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                <h2 className="font-heading text-2xl font-bold leading-tight text-primary sm:text-[28px]">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 font-body text-[16px] leading-8 text-[#4b4f4d]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-3 pt-1">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <CheckCircle2
                            size={19}
                            className="mt-1.5 shrink-0 text-accent"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="light" className="!py-16 md:!py-20">
        <motion.div
          className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-7 rounded-card bg-primary px-7 py-10 text-center shadow-[0_20px_50px_rgba(6,58,31,0.16)] md:flex-row md:px-10 md:text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div>
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              {questionTitle}
            </h2>
            <p className="mt-3 max-w-2xl font-body leading-7 text-white/75">
              {questionText}
            </p>
          </div>
          <CTAButton href="/contacto" variant="white" className="shrink-0">
            {questionButton}
            <ArrowRight size={18} />
          </CTAButton>
        </motion.div>
      </SectionWrapper>
    </>
  )
}
