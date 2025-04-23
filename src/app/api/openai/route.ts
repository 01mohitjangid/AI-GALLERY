import { type NextRequest, NextResponse } from "next/server"
import { enhancePrompt } from "@/app/action/enhance-prompt"
import { generateImage } from "@/app/action/generate-image"

export async function POST(request: NextRequest) {
  try {
    const { action, prompt, size } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    if (action === "enhance") {
      const enhancedPrompt = await enhancePrompt(prompt)
      return NextResponse.json({ result: enhancedPrompt })
    } else if (action === "generate-image") {
      const imageUrl = await generateImage(prompt, size)
      return NextResponse.json({ url: imageUrl })
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("OpenAI API error:", error)
    return NextResponse.json({ error: "API request failed" }, { status: 500 })
  }
}
