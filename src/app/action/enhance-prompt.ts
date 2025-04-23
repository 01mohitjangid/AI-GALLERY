"use server"

import OpenAI from "openai"

export async function enhancePrompt(prompt: string): Promise<string> {
  try {
    // Initialize OpenAI inside the function to ensure it only runs on the server
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a prompt engineering expert. Your task is to enhance and improve the user's prompt to make it more detailed, specific, and effective. Maintain the original intent but add clarity, specifics, and structure.",
        },
        {
          role: "user",
          content: `Please enhance this prompt: "${prompt}"`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    return response.choices[0]?.message.content || ""
  } catch (error) {
    console.error("Error enhancing prompt:", error)
    throw new Error("Failed to enhance prompt")
  }
}
