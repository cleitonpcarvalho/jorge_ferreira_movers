import type { ReactNode } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import AdminLayout from '@/components/AdminLayout'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { ToastProvider } from '@/context/ToastContext'
import Content from '@/pages/Content'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import Media from '@/pages/Media'
import Security from '@/pages/Security'
import Settings from '@/pages/Settings'

function PrivateRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth()
  return token ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="configuracoes" element={<Settings />} />
              <Route path="conteudo" element={<Content />} />
              <Route path="media" element={<Media />} />
              <Route path="seguranca" element={<Security />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}
