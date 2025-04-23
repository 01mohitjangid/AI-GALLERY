"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Copy, ThumbsUp, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getAllPrompts } from "../lib/prompts"
import type { Prompt } from "@/types/prompt"

export default function PromptGallery() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchPrompts = async () => {
      const allPrompts = await getAllPrompts()
      setPrompts(allPrompts)
      setFilteredPrompts(allPrompts)
    }

    fetchPrompts()
  }, [])

  useEffect(() => {
    let result = prompts

    if (searchTerm) {
      result = result.filter(
        (prompt) =>
          prompt.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prompt.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory) {
      result = result.filter((prompt) => prompt.categories.includes(selectedCategory))
    }

    setFilteredPrompts(result)
  }, [searchTerm, selectedCategory, prompts])

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard.",
    })
  }

  const handleLikePrompt = (id: string) => {
    setPrompts(prompts.map((prompt) => (prompt.id === id ? { ...prompt, likes: prompt.likes + 1 } : prompt)))
  }

  const uniqueCategories = Array.from(new Set(prompts.flatMap((prompt) => prompt.categories)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {selectedCategory || "All Categories"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedCategory(null)}>All Categories</DropdownMenuItem>
            {uniqueCategories.map((category) => (
              <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {filteredPrompts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No prompts found. Try a different search term or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <Card key={prompt.id} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{prompt.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground">{prompt.text}</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div className="flex flex-wrap gap-2">
                  {prompt.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyPrompt(prompt.text)}
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" /> Copy
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLikePrompt(prompt.id)}
                    className="flex items-center gap-2"
                  >
                    <ThumbsUp className="h-4 w-4" /> {prompt.likes}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
