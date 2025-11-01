// lib/api.ts
const API_BASE_URL =
  process.env.PLASMO_PUBLIC_API_URL || "http://localhost:3000"

interface ApiOptions extends RequestInit {
  requireAuth?: boolean
}

export async function apiCall<T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { requireAuth = true, ...fetchOptions } = options

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions.headers
  }

  // Get auth token from chrome storage if required
  if (requireAuth) {
    const storage = await chrome.storage.sync.get("authToken")
    if (storage.authToken) {
      headers["Authorization"] = `Bearer ${storage.authToken}`
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
      ...fetchOptions,
      headers
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API call failed:", error)
    throw error
  }
}

// Auth specific methods
export const auth = {
  setToken: async (token: string) => {
    await chrome.storage.sync.set({ authToken: token })
  },

  getToken: async (): Promise<string | null> => {
    const storage = await chrome.storage.sync.get("authToken")
    return storage.authToken || null
  },

  removeToken: async () => {
    await chrome.storage.sync.remove("authToken")
  },

  isAuthenticated: async (): Promise<boolean> => {
    const token = await auth.getToken()
    return !!token
  }
}
