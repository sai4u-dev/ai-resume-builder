import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      inputText,
      minLength,
      maxLength,
      asBulletPoints = false,
    } = req.body;

    if (!inputText || !inputText.trim()) {
      return res.status(400).json({ error: "Input cannot be empty." });
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

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${process.env.GEMINI_API_KEY}`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    const aiText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      return res.status(500).json({ error: "AI returned empty response." });
    }

    const finalText = aiText.trim();

    if (finalText.length < minLength || finalText.length > maxLength) {
      return res
        .status(500)
        .json({ error: "AI could not meet length requirements." });
    }

    return res.status(200).json({ result: finalText });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "AI enhancement failed." });
  }
}
