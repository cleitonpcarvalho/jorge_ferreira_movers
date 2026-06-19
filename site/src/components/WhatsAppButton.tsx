'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/i18n'

export default function WhatsAppButton() {
  const { t } = useLang()
  const message = encodeURIComponent(t.whatsapp.message)
  const url = `https://wa.me/447796601194?text=${message}`

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar pelo WhatsApp"
      className="fixed bottom-8 right-8 z-[999] flex h-14 w-14 items-center justify-center rounded-full"
      style={{
        boxShadow:
          '0 0 0 3px rgba(37,211,102,0.3), 0 0 16px 4px rgba(37,211,102,0.25)',
        transition: 'box-shadow 0.3s ease-in-out',
      }}
      whileHover={{
        scale: 1.1,
        boxShadow:
          '0 0 0 4px rgba(37,211,102,0.5), 0 0 24px 8px rgba(37,211,102,0.4)',
      }}
      whileTap={{ scale: 0.96 }}
    >
      <Image
        src="/whatsapp-icon.png"
        alt=""
        width={56}
        height={56}
        className="h-14 w-14 rounded-full"
      />
    </motion.a>
  )
}
