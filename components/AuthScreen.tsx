// components/AuthScreen.tsx
import React from "react"

interface AuthScreenProps {
  onLogin: (token: string) => Promise<void>
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const handleGoogleLogin = () => {
    // Open your Next.js auth page
    const authUrl = `${process.env.PLASMO_PUBLIC_API_URL || "http://localhost:3000"}/auth/google`

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true
      },
      async (responseUrl) => {
        if (chrome.runtime.lastError) {
          console.error("Auth error:", chrome.runtime.lastError)
          return
        }

        // Extract token from callback URL
        // Format expected: https://focusez.vercel.app/auth/callback?token=xxx
        if (responseUrl) {
          const url = new URL(responseUrl)
          const token = url.searchParams.get("token")

          //   TODO: THIS IS AASYCN
          if (token) {
            await onLogin(token)
          }
        }
      }
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-10">
      <div className="max-w-md w-full bg-white/95 rounded-2xl p-8 shadow-2xl text-center">
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-primary-500 mb-2">Focusez</h1>
          <p className="text-gray-600 text-lg">Stay focused, stay productive</p>
        </div>

        <div className="my-8">
          <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-primary-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <p className="text-gray-700">
            Sign in to sync your tasks, bookmarks, and settings across all your
            devices
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white border-2 border-gray-300 rounded-lg px-6 py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors duration-200 group">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="font-semibold text-gray-700 group-hover:text-gray-900">
            Continue with Google
          </span>
        </button>

        <p className="text-xs text-gray-500 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default AuthScreen
