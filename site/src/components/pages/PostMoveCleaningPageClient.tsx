'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Home,
  MessageCircle,
  Shield,
  Sparkles,
  Zap,
  ZoomIn,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import CTAButton from '@/components/CTAButton'
import SectionHeading from '@/components/SectionHeading'
import SectionWrapper from '@/components/SectionWrapper'
import { contentText } from '@/lib/contentValue'
import type { SectionsMap } from '@/lib/getPageContent'
import { useLang } from '@/lib/i18n'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

interface Props {
  sections?: SectionsMap
}

const preMoveItems = [
  'Limpeza profunda de todas as divisões',
  'Higienização de casas de banho e cozinha',
  'Limpeza de janelas, vidros e caixilhos',
  'Aspiração e lavagem de pavimentos',
  'Remoção de resíduos da obra ou mudança anterior',
]

const postMoveItems = [
  'Limpeza geral para devolução do imóvel',
  'Remoção de resíduos e objectos deixados',
  'Limpeza de marcas nas paredes e rodapés',
  'Higienização completa de casas de banho',
  'Preparação do imóvel para nova visita ou arrendamento',
]

const benefits: Benefit[] = [
  {
    icon: Zap,
    title: 'Rapidez e Eficiência',
    description:
      'Equipa treinada que executa o trabalho no menor tempo possível, sem comprometer a qualidade.',
  },
  {
    icon: Shield,
    title: 'Produtos Certificados',
    description:
      'Utilizamos produtos de limpeza profissionais, seguros para crianças, animais e o meio ambiente.',
  },
  {
    icon: BadgeCheck,
    title: 'Resultado Garantido',
    description:
      'Se não ficou perfeito, voltamos. A sua satisfação é a nossa prioridade.',
  },
  {
    icon: Calendar,
    title: 'Agendamento Flexível',
    description:
      'Disponível em qualquer dia, incluindo fins de semana e feriados. Adaptamo-nos ao seu calendário.',
  },
]

