import type React from "react"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Download, Upload, RefreshCw } from "lucide-react"

export default function ImageEnhancer() {
  const [image, setImage] = useState<string | null>(null)
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [blur, setBlur] = useState(0)
  const [sepia, setSepia] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Apply filters to the image
  useEffect(() => {
    if (!image) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.src = image

    img.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = img.width
      canvas.height = img.height

      // Draw the original image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Apply filters
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px) sepia(${sepia}%)`
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Update the enhanced image
      setEnhancedImage(canvas.toDataURL("image/jpeg"))
    }
  }, [image, brightness, contrast, saturation, blur, sepia])

  // Handle image download
  const downloadImage = () => {
    if (!enhancedImage) return

    const link = document.createElement("a")
    link.href = enhancedImage
    link.download = "enhanced-image.jpg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Reset all filters
  const resetFilters = () => {
    setBrightness(100)
    setContrast(100)
    setSaturation(100)
    setBlur(0)
    setSepia(0)
  }

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Image Enhancer</CardTitle>
          <CardDescription>
            Upload an image and adjust the settings to enhance it. When you&apos;re satisfied, download the result.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image upload and preview */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div
                className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={triggerFileInput}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Click to upload an image</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG or GIF (max. 10MB)</p>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="brightness">Brightness: {brightness}%</Label>
                  </div>
                  <Slider
                    id="brightness"
                    min={0}
                    max={200}
                    step={1}
                    value={[brightness]}
                    onValueChange={(value) => setBrightness(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="contrast">Contrast: {contrast}%</Label>
                  </div>
                  <Slider
                    id="contrast"
                    min={0}
                    max={200}
                    step={1}
                    value={[contrast]}
                    onValueChange={(value) => setContrast(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="saturation">Saturation: {saturation}%</Label>
                  </div>
                  <Slider
                    id="saturation"
                    min={0}
                    max={200}
                    step={1}
                    value={[saturation]}
                    onValueChange={(value) => setSaturation(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="blur">Blur: {blur}px</Label>
                  </div>
                  <Slider
                    id="blur"
                    min={0}
                    max={10}
                    step={0.1}
                    value={[blur]}
                    onValueChange={(value) => setBlur(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="sepia">Sepia: {sepia}%</Label>
                  </div>
                  <Slider
                    id="sepia"
                    min={0}
                    max={100}
                    step={1}
                    value={[sepia]}
                    onValueChange={(value) => setSepia(value[0])}
                  />
                </div>
              </div>
            </div>

            {/* Image preview */}
            <div className="space-y-4">
              {enhancedImage ? (
                <div className="border rounded-lg overflow-hidden">
                  <Image
                    src={enhancedImage}
                    alt="Enhanced"
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain max-h-[400px]"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="border rounded-lg flex items-center justify-center h-[300px] bg-muted/30">
                  <p className="text-muted-foreground">Preview will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Hidden canvas for processing */}
          <canvas ref={canvasRef} className="hidden"></canvas>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetFilters} disabled={!image}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
          <Button onClick={downloadImage} disabled={!enhancedImage}>
            <Download className="mr-2 h-4 w-4" />
            Download Enhanced Image
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
