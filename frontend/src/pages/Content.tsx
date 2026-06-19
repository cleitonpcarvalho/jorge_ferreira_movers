import { useEffect, useState } from 'react'
import {
  ChevronDown,
  FileText,
  ImageOff,
  Loader2,
  Save,
} from 'lucide-react'
import MediaPicker from '@/components/MediaPicker'
import { useToast } from '@/context/ToastContext'
import {
  api,
  type ContentPage,
  type ContentPageDetail,
  type ContentSection,
} from '@/lib/api'

function formatLabel(key: string) {
  const labels: Record<string, string> = {
    avaliacao: 'Avaliação',
    botao: 'Botão',
    descricao: 'Descrição',
    horario: 'Horário',
    minimo: 'Mínimo',
    mudancas: 'Mudanças',
    orcamento: 'Orçamento',
    paises: 'Países',
    paragrafo: 'Parágrafo',
    preco: 'Preço',
    servico: 'Serviço',
    servicos: 'Serviços',
    subtitulo: 'Subtítulo',
    titulo: 'Título',
  }

  return key
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .split('_')
    .map((token) => {
      const match = token.match(/^([a-z]+)(\d*)$/i)
      if (!match) return token
      const [, word, number] = match
      const translated =
        labels[word.toLowerCase()] ??
        `${word.charAt(0).toUpperCase()}${word.slice(1)}`
      return number ? `${translated} ${number}` : translated
    })
    .join(' ')
}

function isImageField(key: string) {
  const normalized = key.toLowerCase()
  return ['image', 'img', 'photo', 'src'].some((part) =>
    normalized.includes(part),
  )
}

function isLongText(key: string, value: unknown) {
  const normalized = key.toLowerCase()
  return (
    String(value ?? '').length > 80 ||
    ['desc', 'text', 'content', 'subtitle', 'paragraph'].some((part) =>
      normalized.includes(part),
    )
  )
}

function isValidUrl(value: unknown) {
  return (
    typeof value === 'string' &&
    (value.startsWith('/') ||
      value.startsWith('http://') ||
      value.startsWith('https://'))
  )
}

function imagePreviewSrc(value: unknown) {
  if (typeof value !== 'string') return ''
  if (value.startsWith('/')) {
    const siteUrl = import.meta.env.VITE_SITE_URL ?? 'http://localhost:3000'
    return `${siteUrl.replace(/\/+$/, '')}${value}`
  }
  return value
}

function displayValue(value: unknown) {
  if (typeof value === 'string') return value
  if (value === null || value === undefined) return ''
  return typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)
}

interface SectionEditorProps {
  section: ContentSection
}

