'use client'

import Image from 'next/image'
import { ZoomIn } from 'lucide-react'
import { motion } from 'framer-motion'
import CTAButton from '@/components/CTAButton'
import SectionHeading from '@/components/SectionHeading'
import SectionWrapper from '@/components/SectionWrapper'
import { useLang } from '@/lib/i18n'
import { contentText } from '@/lib/contentValue'
import type { SectionContent } from '@/lib/getPageContent'

interface Props {
  content?: SectionContent
}

const FALLBACK_IMAGES = [
  '/images/client/branded-van-roadside-profile.jpeg',
  '/images/client/tail-lift-van-residential-driveway.jpeg',
  '/images/client/two-moving-vans-residential-road.jpeg',
  '/images/client/labelled-moving-boxes-inside-van.jpeg',
  '/images/client/van-at-self-storage-entrance.jpeg',
  '/images/client/hand-trolley-boxes-by-open-van.jpeg',
  '/images/client/moving-van-on-seafront-road.jpeg',
  '/images/client/wrapped-pallet-on-pallet-jack.jpeg',
  '/images/client/branded-van-under-trees.jpeg',
]

export default function GallerySection({ content = {} }: Props) {
  const { lang, t } = useLang()
  const c = lang === 'pt' ? content : {}

  const galleryImages = FALLBACK_IMAGES.map((fallback, i) => {
    const key = `imagem_${i + 1}` as keyof typeof content
    const src = (content[key] as string | undefined) || fallback
    return { src, width: 800, height: 600 }
  })

  return (
    <SectionWrapper id="galeria" bg="primary">
      <SectionHeading
        tag={contentText(c, 'tag', t.home.galleryTag)}
        title={contentText(c, 'titulo', t.home.galleryTitle)}
        subtitle={contentText(c, 'subtitulo', t.home.gallerySubtitle)}
        light
      />

      <motion.div
        className="columns-1 gap-4 sm:columns-2 lg:columns-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.src}
            className="group relative mb-4 break-inside-avoid overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{
              opacity: { delay: index * 0.08, duration: 0.45 },
              y: { delay: index * 0.08, duration: 0.45 },
              scale: { duration: 0.3, ease: 'easeOut' },
            }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <Image
              src={image.src}
              alt={`${t.home.galleryImageAlt} ${index + 1}`}
              width={image.width}
              height={image.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-[rgba(6,58,31,0.65)]"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ZoomIn size={32} className="text-white" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-60px' }}
      >
        <CTAButton href="/contacto" variant="white">
          {t.home.galleryCta}
        </CTAButton>
      </motion.div>
    </SectionWrapper>
  )
}
