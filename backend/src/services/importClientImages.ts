import fs from 'fs'
import path from 'path'
import { pool } from '../db/pool'
import { clientImages } from '../data/clientImages'

interface ImportResult {
  inserted: number
  skipped: number
}

function getSiteBase() {
  const configured = process.env.SITE_PUBLIC_URL?.replace(/\/+$/, '')
  if (configured) return configured

  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'SITE_PUBLIC_URL deve estar configurado para importar imagens em produção'
    )
  }

  return 'http://localhost:3000'
}

function getLocalFileSize(filename: string) {
  const candidates = [
    path.resolve(process.cwd(), '../site/public/images/client', filename),
    path.resolve(process.cwd(), 'site/public/images/client', filename),
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return fs.statSync(candidate).size
  }

  return 0
}

export async function importClientImages(): Promise<ImportResult> {
  const siteBase = getSiteBase()
  let inserted = 0
  let skipped = 0

  for (const image of clientImages) {
    const existing = await pool.query(
      'select id from media where filename = $1',
      [image.filename]
    )

    if (existing.rowCount) {
      skipped++
      continue
    }

    await pool.query(
      `insert into media
        (filename, original_name, mime_type, size_bytes, url, alt_text, category)
       values ($1, $2, $3, $4, $5, $6, $7)`,
      [
        image.filename,
        image.filename,
        'image/jpeg',
        getLocalFileSize(image.filename),
        `${siteBase}/images/client/${image.filename}`,
        image.alt,
        image.category,
      ]
    )
    inserted++
  }

  return { inserted, skipped }
}
