'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle2, ChevronDown, MapPin } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'
import SectionWrapper from '@/components/SectionWrapper'
import InnerPageHero from '@/components/inner/InnerPageHero'
import PageCTABanner from '@/components/inner/PageCTABanner'
import { useLang } from '@/lib/i18n'
import { contentImage, contentText } from '@/lib/contentValue'
import type { SectionsMap } from '@/lib/getPageContent'

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

interface Props {
  sections?: SectionsMap
}

export default function InternationalMovesPageClient({
  sections = {},
}: Props) {
  const { lang, t } = useLang()
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const text = (section: string, key: string, fallback: string) =>
    contentText(lang === 'pt' ? sections[section] : {}, key, fallback)
  const image = (section: string, key: string, fallback: string) =>
    contentImage(sections[section], key, fallback)

  const steps = [
    {
      title: text('how-it-works', 'passo1_titulo', t.international.step1Title),
      desc: text('how-it-works', 'passo1_desc', t.international.step1Desc),
    },
    {
      title: text('how-it-works', 'passo2_titulo', t.international.step2Title),
      desc: text('how-it-works', 'passo2_desc', t.international.step2Desc),
    },
    {
      title: text('how-it-works', 'passo3_titulo', t.international.step3Title),
      desc: text('how-it-works', 'passo3_desc', t.international.step3Desc),
    },
    {
      title: text('how-it-works', 'passo4_titulo', t.international.step4Title),
      desc: text('how-it-works', 'passo4_desc', t.international.step4Desc),
    },
  ]

  const transported = [
    text('what-we-move', 'item1', t.international.what1),
    text('what-we-move', 'item2', t.international.what2),
    text('what-we-move', 'item3', t.international.what3),
    text('what-we-move', 'item4', t.international.what4),
    text('what-we-move', 'item5', t.international.what5),
    text('what-we-move', 'item6', t.international.what6),
  ]

  const routes = [
    text('routes', 'rota1', t.international.route1),
    text('routes', 'rota2', t.international.route2),
    text('routes', 'rota3', t.international.route3),
    text('routes', 'rota4', t.international.route4),
    text('routes', 'rota5', t.international.route5),
  ]

  const faqs = [
    {
      question: text('faq', 'p1_pergunta', t.international.faq1q),
      answer: text('faq', 'p1_resposta', t.international.faq1a),
    },
    {
      question: text('faq', 'p2_pergunta', t.international.faq2q),
      answer: text('faq', 'p2_resposta', t.international.faq2a),
    },
    {
      question: text('faq', 'p3_pergunta', t.international.faq3q),
      answer: text('faq', 'p3_resposta', t.international.faq3a),
    },
    {
      question: text('faq', 'p4_pergunta', t.international.faq4q),
      answer: text('faq', 'p4_resposta', t.international.faq4a),
    },
  ]

  return (
    <>
      <InnerPageHero
        tag={text('hero', 'tag', t.international.heroTag)}
        title={text('hero', 'titulo', t.international.heroTitle)}
        subtitle={text('hero', 'subtitulo', t.international.heroSub)}
        image={image(
          'hero',
          'imagem_hero',
          '/images/client/moving-van-on-seafront-road.jpeg'
        )}
        imageAlt={t.international.heroImageAlt}
      />

      <SectionWrapper id="como-funciona" bg="white">
        <SectionHeading
          tag={text('how-it-works', 'tag', t.international.howTag)}
          title={text('how-it-works', 'titulo', t.international.howTitle)}
          subtitle={t.international.howSubtitle}
        />

        <motion.div
          className="relative grid gap-9 md:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden border-t-2 border-dashed border-accent/30 lg:block" />
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              className="relative z-10 text-center"
              variants={stepVariants}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent font-heading text-4xl font-black text-white shadow-lg">
                {index + 1}
              </div>
              <h2 className="mt-6 font-heading text-xl font-bold text-primary">
                {step.title.replace(/^\d+\.\s*/, '')}
              </h2>
              <p className="mt-3 font-body text-[15px] leading-6 text-[#555]">
                {step.desc}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper id="o-que-transportamos" bg="white">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <SectionHeading
              tag={text('what-we-move', 'tag', t.international.whatTag)}
              title={text('what-we-move', 'titulo', t.international.whatTitle)}
              subtitle={t.international.whatSubtitle}
              align="left"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {transported.map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-start gap-3 rounded-[10px] bg-light p-4"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  viewport={{ once: true, margin: '-40px' }}
                >
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span className="font-body text-sm leading-6 text-dark/75">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto h-[480px] w-full max-w-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="absolute left-0 top-0 h-[72%] w-[78%] overflow-hidden rounded-card shadow-xl">
              <Image
                src={image(
                  'what-we-move',
                  'imagem_principal',
                  '/images/client/wrapped-pallets-ready-for-transport.jpeg'
                )}
                alt={t.international.transportImageAlt}
                fill
                sizes="(max-width: 1024px) 75vw, 35vw"
                className="object-cover"
              />
            </div>
            <motion.div
              className="absolute bottom-0 right-0 h-[55%] w-[68%] overflow-hidden rounded-card border-4 border-white shadow-2xl"
              whileHover={{ y: -6, rotate: 0 }}
              initial={{ rotate: 2 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image(
                  'what-we-move',
                  'imagem_secundaria',
                  '/images/client/pallet-jack-loading-open-van.jpeg'
                )}
                alt={t.international.transportImageAlt}
                fill
                sizes="(max-width: 1024px) 65vw, 30vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="rotas" bg="light">
        <SectionHeading
          tag={text('routes', 'tag', t.international.routesTag)}
          title={text('routes', 'titulo', t.international.routesTitle)}
          subtitle={t.international.routesSubtitle}
        />
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {routes.map((route) => (
            <motion.div
              key={route}
              className="flex items-center gap-2 rounded-btn border border-primary/20 bg-white px-5 py-3 font-body text-sm font-medium text-primary transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
              variants={stepVariants}
              whileHover={{ y: -3 }}
            >
              <MapPin size={17} />
              <span>{route}</span>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper id="faq" bg="white">
        <SectionHeading
          tag={text('faq', 'tag', t.international.faqTag)}
          title={text('faq', 'titulo', t.international.faqTitle)}
          subtitle={t.international.faqSubtitle}
        />
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <div key={faq.question} className="border-b border-[#e8e8e8]">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-lg font-bold text-primary sm:text-xl">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-accent"
                  >
                    <ChevronDown size={24} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-6 font-body text-[15px] leading-7 text-dark/70">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>
      </SectionWrapper>

      <PageCTABanner
        title={t.international.ctaTitle}
        subtitle={t.international.ctaSub}
        button={t.international.ctaBtn}
        image="/images/client/two-van-fleet-parked.jpeg"
        imageAlt={t.international.heroImageAlt}
      />
    </>
  )
}
