import type { Prompt } from "@/types/prompt"

// Sample prompts data
const samplePrompts: Prompt[] = [
  {
    id: "1",
    title: "Futuristic City",
    text: "Create a detailed image of a futuristic city with flying cars, holographic advertisements, and towering skyscrapers.",
    categories: ["Cityscape", "Futuristic", "Sci-Fi"],
    likes: 42,
  },
  {
    id: "2",
    title: "Fantasy Character",
    text: "Design a fantasy character who is half-elf, half-dragon with ornate armor and magical abilities.",
    categories: ["Character", "Fantasy", "Magic"],
    likes: 38,
  },
  {
    id: "3",
    title: "Underwater Scene",
    text: "Generate an underwater scene with bioluminescent creatures, ancient ruins, and a hidden treasure.",
    categories: ["Nature", "Underwater", "Mystery"],
    likes: 27,
  },
  {
    id: "4",
    title: "Cyberpunk Portrait",
    text: "Create a cyberpunk-style portrait of a character with neon lights, cybernetic implants, and a rainy night background.",
    categories: ["Portrait", "Cyberpunk", "Sci-Fi"],
    likes: 53,
  },
  {
    id: "5",
    title: "Enchanted Forest",
    text: "Illustrate an enchanted forest with magical creatures, glowing plants, and a mystical atmosphere.",
    categories: ["Nature", "Fantasy", "Magic"],
    likes: 31,
  },
  {
    id: "6",
    title: "Space Exploration",
    text: "Design a scene of astronauts exploring an alien planet with strange flora, fauna, and geological formations.",
    categories: ["Space", "Sci-Fi", "Exploration"],
    likes: 45,
  },
  {
    id: "7",
    title: "Steampunk Invention",
    text: "Create a detailed steampunk invention with brass gears, steam pipes, and Victorian-era aesthetics.",
    categories: ["Steampunk", "Technology", "Historical"],
    likes: 29,
  },
  {
    id: "8",
    title: "Post-Apocalyptic Landscape",
    text: "Generate a post-apocalyptic landscape with abandoned buildings, overgrown vegetation, and survivors adapting to the new world.",
    categories: ["Landscape", "Post-Apocalyptic", "Dystopian"],
    likes: 36,
  },
  {
    id: "9",
    title: "Mythological Battle",
    text: "Illustrate an epic battle between mythological creatures like dragons, phoenixes, and titans in a dramatic setting.",
    categories: ["Action", "Mythology", "Fantasy"],
    likes: 48,
  },
  {
    id: "10",
    title: "Cozy Cabin",
    text: "Design a cozy cabin in the woods during winter, with snow falling, warm lights from the windows, and smoke from the chimney.",
    categories: ["Architecture", "Winter", "Cozy"],
    likes: 39,
  },
]

export async function getAllPrompts(): Promise<Prompt[]> {
  // In a real application, this would fetch from a database
  return samplePrompts
}

export async function generateRandomPrompt(): Promise<Prompt> {
  const randomIndex = Math.floor(Math.random() * samplePrompts.length)
  return samplePrompts[randomIndex]
}

export async function getPromptsByCategory(category: string): Promise<Prompt[]> {
  return samplePrompts.filter((prompt) => prompt.categories.includes(category))
}

export async function getTrendingPrompts(limit = 5): Promise<Prompt[]> {
  return [...samplePrompts].sort((a, b) => b.likes - a.likes).slice(0, limit)
}
