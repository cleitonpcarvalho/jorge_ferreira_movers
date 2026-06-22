import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: {
    default: 'Jorge Ferreira Movers — Mudanças Portugal e Reino Unido',
    template: '%s | Jorge Ferreira Movers',
  },
  description:
    'Serviço profissional de mudanças internacionais e locais entre Portugal e o Reino Unido. Man and Van, 2 Men and Van, transporte de mobília e muito mais.',
  keywords: [
    'mudanças',
    'transportes',
    'portugal',
    'reino unido',
    'london',
    'man and van',
    'removals',
  ],
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    siteName: 'Jorge Ferreira Movers',
    title: 'Jorge Ferreira Movers — Mudanças Portugal e Reino Unido',
    description:
      'Mudanças internacionais e locais com confiança entre Portugal e o Reino Unido.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jorge Ferreira Movers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jorge Ferreira Movers — Mudanças Portugal e Reino Unido',
    description:
      'Mudanças internacionais e locais com confiança entre Portugal e o Reino Unido.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <LangProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-[116px]">{children}</main>
            <Footer />
            <WhatsAppButton />
          </div>
        </LangProvider>
      </body>
    </html>
  )
}
