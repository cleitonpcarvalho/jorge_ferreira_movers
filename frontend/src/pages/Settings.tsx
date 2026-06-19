import { useEffect, useMemo, useState } from 'react'
import {
  Check,
  Loader2,
  RotateCcw,
  Save,
  Settings2,
} from 'lucide-react'
import { useToast } from '@/context/ToastContext'
import {
  api,
  type SettingsGroups,
  type SiteSetting,
} from '@/lib/api'

const groupLabels: Record<string, string> = {
  geral: 'Geral',
  contacto: 'Contacto',
  redes_sociais: 'Redes Sociais',
  sistema: 'Sistema',
  outros: 'Outros',
}

export default function Settings() {
  const { showToast } = useToast()
  const [groups, setGroups] = useState<SettingsGroups>({})
  const [values, setValues] = useState<Record<string, string>>({})
  const [originalValues, setOriginalValues] = useState<
    Record<string, string>
  >({})
  const [activeGroup, setActiveGroup] = useState('')
  const [loading, setLoading] = useState(true)
  const [savingKey, setSavingKey] = useState<string | null>(null)
  const [savedKey, setSavedKey] = useState<string | null>(null)
  const [savingAll, setSavingAll] = useState(false)
  const [seeding, setSeeding] = useState(false)

  async function loadSettings() {
    setLoading(true)
    try {
      const data = await api.getSettings()
      setGroups(data)
      const nextValues: Record<string, string> = {}
      Object.values(data)
        .flat()
        .forEach((setting) => {
          nextValues[setting.key] = setting.value ?? ''
        })
      setValues(nextValues)
      setOriginalValues(nextValues)
      const names = Object.keys(data)
      setActiveGroup((current) =>
        current && data[current] ? current : (names[0] ?? ''),
      )
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : 'Não foi possível carregar as configurações.',
        'error',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let active = true
    api
      .getSettings()
      .then((data) => {
        if (!active) return
        const nextValues: Record<string, string> = {}
        Object.values(data)
          .flat()
          .forEach((setting) => {
            nextValues[setting.key] = setting.value ?? ''
          })
        setGroups(data)
        setValues(nextValues)
        setOriginalValues(nextValues)
        setActiveGroup(Object.keys(data)[0] ?? '')
      })
      .catch((error: unknown) => {
        if (!active) return
        showToast(
          error instanceof Error
            ? error.message
            : 'Não foi possível carregar as configurações.',
          'error',
        )
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [showToast])

  const activeSettings = useMemo(
    () => groups[activeGroup] ?? [],
    [activeGroup, groups],
  )
  const changedInGroup = useMemo(
    () =>
      activeSettings.filter(
        (setting) => values[setting.key] !== originalValues[setting.key],
      ),
    [activeSettings, originalValues, values],
  )

  async function saveSetting(setting: SiteSetting) {
    setSavingKey(setting.key)
    setSavedKey(null)
    try {
      await api.updateSetting(setting.key, values[setting.key] ?? '')
      setOriginalValues((current) => ({
        ...current,
        [setting.key]: values[setting.key] ?? '',
      }))
      setSavedKey(setting.key)
      window.setTimeout(() => setSavedKey(null), 1800)
      showToast(`${setting.label ?? setting.key} guardado.`)
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Erro ao guardar definição.',
        'error',
      )
    } finally {
      setSavingKey(null)
    }
  }

  async function saveAll() {
    const updates = Object.fromEntries(
      changedInGroup.map((setting) => [
        setting.key,
        values[setting.key] ?? '',
      ]),
    )
    if (Object.keys(updates).length === 0) {
      showToast('Não existem alterações por guardar.')
      return
    }

    setSavingAll(true)
    try {
      const result = await api.updateSettings(updates)
      setOriginalValues((current) => ({ ...current, ...updates }))
      showToast(result.message)
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : 'Não foi possível guardar as alterações.',
        'error',
      )
    } finally {
      setSavingAll(false)
    }
  }

  async function runSeeds() {
    setSeeding(true)
    try {
      const result = await api.runSeeds()
      showToast(result.message)
      await loadSettings()
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : 'Não foi possível repor as definições.',
        'error',
      )
    } finally {
      setSeeding(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <Loader2 className="animate-spin text-[#063A1F]" size={32} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Configurações do Site
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Atualize os dados gerais utilizados no site público.
          </p>
        </div>
        <button
          type="button"
          onClick={runSeeds}
          disabled={seeding}
          className="admin-button-secondary self-start"
        >
          {seeding ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <RotateCcw size={17} />
          )}
          Repor definições em falta
        </button>
      </div>

      {Object.keys(groups).length === 0 ? (
        <div className="admin-card mt-8 p-10 text-center">
          <Settings2 className="mx-auto text-slate-300" size={40} />
          <h3 className="mt-4 font-semibold text-slate-800">
            Sem configurações
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Utilize “Repor definições em falta” para carregar os valores
            iniciais.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {Object.keys(groups).map((group) => (
              <button
                type="button"
                key={group}
                onClick={() => setActiveGroup(group)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activeGroup === group
                    ? 'bg-[#063A1F] text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-[#063A1F]/30 hover:text-[#063A1F]'
                }`}
              >
                {groupLabels[group] ?? group.replaceAll('_', ' ')}
              </button>
            ))}
          </div>

          <section className="admin-card mt-4 divide-y divide-slate-100">
            {activeSettings.map((setting) => {
              const changed =
                values[setting.key] !== originalValues[setting.key]
              return (
                <div key={setting.key} className="p-5 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                    <div className="min-w-0 flex-1">
                      <label htmlFor={setting.key} className="admin-label">
                        {setting.label ?? setting.key}
                      </label>
                      <input
                        id={setting.key}
                        type={
                          ['email', 'url'].includes(setting.type)
                            ? setting.type
                            : 'text'
                        }
                        value={values[setting.key] ?? ''}
                        onChange={(event) =>
                          setValues((current) => ({
                            ...current,
                            [setting.key]: event.target.value,
                          }))
                        }
                        className="admin-input"
                      />
                      {setting.key === 'resend_to_email' && (
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          Este é o email que recebe os formulários de contacto
                          do site.
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => saveSetting(setting)}
                      disabled={savingKey === setting.key || !changed}
                      className="admin-button-secondary min-w-[112px]"
                    >
                      {savingKey === setting.key ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : savedKey === setting.key ? (
                        <Check size={16} className="text-emerald-600" />
                      ) : (
                        <Save size={16} />
                      )}
                      {savedKey === setting.key ? 'Guardado' : 'Guardar'}
                    </button>
                  </div>
                </div>
              )
            })}

            <div className="flex flex-col items-start justify-between gap-3 bg-slate-50/70 p-5 sm:flex-row sm:items-center sm:p-6">
              <p className="text-sm text-slate-500">
                {changedInGroup.length > 0
                  ? `${changedInGroup.length} alteração/alterações por guardar`
                  : 'Todos os campos deste grupo estão guardados.'}
              </p>
              <button
                type="button"
                onClick={saveAll}
                disabled={savingAll || changedInGroup.length === 0}
                className="admin-button-primary"
              >
                {savingAll ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Save size={17} />
                )}
                Guardar Tudo
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
