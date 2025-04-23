import { type NextRequest, NextResponse } from "next/server"
import { generateImage } from "@/app/action/generate-image"


export async function POST(request: NextRequest) {
  try {
    const { prompt, size } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const imageUrl = await generateImage(prompt, size || "1024x1024")

    return NextResponse.json({ url: imageUrl })
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
  }
}
