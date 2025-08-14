import { UTApi } from "uploadthing/server";

export async function GET(req: Request) {
    try {
        const utapi = new UTApi();
        const files = await utapi.listFiles();
        
        return new Response(JSON.stringify({ files }), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'Failed to get images' }), 
            { 
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}
