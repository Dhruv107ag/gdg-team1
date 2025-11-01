import React from "react"
import "../style.css"
import { useAuth } from "~hooks/useAuth"
import AuthScreen from "~components/AuthScreen"
import TodoWidget from "~components/TodoWidget"
import FocusTimer from "~components/FocusTimer"
import MotivationWidget from "~components/MotivationWidget"
import BookmarksWidget from "~components/BookmarksWidget"

function NewTabPage() {
  const { isAuthenticated, isLoading, login } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  // if (!isAuthenticated) {
  //   return <AuthScreen onLogin={login} />
  // }

  return (
    <div className="min-h-screen p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-3">Focusez</h1>
          <p className="text-xl text-white/90">Your productivity dashboard</p>
        </header>

        {/* Widgets Grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Widget 1: Priority Tasks - Takes 2 columns */}
          <div className="lg:col-span-2 bg-white/95 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <h2 className="text-2xl font-semibold text-primary-500 mb-4">
              Priority Tasks
            </h2>
            <TodoWidget />
          </div>

          {/* Widget 2: Focus Timer */}
          <div className="bg-white/95 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <h2 className="text-2xl font-semibold text-primary-500 mb-4">
              Focus Timer
            </h2>
            <FocusTimer />
          </div>

          {/* Widget 3: Motivation */}
          <div className="bg-white/95 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <h2 className="text-2xl font-semibold text-primary-500 mb-4">
              Daily Motivation
            </h2>
            <MotivationWidget />
          </div>

          {/* Widget 4: Quick Bookmarks */}
          <div className="lg:col-span-2 bg-white/95 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <h2 className="text-2xl font-semibold text-primary-500 mb-4">
              Quick Bookmarks
            </h2>
            <BookmarksWidget />
          </div>
        </main>
      </div>
    </div>
  )
}

export default NewTabPage