import { UTApi } from "uploadthing/server";
 

export async function getAllImages () {
    const utapi = new UTApi();

    const files = await utapi.listFiles();
    return files;
}

export async function GET(req: Request, res: Response) {
    try {
        let files = await    getAllImages()
        // const { userId } = auth()
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
        return new Response(JSON.stringify({ files }), { status: 200 })

    } catch (error) {
        // if (error instanceof z.ZodError)
        //     return new Response(error.message, { status: 422 })
        console.error(error)
        return new Response('Get image', { status: 500 })
    }
}