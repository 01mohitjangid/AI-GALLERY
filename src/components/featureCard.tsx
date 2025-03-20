"use client"

import { useState } from "react"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={`bg-white dark:bg-black rounded-lg shadow-md p-6 cursor-pointer transition-all duration-300 ease-in-out ${isExpanded ? "scale-105" : "hover:scale-105"}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p
        className={`text-gray-600 dark:text-gray-300 transition-all duration-300 ease-in-out ${isExpanded ? "max-h-96" : "max-h-0 overflow-hidden"}`}
      >
        {description}
      </p>
      <button className="mt-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  )
}

