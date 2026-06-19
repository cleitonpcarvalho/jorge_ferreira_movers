import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'
import { api, type User } from '@/lib/api'

interface AuthContextValue {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('jfm_user') ?? 'null') as User | null
  } catch {
    localStorage.removeItem('jfm_user')
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser)
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('jfm_token'),
  )

  async function login(email: string, password: string) {
    const data = await api.login(email, password)
    localStorage.setItem('jfm_token', data.token)
    localStorage.setItem('jfm_user', JSON.stringify(data.user))
    setToken(data.token)
    setUser(data.user)
  }

  function logout() {
    localStorage.removeItem('jfm_token')
    localStorage.removeItem('jfm_user')
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, token, login, logout }),
    [user, token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Provider and hook intentionally share one module for a small app context.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de AuthProvider')
  }
  return context
}
