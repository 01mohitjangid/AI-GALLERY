import { type NextRequest, NextResponse } from "next/server"
import { getAllPrompts, getPromptsByCategory, getTrendingPrompts } from "@/lib/prompts"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category")
  const trending = searchParams.get("trending")
  const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

  try {
    let prompts

    if (trending === "true") {
      prompts = await getTrendingPrompts(limit)
    } else if (category) {
      prompts = await getPromptsByCategory(category)
    } else {
      prompts = await getAllPrompts()
    }

    return NextResponse.json({ prompts })
  } catch (error) {
    console.error("Error fetching prompts:", error)
    return NextResponse.json({ error: "Failed to fetch prompts" }, { status: 500 })
  }
}
