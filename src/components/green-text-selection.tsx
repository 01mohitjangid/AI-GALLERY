"use client"

export function GreenTextSelection() {
  return (
    <style jsx global>{`
      ::selection {
        background-color: #195634; 
        color: #ffffff; /* White text */
      }
    `}</style>
  )
}