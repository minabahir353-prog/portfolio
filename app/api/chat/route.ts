import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message = body?.message?.trim();

    if (!message) {
      return NextResponse.json(
        {
          error: "Message is required.",
        },
        {
          status: 400,
        }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "GEMINI_API_KEY is missing.",
        },
        {
          status: 500,
        }
      );
    }

    const model =
      process.env.GEMINI_MODEL || "gemini-2.5-flash";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: `
You are Mina Bahir's AI assistant.

Mina Bahir is a professional graphic designer.

His main services are:

- Brand Identity
- Logo Design
- Social Media Design
- Print Design
- Advertising Design
- Creative Design Packages

Help website visitors understand Mina's services,
choose the right service for their project,
and answer questions about his portfolio.

Keep answers:

- Friendly
- Professional
- Short
- Helpful

Do not invent prices or services that are not listed.

If someone wants to work with Mina,
tell them they can contact him through the Contact section.

Always answer clearly and naturally.
                `.trim(),
              },
            ],
          },

          contents: [
            {
              role: "user",
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "Gemini API request failed.",
        },
        {
          status: response.status,
        }
      );
    }

    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || "")
      .join("")
      .trim();

    return NextResponse.json({
      reply:
        reply || "Sorry, I couldn't generate a response.",
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while contacting Gemini.",
      },
      {
        status: 500,
      }
    );
  }
}