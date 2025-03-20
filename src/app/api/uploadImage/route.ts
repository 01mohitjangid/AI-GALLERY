import { db } from "@/lib/db";
import { images, people } from "@/lib/db/schema";
import { ImageUploadValidator } from "@/lib/validators/imageUpload";
import { auth } from "@clerk/nextjs/server";
import z from "zod";

export async function POST(req: Request, res: Response) {
    try {
        
        // const { userId } = await auth()
        // const isAuth = !!userId
        // if (!isAuth) return new Response("Unauthorized", { status: 401 })

        // const body = await req.json()
        // const { images: _images, personName } = ImageUploadValidator.parse(body)

        // const imgRes = await db.insert(images).values({
        //     imgs: _images,
        //     createdAt: new Date(),
        //     userId,
        // })
        // const userRes = await db.insert(people).values({
        //     username: personName,
        // })
        return new Response(JSON.stringify({ message: "Success" }), { status: 200 })

    } catch (error) {
        console.error(error)
        if (error instanceof z.ZodError)
            return new Response(error.message, { status: 422 })

        return new Response('Could not Upload Image', { status: 500 })
    }
}