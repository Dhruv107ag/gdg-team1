import React, { useState } from "react"

import "../style.css"

import AuthScreen from "~components/AuthScreen"
import BookmarksWidget from "~components/BookmarksWidget"
import DraggableWidget from "~components/DraggableWidget"
import FocusTimer from "~components/FocusTimer"
import MotivationWidget from "~components/MotivationWidget"
import SettingsPanel from "~components/SettingsPanel"
import TodoWidget from "~components/TodoWidget"
import { LayoutProvider, useLayout } from "~contexts/LayoutContext"
import type { WidgetType } from "~contexts/LayoutContext"
import { ThemeProvider } from "~contexts/ThemeContext"
import { useAuth } from "~hooks/useAuth"

function NewTabContent() {
  const { isAuthenticated, isLoading, login } = useAuth()
  const { widgets, updateWidgetOrder } = useLayout()
  const [draggedWidget, setDraggedWidget] = useState<WidgetType | null>(null)

  const handleDragStart = (widgetId: WidgetType) => {
    setDraggedWidget(widgetId)
  }

  const handleDragOver = (targetWidgetId: WidgetType) => {
    if (!draggedWidget || draggedWidget === targetWidgetId) return

    const draggedIndex = widgets.findIndex((w) => w.id === draggedWidget)
    const targetIndex = widgets.findIndex((w) => w.id === targetWidgetId)

    if (draggedIndex !== -1 && targetIndex !== -1) {
      updateWidgetOrder(draggedWidget, targetIndex)
    }
  }

  const handleDragEnd = () => {
    setDraggedWidget(null)
  }

  const getWidgetComponent = (widgetId: WidgetType) => {
    switch (widgetId) {
      case "todos":
        return <TodoWidget />
      case "timer":
        return <FocusTimer />
      case "motivation":
        return <MotivationWidget />
      case "bookmarks":
        return <BookmarksWidget />
      default:
        return null
    }
  }

  const getWidgetClassName = (widgetId: WidgetType) => {
    switch (widgetId) {
      case "todos":
        return "lg:col-span-2"
      case "bookmarks":
        return "lg:col-span-2"
      default:
        return ""
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  // if (!isAuthenticated) {
  //   return <AuthScreen onLogin={login} />
  // }

  const visibleWidgets = widgets
    .filter((w) => w.visible)
    .sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto p-6 lg:p-10">
        {/* Settings Panel */}
        <SettingsPanel />

        {/* Header */}
        <header className="text-center mb-8 lg:mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-3">
            Focusez
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            Your productivity dashboard
          </p>
        </header>

        {/* Widgets Grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {visibleWidgets.map((widget) => (
            <DraggableWidget
              key={widget.id}
              id={widget.id}
              title={widget.name}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              className={getWidgetClassName(widget.id)}>
              {getWidgetComponent(widget.id)}
            </DraggableWidget>
          ))}
        </main>

        {/* Empty State */}
        {visibleWidgets.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
              <svg
                className="w-10 h-10 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No widgets visible
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enable widgets from settings to customize your dashboard
            </p>
          </div>
        )}

        {/* Footer Hint */}
        <footer className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Drag and drop widgets to rearrange • Customize in settings
          </p>
        </footer>
      </div>
    </div>
  )
}

function NewTabPage() {
  return (
    <ThemeProvider>
      <LayoutProvider>
        <NewTabContent />
      </LayoutProvider>
    </ThemeProvider>
  )
}

export default NewTabPage
