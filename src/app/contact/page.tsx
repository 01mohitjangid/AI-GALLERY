"use client"

import { useEffect } from "react"
import ContactForm from "./contact-form"

export default function ContactPage() {
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
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">Contact Us</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Have questions about PromptAI Gallery or need custom AI prompts? We're here to help you get the most out of AI
          technology.
        </p>
        <ContactForm />
      </div>
    </main>
  )
}

