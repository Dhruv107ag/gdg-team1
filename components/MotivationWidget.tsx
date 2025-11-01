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
    {
      text: "Don't let yesterday take up too much of today.",
      author: "Will Rogers",
    },
    {
      text: "You learn more from failure than from success. Don't let it stop you.",
      author: "Unknown",
    },
    {
      text: "It's not whether you get knocked down, it's whether you get up.",
      author: "Vince Lombardi",
    },
    {
      text: "People who are crazy enough to think they can change the world, are the ones who do.",
      author: "Rob Siltanen",
    },
    {
      text: "Failure will never overtake me if my determination to succeed is strong enough.",
      author: "Og Mandino",
    },
    {
      text: "We may encounter many defeats but we must not be defeated.",
      author: "Maya Angelou",
    },
    {
      text: "Knowing is not enough; we must apply. Wishing is not enough; we must do.",
      author: "Johann Wolfgang Von Goethe",
    },
    {
      text: "Whether you think you can or think you can't, you're right.",
      author: "Henry Ford",
    },
  ]

  // Unsplash image IDs for nature/calm images
  const imageIds = [
    "photo-1506905925346-21bda4d32df4", // mountain
    "photo-1441974231531-c6227db76b6e", // forest
    "photo-1470071459604-3b5ec3a7fe05", // sunset
    "photo-1447752875215-b2761acb3c5d", // flowers
    "photo-1501594907352-04cda38ebc29", // ocean
    "photo-1469474968028-56623f02e42e", // nature
    "photo-1518531933037-91b2f5f229cc", // peaceful
    "photo-1507525428034-b723cf961d3e", // beach
    "photo-1472214103451-9374bd1c798e", // mountains
    "photo-1464822759023-fed622ff2c3b", // snow mountains
  ]

  useEffect(() => {
    // Load new quote on every mount (every new tab/refresh)
    loadNewQuote()
  }, [])

  const loadNewQuote = async () => {
    // Always generate a new random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    const randomImageId = imageIds[Math.floor(Math.random() * imageIds.length)]
    const imageUrl = `https://images.unsplash.com/${randomImageId}?w=400&h=300&fit=crop`

    setCurrentQuote(randomQuote)
    setBackgroundImage(imageUrl)
  }

  const refreshQuote = () => {
    // Generate a new quote different from current one
    let newQuote = quotes[Math.floor(Math.random() * quotes.length)]
    
    // Try to get a different quote than the current one
    let attempts = 0
    while (newQuote.text === currentQuote?.text && attempts < 5) {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)]
      attempts++
    }

    const randomImageId = imageIds[Math.floor(Math.random() * imageIds.length)]
    const imageUrl = `https://images.unsplash.com/${randomImageId}?w=400&h=300&fit=crop`

    setCurrentQuote(newQuote)
    setBackgroundImage(imageUrl)
  }

  if (!currentQuote) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-400 dark:text-gray-500">Loading inspiration...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Background Image */}
      <div
        className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-primary-400 to-secondary-500 dark:from-primary-600 dark:to-secondary-700"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/50" />
        
        {/* Quote Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
          <svg
            className="w-8 h-8 text-white/70 mb-3"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          
          <blockquote className="text-white text-lg font-medium leading-relaxed mb-3 drop-shadow-lg">
            {currentQuote.text}
          </blockquote>
          
          <cite className="text-white/90 text-sm not-italic drop-shadow">
            — {currentQuote.author}
          </cite>
        </div>
      </div>

      {/* Refresh Button */}
      <button
        onClick={refreshQuote}
        className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2"
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