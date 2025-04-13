"use client"

export function GreenTextSelection() {
  return (
    <style jsx global>{`
      ::selection {
        background-color: #042f2e; /* Corrected with # */
        color: #ffffff; /* White text */
      }
    `}</style>
  )
}