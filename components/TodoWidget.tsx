// components/TodoWidget.tsx
import React, { useState, useEffect } from "react"
import type { Todo, Priority, CreateTodoInput } from "~types/todo"

const TodoWidget: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newTodo, setNewTodo] = useState<CreateTodoInput>({
    taskName: "",
    description: "",
    priority: "medium",
    deadline: "",
    notes: "",
  })

  // Load todos from chrome storage on mount
  useEffect(() => {
    loadTodos()
  }, [])

  const loadTodos = async () => {
    const storage = await chrome.storage.local.get("todos")
    if (storage.todos) {
      setTodos(storage.todos)
    }
  }

  const saveTodos = async (updatedTodos: Todo[]) => {
    await chrome.storage.local.set({ todos: updatedTodos })
    setTodos(updatedTodos)
  }

  const handleAddTodo = async () => {
    if (!newTodo.taskName.trim()) return

    const todo: Todo = {
      id: crypto.randomUUID(),
      userId: "temp-user", // Will be replaced with real userId after auth
      taskName: newTodo.taskName,
      description: newTodo.description || "",
      createdAt: new Date().toISOString(),
      deadline: newTodo.deadline || null,
      priority: newTodo.priority,
      notes: newTodo.notes || "",
      completed: false,
    }

    const updatedTodos = [...todos, todo]
    await saveTodos(updatedTodos)

    // Reset form
    setNewTodo({
      taskName: "",
      description: "",
      priority: "medium",
      deadline: "",
      notes: "",
    })
    setIsAddingNew(false)
  }

  const handleToggleComplete = async (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    await saveTodos(updatedTodos)
  }

  const handleDeleteTodo = async (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    await saveTodos(updatedTodos)
  }

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-700 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
    }
  }

  const sortedTodos = [...todos].sort((a, b) => {
    // Sort by priority first
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    // Then by deadline
    if (a.deadline && b.deadline) {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    }
    return 0
  })

  // Show only first 5 on new tab
  const displayTodos = sortedTodos.slice(0, 5)

  return (
    <div className="space-y-4">
      {/* Add New Button */}
      {!isAddingNew && (
        <button
          onClick={() => setIsAddingNew(true)}
          className="w-full py-2 px-4 border-2 border-dashed border-primary-300 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors duration-200 font-medium"
        >
          + Add New Task
        </button>
      )}

      {/* Add Todo Form */}
      {isAddingNew && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <input
            type="text"
            placeholder="Task name *"
            value={newTodo.taskName}
            onChange={(e) =>
              setNewTodo({ ...newTodo, taskName: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />

          <input
            type="text"
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Priority
              </label>
              <select
                value={newTodo.priority}
                onChange={(e) =>
                  setNewTodo({
                    ...newTodo,
                    priority: e.target.value as Priority,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Deadline
              </label>
              <input
                type="datetime-local"
                value={newTodo.deadline}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, deadline: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <textarea
            placeholder="Notes"
            value={newTodo.notes}
            onChange={(e) =>
              setNewTodo({ ...newTodo, notes: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={2}
          />

          <div className="flex gap-2">
            <button
              onClick={handleAddTodo}
              className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
            >
              Add Task
            </button>
            <button
              onClick={() => setIsAddingNew(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Todo List */}
      <div className="space-y-2">
        {displayTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          displayTodos.map((todo) => (
            <div
              key={todo.id}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                todo.completed ? "bg-gray-50 opacity-60" : "bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  className="mt-1 w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className={`font-semibold ${
                        todo.completed
                          ? "line-through text-gray-500"
                          : "text-gray-900"
                      }`}
                    >
                      {todo.taskName}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full border ${getPriorityColor(
                          todo.priority
                        )}`}
                      >
                        {todo.priority}
                      </span>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {todo.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {todo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    {todo.deadline && (
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {new Date(todo.deadline).toLocaleDateString()}
                      </span>
                    )}
                    <span>
                      Created {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Show More Link */}
      {todos.length > 5 && (
        <div className="text-center">
          <button
            onClick={() => {
              window.open(
                `${process.env.PLASMO_PUBLIC_API_URL || "http://localhost:3000"}/dashboard`,
                "_blank"
              )
            }}
            className="text-primary-500 hover:text-primary-600 font-medium text-sm"
          >
            View all {todos.length} tasks →
          </button>
        </div>
      )}
    </div>
  )
}

export default TodoWidget