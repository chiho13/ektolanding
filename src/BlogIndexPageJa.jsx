import appIcon from "./assets/ekto.png";

const articles = [
  {
    title: "聴覚障害・難聴の人のための対面イベント向けライブ字幕",
    description:
      "速いライブ字幕とBig Replyで、現実の場所で話を追い、返答し、自立して行動しやすくする方法を解説します。",
    href: "/ja/blog/live-captions-for-deaf-hard-of-hearing-events/",
    category: "アクセシビリティ",
  },
  {
    title: "ビジネスカンファレンスで使うライブ翻訳",
    description:
      "海外出張者、国際チーム、イベント主催者が、カンファレンスの講演をリアルタイムで理解しやすくする方法を解説します。",
    href: "/ja/blog/live-translation-for-business-conferences/",
    category: "ビジネスカンファレンス",
  },
  {
    title: "外国語の講義を理解する方法",
    description:
      "留学中の講義を、リアルタイム字幕、ライブ翻訳、保存された文字起こしで追いやすくする実践的なコツです。",
    href: "/ja/blog/how-to-understand-lectures-in-a-foreign-language/",
    category: "講義",
  },
  {
    title: "講義におすすめのライブ字幕アプリ5選",
    description:
      "講義で使える人気のライブ字幕ツールを比較し、留学生にリアルタイム翻訳が重要な理由を紹介します。",
    href: "/ja/blog/top-5-best-live-caption-apps-for-lectures/",
    category: "アプリガイド",
  },
];

function BlogIndexPageJa() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <img
              src={appIcon}
              alt="ekto: Live AI Captionsのアプリアイコン"
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
            ダウンロード
          </a>
        </div>
      </header>

      <main className="px-6 py-16">
        <section className="max-w-[1000px] mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 mb-4">
            Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            ライブ翻訳とライブ字幕のガイド
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-700 mb-12">
            カンファレンス、講義、イベント、対面の会話でライブ翻訳とライブ字幕を使うための実用的なガイドです。
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
                  記事を読む
                </a>
              </article>
            ))}
          </div>

          <div className="mt-12 text-sm text-slate-600">
            <a
              href="/blog/"
              className="font-semibold text-blue-700 underline underline-offset-4"
            >
              Read the English blog
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default BlogIndexPageJa;
