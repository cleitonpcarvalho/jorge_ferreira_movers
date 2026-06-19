import { Router } from 'express'
import { Resend } from 'resend'

const router = Router()
const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

router.post('/contact', async (req, res) => {
  const { nome, email, assunto, mensagem } = req.body
  if (!nome || !email || !assunto || !mensagem) {
    return res
      .status(400)
      .json({ error: 'Todos os campos sao obrigatorios' })
  }

  try {
    await resend.emails.send({
      from: 'noreply@effectidea.com',
      to: process.env.RESEND_TO_EMAIL!,
      replyTo: email,
      subject: `Novo contacto do site - ${assunto}`,
      html: `
        <h2>Novo contacto do site</h2>
        <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Assunto:</strong> ${escapeHtml(assunto)}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${escapeHtml(mensagem).replace(/\n/g, '<br>')}</p>
      `,
    })
    res.json({ message: 'Email enviado com sucesso' })
  } catch (error) {
    const detail =
      error instanceof Error ? error.message : 'Erro desconhecido'
    res.status(500).json({ error: 'Erro ao enviar email', detail })
  }
})

export default router
