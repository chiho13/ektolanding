import appStoreButton from "./assets/downloadbtn.svg";
import appIcon from "./assets/ekto.png";

const tips = [
  {
    title: "授業前に講義テーマを確認する",
    body:
      "授業前に講義タイトル、スライド、参考文献、シラバスのメモをざっと確認しましょう。すべてを理解する必要はありません。テーマ、出てきそうな語彙、名前や数式を先に見ておくことが目的です。",
  },
  {
    title: "すべての単語ではなく構成を聞く",
    body:
      "速い講義で一文ずつ翻訳しようとすると、すぐに置いていかれます。代わりに「今日は何を扱うか」「重要な点は」「例えば」「試験に出る」といった合図に注目しましょう。構成が分かると、細部が聞き取れなくても現在地を失いにくくなります。",
  },
  {
    title: "教授が話している間にリアルタイム字幕を使う",
    body:
      "学生向けのリアルタイム字幕は、音声を理解するためのもうひとつの手がかりになります。話すスピード、アクセント、周囲の雑音で単語を聞き逃しても、字幕があれば次の話題に進む前に内容へ戻りやすくなります。",
  },
  {
    title: "講義をその場で翻訳する",
    body:
      "講義のライブ翻訳は、授業後に短いフレーズを翻訳することとは違います。価値は即時性にあります。教授の説明が進んでいる間に内容を追えるため、専門科目、ゲスト講義、ゼミで特に役立ちます。",
  },
  {
    title: "短文用ではなく講義全体に向いたツールを選ぶ",
    body:
      "Google翻訳は単語や短い文の確認には便利ですが、講義は長く、連続的で、文脈が重要です。Ektoは最大2時間の長いセッション向けに作られているため、授業全体を通して安定した字幕と翻訳が必要な場面に向いています。",
  },
  {
    title: "聞きやすい席を選びつつ、完璧でない教室にも備える",
    body:
      "可能なら前の方に座るのがよいですが、いつも環境を選べるとは限りません。大教室、小さな声の教授、周囲の会話、話者との距離は聞き取りを難しくします。Ektoは対面の教室で使うことを想定しており、後ろの席にいても音声を翻訳しやすいように設計されています。",
  },
  {
    title: "すべての文ではなく重要な考えを書く",
    body:
      "ノートは後で学習するためのもので、授業中に維持しきれない全文記録である必要はありません。定義、例、数式、締切、繰り返される表現、教授が強調した点に集中しましょう。",
  },
  {
    title: "授業後の復習用に文字起こしを保存する",
    body:
      "外国語の講義で大変なのは授業後であることも多いです。テーマは覚えていても、正確な説明を思い出せないことがあります。Ektoは文字起こしを履歴に保存できるため、後で授業を見直し、分からなかった単語を確認し、試験や課題の前にノートの抜けを埋められます。",
  },
  {
    title: "文字起こしから語彙リストを作る",
    body:
      "授業後、何度も出てきた単語を集めましょう。自分の言語で短い定義を書き、講義内の例をひとつ添えます。続けていくと、学術用語は障害ではなく、見慣れた言葉になっていきます。",
  },
];

const faqs = [
  {
    question: "Google翻訳は講義の理解に役立ちますか？",
    answer:
      "Google翻訳は単語や短いフレーズの確認には役立ちますが、講義全体のメインツールとしては理想的ではありません。留学生には、継続的な聞き取り、リアルタイム字幕、ライブ翻訳、授業後に確認できる保存済み文字起こしが必要になることが多いです。",
  },
  {
    question: "外国語の講義についていく一番よい方法は何ですか？",
    answer:
      "授業前に重要語彙を準備し、授業中はリアルタイム字幕やライブ翻訳を使い、主要な考えをノートに取り、授業後に文字起こしを見直す方法が効果的です。",
  },
  {
    question: "講義は日常会話よりなぜ難しいのですか？",
    answer:
      "講義は長く、速く、形式的で、専門用語が多いため難しくなります。また、話者に途中で繰り返しを頼める機会も少ないからです。",
  },
];

