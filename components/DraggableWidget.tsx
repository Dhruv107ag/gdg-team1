// components/DraggableWidget.tsx
import React, { useState } from "react"
import type { WidgetType } from "~contexts/LayoutContext"

interface DraggableWidgetProps {
  id: WidgetType
  title: string
  children: React.ReactNode
  onDragStart: (id: WidgetType) => void
  onDragOver: (id: WidgetType) => void
  onDragEnd: () => void
  className?: string
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  id,
  title,
  children,
  onDragStart,
  onDragOver,
  onDragEnd,
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div
      draggable
      onDragStart={() => {
        setIsDragging(true)
        onDragStart(id)
      }}
      onDragOver={(e) => {
        e.preventDefault()
        onDragOver(id)
      }}
      onDragEnd={() => {
        setIsDragging(false)
        onDragEnd()
      }}
      className={`
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        rounded-xl p-6 
        shadow-sm hover:shadow-md 
        transition-all duration-200 
        cursor-move
        ${isDragging ? "opacity-50 scale-95" : "opacity-100"}
        ${className}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

export default DraggableWidget