const cleaningImages = [
  {
    src: '/images/limpeza/clean-empty-apartment.jpeg',
    alt: 'Apartamento vazio, luminoso e impecavelmente limpo',
  },
  {
    src: '/images/limpeza/professional-cleaning-room.jpeg',
    alt: 'Profissional a limpar uma sala luminosa',
  },
  {
    src: '/images/limpeza/clean-kitchen-apartment.jpeg',
    alt: 'Cozinha de apartamento limpa e pronta a usar',
  },
  {
    src: '/images/limpeza/clean-living-room.jpeg',
    alt: 'Sala vazia com pavimento limpo e luz natural',
  },
  {
    src: '/images/limpeza/clean-bathroom.jpeg',
    alt: 'Apartamento vazio com casa de banho higienizada',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function PostMoveCleaningPageClient({
  sections = {},
}: Props) {
  const { lang } = useLang()
  const contactHref = lang === 'pt' ? '/contacto' : '/contact'
  const heroContent = lang === 'pt' ? sections.hero : {}
  const whatsappUrl =
    'https://wa.me/447796601194?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20servi%C3%A7o%20de%20Limpeza%20P%C3%B3s%20Mudan%C3%A7a.'

  return (
    <>
      <SectionWrapper className="relative min-h-[420px] overflow-hidden !py-0">
        <div className="absolute inset-0">
          <Image
            src={cleaningImages[0].src}
            alt={cleaningImages[0].alt}
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[rgba(6,58,31,0.82)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_14px)]" />
        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-4xl flex-col items-center justify-center py-16 text-center">
          <motion.span
            className="inline-flex rounded-btn bg-white/10 px-5 py-2 font-body text-xs font-medium uppercase tracking-[0.18em] text-white ring-1 ring-white/15"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {contentText(heroContent, 'tag', 'Limpeza Profissional')}
          </motion.span>
          <motion.h1
            className="mt-6 font-heading text-4xl font-black leading-[1.02] text-white sm:text-5xl lg:text-[52px]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            {contentText(
              heroContent,
              'titulo',
              'A Sua Nova Casa, Impecável Desde o Primeiro Dia.'
            )}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-3xl font-body text-base leading-8 text-white/85 sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.55 }}
          >
            {contentText(
              heroContent,
              'subtitulo',
              'Antes de entrar ou depois de sair — a nossa equipa de limpeza pós mudança deixa cada divisão brilhante, higienizada e pronta a receber a sua vida.'
            )}
          </motion.p>
        </div>
      </SectionWrapper>

      <SectionWrapper id="servicos-limpeza" bg="white">
        <div className="grid gap-7 lg:grid-cols-2">
          <motion.article
            className="rounded-card bg-primary p-8 text-white sm:p-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <Sparkles size={36} strokeWidth={1.8} />
            <h2 className="mt-6 font-heading text-3xl font-bold">
              Limpeza Pré-Entrada
            </h2>
            <p className="mt-3 font-body text-[15px] leading-6 text-white/75">
              Para receber a sua nova casa nas melhores condições
            </p>
            <ul className="mt-7 space-y-4">
              {preMoveItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-body text-[15px] leading-6 text-white/90"
                >
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={contactHref}
              className="mt-8 inline-block font-body font-medium text-white underline-offset-4 hover:underline"
            >
              Pedir Orçamento →
            </Link>
          </motion.article>

          <motion.article
            className="rounded-card border-2 border-primary bg-white p-8 text-primary sm:p-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <Home size={36} strokeWidth={1.8} />
            <h2 className="mt-6 font-heading text-3xl font-bold">
              Limpeza Pós-Saída
            </h2>
            <p className="mt-3 font-body text-[15px] leading-6 text-dark/65">
              Deixe o espaço anterior em perfeitas condições
            </p>
            <ul className="mt-7 space-y-4">
              {postMoveItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-body text-[15px] leading-6 text-dark/80"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={contactHref}
              className="mt-8 inline-block font-body font-medium text-accent underline-offset-4 hover:underline"
            >
              Pedir Orçamento →
            </Link>
          </motion.article>
        </div>
      </SectionWrapper>

      <SectionWrapper id="porque-escolher" bg="light">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <SectionHeading
              tag="Porque Escolher-nos"
              title="Limpeza Profissional é Diferente"
              align="left"
            />
            <div className="space-y-5">
              {benefits.map(({ icon: Icon, title, description }, index) => (
                <motion.div
                  key={title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.45 }}
                  viewport={{ once: true, margin: '-40px' }}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-card">
                    <Icon size={22} strokeWidth={1.9} />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-primary">
                      {title}
                    </h2>
                    <p className="mt-1 font-body text-[15px] leading-6 text-[#555]">
                      {description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-9">
              <CTAButton href={contactHref} variant="primary">
                Agendar Limpeza
              </CTAButton>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto h-[500px] w-full max-w-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="absolute left-0 top-0 h-[66%] w-[78%] overflow-hidden rounded-card shadow-md">
              <Image
                src={cleaningImages[1].src}
                alt={cleaningImages[1].alt}
                fill
                sizes="(max-width: 1024px) 78vw, 39vw"
                className="object-cover"
              />
            </div>
            <motion.div
              className="absolute bottom-0 right-0 h-[58%] w-[70%] overflow-hidden rounded-card border-4 border-light shadow-md"
              initial={{ rotate: 2 }}
              whileHover={{ y: -6, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={cleaningImages[2].src}
                alt={cleaningImages[2].alt}
                fill
                sizes="(max-width: 1024px) 70vw, 35vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="resultados-limpeza" bg="white">
        <SectionHeading tag="Resultados Reais" title="Espaços Transformados" />
        <motion.div
          className="-mx-6 flex snap-x gap-5 overflow-x-auto px-6 pb-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {cleaningImages.map((image) => (
            <motion.div
              key={image.src}
              className="group relative aspect-video min-w-[82vw] snap-center overflow-hidden rounded-card sm:min-w-[48vw] lg:min-w-0"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 82vw, (max-width: 1024px) 48vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-primary/65"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ZoomIn size={32} className="text-white" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper className="relative overflow-hidden !py-0" bg="dark">
        <div className="absolute inset-0">
          <Image
            src="/images/limpeza/clean-living-room.jpeg"
            alt="Sala vazia, limpa e pronta para uma nova mudança"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,58,31,0.90)_0%,rgba(217,26,42,0.72)_100%)]" />
        <motion.div
          className="relative z-10 mx-auto max-w-4xl py-20 text-center md:py-24"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="font-heading text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            A Sua Casa Merece um Começo Impecável.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-7 text-white/80 sm:text-lg">
            Contacte-nos hoje e receba um orçamento gratuito para limpeza pós
            mudança.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href={contactHref} variant="white">
              Pedir Orçamento Gratuito
            </CTAButton>
            <CTAButton
              href={whatsappUrl}
              variant="outline"
              external
              className="!border-white !text-white hover:!bg-white hover:!text-primary"
            >
              <MessageCircle size={19} />
              Falar no WhatsApp
            </CTAButton>
          </div>
        </motion.div>
      </SectionWrapper>
    </>
  )
}
