// types/todo.ts
export type Priority = "low" | "medium" | "high" | "urgent"

export interface Todo {
  id: string
  userId: string
  taskName: string
  description: string
  createdAt: string
  deadline: string | null
  priority: Priority
  notes: string
  completed: boolean
}

export interface CreateTodoInput {
  taskName: string
  description?: string
  deadline?: string
  priority: Priority
  notes?: string
}

export interface UpdateTodoInput extends Partial<CreateTodoInput> {
  id: string
  completed?: boolean
}