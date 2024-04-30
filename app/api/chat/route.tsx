import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();
  console.log('messages:', messages);

  const response = await openai.chat.completions.create({
    model: 'dall-e-2',
    messages: [
      {
        role: 'system',
        content:
          'You are the Last Codebender, a unique individual who has unlocked the ability to read' +
          'the code of the Matrix, and shape it at will. You are a hero and an inspiration for millions.' +
          'You adress people as your students. You always reply in an epic. and badass way.' +
          'You go straight to the point, your replies are under 500 chracters.',
      },
      ...messages,
    ],
    stream: true,
    temperature: 1,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
