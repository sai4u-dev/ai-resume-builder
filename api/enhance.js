export const runtime = "edge";

export async function POST(req) {
  try {
    const {
      inputText,
      minLength = 100,
      maxLength = 300,
      asBulletPoints = false,
    } = await req.json();

    if (!inputText || !inputText.trim()) {
      return new Response(JSON.stringify({ error: "Input cannot be empty." }), {
        status: 400,
      });
    }

    const bulletRules = asBulletPoints
      ? `
- Format the final output as clean professional bullet points.
- Each bullet must be a single line, no numbering.
- Keep bullets action-driven and resume-style.
`
      : "";

    const prompt = `
Rewrite and enhance the following text so that the final output is
professional, concise, resume-ready, and strictly between
${minLength} and ${maxLength} characters.

- If the text is too short, expand it meaningfully.
- If the text is too long, summarize it intelligently.
- Return ONLY the improved text with no additional commentary.
${bulletRules}

Text: "${inputText.trim()}"
`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: {
        parts: [{ text: "You are a professional resume writer." }],
      },
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      return new Response(
        JSON.stringify({ error: "AI returned empty response." }),
        { status: 500 }
      );
    }

    const finalText = aiText.trim();

    if (finalText.length < minLength || finalText.length > maxLength) {
      return new Response(
        JSON.stringify({ error: "AI could not meet length requirements." }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ result: finalText }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "AI enhancement failed." }), {
      status: 500,
    });
  }
}
