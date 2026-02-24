import { useEffect, useRef, useState } from "react";

export default function ChatBox({ onSend, loading }) {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim() || loading) return;
    onSend(text.trim());
    setText("");
  };

  const handleSend = async (text) => {
    const intent = parseIntent(text);

    // show user message
    setMessages((prev) => [...prev, { role: "user", text }]);

    // 🛒 BUY + CHECKOUT FLOW
    if (intent.wantsBuy && intent.category) {
      setLoading(true);

      try {
        const data = await sendChatMessage(
          `${intent.category}${intent.brand ? " " + intent.brand : ""}`,
        );

        if (Array.isArray(data.reply)) {
          const filtered = intent.brand
            ? data.reply.filter((p) =>
                p.brand.toLowerCase().includes(intent.brand),
              )
            : data.reply;

          const bestProduct = filtered[0];

          if (bestProduct) {
            addToCart(bestProduct);

            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                text: `🛒 Added ${bestProduct.name} to cart`,
              },
            ]);

            if (intent.wantsCheckout) {
              setMessages((prev) => [
                ...prev,
                { role: "assistant", text: "Proceeding to checkout 💳" },
              ]);
              navigate("/checkout");
            }
          }
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Couldn't complete the purchase." },
        ]);
      } finally {
        setLoading(false);
      }

      return;
    }

    // 👇 fallback to normal chat logic
  };

  const handleKeyDown = (e) => {
    // Enter → send
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
    // Shift + Enter → newline (default behavior)
  };

  const parseIntent = (text) => {
    const lower = text.toLowerCase();

    return {
      wantsBuy: lower.includes("buy"),
      wantsAdd: lower.includes("add"),
      wantsCheckout: lower.includes("checkout"),
      category: ["tv", "mobile", "laptop"].find((c) => lower.includes(c)),
      brand: ["samsung", "sony", "lg", "oneplus", "hp", "dell","iphone"].find(
        (b) => lower.includes(b),
      ),
    };
  };

  return (
    <div className="flex gap-2 p-4">
      <textarea
        className="flex-1 p-2 border rounded resize-none text-black disabled:bg-gray-100"
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about mobiles under 70000..."
        disabled={loading}
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600"
        }`}
      >
        Send
      </button>
    </div>
  );
}
