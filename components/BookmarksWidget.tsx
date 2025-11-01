// components/BookmarksWidget.tsx
import React, { useState, useEffect } from "react"
import type { Bookmark } from "~types/bookmark"

const BookmarksWidget: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [newBookmark, setNewBookmark] = useState({ title: "", url: "" })

  useEffect(() => {
    loadBookmarks()

    // Listen for storage changes (when bookmark is saved via Ctrl+X)
    const handleStorageChange = (changes: any, area: string) => {
      if (area === "local" && changes.bookmarks) {
        setBookmarks(changes.bookmarks.newValue || [])
      }
    }

    chrome.storage.onChanged.addListener(handleStorageChange)

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange)
    }
  }, [])

  const loadBookmarks = async () => {
    const storage = await chrome.storage.local.get("bookmarks")
    if (storage.bookmarks) {
      setBookmarks(storage.bookmarks)
    }
  }

  const normalizeUrl = (url: string): string => {
    // If URL doesn't have protocol, add https://
    if (!url.match(/^https?:\/\//i)) {
      return `https://${url}`
    }
    return url
  }

  const handleAddBookmark = async () => {
    if (!newBookmark.title.trim() || !newBookmark.url.trim()) return

    const bookmark: Bookmark = {
      id: crypto.randomUUID(),
      userId: "temp-user",
      title: newBookmark.title,
      url: normalizeUrl(newBookmark.url),
      createdAt: new Date().toISOString(),
    }

    const updatedBookmarks = [...bookmarks, bookmark]
    await chrome.storage.local.set({ bookmarks: updatedBookmarks })
    setBookmarks(updatedBookmarks)

    setNewBookmark({ title: "", url: "" })
    setIsAdding(false)
  }

  const handleDeleteBookmark = async (id: string) => {
    const updatedBookmarks = bookmarks.filter((b) => b.id !== id)
    await chrome.storage.local.set({ bookmarks: updatedBookmarks })
    setBookmarks(updatedBookmarks)
  }

  const openBookmark = (url: string) => {
    chrome.tabs.create({ url: url })
  }

  // Show last 25 bookmarks, sorted by most recent
  const displayBookmarks = [...bookmarks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 25)

  return (
    <div className="space-y-4">
      {/* Keyboard shortcut hint */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 text-sm text-primary-700">
        <span className="font-semibold">Tip:</span> Press{" "}
        <kbd className="px-2 py-1 bg-white border border-primary-300 rounded text-xs font-mono">
          Ctrl+X
        </kbd>{" "}
        on any page to save it as a bookmark
      </div>

      {/* Add New Button */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-2 px-4 border-2 border-dashed border-primary-300 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors duration-200 font-medium"
        >
          + Add Bookmark Manually
        </button>
      )}

      {/* Add Bookmark Form */}
      {isAdding && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <input
            type="text"
            placeholder="Title *"
            value={newBookmark.title}
            onChange={(e) =>
              setNewBookmark({ ...newBookmark, title: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />

          <input
            type="text"
            placeholder="URL (e.g., github.com or https://github.com) *"
            value={newBookmark.url}
            onChange={(e) =>
              setNewBookmark({ ...newBookmark, url: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <div className="flex gap-2">
            <button
              onClick={handleAddBookmark}
              className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
            >
              Add Bookmark
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Bookmarks List */}
      <div className="space-y-2">
        {displayBookmarks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No bookmarks yet.</p>
            <p className="text-sm mt-2">
              Press <kbd className="px-2 py-1 bg-gray-200 rounded">Ctrl+X</kbd>{" "}
              on any page to save it!
            </p>
          </div>
        ) : (
          displayBookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 group cursor-pointer"
              onClick={() => openBookmark(bookmark.url)}
            >
              {/* Favicon */}
              {bookmark.favicon ? (
                <img
                  src={bookmark.favicon}
                  alt=""
                  className="w-5 h-5 flex-shrink-0"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = "none"
                  }}
                />
              ) : (
                <div className="w-5 h-5 flex-shrink-0 bg-gray-200 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                </div>
              )}

              {/* Title & URL */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate hover:text-primary-500">
                  {bookmark.title}
                </h4>
                <p className="text-xs text-gray-500 truncate">{bookmark.url}</p>
              </div>

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteBookmark(bookmark.id)
                }}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1 transition-opacity duration-200"
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
          ))
        )}
      </div>

      {/* Show More Link */}
      {bookmarks.length > 25 && (
        <div className="text-center">
          <button
            onClick={() => {
              chrome.tabs.create({ 
                url: `${process.env.PLASMO_PUBLIC_API_URL || "http://localhost:3000"}/dashboard/bookmarks`
              })
            }}
            className="text-primary-500 hover:text-primary-600 font-medium text-sm"
          >
            View all {bookmarks.length} bookmarks →
          </button>
        </div>
      )}
    </div>
  )
}

export default BookmarksWidget