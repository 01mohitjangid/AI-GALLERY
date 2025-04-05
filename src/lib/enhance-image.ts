export async function enhanceImage(originalImageBase64: string, prompt: string): Promise<{ enhancedImageUrl: string }> {
    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: originalImageBase64,
          prompt,
        }),
      })
  
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to enhance image")
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error enhancing image:", error)
      throw new Error("Failed to enhance image")
    }
  }
  
  