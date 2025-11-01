// hooks/useAuth.ts
import { useEffect, useState } from "react"
import { auth } from "~lib/api"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const authenticated = await auth.isAuthenticated()
      setIsAuthenticated(authenticated)
    } catch (error) {
      console.error("Auth check failed:", error)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (token: string) => {
    await auth.setToken(token)
    setIsAuthenticated(true)
  }

  const logout = async () => {
    await auth.removeToken()
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  }
}