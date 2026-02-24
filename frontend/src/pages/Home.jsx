import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">

      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.14),transparent_55%)]" />

      {/* Navbar */}
      <Header />

      {/* Hero */}
      <main className="relative z-10 flex items-center justify-center px-6">
        <div className="max-w-5xl w-full text-center mt-28">

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Power{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Smart Shopping
            </span>{" "}
            With AI
          </h2>

          <p className="mt-6 text-slate-400 max-w-2xl mx-auto">
            Get personalized product recommendations, intelligent comparisons,
            and real-time insights powered by AI.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button className="px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 transition font-medium"
            onClick={() => navigate("/assistant")}>
              Try Assistant →
            </button>
            <button className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition"
            onClick={() => navigate("/use-cases")}>
              Learn More →
            </button>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mt-32 grid md:grid-cols-3 gap-8">

        {[
          {
            title: "AI Chat Assistant",
            desc: "Ask natural language questions and get smart buying suggestions.",
          },
          {
            title: "Product Insights",
            desc: "Compare prices, features, and reviews intelligently.",
          },
          {
            title: "Real-Time Recommendations",
            desc: "Dynamic results based on your preferences and trends.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 hover:border-violet-500/40 transition"
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-slate-400">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-32 border-t border-white/10 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} AI Shopping Assistant. Built with React & AI.
      </footer>
    </div>
  );
}