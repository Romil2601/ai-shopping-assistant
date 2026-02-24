export default function AILoader() {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-400 mt-3">
      <span className="animate-pulse">🤖</span>
      <span>AI is thinking</span>
      <span className="flex gap-1">
        <span className="animate-bounce">.</span>
        <span className="animate-bounce [animation-delay:0.15s]">.</span>
        <span className="animate-bounce [animation-delay:0.3s]">.</span>
      </span>
    </div>
  );
}