function SectionEditor({ section }: SectionEditorProps) {
  const { showToast } = useToast()
  const [open, setOpen] = useState(true)
  const [content, setContent] = useState<Record<string, unknown>>(
    section.content ?? {},
  )
  const [saving, setSaving] = useState(false)
  const [pickerKey, setPickerKey] = useState<string | null>(null)

  async function saveSection() {
    setSaving(true)
    try {
      const result = await api.updateSection(section.id, {
        content,
        title: section.title,
      })
      showToast(result.message || 'Secção guardada com sucesso.')
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : 'Não foi possível guardar a secção.',
        'error',
      )
    } finally {
      setSaving(false)
    }
  }

  const entries = Object.entries(content)

  return (
    <article className="admin-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 sm:px-6"
        aria-expanded={open}
      >
        <span>
          <strong className="block text-sm font-semibold text-slate-900">
            {section.title || section.slug}
          </strong>
          <span className="mt-1 block text-xs text-slate-400">
            {section.slug}
          </span>
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-slate-400 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-slate-100 p-5 sm:p-6">
          {entries.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 px-5 py-8 text-center text-sm text-slate-500">
              Esta secção ainda não tem campos editáveis.
            </div>
          ) : (
            <div className="space-y-5">
              {entries.map(([key, value]) => (
                <div key={key}>
                  <label htmlFor={`${section.id}-${key}`} className="admin-label">
                    {formatLabel(key)}
                  </label>

                  {isImageField(key) ? (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex h-24 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-200 sm:w-36">
                          {isValidUrl(value) ? (
                            <img
                              src={imagePreviewSrc(value)}
                              alt=""
                              className="h-full w-full object-cover"
                              onError={(event) => {
                                event.currentTarget.style.display = 'none'
                              }}
                            />
                          ) : (
                            <div className="text-center text-slate-400">
                              <ImageOff className="mx-auto" size={24} />
                              <span className="mt-1 block text-xs">
                                Sem imagem
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => setPickerKey(key)}
                            className="admin-button-secondary"
                          >
                            Substituir Imagem
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : isLongText(key, value) ? (
                    <textarea
                      id={`${section.id}-${key}`}
                      value={displayValue(value)}
                      onChange={(event) =>
                        setContent((current) => ({
                          ...current,
                          [key]: event.target.value,
                        }))
                      }
                      rows={5}
                      className="admin-input resize-y"
                    />
                  ) : (
                    <input
                      id={`${section.id}-${key}`}
                      type="text"
                      value={displayValue(value)}
                      onChange={(event) =>
                        setContent((current) => ({
                          ...current,
                          [key]: event.target.value,
                        }))
                      }
                      className="admin-input"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={saveSection}
            disabled={saving}
            className="admin-button-primary mt-6 w-full"
          >
            {saving ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Save size={17} />
            )}
            {saving ? 'A guardar...' : 'Guardar Secção'}
          </button>
        </div>
      )}

      <MediaPicker
        open={pickerKey !== null}
        onClose={() => setPickerKey(null)}
        onSelect={(url) => {
          if (!pickerKey) return
          setContent((current) => ({ ...current, [pickerKey]: url }))
        }}
      />
    </article>
  )
}

export default function Content() {
  const { showToast } = useToast()
  const [pages, setPages] = useState<ContentPage[]>([])
  const [selectedSlug, setSelectedSlug] = useState('')
  const [pageDetail, setPageDetail] = useState<ContentPageDetail | null>(null)
  const [loadingPages, setLoadingPages] = useState(true)
  const [loadingPage, setLoadingPage] = useState(false)

  useEffect(() => {
    api
      .getPages()
      .then(setPages)
      .catch((error: unknown) =>
        showToast(
          error instanceof Error
            ? error.message
            : 'Não foi possível carregar as páginas.',
          'error',
        ),
      )
      .finally(() => setLoadingPages(false))
  }, [showToast])

  async function selectPage(slug: string) {
    setSelectedSlug(slug)
    setLoadingPage(true)
    setPageDetail(null)
    try {
      setPageDetail(await api.getPage(slug))
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : 'Não foi possível carregar esta página.',
        'error',
      )
    } finally {
      setLoadingPage(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Conteúdo das Páginas
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Escolha uma página e edite os campos disponíveis em cada secção.
        </p>
      </div>

      <div className="admin-card mt-8 grid min-h-[620px] overflow-hidden lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 bg-white lg:border-b-0 lg:border-r">
          <div className="border-b border-slate-100 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Páginas do site
            </p>
          </div>
          {loadingPages ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="animate-spin text-[#063A1F]" size={26} />
            </div>
          ) : (
            <nav className="max-h-72 overflow-y-auto py-2 lg:max-h-none">
              {pages.map((page) => (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => selectPage(page.slug)}
                  className={`w-full border-l-[3px] px-5 py-3.5 text-left transition ${
                    selectedSlug === page.slug
                      ? 'border-[#063A1F] bg-[#063A1F]/[0.07]'
                      : 'border-transparent hover:bg-slate-50'
                  }`}
                >
                  <strong className="block text-sm font-semibold text-slate-800">
                    {page.title}
                  </strong>
                  <span className="mt-1 block text-xs text-slate-400">
                    /{page.slug}
                  </span>
                </button>
              ))}
            </nav>
          )}
        </aside>

        <section className="min-w-0 bg-[#f8fafb] p-5 sm:p-7">
          {loadingPage ? (
            <div className="flex min-h-[480px] items-center justify-center">
              <Loader2 className="animate-spin text-[#063A1F]" size={30} />
            </div>
          ) : !pageDetail ? (
            <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-300 shadow-sm">
                <FileText size={31} />
              </span>
              <h3 className="mt-5 font-semibold text-slate-700">
                Selecione uma página para editar
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                As secções e os respetivos campos aparecerão aqui.
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  {pageDetail.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {pageDetail.description}
                </p>
              </div>

              {pageDetail.sections.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                  <FileText className="mx-auto text-slate-300" size={36} />
                  <h4 className="mt-4 font-semibold text-slate-700">
                    Sem secções configuradas
                  </h4>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    A página existe na base de dados, mas ainda não tem secções
                    editáveis associadas.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pageDetail.sections.map((section) => (
                    <SectionEditor key={section.id} section={section} />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
