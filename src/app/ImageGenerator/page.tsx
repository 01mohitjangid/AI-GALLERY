import { Suspense } from "react"
import PromptGallery from "@/components/prompt-gallery"
import PromptGenerator from "@/components/prompt-generator"
import ImageGenerator from "@/components/image-generator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">AI Prompt Gallery</h1>

      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gallery">Prompt Gallery</TabsTrigger>
          <TabsTrigger value="generator">Prompt Generator</TabsTrigger>
          <TabsTrigger value="image">Image Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="mt-6">
          <Suspense fallback={<GallerySkeleton />}>
            <PromptGallery />
          </Suspense>
        </TabsContent>

        <TabsContent value="generator" className="mt-6">
          <PromptGenerator />
        </TabsContent>

        <TabsContent value="image" className="mt-6">
          <ImageGenerator />
        </TabsContent>
      </Tabs>
    </main>
  )
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-24 w-full mb-4" />
            <div className="flex gap-2">
              {Array(3)
                .fill(0)
                .map((_, j) => (
                  <Skeleton key={j} className="h-6 w-16" />
                ))}
            </div>
          </div>
        ))}
    </div>
  )
}
