import appIcon from "./assets/ekto.png";

const articles = [
  {
    title: "Live Captions for Deaf and Hard-of-Hearing People at In-Person Events",
    description:
      "How fast live captions and Big Reply help people follow speech, respond clearly, and stay independent in real-world places.",
    href: "/blog/live-captions-for-deaf-hard-of-hearing-events/",
    category: "Accessibility",
  },
  {
    title: "Live Translation for Business Conferences: Understand Every Speaker",
    description:
      "How live translation helps business travelers, international teams, and event organizers follow conference talks in real time.",
    href: "/blog/live-translation-for-business-conferences/",
    category: "Business conferences",
  },
  {
    title: "How to Understand Lectures in a Foreign Language",
    description:
      "Practical study abroad tips for following lectures with real-time captions, live translation, and saved transcript review.",
    href: "/blog/how-to-understand-lectures-in-a-foreign-language/",
    category: "Lectures",
  },
  {
    title: "Top 5 Best Live Caption Apps for Lectures",
    description:
      "Compare popular live caption tools for lectures and see why real-time translation matters for international students.",
    href: "/blog/top-5-best-live-caption-apps-for-lectures/",
    category: "App guides",
  },
];

function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <img
              src={appIcon}
              alt="ekto: Live AI Captions app icon"
              className="w-10 h-10 rounded-lg shadow-lg"
            />
            <span className="text-lg font-bold text-slate-900">
              ekto: Live AI Captions
            </span>
          </a>
          <a
            href="https://apps.apple.com/app/id6740196773"
            className="bg-blue-700 text-white px-4 sm:px-5 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm sm:text-base"
          >
            Download
          </a>
        </div>
      </header>

      <main className="px-6 py-16">
        <section className="max-w-[1000px] mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 mb-4">
            Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Live Translation and Caption Guides
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-700 mb-12">
            Practical guides for using live translation and live captions at
            conferences, lectures, events, and in-person conversations.
          </p>

          <div className="grid gap-6">
            {articles.map((article) => (
              <article
                key={article.href}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700 mb-3">
                  {article.category}
                </p>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  <a href={article.href} className="hover:text-blue-700">
                    {article.title}
                  </a>
                </h2>
                <p className="text-lg leading-8 text-slate-700 mb-4">
                  {article.description}
                </p>
                <a
                  href={article.href}
                  className="inline-flex text-base font-semibold text-blue-700 hover:text-blue-800"
                >
                  Read article
                </a>
              </article>
            ))}
          </div>

          <div className="mt-12 text-sm text-slate-600">
            <a
              href="/ja/blog/"
              className="font-semibold text-blue-700 underline underline-offset-4"
            >
              日本語のブログを見る
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default BlogIndexPage;
