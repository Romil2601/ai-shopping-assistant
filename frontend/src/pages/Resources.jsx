// src/pages/Resources.jsx
import Header from "../components/Header";

export default function Resources() {
  const resources = [
    {
      title: "How the AI Assistant Works",
      description:
        "Learn how natural language queries are processed to generate smart product recommendations.",
      tag: "Guide",
      icon: "📘",
    },
    {
      title: "Product Recommendation Logic",
      description:
        "Understand the logic behind filtering, ranking, and selecting the best products for users.",
      tag: "Documentation",
      icon: "🧠",
    },
    {
      title: "API & Data Sources",
      description:
        "Explore the public APIs and data sources used to fetch product information.",
      tag: "API",
      icon: "🔗",
    },
    {
      title: "UI/UX Design Decisions",
      description:
        "Insights into design choices made for building a modern, AI-first shopping experience.",
      tag: "Design",
      icon: "🎨",
    },
    {
      title: "Future Improvements",
      description:
        "Planned features such as personalization, voice input, and advanced comparisons.",
      tag: "Roadmap",
      icon: "🚀",
    },
    {
      title: "Open Source & Credits",
      description:
        "Libraries, tools, and inspirations used in building this project.",
      tag: "Credits",
      icon: "❤️",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Resources
          </h1>
          <p className="mt-4 text-slate-400">
            Helpful guides, documentation, and references to understand how the
            AI Shopping Assistant is designed and built.
          </p>
        </div>

        {/* Resource Cards */}
        <section className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 hover:border-violet-500/40 transition"
            >
              <div className="text-3xl mb-4">{resource.icon}</div>

              <span className="inline-block mb-2 text-xs px-2 py-1 rounded-full bg-white/10 text-slate-300">
                {resource.tag}
              </span>

              <h3 className="text-lg font-semibold mb-2">
                {resource.title}
              </h3>

              <p className="text-sm text-slate-400">
                {resource.description}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}