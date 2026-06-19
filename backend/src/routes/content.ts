import { Router } from 'express'
import { pool } from '../db/pool'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.get('/pages', async (_req, res) => {
  try {
    const result = await pool.query(
      'select * from pages where is_active = true order by order_num, id'
    )
    res.json(result.rows)
  } catch {
    res.status(500).json({ error: 'Erro ao carregar páginas' })
  }
})

router.get('/pages/:slug', async (req, res) => {
  try {
    const pageResult = await pool.query(
      'select * from pages where slug = $1 and is_active = true',
      [req.params.slug]
    )
    if (!pageResult.rows[0]) {
      return res.status(404).json({ error: 'Página não encontrada' })
    }

    const page = pageResult.rows[0]
    const sections = await pool.query(
      'select * from sections where page_id = $1 and is_active = true order by order_num',
      [page.id]
    )
    res.json({ ...page, sections: sections.rows })
  } catch {
    res.status(500).json({ error: 'Erro ao carregar página' })
  }
})

router.put('/sections/:id', requireAuth, async (req, res) => {
  const { content, title } = req.body

  try {
    const result = await pool.query(
      'update sections set content = $1, title = $2, updated_at = now() where id = $3 returning id',
      [JSON.stringify(content), title, req.params.id]
    )
    if (!result.rowCount) {
      return res.status(404).json({ error: 'Secção não encontrada' })
    }
    res.json({ message: 'Secção atualizada' })
  } catch {
    res.status(500).json({ error: 'Erro ao atualizar secção' })
  }
})

export default router
