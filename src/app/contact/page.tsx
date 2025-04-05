"use client"

import { useEffect, useState } from "react"
import ContactForm from "./contact-form"
import ModelViewer from "@/components/model-viewer"

export default function ContactPage() {

  const [modelUrl, setModelUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Assuming you have a global theme state management
  // This could be a custom hook or context that you're using
  // const { theme } = useTheme();

  // Effect to apply the theme class to the document
  useEffect(
    () => {
      // This should be handled by your global theme management
      // document.documentElement.classList.toggle('dark', theme === 'dark');
    },
    [
      /* theme */
    ],
  )

  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      {/* <div className="absolute inset-0 z-0">
        <ModelViewer modelUrl={isLoading ? null : modelUrl} />
      </div> */}
       <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">Contact Us</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Have questions about PromptAI Gallery or need custom AI prompts? We're here to help you get the most out of AI
          technology.
        </p>
        <div className="flex justify-center mb-12">
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.href = '/Image-enhancer'}
          >
            AI Enhancer
          </button>
        </div>
        <ContactForm />
      </div>
    </main>
  )
}

