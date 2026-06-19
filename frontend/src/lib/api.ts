const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export interface User {
  id: number
  email: string
  name: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface SiteSetting {
  id: number
  key: string
  value: string | null
  label: string | null
  type: string
  group_name: string | null
}

export type SettingsGroups = Record<string, SiteSetting[]>

export interface ContentPage {
  id: number
  slug: string
  title: string
  description: string
  order_num: number
  is_active: boolean
}

export interface ContentSection {
  id: number
  page_id: number
  slug: string
  title: string
  content: Record<string, unknown>
  order_num: number
  is_active: boolean
  updated_at: string
}

export interface ContentPageDetail extends ContentPage {
  sections: ContentSection[]
}

export interface MediaItem {
  id: number
  filename: string
  original_name: string
  mime_type: string
  size_bytes: number
  url: string
  alt_text: string
  category: string
  created_at: string
}

function getToken() {
  return localStorage.getItem('jfm_token') ?? ''
}

function parseError(body: string, status: number) {
  try {
    const parsed = JSON.parse(body) as { error?: string; message?: string }
    return parsed.error ?? parsed.message ?? `Pedido falhou (${status})`
  } catch {
    return body || `Pedido falhou (${status})`
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
      ...(options.headers ?? {}),
    },
  })

  const body = await response.text()
  if (!response.ok) {
    throw new Error(parseError(body, response.status))
  }

  return body ? (JSON.parse(body) as T) : (undefined as T)
}

export const api = {
  login: (email: string, password: string) =>
    request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getSettings: () => request<SettingsGroups>('/api/settings/grouped'),
  updateSetting: (key: string, value: string) =>
    request<{ message: string }>(`/api/settings/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ value }),
    }),
  updateSettings: (updates: Record<string, string>) =>
    request<{ message: string }>('/api/settings', {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),
  publish: () =>
    request<{ message: string; timestamp: string }>('/api/settings/publish', {
      method: 'POST',
    }),
  runSeeds: () =>
    request<{ message: string }>('/api/settings/run-seeds', {
      method: 'POST',
    }),

  getPages: () => request<ContentPage[]>('/api/content/pages'),
  getPage: (slug: string) =>
    request<ContentPageDetail>(
      `/api/content/pages/${encodeURIComponent(slug)}`,
    ),
  updateSection: (
    id: number,
    data: { content: Record<string, unknown>; title: string },
  ) =>
    request<{ message: string }>(`/api/content/sections/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getMedia: (params?: { category?: string; q?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.set('category', params.category)
    if (params?.q) searchParams.set('q', params.q)
    const query = searchParams.toString()
    return request<MediaItem[]>(`/api/media${query ? `?${query}` : ''}`)
  },
  deleteMedia: (id: number) =>
    request<{ message: string }>(`/api/media/${id}`, { method: 'DELETE' }),
  uploadMedia: async (file: File, category: string, altText: string) => {
    const form = new FormData()
    form.append('file', file)
    form.append('category', category)
    form.append('alt_text', altText)

    const response = await fetch(`${BASE}/api/media/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
      body: form,
    })
    const body = await response.text()
    if (!response.ok) {
      throw new Error(parseError(body, response.status))
    }
    return JSON.parse(body) as MediaItem
  },

  resetPassword: (newPassword: string) =>
    request<{ message: string }>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ newPassword }),
    }),
}
