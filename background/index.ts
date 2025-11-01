// background/index.ts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SAVE_BOOKMARK") {
    saveBookmark(message.data)
    sendResponse({ success: true })
    return true
  }
})

async function saveBookmark(bookmarkData: {
  title: string
  url: string
  favicon?: string
}) {
  // Get existing bookmarks
  const storage = await chrome.storage.local.get("bookmarks")
  const bookmarks = storage.bookmarks || []

  // Create new bookmark
  const newBookmark = {
    id: crypto.randomUUID(),
    userId: "temp-user", // Will be replaced with real userId after auth
    title: bookmarkData.title,
    url: bookmarkData.url,
    favicon: bookmarkData.favicon,
    createdAt: new Date().toISOString(),
  }

  // Add to bookmarks array
  bookmarks.push(newBookmark)

  // Save to storage
  await chrome.storage.local.set({ bookmarks })
}