"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader, Download, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [size, setSize] = useState("1024x1024")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const { toast } = useToast()

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to generate an image.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      // Use the API route instead of direct server action
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "generate-image",
          prompt: prompt,
          size: size,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate image")
      }

      const data = await response.json()
      setGeneratedImage(data.url)
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadImage = () => {
    if (!generatedImage) return

    const link = document.createElement("a")
    link.href = generatedImage
    link.download = `generated-image-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

    

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Generate Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 flex-1">
          <div className="space-y-2">
            <Label htmlFor="image-prompt">Image Prompt</Label>
            <Textarea
              id="image-prompt"
              placeholder="Describe the image you want to generate..."
              className="min-h-[200px] resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Image Size</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger id="size">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1024x1024">1024x1024 (Square)</SelectItem>
                <SelectItem value="1024x1792">1024x1792 (Portrait)</SelectItem>
                <SelectItem value="1792x1024">1792x1024 (Landscape)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleGenerateImage}
            disabled={isGenerating || !prompt.trim()}
            className="w-full flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader className="h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Generate Image
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Generated Image</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center p-8">
              <Loader className="h-8 w-8 animate-spin mb-4" />
              <p className="text-muted-foreground">Generating your image...</p>
            </div>
          ) : generatedImage ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={generatedImage || "/placeholder.svg"}
                alt="Generated from prompt"
                width={1024}  // Set appropriate width based on your largest possible image size
                height={1024} // Set appropriate height based on your largest possible image size
                className="max-w-full max-h-[400px] object-contain rounded-md shadow-md"
                priority // Add this if this image is above the fold
              />
            </div>
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground">Your generated image will appear here</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="ml-auto flex items-center gap-2"
            onClick={handleDownloadImage}
            disabled={!generatedImage}
          >
            <Download className="h-4 w-4" /> Download Image
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
