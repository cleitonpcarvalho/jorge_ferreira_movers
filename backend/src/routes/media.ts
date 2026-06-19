import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { pool } from '../db/pool'
import { requireAuth } from '../middleware/auth'

const router = Router()

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    const directory = path.resolve(process.env.UPLOAD_DIR ?? './uploads')
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }
    callback(null, directory)
  },
  filename: (_req, file, callback) => {
    const safeName = file.originalname
      .toLowerCase()
      .replace(/[^a-z0-9.\-_]/g, '-')
      .replace(/-+/g, '-')
    callback(null, safeName)
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE_MB ?? 10) * 1024 * 1024,
  },
})

router.get('/', async (req, res) => {
  const { category, q } = req.query
  let query = 'select * from media where 1=1'
  const params: unknown[] = []

  if (category) {
    params.push(category)
    query += ` and category = $${params.length}`
  }
  if (q) {
    params.push(`%${q}%`)
    query += ` and original_name ilike $${params.length}`
  }
  query += ' order by created_at desc'

  try {
    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch {
    res.status(500).json({ error: 'Erro ao carregar ficheiros' })
  }
})

router.post(
  '/upload',
  requireAuth,
  upload.single('file'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Ficheiro em falta' })
    }

    const { category = 'geral', alt_text = '' } = req.body
    const url = `${process.env.PUBLIC_URL}/uploads/${req.file.filename}`

    try {
      const result = await pool.query(
        'insert into media (filename, original_name, mime_type, size_bytes, url, alt_text, category) values ($1,$2,$3,$4,$5,$6,$7) returning *',
        [
          req.file.filename,
          req.file.originalname,
          req.file.mimetype,
          req.file.size,
          url,
          alt_text,
          category,
        ]
      )
      res.json(result.rows[0])
    } catch {
      res.status(500).json({ error: 'Erro ao guardar ficheiro' })
    }
  }
)

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('select * from media where id = $1', [
      req.params.id,
    ])
    const media = result.rows[0]
    if (!media) {
      return res.status(404).json({ error: 'Ficheiro nao encontrado' })
    }

    const filePath = path.resolve(
      process.env.UPLOAD_DIR ?? './uploads',
      media.filename
    )
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

    await pool.query('delete from media where id = $1', [req.params.id])
    res.json({ message: 'Ficheiro eliminado' })
  } catch {
    res.status(500).json({ error: 'Erro ao eliminar ficheiro' })
  }
})

export default router
