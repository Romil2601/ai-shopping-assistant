// src/pages/UseCases.jsx
import Header from "../components/Header";

export default function UseCases() {
  const useCases = [
    {
      title: "Smart Product Discovery",
      description:
        "Users can ask natural language questions like “Best phone under ₹20,000” and get intelligent, relevant product recommendations instantly.",
      icon: "🔍",
    },
    {
      title: "AI-Powered Comparison",
      description:
        "Compare multiple products side-by-side with AI-generated insights, highlighting pros, cons, and best value options.",
      icon: "📊",
    },
    {
      title: "Personalized Shopping Assistant",
      description:
        "The assistant adapts to user preferences such as budget, brand, and past interactions to deliver personalized suggestions.",
      icon: "🤖",
    },
    {
      title: "Budget-Conscious Buying",
      description:
        "Helps users find the best products within a specific budget, maximizing value for money.",
      icon: "💰",
    },
    {
      title: "Decision Support with AI Explanation",
      description:
        "AI explains why certain products are recommended, increasing transparency and user trust.",
      icon: "🧠",
    },
    {
      title: "Faster Shopping Experience",
      description:
        "Reduces research time by summarizing reviews, features, and pricing in one conversation.",
      icon: "⚡",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Use Cases
          </h1>
          <p className="mt-4 text-slate-400">
            Discover how the AI Shopping Assistant helps users make smarter,
            faster, and more confident purchase decisions.
          </p>
        </div>

        {/* Use Case Cards */}
        <section className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 hover:border-violet-500/40 transition"
            >
              <div className="text-3xl mb-4">{useCase.icon}</div>
              <h3 className="text-lg font-semibold mb-2">
                {useCase.title}
              </h3>
              <p className="text-sm text-slate-400">
                {useCase.description}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}