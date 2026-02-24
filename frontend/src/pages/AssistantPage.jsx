import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { fetchProducts } from "../services/productApi";
import Header from "../components/Header.jsx";
import ChatBox from "../components/ChatBox.jsx";
import MessageBubble from "../components/MessageBubble.jsx";
import { sendChatMessage } from "../services/aiApi.js";
import ProductCard from "../components/ProductCard.jsx";

/* 🔍 INTENT PARSER */
const parseIntent = (text) => {
  const lower = text.toLowerCase();

  // extract price (numbers like 60000, 70k, etc.)
  const priceMatch = lower.match(/(\d+)\s*k?/);
  let maxPrice = null;

  if (priceMatch) {
    maxPrice =
      priceMatch[1].length <= 2
        ? Number(priceMatch[1]) * 1000
        : Number(priceMatch[1]);
  }

  return {
    wantsBuy: ["buy", "purchase", "get"].some((w) => lower.includes(w)),
    wantsCheckout: lower.includes("checkout"),
    wantsCheapest: lower.includes("cheapest") || lower.includes("lowest"),
    category: ["mobile", "laptop", "tv", "fridge", "fan", "computer"].find(
      (c) => lower.includes(c),
    ),
    brand: ["samsung", "apple", "lg", "sony", "oneplus", "hp", "dell"].find(
      (b) => lower.includes(b),
    ),
    maxPrice,
  };
};

export default function AssistantPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastProducts, setLastProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const bottomRef = useRef(null);

  const handleSend = async (text) => {
    const intent = parseIntent(text);

    /* 🧪 DEBUG (KEEP FOR NOW) */
    console.log("RAW TEXT:", text);
    console.log("INTENT:", intent);

    /* 1️⃣ SHOW USER MESSAGE */
    setMessages((prev) => [...prev, { role: "user", text }]);

    /* ================================
       🛒 BUY + CHECKOUT AI FLOW (FIX)
       ================================ */
    if (intent.wantsBuy && intent.category) {
      setLoading(true);

      try {
        const data = await sendChatMessage(
          `${intent.category}${intent.brand ? " " + intent.brand : ""}`,
        );

        if (!Array.isArray(data.reply) || data.reply.length === 0) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", text: "❌ No matching products found." },
          ]);
          return;
        }

        let filtered = data.reply;

        // brand filter
        if (intent.brand) {
          filtered = filtered.filter((p) =>
            p.brand.toLowerCase().includes(intent.brand),
          );
        }

        // price filter
        if (intent.maxPrice) {
          filtered = filtered.filter((p) => p.price <= intent.maxPrice);
        }

        // cheapest logic
        if (intent.wantsCheapest) {
          filtered = filtered.sort((a, b) => a.price - b.price);
        } else {
          // default: best rated first
          filtered = filtered.sort((a, b) => b.rating - a.rating);
        }

        const bestProduct = filtered[0];

        if (!filtered.length) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              text: `❌ I couldn’t find any ${intent.brand || ""} ${intent.category} under ₹${intent.maxPrice}.`,
            },
          ]);
          return;
        }

        console.log("BEST PRODUCT:", bestProduct);

        if (!bestProduct) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", text: "❌ No matching product found." },
          ]);
          return;
        }

        /* ✅ ADD TO CART (THIS WAS MISSING EFFECTIVELY) */
        addToCart(bestProduct);

        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: `🛒 ${bestProduct.name} added to cart` },
        ]);

        // 💳 AUTO CHECKOUT AFTER BUY
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Proceeding to checkout 💳" },
        ]);

        navigate("/checkout");
      } catch (err) {
        console.error(err);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Something went wrong." },
        ]);
      } finally {
        setLoading(false);
      }

      return; // ⛔ STOP normal chat flow
    }

    /* ================================
       4️⃣ NORMAL AI CHAT FLOW
       ================================ */
    setLoading(true);

    try {
      const data = await sendChatMessage(text);

      if (Array.isArray(data.reply)) {
        setLastProducts(data.reply);

        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Here are the best options 👇" },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data.reply },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setLastProducts(data);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  loadProducts();
}, []);

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden">
      <Header />

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        {/* 🧱 LEFT: PRODUCTS PANEL */}
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Products</h2>

          {lastProducts.length === 0 ? (
            <div className="text-slate-400 mt-20 text-center">
              Showing all available products.  
              Ask the assistant to refine or buy 👇
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lastProducts.map((product, i) => (
                <ProductCard key={i} products={[product]} />
              ))}
            </div>
          )}
        </div>

        {/* 💬 RIGHT: AI CHAT PANEL */}
        <div className="w-full max-w-md border-l border-slate-800 flex flex-col bg-slate-900">
          {/* CHAT MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 text-white">
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} text={m.text} />
            ))}

            {loading && (
              <div className="italic text-slate-400">AI is typing…</div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* CHAT INPUT */}
          <div className="shrink-0 border-t border-slate-800 bg-slate-950">
            <ChatBox onSend={handleSend} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
