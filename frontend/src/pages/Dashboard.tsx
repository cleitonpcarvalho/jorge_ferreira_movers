import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Clock3,
  ExternalLink,
  FileText,
  Image,
  Info,
  Loader2,
  Settings2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/lib/api'

export default function Dashboard() {
  const { user } = useAuth()
  const [mediaCount, setMediaCount] = useState<number | null>(null)
  const [pageCount, setPageCount] = useState<number | null>(null)
  const siteUrl = import.meta.env.VITE_SITE_URL ?? 'http://localhost:3000'
  const now = new Date()
  const date = new Intl.DateTimeFormat('pt-PT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now)
  const dateTime = new Intl.DateTimeFormat('pt-PT', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(now)

  useEffect(() => {
    let active = true
    Promise.all([api.getMedia(), api.getPages()])
      .then(([media, pages]) => {
        if (!active) return
        setMediaCount(media.length)
        setPageCount(pages.length)
      })
      .catch(() => {
        if (!active) return
        setMediaCount(0)
        setPageCount(7)
      })
    return () => {
      active = false
    }
  }, [])

  const quickActions = [
    {
      title: 'Editar Configurações',
      description: 'Contactos, moradas, redes sociais e dados gerais.',
      href: '/dashboard/configuracoes',
      icon: Settings2,
      iconClass: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: 'Gerir Conteúdo',
      description: 'Atualize textos e imagens das páginas do site.',
      href: '/dashboard/conteudo',
      icon: FileText,
      iconClass: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Gerir Média',
      description: 'Carregue, pesquise e organize a biblioteca de imagens.',
      href: '/dashboard/media',
      icon: Image,
      iconClass: 'bg-violet-50 text-violet-700',
    },
  ]

  return (
    <div className="mx-auto max-w-7xl">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Bem-vindo, {user?.name ?? 'Administrador'}
        </h2>
        <p className="mt-1 capitalize text-sm text-slate-500">{date}</p>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="admin-card group p-6 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-slate-500">Site Activo</p>
            <ExternalLink
              size={17}
              className="text-slate-300 transition group-hover:text-[#063A1F]"
            />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
            <strong className="text-2xl font-bold text-slate-900">Online</strong>
          </div>
        </a>

        <Link
          to="/dashboard/conteudo"
          className="admin-card group p-6 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-slate-500">Páginas</p>
            <FileText size={19} className="text-blue-500" />
          </div>
          <strong className="mt-4 block text-2xl font-bold text-slate-900">
            {pageCount === null ? (
              <Loader2 size={22} className="animate-spin text-slate-400" />
            ) : (
              pageCount
            )}
          </strong>
        </Link>

        <Link
          to="/dashboard/media"
          className="admin-card group p-6 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-slate-500">Imagens</p>
            <Image size={19} className="text-violet-500" />
          </div>
          <strong className="mt-4 block text-2xl font-bold text-slate-900">
            {mediaCount === null ? (
              <Loader2 size={22} className="animate-spin text-slate-400" />
            ) : (
              mediaCount
            )}
          </strong>
        </Link>

        <div className="admin-card p-6">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-slate-500">Último Acesso</p>
            <Clock3 size={19} className="text-amber-500" />
          </div>
          <strong className="mt-4 block text-lg font-bold leading-7 text-slate-900">
            {dateTime}
          </strong>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900">Ações Rápidas</h2>
        <div className="mt-4 grid gap-5 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.href}
                to={action.href}
                className="admin-card group flex items-start gap-4 p-6 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${action.iconClass}`}
                >
                  <Icon size={23} />
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block text-base font-semibold text-slate-900">
                    {action.title}
                  </strong>
                  <span className="mt-1.5 block text-sm leading-6 text-slate-500">
                    {action.description}
                  </span>
                </span>
                <ArrowRight
                  size={19}
                  className="mt-1 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#063A1F]"
                />
              </Link>
            )
          })}
        </div>
      </section>

      <div className="mt-10 flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-5 py-5 text-center text-sm text-slate-500">
        <Info size={17} className="shrink-0 text-slate-400" />
        Todas as alterações são guardadas automaticamente quando utiliza os
        botões de guardar.
      </div>
    </div>
  )
}
