import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
  loginUser,
  registerUser,
  seedDemoAccounts,
} from '../services/storage'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setUser] = useState(null)

  useEffect(() => {
    // Seed demo accounts on app load
    seedDemoAccounts()
    setUser(getCurrentUser())
  }, [])

  const login = (email, password) => {
    const result = loginUser(email, password)
    if (result.error) {
      return { error: result.error }
    }
    
    setCurrentUser(result.user)
    setUser(result.user)
    return { user: result.user }
  }

  const signup = (email, password, name, phone, role) => {
    const result = registerUser(email, password, name, phone, role)
    if (result.error) {
      return { error: result.error }
    }
    
    setCurrentUser(result.user)
    setUser(result.user)
    return { user: result.user }
  }

  const logout = () => {
    clearCurrentUser()
    setUser(null)
  }

  const value = useMemo(
    () => ({
      currentUser,
      login,
      signup,
      logout,
    }),
    [currentUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
