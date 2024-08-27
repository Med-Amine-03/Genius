import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { CreateChatCompletionRequestMessage } from 'openai/resources/index.mjs';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.LAMA_API_KEY,
});

const instructionMessage:CreateChatCompletionRequestMessage={
  role:"system",
  content:"you are a code generator you must anser only in markdown code snippets.use code comment for explenation",
  
}

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { messages } = body;

    
    console.log('Received Messages:', messages);

   
    if (!userId) {
      console.error('Unauthorized Access');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    
    if (!process.env.LAMA_API_KEY) {
      console.error('API Key is missing');
      return new NextResponse('OpenAI API Key not found', { status: 500 });
    }

    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error('Invalid or Missing Messages');
      return new NextResponse('Messages are required', { status: 400 });
    }

    
    for (const message of messages) {
      if (typeof message.content !== 'string' || typeof message.role !== 'string') {
        console.error('Invalid Message Format:', message);
        return new NextResponse('Invalid message format', { status: 400 });
      }
    }

    
    const response = await generateText({
      model: groq('llama3-70b-8192'),
      messages:[instructionMessage, ...messages]
    });

    
    console.log('Generate Text Response:', response);

    
    if (!response || !response.text) {
      console.error('Failed to generate text:', response);
      return new NextResponse('Failed to generate text', { status: 500 });
    }

   
    const assistantResponse = {
      role: 'assistant', 
      content: response.text,
    };

    
    console.log('Assistant Response:', assistantResponse);

    return NextResponse.json(assistantResponse);
  } catch (error) {
    console.error('[CONVERSATION_ERROR]', error); 
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
