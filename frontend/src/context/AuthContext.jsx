import { createContext, useEffect, useState } from 'react'
import api from '../lib/api'
import { useBackendStatus } from '../hooks/useBackendStatus'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const { backendReady } = useBackendStatus()
  const [admin, setAdmin] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    if (!backendReady) {
      setAuthLoading(true)
      return
    }

    api
      .get('/auth/me')
      .then(({ data }) => setAdmin(data.admin))
      .catch(() => setAdmin(null))
      .finally(() => setAuthLoading(false))
  }, [backendReady])

  const fetchProfile = async () => {
    if (!backendReady) {
      setAuthLoading(true)
      return
    }

    try {
      const { data } = await api.get('/auth/me')
      setAdmin(data.admin)
    } catch {
      setAdmin(null)
    } finally {
      setAuthLoading(false)
    }
  }

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload)
    setAdmin(data.admin)
    return data
  }

  const logout = async () => {
    await api.post('/auth/logout')
    setAdmin(null)
  }

  const updatePassword = async (payload) => {
    const { data } = await api.put('/auth/password', payload)
    return data
  }
  return (
    <AuthContext.Provider
      value={{
        admin,
        authLoading,
        fetchProfile,
        login,
        logout,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