function ForeignLanguageLecturesPageJa() {
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
          <figure className="mb-10 overflow-hidden rounded-2xl bg-white border border-slate-200">
            <img
              src="/blog/foreign-language-lecture-illustration.png"
              alt="教室の前で講義資料を説明する教師のイラスト"
              className="w-full max-h-[520px] object-contain p-4 sm:p-8"
            />
          </figure>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            外国語の講義を理解する方法: 留学生向け9つのコツ
          </h1>
          <p className="text-lg leading-8 text-slate-700 mb-8">
            海外の講義室に座っていると、教授は速く話し、スライドには見慣れない専門用語が並びます。頭の中で一文を翻訳しているうちに、授業はもう次の考えに進んでいるかもしれません。外国語の講義が難しい本当の理由は、ただ聞くだけではなく、聞き、翻訳し、ノートを取り、同時に遅れないようにしなければならない点にあります。
          </p>
          <p className="text-lg leading-8 text-slate-700 mb-10">
            外国語の講義をどう理解すればよいか悩んでいるなら、ここで紹介する留学生向けの講義対策が、授業中の理解と授業後の復習を少し楽にしてくれます。
          </p>

          <section className="mb-12 rounded-2xl bg-white p-6 border border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              外国語の講義が難しい理由
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              日常会話では、少し止まったり、質問したり、文脈から推測したりする余地があります。講義は違います。教授は理論を紹介し、専門用語を定義し、図を指し、学生の質問に答え、そのまま話を続けることがあります。
            </p>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              生物学、法律、ビジネス、工学、医学などの授業では特に大変です。ひとつの単語を聞き逃すだけで、その後数分の意味が変わることもあります。辞書や短文翻訳アプリは授業後には役立ちますが、教室で起きているリアルタイムの問題までは解決しません。
            </p>
            <p className="text-lg leading-8 text-slate-700">
              留学生向けの講義アプリは、講義が進んでいる最中に内容を追えること、そして授業後に復習できる材料を残せることが大切です。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              外国語の講義を理解するための9つの実践的なコツ
            </h2>
            <ol className="list-decimal pl-6 space-y-7 text-lg leading-8 text-slate-700">
              {tips.map((tip) => (
                <li key={tip.title}>
                  <strong className="text-slate-900">{tip.title}</strong>
                  <p className="mt-2">{tip.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              実際の講義でEktoが役立つ理由
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              Ektoは対面授業のライブ字幕と翻訳のために作られているため、実際の講義の流れに合っています。アプリを開き、教授の話をライブテキストまたは翻訳字幕で追い、短文翻訳を何度も再開することなく長い授業を聞き続けられます。
            </p>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              その違いは、90分のゼミ、2時間の講義、後ろの席で聞くゲスト講演のような現実の教室で特に大きくなります。Ektoは最大2時間の長いセッション、離れた場所からの音声キャプチャ、保存された文字起こし履歴に対応しているため、授業が終わっても内容が消えてしまいません。
            </p>
            <p className="text-lg leading-8 text-slate-700">
              ツールを比較したい方は、{" "}
              <a
                href="/ja/blog/top-5-best-live-caption-apps-for-lectures/"
                className="font-semibold text-blue-700 underline underline-offset-4"
              >
                講義におすすめのライブ字幕アプリ
              </a>
              の記事もご覧ください。
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              よくある質問
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <section
                  key={faq.question}
                  className="rounded-2xl bg-white p-6 border border-slate-200"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-lg leading-8 text-slate-700">
                    {faq.answer}
                  </p>
                </section>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              まとめ
            </h2>
            <p className="text-lg leading-8 text-slate-700">
              外国語の講義を理解することは、一晩で流暢になることではありません。同時に解決しなければならないことを減らすことです。授業テーマを準備し、構成を聞き取り、授業中はリアルタイム字幕やライブ翻訳を使い、授業後に保存された文字起こしを見直す。適切な流れを作れば、講義は少しずつ追いやすく、復習しやすいものになります。
            </p>
          </section>

          <section className="rounded-3xl bg-slate-900 px-8 py-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              次の講義をEktoでフォローする
            </h2>
            <p className="text-lg leading-8 text-slate-300 mb-8">
              長時間のライブ字幕、リアルタイム翻訳、保存された文字起こし履歴を、講義、ゼミ、留学中の学習に活用できます。
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

export default ForeignLanguageLecturesPageJa;
