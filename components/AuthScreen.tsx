// components/AuthScreen.tsx
import React from "react"
import { useTheme } from "~contexts/ThemeContext"

interface AuthScreenProps {
  onLogin: (token: string) => Promise<void>
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const { theme, toggleTheme } = useTheme()

  const handleGoogleLogin = () => {
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

        if (responseUrl) {
          const url = new URL(responseUrl)
          const token = url.searchParams.get("token")

          if (token) {
            await onLogin(token)
          }
        }
      }
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <svg
            className="w-5 h-5 text-gray-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header Section */}
          <div className="p-8 text-center bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Focusez</h1>
            <p className="text-blue-100">Stay focused, stay productive</p>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Welcome back
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to sync your tasks, bookmarks, and settings across all
                your devices
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              {[
                { icon: "✓", text: "Sync across devices" },
                { icon: "✓", text: "Cloud backup" },
                { icon: "✓", text: "Personalized experience" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-bold">
                    {feature.icon}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg px-6 py-3.5 flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 group shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
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
              <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
                Continue with Google
              </span>
            </button>

            {/* Terms */}
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
              By continuing, you agree to our{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthScreen