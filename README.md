# Genius: AI assistant SaaS

A Next.js SaaS app with several AI tools behind user accounts: a conversational assistant, code generation and image generation.

## Features

| Tool | Route |
|---|---|
| Conversation assistant (LLM) | `/conversation` → `app/api/conversation` |
| Code generation with Markdown rendering | `/code` → `app/api/code` |
| Image generation | `/image` → `app/api/image` |
| Landing page, dashboard and authentication | `/`, `/dashboard`, `/sign-in`, `/sign-up` |

## Tech stack

Next.js · TypeScript · Tailwind CSS · shadcn/ui · Clerk (auth) · Prisma · OpenAI / Groq APIs · Replicate · Vercel

## Run it

```bash
git clone https://github.com/Med-Amine-03/Genius.git
cd Genius
npm install
npm run dev   # http://localhost:3000
```

Set the Clerk, database and AI provider API keys in `.env` first.
