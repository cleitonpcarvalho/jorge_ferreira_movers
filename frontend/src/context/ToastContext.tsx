import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

type ToastType = 'success' | 'error'

interface ToastState {
  type: ToastType
  message: string
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const showToast = useCallback(
    (message: string, type: ToastType = 'success') => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      setToast({ message, type })
      timeoutRef.current = window.setTimeout(() => setToast(null), 3000)
    },
    [],
  )

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <div
          role={toast.type === 'error' ? 'alert' : 'status'}
          className={`animate-toast-in fixed right-5 top-5 z-[100] flex max-w-sm items-start gap-3 rounded-xl px-5 py-4 text-sm font-medium text-white shadow-xl ${
            toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="mt-0.5 shrink-0" size={20} />
          ) : (
            <XCircle className="mt-0.5 shrink-0" size={20} />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  )
}

// Provider and hook intentionally share one module for a small app context.
// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast deve ser utilizado dentro de ToastProvider')
  }
  return context
}
