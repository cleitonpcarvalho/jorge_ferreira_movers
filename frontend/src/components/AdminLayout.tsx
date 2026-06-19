import { useState } from 'react'
import {
  ExternalLink,
  FileText,
  Image,
  LayoutDashboard,
  Loader2,
  Lock,
  LogOut,
  Menu,
  Settings2,
  Upload,
  X,
  type LucideIcon,
} from 'lucide-react'
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { api } from '@/lib/api'

interface NavigationItem {
  label: string
  href: string
  icon: LucideIcon
}

const navigation: NavigationItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  {
    label: 'Configurações',
    href: '/dashboard/configuracoes',
    icon: Settings2,
  },
  { label: 'Conteúdo', href: '/dashboard/conteudo', icon: FileText },
  { label: 'Média', href: '/dashboard/media', icon: Image },
  { label: 'Segurança', href: '/dashboard/seguranca', icon: Lock },
]

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/configuracoes': 'Configurações',
  '/dashboard/conteudo': 'Conteúdo',
  '/dashboard/media': 'Biblioteca de Média',
  '/dashboard/seguranca': 'Segurança',
}

function initials(name?: string) {
  if (!name) return 'JF'
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const title = pageTitles[location.pathname] ?? 'Painel Admin'
  const siteUrl = import.meta.env.VITE_SITE_URL ?? 'http://localhost:3000'

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  async function handlePublish() {
    setPublishing(true)
    try {
      const result = await api.publish()
      showToast(result.message || 'Alterações publicadas com sucesso.')
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : 'Não foi possível publicar as alterações.',
        'error',
      )
    } finally {
      setPublishing(false)
    }
  }

  const sidebar = (
    <aside className="flex h-full w-[260px] flex-col bg-[#0f2d1a] text-white">
      <div className="px-6 py-6">
        <img
          src="/logo.png"
          alt="Jorge Ferreira Movers"
          className="h-10 w-auto max-w-full brightness-0 invert"
        />
      </div>
      <div className="border-t border-white/10 px-5 pt-5">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
          Painel Admin
        </p>
      </div>

      <nav className="mt-4 flex-1 space-y-1 px-3">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/dashboard'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-r-lg border-l-[3px] px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'border-[#c9a84c] bg-white/[0.08] text-white'
                    : 'border-transparent text-white/70 hover:bg-white/[0.05] hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D91A2A] text-xs font-bold text-white">
            {initials(user?.name)}
          </span>
          <span className="min-w-0 flex-1">
            <strong className="block truncate text-sm font-medium text-white/90">
              {user?.name ?? 'Administrador'}
            </strong>
            <span className="block truncate text-xs text-white/45">
              {user?.email}
            </span>
          </span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
        >
          <LogOut size={17} />
          Sair
        </button>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        {sidebar}
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            className="absolute inset-0 bg-slate-950/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative h-full w-[260px] shadow-2xl">
            {sidebar}
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setSidebarOpen(false)}
              className="absolute right-3 top-3 rounded-lg bg-white/10 p-2 text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 lg:left-[260px] lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>
          <h1 className="truncate text-lg font-semibold text-[#063A1F]">
            {title}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-button-secondary px-3 sm:px-4"
          >
            <ExternalLink size={17} />
            <span className="hidden sm:inline">Ver Site</span>
          </a>
          <button
            type="button"
            onClick={handlePublish}
            disabled={publishing}
            className="admin-button-primary px-3 sm:px-4"
          >
            {publishing ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Upload size={17} />
            )}
            <span className="hidden sm:inline">
              {publishing ? 'A publicar...' : 'Publicar Alterações'}
            </span>
          </button>
        </div>
      </header>

      <main className="min-h-[calc(100vh-64px)] px-4 pb-10 pt-24 sm:px-6 lg:ml-[260px] lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
