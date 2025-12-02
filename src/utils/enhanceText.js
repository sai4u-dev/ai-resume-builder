import axios from "axios";

export async function enhanceText(inputText, maxLength, minLength) {
  if (!inputText || !inputText.trim()) {
    return { error: "Input cannot be empty." };
  }

  const trimmed = inputText.trim();

  const api_key = ""

  const prompt = `
    Rewrite and enhance the following text so that the final output is 
    professional, concise, resume-ready, and strictly between 
    ${minLength} and ${maxLength} characters. 
    
    - If the text is too short, expand it meaningfully.
    - If the text is too long, summarize it intelligently.
    - Return ONLY the improved final text with no extra formatting.

    Text: "${trimmed}"
  `;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: {
      parts: [{ text: "You are a professional resume writer." }],
    },
  };

  const apiUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${api_key}";

  try {
    const response = await axios.post(apiUrl, payload, {
      headers: { "Content-Type": "application/json" },
    });

    const aiText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      return { error: "AI returned empty response." };
    }

    const finalText = aiText.trim();

    // Optional safety check — ensures AI followed length rules
    if (finalText.length < minLength || finalText.length > maxLength) {
      return { error: "AI could not produce text within the required length." };
    }

    // return { text: finalText };
    return finalText;
  } catch (error) {
    console.error(error);
    return { error: "AI enhancement failed." };
  }
}
