// components/MotivationWidget.tsx
import React, { useState, useEffect } from "react"

interface Quote {
  text: string
  author: string
}

const MotivationWidget: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)
  const [backgroundImage, setBackgroundImage] = useState<string>("")

  // Curated motivational quotes for students/professionals
  const quotes: Quote[] = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      text: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius",
    },
    {
      text: "Everything you've ever wanted is on the other side of fear.",
      author: "George Addair",
    },
    {
      text: "Success is not how high you have climbed, but how you make a positive difference to the world.",
      author: "Roy T. Bennett",
    },
    {
      text: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
    },
    {
      text: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins",
    },
    {
      text: "Start where you are. Use what you have. Do what you can.",
      author: "Arthur Ashe",
    },
    {
      text: "You are never too old to set another goal or to dream a new dream.",
      author: "C.S. Lewis",
    },
    {
      text: "The secret of getting ahead is getting started.",
      author: "Mark Twain",
    },
  ]

  // Unsplash image IDs for nature/calm images
  const imageIds = [
    "photo-1506905925346-21bda4d32df4", // mountain
    "photo-1441974231531-c6227db76b6e", // forest
    "photo-1470071459604-3b5ec3a7fe05", // sunset
    "photo-1447752875215-b2761acb3c5d", // flowers
    "photo-1501594907352-04cda38ebc29", // ocean
    "photo-1506905925346-21bda4d32df4", // lake
    "photo-1469474968028-56623f02e42e", // nature
    "photo-1518531933037-91b2f5f229cc", // peaceful
  ]

  useEffect(() => {
    loadDailyMotivation()
  }, [])

  const loadDailyMotivation = async () => {
    // Check if we already have today's quote
    const today = new Date().toDateString()
    const storage = await chrome.storage.local.get(["motivationQuote", "motivationDate", "motivationImage"])

    if (storage.motivationDate === today && storage.motivationQuote) {
      // Use stored quote for today
      setCurrentQuote(storage.motivationQuote)
      setBackgroundImage(storage.motivationImage)
    } else {
      // Generate new quote for today
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
      const randomImageId = imageIds[Math.floor(Math.random() * imageIds.length)]
      const imageUrl = `https://images.unsplash.com/${randomImageId}?w=400&h=300&fit=crop`

      setCurrentQuote(randomQuote)
      setBackgroundImage(imageUrl)

      // Store for today
      await chrome.storage.local.set({
        motivationQuote: randomQuote,
        motivationDate: today,
        motivationImage: imageUrl,
      })
    }
  }

  const refreshQuote = async () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    const randomImageId = imageIds[Math.floor(Math.random() * imageIds.length)]
    const imageUrl = `https://images.unsplash.com/${randomImageId}?w=400&h=300&fit=crop`

    setCurrentQuote(randomQuote)
    setBackgroundImage(imageUrl)

    // Update storage
    const today = new Date().toDateString()
    await chrome.storage.local.set({
      motivationQuote: randomQuote,
      motivationDate: today,
      motivationImage: imageUrl,
    })
  }

  if (!currentQuote) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-400">Loading inspiration...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Background Image */}
      <div
        className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-primary-400 to-secondary-500"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Quote Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
          <svg
            className="w-8 h-8 text-white/70 mb-3"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          
          <blockquote className="text-white text-lg font-medium leading-relaxed mb-3">
            {currentQuote.text}
          </blockquote>
          
          <cite className="text-white/80 text-sm not-italic">
            — {currentQuote.author}
          </cite>
        </div>
      </div>

      {/* Refresh Button */}
      <button
        onClick={refreshQuote}
        className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2"
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        New Inspiration
      </button>
    </div>
  )
}

export default MotivationWidget