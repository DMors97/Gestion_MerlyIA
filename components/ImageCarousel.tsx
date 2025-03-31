'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FBO.jpg-XXAxrbhbULL2DHNUOWq74fPJWaV1pt.jpeg",
    alt: "Airport Staff Member"
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rampa.jpg-hfvwHSE1vXvvk6YdyIXVVr4aDktrn5.jpeg",
    alt: "Ground Crew Member"
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Carga.jpg-xTjR9byttUU8raNgMzPxUvVRYKf3Z8.jpeg",
    alt: "Cargo Handling"
  }
]

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900">
      {images.map((image, index) => (
        <div
          key={image.url}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/30" /> {/* Overlay for better text readability */}
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

