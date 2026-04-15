import { useEffect } from "react";
import DisplayContainer from "@/components/DisplayContainer";
import { useMessageStore } from "@/stores/messageStore";
import { useInteractionStore } from "@/stores/interactionStore";

const menuItems = ["Home", "About", "Docs", "Contact"];

const cards = [
  {
    title: "Getting Started",
    description:
      "Learn the basics of building a web page by exploring the classic hello world example.",
    items: [
      "Write your first HTML document",
      "See how text appears on screen",
      "Understand simple page structure",
    ],
  },
  {
    title: "Why Hello World?",
    description:
      "See why this iconic phrase is used as a welcoming first step in learning to code.",
    items: [
      "A friendly, universal greeting",
      "Teaches the idea of output",
      "Keeps the focus on fundamentals",
    ],
  },
  {
    title: "Next Steps",
    description:
      "Discover simple ways to expand this page once you're ready for more HTML and CSS.",
    items: [
      "Add a subtitle or footer",
      "Try basic colors and fonts",
      "Introduce links and images",
    ],
  },
];

export default function HomePage() {
  const fetchMessages = useMessageStore((s) => s.fetchMessages);
  const messages = useMessageStore((s) => s.messages);
  const recordVisit = useInteractionStore((s) => s.recordVisit);
  const visits = useInteractionStore((s) => s.visits);

  useEffect(() => {
    fetchMessages();
    recordVisit();
  }, []); // Run ONCE on mount

  const handleMenuClick = (item: string) => {
    if (item === "Home") {
      window.alert("Welcome to the Hello World Showcase home page!");
      return;
    }

    window.alert(`Selected: ${item}`);
  };

  const titleMessage = messages.length > 0 ? messages[0].text : "Hello World";

  return (
    <DisplayContainer className="items-stretch">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-2 sm:px-4 lg:px-6">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/70 bg-white/70 px-6 py-4 shadow-lg shadow-indigo-100/50 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-semibold text-white shadow-md shadow-indigo-200">
              HW
            </span>
            <div>
              <p className="text-sm font-medium text-indigo-600/80">Hello World Showcase</p>
              <p className="text-xs text-slate-500">Page visits: {visits}</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
            {menuItems.map((item) => (
              <button
                key={item}
                className="rounded-full border border-transparent px-4 py-2 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                type="button"
                onClick={() => handleMenuClick(item)}
              >
                {item}
              </button>
            ))}
          </nav>
        </header>

        <main className="flex flex-1 flex-col gap-10 pb-12">
          <section className="rounded-[32px] border border-white/70 bg-white/80 p-8 text-center shadow-xl shadow-indigo-100/40 backdrop-blur sm:p-12">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">
              Welcome to the showcase
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
              {titleMessage}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              The Hello World Showcase is a calm, approachable introduction to web development—just
              the iconic greeting, presented cleanly so learners can focus on the essentials of
              creating a web page.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
              Ideal for beginners and educators, this page keeps things minimal and welcoming while
              demonstrating how a page loads and displays content.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
                Clean Layout
              </span>
              <span className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
                Beginner Friendly
              </span>
              <span className="rounded-full bg-purple-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
                Ready to Extend
              </span>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <article
                key={card.title}
                className="group relative overflow-hidden rounded-3xl border border-white/80 bg-white/80 p-6 shadow-lg shadow-indigo-100/40 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400" />
                <h2 className="text-lg font-semibold text-slate-900">{card.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">
                  Explore
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>
    </DisplayContainer>
  );
}