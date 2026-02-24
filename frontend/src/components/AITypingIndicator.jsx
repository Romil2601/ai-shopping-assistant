// src/components/AITypingIndicator.jsx
export default function AITypingIndicator({ isThinking }) {
  if (!isThinking) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-slate-400 mt-2">
      <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
      <span className="ml-2">AI is thinking…</span>
    </div>
  );
}