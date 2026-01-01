import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  tags: string[];
};

function buildPrompt(topic: string, level: string, type: string, n = 10) {
  return `
You are a quiz generator for an English learning website.

Generate exactly ${n} multiple-choice questions.
Constraints:
- Level: ${level}
- Topic: ${topic}
- Type: ${type} (vocab/grammar/reading)
- Each question must have 4 options (string).
- Only one correct answer.
- Return JSON ONLY (no markdown, no code fences, no extra text).
- Use this exact schema:
[
  {
    "id": "q1",
    "question": "...",
    "options": ["A","B","C","D"],
    "answerIndex": 0,
    "explanation": "...",
    "tags": ["..."]
  }
]
- No duplicate questions.
- Keep language simple for the given level.
  `.trim();
}

function extractJson(text: string) {
  // nếu Gemini lỡ trả ```json ... ```
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const raw = fenced ? fenced[1] : text;

  // lấy đoạn từ dấu [ đến ] cuối cùng (chống nhiễu)
  const start = raw.indexOf("[");
  const end = raw.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) throw new Error("No JSON array found");
  return raw.slice(start, end + 1);
}

function validateQuiz(data: any, n = 10): QuizQuestion[] {
  if (!Array.isArray(data)) throw new Error("Quiz is not an array");
  if (data.length !== n) throw new Error(`Quiz must have exactly ${n} questions`);

  const seen = new Set<string>();

  for (const q of data) {
    if (!q || typeof q !== "object") throw new Error("Invalid question object");

    const { id, question, options, answerIndex, explanation, tags } = q;

    if (typeof id !== "string" || !id) throw new Error("Missing id");
    if (typeof question !== "string" || !question) throw new Error("Missing question");
    if (!Array.isArray(options) || options.length !== 4 || options.some((o) => typeof o !== "string"))
      throw new Error("Options must be 4 strings");
    if (typeof answerIndex !== "number" || answerIndex < 0 || answerIndex > 3)
      throw new Error("answerIndex must be 0..3");
    if (typeof explanation !== "string") throw new Error("Missing explanation");
    if (!Array.isArray(tags) || tags.some((t) => typeof t !== "string")) throw new Error("tags must be string[]");

    // chống trùng câu hỏi
    const key = question.trim().toLowerCase();
    if (seen.has(key)) throw new Error("Duplicate questions detected");
    seen.add(key);
  }

  return data as QuizQuestion[];
}

async function callGemini(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig: {
      temperature: 0.7,
    },
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateWithRetry(prompt: string, retries = 2) {
  let lastErr: any;

  for (let i = 0; i <= retries; i++) {
    try {
      const text = await callGemini(prompt);
      const jsonStr = extractJson(text);
      const parsed = JSON.parse(jsonStr);
      return validateQuiz(parsed, 10);
    } catch (err) {
      lastErr = err;

      // prompt sửa JSON (repair)
      prompt = `Your previous output was invalid JSON or didn't match schema.
Fix it and return JSON ONLY. Do not add any extra text.
Original request:
${prompt}`;
    }
  }

  throw lastErr;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topic = String(body.topic ?? "Daily life");
    const level = String(body.level ?? "A1");
    const type = String(body.type ?? "vocab");

    const prompt = buildPrompt(topic, level, type, 10);
    const quiz = await generateWithRetry(prompt, 2);

    return NextResponse.json({ ok: true, quiz });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Unknown error" },
      { status: 400 }
    );
  }
}
