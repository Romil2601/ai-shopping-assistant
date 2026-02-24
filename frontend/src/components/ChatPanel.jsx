export default function ChatPanel() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-4xl mx-auto mt-4 border rounded-lg overflow-hidden bg-slate-950">
      
      {/* CHAT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-900 text-white">
        {messages.map((m, i) => {
          if (m.type === "products") {
            return <ProductCard key={i} products={m.items} />;
          }

          return (
            <MessageBubble key={i} role={m.role} text={m.text} />
          );
        })}

        {loading && (
          <div className="italic text-gray-400">AI is typing…</div>
        )}
      </div>

      {/* INPUT */}
      <ChatBox onSend={handleSend} loading={loading} />
    </div>
  );
}