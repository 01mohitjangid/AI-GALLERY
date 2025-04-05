import { type NextRequest, NextResponse } from "next/server"
import { experimental_generateImage } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { image, prompt } = await request.json()

    if (!image || !prompt) {
      return NextResponse.json({ error: "Image and prompt are required" }, { status: 400 })
    }

    // Create a prompt that includes the user's instructions and references the image
    const fullPrompt = `Enhance this image according to these instructions: ${prompt}`

    // Generate the enhanced image using OpenAI
    const result = await experimental_generateImage({
      model: openai.image("dall-e-3"),
      prompt: fullPrompt,
    })

    // Return the enhanced image
    return NextResponse.json({
      enhancedImageUrl: `data:image/png;base64,${result.image.base64}`,
    })
  } catch (error) {
    console.error("Error enhancing image:", error)
    return NextResponse.json({ error: "Failed to enhance image" }, { status: 500 })
  }
}