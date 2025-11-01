// components/SettingsPanel.tsx
import React, { useState } from "react"
import { useTheme } from "~contexts/ThemeContext"
import { useLayout } from "~contexts/LayoutContext"

const SettingsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { widgets, toggleWidgetVisibility, resetLayout } = useLayout()

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40"
        aria-label="Settings"
      >
        <svg
          className="w-6 h-6 text-gray-700 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {/* Settings Panel Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Settings
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Theme Section */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Appearance
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                        {theme === "light" ? (
                          <svg
                            className="w-5 h-5 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-blue-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Theme
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {theme === "light" ? "Light Mode" : "Dark Mode"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleTheme}
                      className={`
                        relative inline-flex h-6 w-11 items-center rounded-full
                        transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        ${theme === "dark" ? "bg-blue-600" : "bg-gray-300"}
                      `}
                    >
                      <span
                        className={`
                          inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                          ${theme === "dark" ? "translate-x-6" : "translate-x-1"}
                        `}
                      />
                    </button>
                  </div>
                </div>
              </section>

              {/* Widgets Visibility Section */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Widgets
                </h3>
                <div className="space-y-2">
                  {widgets.map((widget) => (
                    <div
                      key={widget.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        {widget.name}
                      </span>
                      <button
                        onClick={() => toggleWidgetVisibility(widget.id)}
                        className={`
                          relative inline-flex h-6 w-11 items-center rounded-full
                          transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                          ${widget.visible ? "bg-blue-600" : "bg-gray-300"}
                        `}
                      >
                        <span
                          className={`
                            inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                            ${widget.visible ? "translate-x-6" : "translate-x-1"}
                          `}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Layout Section */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Layout
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        Drag and drop widgets on your dashboard to rearrange them
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={resetLayout}
                    className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors duration-200 font-medium border border-gray-300 dark:border-gray-600"
                  >
                    Reset to Default Layout
                  </button>
                </div>
              </section>

              {/* Info Section */}
              <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    Focusez
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Version 1.0.0
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SettingsPanel