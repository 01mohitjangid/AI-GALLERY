"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Copy, RefreshCw, Plus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateRandomPrompt } from "../lib/prompts"

export default function PromptGenerator() {
  const [prompt, setPrompt] = useState("")
  const [enhancedPrompt, setEnhancedPrompt] = useState("")
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [title, setTitle] = useState("")
  const { toast } = useToast()

  const handleGenerateRandom = async () => {
    const randomPrompt = await generateRandomPrompt()
    setPrompt(randomPrompt.text)
    setTags(randomPrompt.categories)
    setTitle(randomPrompt.title)
  }

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to enhance.",
        variant: "destructive",
      })
      return
    }

    setIsEnhancing(true)
    try {
      // Use the API route instead of direct server action
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "enhance",
          prompt: prompt,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to enhance prompt")
      }

      const data = await response.json()
      setEnhancedPrompt(data.result)
    } catch (error) {
      toast({
        title: "Enhancement failed",
        description: "Failed to enhance the prompt. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsEnhancing(false)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard.",
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Create Prompt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 flex-1">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a title for your prompt"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Enter your prompt here..."
              className="min-h-[200px] resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} className="flex items-center gap-1">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              />
              <Button variant="outline" size="icon" onClick={handleAddTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGenerateRandom} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Random
          </Button>
          <Button onClick={handleEnhancePrompt} disabled={isEnhancing || !prompt.trim()}>
            {isEnhancing ? "Enhancing..." : "Enhance Prompt"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Enhanced Prompt</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          {enhancedPrompt ? (
            <div className="bg-muted p-4 rounded-md min-h-[200px]">
              <p className="whitespace-pre-wrap">{enhancedPrompt}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                {isEnhancing ? "Enhancing your prompt..." : "Enhanced prompt will appear here"}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="ml-auto flex items-center gap-2"
            onClick={() => handleCopyPrompt(enhancedPrompt)}
            disabled={!enhancedPrompt}
          >
            <Copy className="h-4 w-4" /> Copy Enhanced Prompt
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
