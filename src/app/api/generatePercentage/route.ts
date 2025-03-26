import { db } from "@/lib/db";
import { images, people } from "@/lib/db/schema";
import { ImageUploadValidator } from "@/lib/validators/imageUpload";
import { auth } from "@clerk/nextjs/server";
import z from "zod";
import OpenAI from "openai";
import Instructor from "@instructor-ai/instructor";

export async function POST(req: Request, res: Response) {
  try {
    const openai = new OpenAI({
      apiKey: "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",
    });

    const body = await req.json();
    const { image_url, user_query } = body;

    console.log("image_url", image_url);
    
    const response = await openai.chat.completions
      .create({
        model: "gpt-4o-mini", // Specify the Vision model
        messages: [
          {
            role: "system",
            content: "Provide only the percentage of relevance between the user's query and the image.",
          },
          {
            role: "user", // Provide the image URL
            content: [
              {
                type: "image_url",
                image_url: {
                  url: image_url,
                },
              },
            ],
          },
          {
            role: "system", // Provide the prompt
            content: user_query,
          },
          //   {
          //     role: 'user',
          //     content: prompt
          //   }
        ],
      })
      .withResponse();
      

      console.log("response", response);

    return new Response(JSON.stringify({ response: response.data }), {
      status: 200,
    });

  } catch (error: any) {
    console.error("Full error stack:", error); // This will log the full error stack
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
