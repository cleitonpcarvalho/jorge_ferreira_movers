import { type FormEvent, useState } from 'react'
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function Login() {
  const { login, token } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (token) return <Navigate to="/dashboard" replace />

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim() || !password) {
      setError('Preencha o email e a password.')
      return
    }

    setLoading(true)
    setError('')
    try {
      await login(email.trim(), password)
      navigate('/dashboard', { replace: true })
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : 'Não foi possível iniciar sessão.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#063A1F] to-[#0a5c31] px-5 py-10">
      <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#D91A2A]/10 blur-3xl" />

      <section className="relative w-full max-w-[420px] rounded-2xl bg-white p-8 shadow-2xl sm:p-12">
        <div className="text-center">
          <img
            src="/logo.png"
            alt="Jorge Ferreira Movers"
            className="mx-auto h-auto w-full max-w-[260px]"
          />
          <p className="mt-5 text-sm font-medium text-slate-500">
            Painel de Administração
          </p>
        </div>

        <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="admin-label">
              Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="admin-input pl-11"
                placeholder="email@exemplo.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="admin-label">
              Password
            </label>
            <div className="relative">
              <LockKeyhole
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="admin-input px-11"
                placeholder="A sua password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label={
                  showPassword ? 'Ocultar password' : 'Mostrar password'
                }
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="admin-button-primary w-full py-3"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? 'A entrar...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs leading-5 text-slate-400">
          Acesso reservado à equipa Jorge Ferreira Movers.
        </p>
      </section>
    </main>
  )
}
