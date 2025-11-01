// components/FocusTimer.tsx
import React, { useState, useEffect, useRef } from "react"

interface TimerState {
  taskName: string
  totalSeconds: number
  remainingSeconds: number
  isRunning: boolean
  isPaused: boolean
}

const FocusTimer: React.FC = () => {
  const [timer, setTimer] = useState<TimerState | null>(null)
  const [inputTaskName, setInputTaskName] = useState("")
  const [inputMinutes, setInputMinutes] = useState("")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load timer state from storage on mount
  useEffect(() => {
    loadTimerState()
  }, [])

  // Save timer state whenever it changes
  useEffect(() => {
    if (timer) {
      chrome.storage.local.set({ focusTimer: timer })
    }
  }, [timer])

  // Timer countdown logic
  useEffect(() => {
    if (timer?.isRunning && !timer?.isPaused) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (!prev || prev.remainingSeconds <= 0) {
            // Timer finished
            playCompletionSound()
            showNotification()
            return null
          }
          return {
            ...prev,
            remainingSeconds: prev.remainingSeconds - 1,
          }
        })
      }, 1000)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [timer?.isRunning, timer?.isPaused])

  const loadTimerState = async () => {
    const storage = await chrome.storage.local.get("focusTimer")
    if (storage.focusTimer) {
      setTimer(storage.focusTimer)
    }
  }

  const startTimer = () => {
    const minutes = parseInt(inputMinutes)
    if (!inputTaskName.trim() || !minutes || minutes <= 0) return

    const totalSeconds = minutes * 60
    setTimer({
      taskName: inputTaskName,
      totalSeconds,
      remainingSeconds: totalSeconds,
      isRunning: true,
      isPaused: false,
    })
    setInputTaskName("")
    setInputMinutes("")
  }

  const pauseTimer = () => {
    setTimer((prev) => (prev ? { ...prev, isPaused: true } : null))
  }

  const resumeTimer = () => {
    setTimer((prev) => (prev ? { ...prev, isPaused: false } : null))
  }

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setTimer(null)
    chrome.storage.local.remove("focusTimer")
  }

  const playCompletionSound = () => {
    // Browser will play default notification sound
    const audio = new Audio()
    audio.play().catch(() => {}) // Silently fail if blocked
  }

  const showNotification = () => {
    if (timer?.taskName) {
      new Notification("Focus Timer Complete!", {
        body: `Great job! You completed: ${timer.taskName}`,
        icon: chrome.runtime.getURL("assets/icon.png"),
      })
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getTimerColor = () => {
    if (!timer) return "text-gray-400 dark:text-gray-500"
    
    const percentage = (timer.remainingSeconds / timer.totalSeconds) * 100
    
    if (percentage > 50) return "text-green-500 dark:text-green-400"
    if (percentage > 25) return "text-yellow-500 dark:text-yellow-400"
    return "text-red-500 dark:text-red-400"
  }

  const getProgressColor = () => {
    if (!timer) return "bg-gray-300 dark:bg-gray-600"
    
    const percentage = (timer.remainingSeconds / timer.totalSeconds) * 100
    
    if (percentage > 50) return "bg-green-500 dark:bg-green-400"
    if (percentage > 25) return "bg-yellow-500 dark:bg-yellow-400"
    return "bg-red-500 dark:bg-red-400"
  }

  const getProgressPercentage = () => {
    if (!timer) return 0
    return ((timer.totalSeconds - timer.remainingSeconds) / timer.totalSeconds) * 100
  }

  // If no timer is running, show input form
  if (!timer) {
    return (
      <div className="space-y-4">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mx-auto flex items-center justify-center mb-3">
            <svg
              className="w-8 h-8 text-primary-500 dark:text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Start a focus session</p>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="What are you working on?"
            value={inputTaskName}
            onChange={(e) => setInputTaskName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            onKeyPress={(e) => e.key === "Enter" && startTimer()}
          />

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Minutes"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              min="1"
              onKeyPress={(e) => e.key === "Enter" && startTimer()}
            />
            <button
              onClick={startTimer}
              className="px-6 py-2 bg-primary-500 dark:bg-primary-600 text-white rounded-lg hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors duration-200 font-medium"
            >
              Start
            </button>
          </div>
        </div>

        {/* Quick presets */}
        <div className="grid grid-cols-3 gap-2">
          {[15, 25, 45].map((mins) => (
            <button
              key={mins}
              onClick={() => {
                setInputMinutes(mins.toString())
              }}
              className="py-2 px-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
            >
              {mins}m
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Active timer display
  return (
    <div className="space-y-4">
      {/* Task Name */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
          {timer.taskName}
        </h3>
        {timer.isPaused && (
          <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">Paused</span>
        )}
      </div>

      {/* Timer Display */}
      <div className="text-center">
        <div className={`text-6xl font-bold ${getTimerColor()} transition-colors duration-500`}>
          {formatTime(timer.remainingSeconds)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${getProgressColor()} transition-all duration-1000 ease-linear`}
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {timer.isPaused ? (
          <button
            onClick={resumeTimer}
            className="flex-1 py-2 px-4 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            Resume
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="flex-1 py-2 px-4 bg-yellow-500 dark:bg-yellow-600 text-white rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors duration-200 font-medium"
          >
            Pause
          </button>
        )}
        <button
          onClick={stopTimer}
          className="flex-1 py-2 px-4 bg-red-500 dark:bg-red-600 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200 font-medium"
        >
          Stop
        </button>
      </div>

      {/* Time Info */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400">
        Total: {formatTime(timer.totalSeconds)}
      </div>
    </div>
  )
}

export default FocusTimer