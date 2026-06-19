import { type FormEvent, useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react'
import { api } from '@/lib/api'

export default function Security() {
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSuccess('')
    setError('')

    if (password.length < 8) {
      setError('A password deve ter pelo menos 8 caracteres.')
      return
    }
    if (password !== confirmation) {
      setError('As passwords não coincidem.')
      return
    }

    setLoading(true)
    try {
      await api.resetPassword(password)
      setPassword('')
      setConfirmation('')
      setSuccess('Password alterada com sucesso.')
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Não foi possível alterar a password.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#063A1F]">
          <ShieldCheck size={28} />
        </span>
        <h2 className="mt-5 text-2xl font-bold text-slate-900">Segurança</h2>
        <p className="mt-1 text-sm text-slate-500">
          Mantenha os dados de acesso ao painel protegidos.
        </p>
      </div>

      <section className="admin-card mt-8 p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-slate-900">
          Alterar Password
        </h3>
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="new-password" className="admin-label">
              Nova Password
            </label>
            <div className="relative">
              <LockKeyhole
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="admin-input px-11"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                aria-label={
                  showPassword ? 'Ocultar password' : 'Mostrar password'
                }
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Mínimo de 8 caracteres.
            </p>
          </div>

          <div>
            <label htmlFor="confirm-password" className="admin-label">
              Confirmar Password
            </label>
            <input
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              className="admin-input"
              required
              minLength={8}
            />
          </div>

          {success && (
            <div
              role="status"
              className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
            >
              <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
              {success}
            </div>
          )}
          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <AlertCircle size={19} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="admin-button-primary w-full"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? 'A alterar...' : 'Alterar Password'}
          </button>
        </form>
      </section>

      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm leading-6 text-blue-800">
        <strong className="block">Email de acesso</strong>
        ferreiramovers.uk@gmail.com
        <p className="mt-2 text-blue-700/80">
          Para alterar o email de acesso, contacte o suporte técnico.
        </p>
      </div>
    </div>
  )
}
