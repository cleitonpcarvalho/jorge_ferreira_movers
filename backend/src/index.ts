import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

import authRouter from './routes/auth'
import settingsRouter from './routes/settings'
import contentRouter from './routes/content'
import mediaRouter from './routes/media'
import emailRouter from './routes/email'

const app = express()
const PORT = process.env.PORT || 3001

app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') }))
app.use(express.json())
app.use(
  '/uploads',
  express.static(path.resolve(process.env.UPLOAD_DIR ?? './uploads'))
)

app.use('/api/auth', authRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/content', contentRouter)
app.use('/api/media', mediaRouter)
app.use('/api/email', emailRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', project: 'Jorge Ferreira Movers', timestamp: new Date() })
})

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})
