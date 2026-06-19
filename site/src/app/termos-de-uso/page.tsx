'use client'

import LegalDocument, {
  type LegalSection,
} from '@/components/inner/LegalDocument'
import { useLang } from '@/lib/i18n'

export default function TermsOfUsePage() {
  const { t } = useLang()

  const sections: LegalSection[] = [
    {
      id: 'aceitacao',
      title: t.terms.section1Title,
      paragraphs: [t.terms.section1P1, t.terms.section1P2],
    },
    {
      id: 'servicos',
      title: t.terms.section2Title,
      paragraphs: [t.terms.section2P1, t.terms.section2P2],
    },
    {
      id: 'reserva-pagamento',
      title: t.terms.section3Title,
      paragraphs: [t.terms.section3P1, t.terms.section3P2],
    },
    {
      id: 'responsabilidades-cliente',
      title: t.terms.section4Title,
      paragraphs: [t.terms.section4P1, t.terms.section4P2],
    },
    {
      id: 'bens-excluidos',
      title: t.terms.section5Title,
      paragraphs: [t.terms.section5P1, t.terms.section5P2],
    },
    {
      id: 'acesso-estacionamento',
      title: t.terms.section6Title,
      paragraphs: [t.terms.section6P1, t.terms.section6P2],
    },
    {
      id: 'embalagem',
      title: t.terms.section7Title,
      paragraphs: [t.terms.section7P1, t.terms.section7P2],
    },
    {
      id: 'seguro-responsabilidade',
      title: t.terms.section8Title,
      paragraphs: [t.terms.section8P1, t.terms.section8P2],
    },
    {
      id: 'atrasos',
      title: t.terms.section9Title,
      paragraphs: [t.terms.section9P1, t.terms.section9P2],
    },
    {
      id: 'cancelamentos',
      title: t.terms.section10Title,
      paragraphs: [t.terms.section10P1, t.terms.section10P2],
    },
    {
      id: 'reclamacoes',
      title: t.terms.section11Title,
      paragraphs: [t.terms.section11P1, t.terms.section11P2],
    },
    {
      id: 'site-propriedade',
      title: t.terms.section12Title,
      paragraphs: [t.terms.section12P1, t.terms.section12P2],
    },
    {
      id: 'privacidade',
      title: t.terms.section13Title,
      paragraphs: [t.terms.section13P1],
    },
    {
      id: 'lei-contacto',
      title: t.terms.section14Title,
      paragraphs: [t.terms.section14P1, t.terms.section14P2],
    },
  ]

  return (
    <LegalDocument
      heroTag={t.terms.heroTag}
      heroTitle={t.terms.heroTitle}
      heroSubtitle={t.terms.heroSub}
      documentTag={t.terms.documentTag}
      documentTitle={t.terms.documentTitle}
      documentIntro={t.terms.documentIntro}
      lastUpdatedLabel={t.terms.lastUpdatedLabel}
      lastUpdated={t.terms.lastUpdated}
      contentsTitle={t.terms.contentsTitle}
      sections={sections}
      questionTitle={t.terms.questionTitle}
      questionText={t.terms.questionText}
      questionButton={t.terms.questionBtn}
    />
  )
}
