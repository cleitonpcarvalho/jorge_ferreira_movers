import { Router } from 'express'
import { pool } from '../db/pool'
import { requireAuth } from '../middleware/auth'
import { importClientImages } from '../services/importClientImages'
import fs from 'fs'
import path from 'path'

const router = Router()

function resolveSeedPath(filename: string) {
  const sourceSeedPath = path.resolve(process.cwd(), 'src/db/seeds', filename)
  const compiledSeedPath = path.resolve(__dirname, '../db/seeds', filename)
  return fs.existsSync(sourceSeedPath) ? sourceSeedPath : compiledSeedPath
}

interface SiteSettingRow {
  id: number
  key: string
  value: string | null
  label: string | null
  type: string
  group_name: string | null
}

router.get('/', async (_req, res) => {
  try {
    const result = await pool.query<Pick<SiteSettingRow, 'key' | 'value'>>(
      'select key, value from site_settings order by id'
    )
    const settings: Record<string, string | null> = {}
    result.rows.forEach((row) => {
      settings[row.key] = row.value
    })
    res.json(settings)
  } catch {
    res.status(500).json({ error: 'Erro ao carregar definicoes' })
  }
})

router.get('/grouped', requireAuth, async (_req, res) => {
  try {
    const result = await pool.query<SiteSettingRow>(
      'select * from site_settings order by group_name, id'
    )
    const groups: Record<string, SiteSettingRow[]> = {}
    result.rows.forEach((row) => {
      const groupName = row.group_name ?? 'outros'
      if (!groups[groupName]) groups[groupName] = []
      groups[groupName].push(row)
    })
    res.json(groups)
  } catch {
    res.status(500).json({ error: 'Erro ao carregar definicoes' })
  }
})

router.put('/:key', requireAuth, async (req, res) => {
  const { key } = req.params
  const { value } = req.body

  try {
    const result = await pool.query(
      'update site_settings set value = $1 where key = $2 returning key',
      [value, key]
    )
    if (!result.rowCount) {
      return res.status(404).json({ error: 'Definicao nao encontrada' })
    }
    res.json({ message: 'Definicao atualizada' })
  } catch {
    res.status(500).json({ error: 'Erro ao atualizar definicao' })
  }
})

router.put('/', requireAuth, async (req, res) => {
  const updates: Record<string, unknown> = req.body
  const entries = Object.entries(updates)
  const client = await pool.connect()

  try {
    await client.query('begin')
    for (const [key, value] of entries) {
      await client.query(
        'update site_settings set value = $1 where key = $2',
        [value, key]
      )
    }
    await client.query('commit')
    res.json({ message: `${entries.length} definicoes atualizadas` })
  } catch {
    await client.query('rollback')
    res.status(500).json({ error: 'Erro ao atualizar definicoes' })
  } finally {
    client.release()
  }
})

router.post('/publish', requireAuth, async (_req, res) => {
  res.json({ message: 'Publicado com sucesso', timestamp: new Date() })
})

router.post('/run-seeds', requireAuth, async (_req, res) => {
  try {
    const seedPath = resolveSeedPath('001_settings.sql')
    const sql = fs.readFileSync(seedPath, 'utf8')
    await pool.query(sql)
    res.json({ message: 'Seeds executados com sucesso' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    res.status(500).json({ error: message })
  }
})

router.post('/run-sections-seed', requireAuth, async (_req, res) => {
  try {
    const seedPath = resolveSeedPath('002_sections.sql')
    const sql = fs.readFileSync(seedPath, 'utf8')
    await pool.query(sql)
    res.json({ message: 'Secções inseridas com sucesso' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    res.status(500).json({ error: message })
  }
})

router.post('/import-client-images', requireAuth, async (_req, res) => {
  try {
    const result = await importClientImages()
    res.json({
      message: `${result.inserted} imagens importadas, ${result.skipped} ignoradas`,
      ...result,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    res.status(500).json({ error: message })
  }
})

router.post('/fix-media-urls', requireAuth, async (_req, res) => {
  try {
    const publicUrl = process.env.PUBLIC_URL!
    const result = await pool.query('select id, url from media')
    let fixed = 0

    for (const row of result.rows) {
      if (row.url && !row.url.startsWith(publicUrl)) {
        const filename = row.url.split('/uploads/')[1]
        if (filename) {
          const newUrl = `${publicUrl}/uploads/${filename}`
          await pool.query('update media set url = $1 where id = $2', [
            newUrl,
            row.id,
          ])
          fixed++
        }
      }
    }

    res.json({ message: `${fixed} URLs corrigidas` })
  } catch {
    res.status(500).json({ error: 'Erro ao corrigir URLs' })
  }
})

export default router
