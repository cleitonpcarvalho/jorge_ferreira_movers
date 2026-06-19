import dotenv from 'dotenv'
import { pool } from '../db/pool'
import { importClientImages } from '../services/importClientImages'

dotenv.config()

async function run() {
  console.log('A importar imagens do cliente para a base de dados...')
  const result = await importClientImages()
  console.log(
    `Concluído: ${result.inserted} inseridas, ${result.skipped} ignoradas.`
  )
  await pool.end()
}

run().catch(async (error) => {
  console.error(error)
  await pool.end()
  process.exit(1)
})
