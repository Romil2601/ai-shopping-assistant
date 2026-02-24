const API_BASE = import.meta.env.VITE_API_URL;

export async function sendChatMessage(message) {
  const res = await fetch(`${API_BASE}/api/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error("AI request failed");
  }

  return res.json();
}