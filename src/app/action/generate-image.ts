"use server"

import OpenAI from "openai"

export async function generateImage(prompt: string, size = "1024x1024"): Promise<string> {
  try {
    // Initialize OpenAI inside the function to ensure it only runs on the server
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: size as "1024x1024" | "1024x1792" | "1792x1024",
    })

     return response.data?.[0]?.url || ""
  } catch (error) {
    console.error("Error generating image:", error)
    throw new Error("Failed to generate image")
  }
}
