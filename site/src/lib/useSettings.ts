'use client'

import { useEffect, useState } from 'react'

export type Settings = Record<string, string>

let cache: Settings | null = null
let pendingRequest: Promise<Settings> | null = null

function fetchSettings() {
  if (pendingRequest) return pendingRequest

  const base =
    process.env.NEXT_PUBLIC_ADMIN_API_BASE ?? 'http://localhost:3001'

  pendingRequest = fetch(`${base}/api/settings`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Settings request failed with ${response.status}`)
      }
      return response.json() as Promise<Settings>
    })
    .then((data) => {
      cache = data
      return data
    })
    .finally(() => {
      pendingRequest = null
    })

  return pendingRequest
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(cache ?? {})
  const [loading, setLoading] = useState(!cache)

  useEffect(() => {
    if (cache) return

    let active = true

    fetchSettings()
      .then((data) => {
        if (active) setSettings(data)
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { settings, loading }
}
