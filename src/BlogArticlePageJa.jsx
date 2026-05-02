import appStoreButton from "./assets/downloadbtn.svg";
import appIcon from "./assets/ekto.png";

const lectureCaptionApps = [
  {
    name: "ekto: Live AI Captions",
    summary:
      "講義、ゼミ、留学中の学習でリアルタイム字幕とリアルタイム翻訳を同時に使いたい学生に最適です。",
    highlight:
      "Ektoは話されている内容をその場で理解するために作られており、教室の後ろの席でも講義についていきやすいライブ字幕を提供します。",
  },
  {
    name: "Otter",
    summary:
      "授業後に講義メモや文字起こしを確認したい場合に便利です。",
    highlight:
      "録音や会議メモ用途でよく使われますが、多言語の教室では、翻訳を優先したより速いワークフローが必要になる学生も少なくありません。",
  },
  {
    name: "Microsoft Translator",
    summary: "多言語環境で基本的なライブ翻訳を使いたいときに役立ちます。",
    highlight:
      "複数のデバイスで使い慣れたツールが必要な場合、シンプルな言語サポートとして便利です。",
  },
  {
    name: "Google Translate",
    summary: "授業前後に短い表現や単語を確認する用途では手軽です。",
    highlight:
      "短いフレーズや語彙の確認には役立ちますが、長い講義を聞き続ける用途には特化していません。",
  },
  {
    name: "AVA",
    summary: "会話やイベントでのアクセシビリティ向け字幕で知られています。",
    highlight:
      "字幕の見やすさを重視する場合は選択肢になりますが、学生は翻訳品質や速度も比較する必要があります。",
  },
];

function BlogArticlePageJa() {
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
        <article className="max-w-[1000px] mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 mb-4">
            Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            講義におすすめのライブ字幕アプリ5選
          </h1>
          <p className="text-lg leading-8 text-slate-700 mb-8">
            講義向けのライブ字幕アプリを選ぶときに大切なのは、話すスピードが速い教授、専門用語、多言語の教室にどれだけついていけるかです。海外で学ぶ留学生にとっては、リアルタイム字幕とリアルタイム翻訳の両方が必要になる場面も多くあります。
          </p>
          <p className="text-lg leading-8 text-slate-700 mb-10">
            この記事では、講義で使える人気のライブ字幕ツールを5つ比較し、ノート作成、理解度、授業中の安心感にリアルタイム翻訳字幕がどのように役立つかを解説します。
          </p>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              講義におすすめのライブ字幕アプリ5選
            </h2>
            <ol className="list-decimal pl-6 space-y-6 text-lg leading-8 text-slate-700">
              {lectureCaptionApps.map((app) => (
                <li key={app.name}>
                  <strong className="text-slate-900">{app.name}</strong>:{" "}
                  {app.summary} {app.highlight}
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              留学中の授業でリアルタイム翻訳が重要な理由
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              留学中は、ライブ字幕だけでは十分でないことがあります。日常会話は理解できても、講義では専門的な学術用語、聞き慣れないアクセント、速い説明が続き、第二言語ではすぐに処理しにくいからです。
            </p>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              リアルタイム翻訳があると、学生は講義をより自然に追いやすくなります。聞いた文章を頭の中で毎回翻訳する代わりに、講義が進むのと同時に画面上の翻訳字幕を読めるため、認知的な負担が下がり、授業内容そのものに集中しやすくなります。
            </p>
            <p className="text-lg leading-8 text-slate-700">
              この使い方は、大教室の講義、ゲスト講演、進行の速いゼミ、録画授業などで特に役立ちます。ひとつの概念を聞き逃すと、その後の10分が一気に理解しづらくなることがあるためです。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              ekto: Live AI Captionsが講義に向いている理由
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              ekto: Live AI Captionsは、講義を理解することを第一に考える学生に向いています。教授がスライド、説明、質疑応答を速いペースで進める場面でも、話されている内容をリアルタイムで追うことに重点を置いています。
            </p>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              留学生にとって大きな利点は、ライブ字幕とリアルタイム翻訳をひとつの流れで使えることです。文字起こしツールと翻訳ツールを切り替える必要がなく、その場で理解するためのワークフローで講義を追えます。
            </p>
            <a
              href="https://apps.apple.com/app/id6740196773"
              className="inline-block text-lg font-semibold text-blue-700 underline underline-offset-4"
            >
              App Storeでekto: Live AI Captionsを見る
            </a>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              講義向けライブ字幕アプリを選ぶポイント
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-8 text-slate-700">
              <li>話者のスピードについていける字幕更新の速さ</li>
              <li>多言語で学ぶためのリアルタイム翻訳</li>
              <li>授業中に読みやすい画面上のテキスト</li>
              <li>大教室や雑音のある環境でも使いやすい安定性</li>
              <li>キャンパスで日常的に使えるシンプルなモバイル体験</li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              まとめ
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              講義に最適なライブ字幕アプリは、単純な文字起こしが必要なのか、それともリアルタイムで内容を理解したいのかによって変わります。特に留学生にとっては、リアルタイム翻訳字幕が最も重要な機能になることがあります。授業をより少ないストレスで理解したいなら、ekto: Live AI Captionsは試す価値のある選択肢です。
            </p>
            <p className="text-lg leading-8 text-slate-700">
              留学中の授業理解についてさらに知りたい方は、{" "}
              <a
                href="/ja/blog/how-to-understand-lectures-in-a-foreign-language/"
                className="font-semibold text-blue-700 underline underline-offset-4"
              >
                外国語の講義を理解する方法
              </a>
              もご覧ください。
            </p>
          </section>

          <section className="rounded-3xl bg-slate-900 px-8 py-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              次の講義でekto: Live AI Captionsを試す
            </h2>
            <p className="text-lg leading-8 text-slate-300 mb-8">
              リアルタイム字幕と翻訳を使って、講義、ゼミ、キャンパスイベントをよりスムーズに理解しましょう。
            </p>
            <a
              href="https://apps.apple.com/app/id6740196773"
              aria-label="App Storeでekto: Live AI Captionsをダウンロード"
            >
              <img
                src={appStoreButton}
                alt="App Storeでekto: Live AI Captionsをダウンロード"
                className="h-16 mx-auto hover:scale-105 transition-transform"
              />
            </a>
          </section>
        </article>
      </main>
    </div>
  );
}

export default BlogArticlePageJa;
