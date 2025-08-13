"use client"

import { X } from "lucide-react"
import Image from "next/image"

interface ImageUploadAreaProps {
  previewUrls: string[]
  onRemoveImage: (index: number) => void
  isLoading?: boolean
}

export default function ImageUploadArea({ previewUrls, onRemoveImage, isLoading = false }: ImageUploadAreaProps) {
  if (previewUrls.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 px-4 pt-3 pointer-events-auto">
      {previewUrls.map((url, index) => (
        <div key={index} className="relative h-16 w-16">
          <Image
            src={url || "/placeholder.svg"}
            alt={`Preview ${index + 1}`}
            width={64}
            height={64}
            className="object-cover rounded-full"
            fill
            sizes="64px"
          />
          {!isLoading && (
            <button type="button" onClick={() => onRemoveImage(index)} className="absolute -top-1 -right-1">
              <X className="h-3 w-3 text-white" />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

