import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
  ) {
  
    if (request.method !== 'GET') {
      return response.status(405).end();
    }
  
    response.json({ message: 'Response message' });
  }