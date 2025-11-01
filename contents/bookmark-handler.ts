// contents/bookmark-handler.ts
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  run_at: "document_end"
}

// Listen for Ctrl+X keyboard shortcut
document.addEventListener("keydown", async (event) => {
  // Check for Ctrl+X (or Cmd+X on Mac)
  if ((event.ctrlKey || event.metaKey) && event.key === "x") {
    // Prevent default cut behavior
    event.preventDefault()

    // Get current page info
    const pageTitle = document.title
    const pageUrl = window.location.href
    const favicon = getFavicon()

    // Send message to background or show popup
    chrome.runtime.sendMessage({
      type: "SAVE_BOOKMARK",
      data: {
        title: pageTitle,
        url: pageUrl,
        favicon: favicon
      }
    })

    // Show inline notification
    showNotification("Bookmark saved!")
  }
})

function getFavicon(): string {
  const favicon = document.querySelector<HTMLLinkElement>('link[rel*="icon"]')
  if (favicon && favicon.href) {
    return favicon.href
  }
  // Fallback to default favicon location
  return `${window.location.origin}/favicon.ico`
}

function showNotification(message: string) {
  const notification = document.createElement("div")
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #667eea;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    animation: slideIn 0.3s ease-out;
  `
  notification.textContent = message

  // Add animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `
  document.head.appendChild(style)

  document.body.appendChild(notification)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideIn 0.3s ease-out reverse"
    setTimeout(() => {
      notification.remove()
      style.remove()
    }, 300)
  }, 3000)
}