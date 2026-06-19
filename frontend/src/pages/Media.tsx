import {
  type ChangeEvent,
  type DragEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  ImageOff,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  Upload,
  UploadCloud,
  X,
} from 'lucide-react'
import { useToast } from '@/context/ToastContext'
import { api, type MediaItem } from '@/lib/api'

const categories = ['geral', 'hero', 'galeria', 'servicos', 'equipa']

const PAGE_MEDIA_MAP: Record<string, { label: string; categories: string[] }> =
  {
    todos: {
      label: 'Todas as Páginas',
      categories: [],
    },
    home: {
      label: 'Início',
      categories: ['hero', 'gallery'],
    },
    servicos: {
      label: 'Serviços',
      categories: ['services', 'packing', 'van-fleet'],
    },
    'sobre-nos': {
      label: 'Sobre Nós',
      categories: ['team', 'van-fleet', 'gallery'],
    },
    'mudancas-internacionais': {
      label: 'Mudanças Internacionais',
      categories: ['international-moves', 'packing'],
    },
    contacto: {
      label: 'Contacto',
      categories: ['gallery'],
    },
  }

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 KB'
  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  )
  const value = bytes / 1024 ** index
  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`
}

function MediaThumbnail({ item }: { item: MediaItem }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="aspect-[4/3] overflow-hidden bg-slate-100">
      {failed ? (
        <div className="flex h-full flex-col items-center justify-center text-slate-300">
          <ImageOff size={34} />
          <span className="mt-2 text-xs">Imagem indisponível</span>
        </div>
      ) : (
        <img
          src={item.url}
          alt={item.alt_text || item.original_name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

export default function Media() {
  const { showToast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const replaceInputRef = useRef<HTMLInputElement>(null)
  const [allMedia, setAllMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedPage, setSelectedPage] = useState('todos')
  const [uploadOpen, setUploadOpen] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [altText, setAltText] = useState('')
  const [uploadCategory, setUploadCategory] = useState('geral')
  const [uploading, setUploading] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [replacingItem, setReplacingItem] = useState<MediaItem | null>(null)

  useEffect(() => {
    api
      .getMedia()
      .then(setAllMedia)
      .catch((error: unknown) =>
        showToast(
          error instanceof Error
            ? error.message
            : 'Não foi possível carregar as imagens.',
          'error',
        ),
      )
      .finally(() => setLoading(false))
  }, [showToast])

  const filtered = useMemo(() => {
    let result = allMedia

    if (selectedPage !== 'todos') {
      const cats = PAGE_MEDIA_MAP[selectedPage]?.categories ?? []
      result = result.filter((item) => cats.includes(item.category))
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((item) =>
        `${item.original_name} ${item.filename}`.toLowerCase().includes(q),
      )
    }

    return result
  }, [allMedia, selectedPage, search])

  function chooseFile(nextFile?: File) {
    if (!nextFile) return
    if (!nextFile.type.startsWith('image/')) {
      showToast('Selecione um ficheiro de imagem válido.', 'error')
      return
    }
    setFile(nextFile)
    setAltText((current) => current || nextFile.name.replace(/\.[^.]+$/, ''))
    setUploadOpen(true)
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    chooseFile(event.target.files?.[0])
    event.target.value = ''
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setDragging(false)
    chooseFile(event.dataTransfer.files?.[0])
  }

  async function uploadFile() {
    if (!file) {
      showToast('Selecione uma imagem para carregar.', 'error')
      return
    }
    setUploading(true)
    try {
      const uploaded = await api.uploadMedia(file, uploadCategory, altText)
      setAllMedia((current) => [uploaded, ...current])
      setFile(null)
      setAltText('')
      setUploadCategory('geral')
      setUploadOpen(false)
      showToast('Imagem carregada com sucesso.')
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Erro ao carregar imagem.',
        'error',
      )
    } finally {
      setUploading(false)
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const result = await api.deleteMedia(deleteTarget.id)
      setAllMedia((current) =>
        current.filter((item) => item.id !== deleteTarget.id),
      )
      setDeleteTarget(null)
      showToast(result.message)
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Erro ao eliminar imagem.',
        'error',
      )
    } finally {
      setDeleting(false)
    }
  }

  function handleReplace(item: MediaItem) {
    setReplacingItem(item)
    replaceInputRef.current?.click()
  }

  async function handleReplaceFileSelected(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile || !replacingItem) return

    try {
      const uploaded = await api.uploadMedia(
        selectedFile,
        replacingItem.category,
        replacingItem.alt_text ?? '',
      )
      await api.deleteMedia(replacingItem.id)
      setAllMedia((prev) =>
        prev.filter((m) => m.id !== replacingItem.id).concat(uploaded),
      )
      showToast('Imagem substituída com sucesso.')
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Erro ao substituir imagem.',
        'error',
      )
    } finally {
      setReplacingItem(null)
      if (replaceInputRef.current) replaceInputRef.current.value = ''
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Biblioteca de Média
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Carregue e organize as imagens utilizadas no site.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 sm:w-64">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="admin-input pl-10"
              placeholder="Pesquisar ficheiro..."
            />
          </div>
          <select
            value={selectedPage}
            onChange={(event) => setSelectedPage(event.target.value)}
            className="admin-input sm:w-52"
            aria-label="Filtrar por página"
          >
            {Object.entries(PAGE_MEDIA_MAP).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setUploadOpen((open) => !open)}
            className="admin-button-primary"
          >
            <Upload size={17} />
            Carregar Imagem
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleReplaceFileSelected}
      />

      {uploadOpen && (
        <section className="admin-card mt-7 p-5 sm:p-6">
          <div
            onDragOver={(event) => {
              event.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`rounded-xl border-2 px-6 py-10 text-center transition ${
              dragging
                ? 'border-solid border-[#063A1F] bg-[#063A1F]/[0.05]'
                : 'border-dashed border-slate-300 bg-slate-50'
            }`}
          >
            <UploadCloud className="mx-auto text-[#063A1F]" size={38} />
            <h3 className="mt-4 text-sm font-semibold text-slate-800">
              Arraste uma imagem para esta área
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              ou selecione um ficheiro no seu computador
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="admin-button-secondary mt-5"
            >
              Escolher Ficheiro
            </button>
            {file && (
              <div className="mx-auto mt-5 flex max-w-md items-center justify-between gap-3 rounded-lg bg-white px-4 py-3 text-left shadow-sm">
                <span className="min-w-0">
                  <strong className="block truncate text-sm text-slate-700">
                    {file.name}
                  </strong>
                  <span className="text-xs text-slate-400">
                    {formatBytes(file.size)}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
                  aria-label="Remover ficheiro"
                >
                  <X size={17} />
                </button>
              </div>
            )}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="media-alt" className="admin-label">
                Texto alternativo
              </label>
              <input
                id="media-alt"
                type="text"
                value={altText}
                onChange={(event) => setAltText(event.target.value)}
                className="admin-input"
                placeholder="Descreva brevemente a imagem"
              />
            </div>
            <div>
              <label htmlFor="media-category" className="admin-label">
                Categoria
              </label>
              <select
                id="media-category"
                value={uploadCategory}
                onChange={(event) => setUploadCategory(event.target.value)}
                className="admin-input"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              disabled={!file || uploading}
              onClick={uploadFile}
              className="admin-button-primary"
            >
              {uploading ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Upload size={17} />
              )}
              {uploading ? `A enviar ${file?.name ?? ''}...` : 'Enviar'}
            </button>
          </div>
        </section>
      )}

      {loading ? (
        <div className="flex min-h-[420px] items-center justify-center">
          <Loader2 className="animate-spin text-[#063A1F]" size={32} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card mt-7 flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
          <ImageOff size={44} className="text-slate-300" />
          <h3 className="mt-4 font-semibold text-slate-700">
            Nenhuma imagem encontrada
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Carregue a primeira imagem ou altere os filtros.
          </p>
        </div>
      ) : (
        <section className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="group admin-card overflow-hidden"
            >
              <MediaThumbnail item={item} />
              <div className="p-3.5">
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-xs font-semibold text-slate-700"
                      title={item.original_name}
                    >
                      {item.original_name}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#063A1F]/[0.08] px-2 py-1 text-[10px] font-semibold text-[#063A1F]">
                        {item.category || 'geral'}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {formatBytes(item.size_bytes)}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleReplace(item)}
                      className="rounded-lg p-2 text-blue-500 transition hover:bg-blue-50 hover:text-blue-700"
                      aria-label={`Substituir ${item.original_name}`}
                      title="Substituir imagem"
                    >
                      <RefreshCw size={17} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(item)}
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                      aria-label={`Eliminar ${item.original_name}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {deleteTarget && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/55 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-media-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={21} />
            </span>
            <h2
              id="delete-media-title"
              className="mt-5 text-lg font-semibold text-slate-900"
            >
              Eliminar imagem
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Tem a certeza que quer eliminar esta imagem? Esta ação não pode
              ser revertida.
            </p>
            <p className="mt-2 truncate text-xs font-medium text-slate-400">
              {deleteTarget.original_name}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="admin-button-secondary"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {deleting && <Loader2 size={17} className="animate-spin" />}
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
