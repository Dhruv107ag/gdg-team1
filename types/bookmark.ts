// types/bookmark.ts
export interface Bookmark {
  id: string
  userId: string
  title: string
  url: string
  createdAt: string
  favicon?: string
}

export interface CreateBookmarkInput {
  title: string
  url: string
  favicon?: string
}