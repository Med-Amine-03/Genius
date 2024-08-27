import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';
import { Buffer } from 'buffer';

const API_KEY = process.env.NEW_API_KEY;
const API_URL = 'https://api.vyro.ai/v1/imagine/api/generations';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!API_KEY) {
      return new NextResponse('Prodia API Key not found', { status: 500 });
    }

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }
    const randomStyleId = getRandomInt(6, 92);
    
    const form = new FormData();
    form.append('prompt', prompt);
    form.append('style_id', `33:${randomStyleId.toString()}`); // Example style_id
    console.log(randomStyleId)
    
    const response = await axios.post(
      API_URL,
      form,
      {
        headers: {
          ...form.getHeaders(),
          'Authorization': `Bearer ${API_KEY}`,
        },
        responseType: 'arraybuffer', 
      }
    );

    
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    const imageSrc = `data:image/png;base64,${base64Image}`;

    return new NextResponse(JSON.stringify({ imageSrc }), { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('[IMAGE_ERROR]', error.response.data);
      return new NextResponse('Error generating image', { status: error.response.status });
    } else {
      console.error('[IMAGE_ERROR]', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }
}
