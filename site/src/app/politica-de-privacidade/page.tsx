'use client'

import LegalDocument, {
  type LegalSection,
} from '@/components/inner/LegalDocument'
import { useLang } from '@/lib/i18n'

export default function PrivacyPolicyPage() {
  const { t } = useLang()

  const sections: LegalSection[] = [
    {
      id: 'responsavel',
      title: t.privacy.section1Title,
      paragraphs: [t.privacy.section1P1, t.privacy.section1P2],
    },
    {
      id: 'dados-recolhidos',
      title: t.privacy.section2Title,
      paragraphs: [t.privacy.section2P1],
      bullets: [
        t.privacy.section2B1,
        t.privacy.section2B2,
        t.privacy.section2B3,
        t.privacy.section2B4,
      ],
    },
    {
      id: 'finalidades',
      title: t.privacy.section3Title,
      paragraphs: [
        t.privacy.section3P1,
        t.privacy.section3P2,
        t.privacy.section3P3,
      ],
    },
    {
      id: 'partilha',
      title: t.privacy.section4Title,
      paragraphs: [t.privacy.section4P1, t.privacy.section4P2],
    },
    {
      id: 'transferencias',
      title: t.privacy.section5Title,
      paragraphs: [t.privacy.section5P1],
    },
    {
      id: 'conservacao',
      title: t.privacy.section6Title,
      paragraphs: [t.privacy.section6P1, t.privacy.section6P2],
    },
    {
      id: 'seguranca',
      title: t.privacy.section7Title,
      paragraphs: [t.privacy.section7P1],
    },
    {
      id: 'direitos',
      title: t.privacy.section8Title,
      paragraphs: [
        t.privacy.section8P1,
        t.privacy.section8P2,
        t.privacy.section8P3,
      ],
    },
    {
      id: 'cookies',
      title: t.privacy.section9Title,
      paragraphs: [t.privacy.section9P1, t.privacy.section9P2],
    },
    {
      id: 'reclamacoes',
      title: t.privacy.section10Title,
      paragraphs: [t.privacy.section10P1, t.privacy.section10P2],
    },
  ]

  return (
    <LegalDocument
      heroTag={t.privacy.heroTag}
      heroTitle={t.privacy.heroTitle}
      heroSubtitle={t.privacy.heroSub}
      documentTag={t.privacy.documentTag}
      documentTitle={t.privacy.documentTitle}
      documentIntro={t.privacy.documentIntro}
      lastUpdatedLabel={t.privacy.lastUpdatedLabel}
      lastUpdated={t.privacy.lastUpdated}
      contentsTitle={t.privacy.contentsTitle}
      sections={sections}
      questionTitle={t.privacy.questionTitle}
      questionText={t.privacy.questionText}
      questionButton={t.privacy.questionBtn}
    />
  )
}
