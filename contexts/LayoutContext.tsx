// contexts/LayoutContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react"

export type WidgetType = "todos" | "timer" | "motivation" | "bookmarks"

export interface WidgetConfig {
  id: WidgetType
  name: string
  order: number
  visible: boolean
}

interface LayoutContextType {
  widgets: WidgetConfig[]
  updateWidgetOrder: (widgetId: WidgetType, newOrder: number) => void
  toggleWidgetVisibility: (widgetId: WidgetType) => void
  resetLayout: () => void
}

const defaultWidgets: WidgetConfig[] = [
  { id: "todos", name: "Priority Tasks", order: 0, visible: true },
  { id: "timer", name: "Focus Timer", order: 1, visible: true },
  { id: "motivation", name: "Daily Motivation", order: 2, visible: true },
  { id: "bookmarks", name: "Quick Bookmarks", order: 3, visible: true },
]

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>(defaultWidgets)

  useEffect(() => {
    // Load layout from storage
    chrome.storage.local.get("widgetLayout").then((result) => {
      if (result.widgetLayout) {
        setWidgets(result.widgetLayout)
      }
    })
  }, [])

  const saveLayout = (newWidgets: WidgetConfig[]) => {
    setWidgets(newWidgets)
    chrome.storage.local.set({ widgetLayout: newWidgets })
  }

  const updateWidgetOrder = (widgetId: WidgetType, newOrder: number) => {
    const updatedWidgets = [...widgets]
    const widgetIndex = updatedWidgets.findIndex((w) => w.id === widgetId)
    
    if (widgetIndex === -1) return

    const [widget] = updatedWidgets.splice(widgetIndex, 1)
    updatedWidgets.splice(newOrder, 0, widget)

    // Reorder all widgets
    const reorderedWidgets = updatedWidgets.map((w, index) => ({
      ...w,
      order: index,
    }))

    saveLayout(reorderedWidgets)
  }

  const toggleWidgetVisibility = (widgetId: WidgetType) => {
    const updatedWidgets = widgets.map((w) =>
      w.id === widgetId ? { ...w, visible: !w.visible } : w
    )
    saveLayout(updatedWidgets)
  }

  const resetLayout = () => {
    saveLayout(defaultWidgets)
  }

  return (
    <LayoutContext.Provider
      value={{ widgets, updateWidgetOrder, toggleWidgetVisibility, resetLayout }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export const useLayout = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider")
  }
  return context
}