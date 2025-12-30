import axios from "axios";

export async function enhanceText(
  inputText,
  maxLength = 800,
  minLength = 300,
  bulletPoints = false
) {
  if (!inputText || !inputText.trim()) {
    return { error: "Input cannot be empty." };
  }

  const trimmed = inputText.trim();

  const formattingInstruction = bulletPoints
    ? "- Format the final response as professional bullet points.\n- Use three bullet per key idea."
    : "- Return ONLY the improved final text with no extra formatting.";

  const prompt = `
    Rewrite and enhance the following text so that the final output is 
    professional, concise, resume-ready, and strictly between 
    ${minLength} and ${maxLength} characters. 
    
    - If the text is too short, expand it meaningfully.
    - If the text is too long, summarize it intelligently.
    ${formattingInstruction}

    Text: "${trimmed}"
  `;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: {
      parts: [{ text: "You are a professional resume writer." }],
    },
  };

  const apiUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=AIzaSyDIoZQZQwZGERv-OLVrLYPaAkeiu6gSqk8";

  try {
    const response = await axios.post(apiUrl, payload, {
      headers: { "Content-Type": "application/json" },
    });

    const aiText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      return { error: "AI returned empty response." };
    }

    const finalText = aiText.trim();

    // Length safety check
    if (finalText.length < minLength || finalText.length > maxLength) {
      return { error: "AI could not produce text within the required length." };
    }

    return finalText;
  } catch (error) {
    console.error(error);
    return { error: "AI enhancement failed." };
  }
}
