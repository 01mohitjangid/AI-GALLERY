"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function usePreloader() {
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // On initial mount, show the preloader
    if (typeof window !== "undefined") {
      // Check if this is a navigation within the site
      const isNavigatingWithin = sessionStorage.getItem("currentlyBrowsing") === "true"

      if (isNavigatingWithin && pathname === "/") {
        // If navigating back to home from within the site, don't show preloader
        setLoading(false)
      } else {
        // For initial load or direct navigation to a page, show preloader
        setLoading(true)
        // Mark that the user is now browsing the site
        sessionStorage.setItem("currentlyBrowsing", "true")
      }
    }

    // Clean up function
    return () => {
      // When component unmounts (navigating away), we're still within the site
      if (typeof window !== "undefined") {
        sessionStorage.setItem("currentlyBrowsing", "true")
      }
    }
  }, [pathname])

  const handleLoadComplete = () => {
    setLoading(false)
  }

  return { loading, handleLoadComplete }
}

