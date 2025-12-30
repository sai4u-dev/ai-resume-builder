export async function enhanceText({
  inputText,
  minLength = 100,
  maxLength = 300,
  asBulletPoints = false,
}) {
  const res = await fetch("/api/enhance", {
    // relative path, no localhost
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      inputText,
      minLength,
      maxLength,
      asBulletPoints,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to enhance text");
  }

  return res.json(); // returns { result: "enhanced text" }
}
