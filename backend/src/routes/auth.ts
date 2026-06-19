import { Router, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../db/pool'
import { requireAuth, AuthRequest } from '../middleware/auth'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Credenciais em falta' })
  }

  try {
    const result = await pool.query(
      'select * from admin_users where email = $1',
      [email]
    )
    const user = result.rows[0]
    if (!user) {
      return res.status(401).json({ error: 'Credenciais invalidas' })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ error: 'Credenciais invalidas' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
    )

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    })
  } catch {
    res.status(500).json({ error: 'Erro interno' })
  }
})

router.post('/setup', async (_req, res) => {
  try {
    const count = await pool.query('select count(*) from admin_users')
    if (Number(count.rows[0].count) > 0) {
      return res.status(409).json({ error: 'Admin ja existe' })
    }

    const email = process.env.ADMIN_EMAIL!
    const password = process.env.ADMIN_PASSWORD!
    const hash = await bcrypt.hash(password, 12)

    await pool.query(
      'insert into admin_users (email, password, name) values ($1, $2, $3)',
      [email, hash, 'Jorge Ferreira']
    )

    res.json({ message: 'Admin criado com sucesso' })
  } catch {
    res.status(500).json({ error: 'Erro ao criar admin' })
  }
})

router.post(
  '/reset-password',
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    const { newPassword } = req.body
    if (!newPassword || newPassword.length < 8) {
      return res
        .status(400)
        .json({ error: 'Password deve ter pelo menos 8 caracteres' })
    }

    try {
      const hash = await bcrypt.hash(newPassword, 12)
      await pool.query(
        'update admin_users set password = $1 where id = $2',
        [hash, req.user!.id]
      )
      res.json({ message: 'Password atualizada' })
    } catch {
      res.status(500).json({ error: 'Erro ao atualizar password' })
    }
  }
)

export default router
