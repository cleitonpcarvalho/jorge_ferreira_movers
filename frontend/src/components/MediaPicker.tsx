import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  Check,
  ImageOff,
  Loader2,
  Search,
  Upload,
  X,
} from 'lucide-react'
import { useToast } from '@/context/ToastContext'
import { api, type MediaItem } from '@/lib/api'

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (url: string) => void
}

function PickerThumbnail({
  item,
  selected,
}: {
  item: MediaItem
  selected: boolean
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
      {failed ? (
        <div className="flex h-full items-center justify-center text-slate-300">
          <ImageOff size={30} />
        </div>
      ) : (
        <img
          src={item.url}
          alt={item.alt_text || item.original_name}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
      {selected && (
        <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#063A1F] text-white shadow">
          <Check size={17} />
        </span>
      )}
    </div>
  )
}

export default function MediaPicker({
  open,
  onClose,
  onSelect,
}: Props) {
  const { showToast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [media, setMedia] = useState<MediaItem[]>([])
  const [search, setSearch] = useState('')
  const [selectedUrl, setSelectedUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!open) return
    api
      .getMedia()
      .then(setMedia)
      .catch((error: unknown) =>
        showToast(
          error instanceof Error
            ? error.message
            : 'Erro ao carregar a biblioteca.',
          'error',
        ),
      )
      .finally(() => setLoading(false))
  }, [open, showToast])

  function closePicker() {
    setSelectedUrl('')
    setSearch('')
    onClose()
  }

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setUploading(true)
    try {
      const uploaded = await api.uploadMedia(file, 'geral', file.name)
      setMedia((current) => [uploaded, ...current])
      setSelectedUrl(uploaded.url)
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

  if (!open) return null

  const filtered = media.filter((item) =>
    `${item.original_name} ${item.filename}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-picker-title"
    >
      <div className="flex max-h-[80vh] w-[90vw] max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2
            id="media-picker-title"
            className="text-lg font-semibold text-slate-900"
          >
            Selecionar Imagem
          </h2>
          <button
            type="button"
            onClick={closePicker}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Fechar"
          >
            <X size={21} />
          </button>
        </header>

        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar imagens..."
              className="admin-input pl-11"
              autoFocus
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
          {loading ? (
            <div className="flex min-h-60 items-center justify-center">
              <Loader2 className="animate-spin text-[#063A1F]" size={30} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex min-h-60 flex-col items-center justify-center text-center text-slate-400">
              <ImageOff size={40} />
              <p className="mt-3 text-sm">Nenhuma imagem encontrada.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((item) => {
                const selected = selectedUrl === item.url
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedUrl(item.url)}
                    className={`overflow-hidden rounded-xl border-4 bg-white text-left transition ${
                      selected
                        ? 'border-[#063A1F]'
                        : 'border-transparent hover:border-[#063A1F]/25'
                    }`}
                  >
                    <PickerThumbnail item={item} selected={selected} />
                    <span className="block truncate px-2 py-2 text-xs text-slate-600">
                      {item.original_name}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="admin-button-secondary"
          >
            {uploading ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Upload size={17} />
            )}
            Carregar Nova Imagem
          </button>
          <button
            type="button"
            disabled={!selectedUrl}
            onClick={() => {
              onSelect(selectedUrl)
              closePicker()
            }}
            className="admin-button-primary"
          >
            <Check size={17} />
            Usar esta Imagem
          </button>
        </footer>
      </div>
    </div>
  )
}
