import appStoreButton from "./assets/downloadbtn.svg";
import appIcon from "./assets/ekto.png";

const useCases = [
  "国際ビジネスカンファレンス",
  "展示会やトレードショー",
  "投資家向けイベントや製品発表会",
  "業界サミットやパネルディスカッション",
  "グローバル企業の社内会議",
  "研修、ワークショップ、パートナーイベント",
  "学術カンファレンスや研究発表",
];

const attendeeBenefits = [
  "英語以外で話す登壇者の内容を追いやすくなる",
  "英語が第二言語の場合でも講演を理解しやすくなる",
  "話者が話し続けている間に、得意な言語で要点を読める",
  "技術的なセッションや進行の速い講演でメモを取りやすくなる",
  "質疑応答やネットワーキングに参加しやすくなる",
  "海外出張やイベント参加の価値を高められる",
];

const organizerBenefits = [
  "海外からの参加者をサポートしやすくなる",
  "イベント形式を大きく変えずに講演を理解しやすくできる",
  "多言語の参加者にとってアクセシビリティを高められる",
  "グローバルイベントの参加者満足度を向上できる",
  "講演、パネル、ワークショップに実用的な言語サポートを追加できる",
];

const faqs = [
  {
    question: "ビジネスカンファレンス向けライブ翻訳とは何ですか？",
    answer:
      "ライブ翻訳は、話された内容をリアルタイムで別の言語のテキストに変換します。カンファレンスでは、登壇者が話し続けている間に、参加者が自分の得意な言語で内容を読めます。",
  },
  {
    question: "登壇者が英語で話している場合でもライブ翻訳は役立ちますか？",
    answer:
      "役立ちます。英語をある程度理解できる参加者でも、ビジネスや技術の内容は母国語で読んだほうが理解しやすいことがあります。ライブ翻訳は聞き取りの負担を減らし、細かい内容を追いやすくします。",
  },
  {
    question: "誰がカンファレンスでライブ翻訳を使うべきですか？",
    answer:
      "ライブ翻訳は、海外出張者、国際チーム、イベント主催者、展示会出展者、学生、研究者など、自分が十分に理解できない言語で行われるセッションに参加する人に役立ちます。",
  },
];

function BusinessConferenceTranslationPageJa() {
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
            ビジネスカンファレンスで使うライブ翻訳: すべての講演を理解しやすく
          </h1>
          <p className="text-lg leading-8 text-slate-700 mb-8">
            ビジネスカンファレンスは、ますます国際的になっています。参加者は国を越えて移動し、新しいアイデアを聞き、パートナーと出会い、顧客を見つけ、業界のリーダーから学びます。
          </p>
          <p className="text-lg leading-8 text-slate-700 mb-10">
            しかし、言語が大きな壁になることがあります。多くのカンファレンスでは、リアルタイム字幕や通訳が用意されていません。登壇者が英語で話さないこともあります。英語を理解できる参加者でも、速くて専門的な講演についていくのは簡単ではありません。ライブ翻訳は、この問題を解決する方法のひとつです。
          </p>

          <section className="mb-12 rounded-2xl bg-white p-6 border border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              ライブ翻訳とは
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              ライブ翻訳は、話された言葉をリアルタイムで別の言語のテキストに変換します。ビジネスカンファレンスでは、参加者が登壇者の話を、自分が最も理解しやすい言語で読みながらセッションを追えます。
            </p>
            <p className="text-lg leading-8 text-slate-700">
              たとえば、登壇者がドイツ語、中国語、日本語、フランス語、スペイン語、イタリア語で話している場合でも、参加者は英語や別の得意な言語で内容を確認できます。イベント後の要約を待つ必要はありません。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              国際カンファレンスで起きる言語の課題
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              ヨーロッパ、中国、日本、韓国、ラテンアメリカなどで開かれるカンファレンスには、英語以外で行われる優れたセッションが多くあります。英語話者にとっても、翻訳がなければ内容を追うのは難しくなります。
            </p>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              逆のケースもよくあります。多くのグローバルイベントでは英語が使われますが、参加者全員が英語のネイティブスピーカーではありません。日常英語は理解できても、話者が速く話したり、業界用語を使ったり、聞き慣れないアクセントで話したりすると、重要な点を聞き逃すことがあります。
            </p>
            <p className="text-lg leading-8 text-slate-700">
              ビジネスイベントでは、細かい内容を理解することが重要です。聞き逃しがあると、メモの質が下がり、質問しづらくなり、セッションから得られる価値も小さくなります。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              参加者がライブ翻訳を使う理由
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-8 text-slate-700">
              {attendeeBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              主催者がライブ翻訳を提供すべき理由
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              ライブ翻訳は、参加者だけでなくイベント主催者にとっても役立ちます。海外からの参加者にとって分かりやすいイベントは、参加しやすく、勧めやすく、信頼されやすいイベントになります。
            </p>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-8 text-slate-700">
              {organizerBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              ライブ翻訳が役立つイベント
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              ライブ翻訳は、言語を越えて話を理解する必要がある場面で役立ちます。特に、参加者が国際的で、内容が重要なイベントに向いています。
            </p>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-8 text-slate-700">
              {useCases.map((useCase) => (
                <li key={useCase}>{useCase}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              母国語で理解できることが重要な理由
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              ビジネスカンファレンスでは、戦略、市場データ、規制、金融、製品の詳細、技術用語、速いパネルディスカッションなどが扱われます。第二言語が得意な人でも、内容が濃いと文脈を失いやすくなります。
            </p>
            <p className="text-lg leading-8 text-slate-700">
              得意な言語でライブ翻訳を読めると、話を聞き取る負担が減ります。言語の壁ではなく、内容そのものに集中しやすくなります。
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
            <p className="text-lg leading-8 text-slate-700 mb-5">
              国際カンファレンスは、もっと理解しやすくあるべきです。会場に翻訳がない場合や、登壇者が十分に理解できない言語で話している場合でも、ライブ翻訳があればセッションをリアルタイムで追えます。
            </p>
            <p className="text-lg leading-8 text-slate-700">
              海外出張者、国際チーム、イベント主催者にとって、ライブ翻訳はグローバルカンファレンスをより分かりやすく、参加しやすく、価値あるものにします。
            </p>
          </section>

          <section className="rounded-3xl bg-slate-900 px-8 py-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              次のカンファレンスをEktoでフォローする
            </h2>
            <p className="text-lg leading-8 text-slate-300 mb-8">
              ライブ翻訳を使って、講演、パネル、ビジネスセッションを自分に合った言語で理解しましょう。
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

export default BusinessConferenceTranslationPageJa;
