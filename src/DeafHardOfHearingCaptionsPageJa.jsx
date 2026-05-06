import appStoreButton from "./assets/downloadbtn.svg";
import appIcon from "./assets/ekto.png";

const everydaySituations = [
  "友人や家族との食事。特にテーブルの向こう側から話される場面。",
  "講義、講演、ミートアップ、教会など、話者が近くにいない場面。",
  "病院、クリニック、受付で、細かい説明を理解したい場面。",
  "空港、ホテルのチェックイン、旅行カウンターなどの忙しい公共空間。",
  "カンファレンス、ツアー、ワークショップ、地域イベントなど、話者が変わる場面。",
];

function DeafHardOfHearingCaptionsPageJa() {
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
            聴覚障害・難聴の人のための対面イベント向けライブ字幕
          </h1>
          <p className="text-lg leading-8 text-slate-700 mb-8">
            ライブ字幕は、ビデオ通話だけのものではありません。食事、講義、病院、空港、ホテルの受付、イベント会場など、実際の場所で話されている内容を追うためにも役立ちます。
          </p>
          <p className="text-lg leading-8 text-slate-700 mb-10">
            目的はシンプルです。日常生活の中で、自立して自信を持って行動しやすくすることです。
          </p>

          <figure className="mb-12 overflow-hidden rounded-2xl bg-white border border-slate-200">
            <img
              src="/blog/bigreply.png"
              alt="iPhone showing live captions for a dinner question and Big Reply text for the response medium rare"
              className="w-full max-h-[560px] object-contain"
            />
          </figure>

          <section className="mb-12 rounded-2xl bg-white p-6 border border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              ライブ字幕でできること
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              ライブ字幕は、話された言葉をリアルタイムで読みやすいテキストに変換します。相手が何を言ったのか推測する代わりに、会話が続いている間に文字で確認できます。
            </p>
            <p className="text-lg leading-8 text-slate-700">
              話すスピードが速いとき、部屋が騒がしいとき、話者が遠いとき、会話を追うためのもうひとつの手がかりが必要なときに役立ちます。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              離れた場所の声を字幕で追えることが重要な理由
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              大切な会話は、静かな机の前だけで起きるわけではありません。食卓の向こう側、講義室の前方、ホテルのカウンター越し、数歩離れた場所にいる医師から話されることもあります。
            </p>
            <p className="text-lg leading-8 text-slate-700">
              ektoは、条件が合えばテーブルや部屋の向こう側からの音声を捉える助けになります。距離があることで細かい内容を聞き逃しやすい日常の場面で、この点は大きな意味があります。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              ライブ字幕が役立つ日常の場面
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-8 text-slate-700">
              {everydaySituations.map((situation) => (
                <li key={situation}>{situation}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              日常会話で自立しやすくする
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              話を聞き逃すと、何気ない場面でも取り残されたように感じることがあります。店員が質問する。友人が話をする。医師が次の手順を説明する。空港のスタッフが案内する。言葉を逃すと、返答する機会も逃してしまうことがあります。
            </p>
            <p className="text-lg leading-8 text-slate-700">
              速いライブ字幕があると、そのような場面に対応しやすくなります。より多くの文脈を得られ、返答する時間を持ちやすくなります。誰かに説明してもらうのを待たずに、自分で状況を理解し、自分で判断しやすくなります。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Big Replyで返答を分かりやすく伝える
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              話を理解することは、会話の片側にすぎません。自分の返答を分かりやすく伝えたい場面もあります。Big Replyでは、入力した返答を大きな文字で表示し、相手に見せられます。
            </p>
            <p className="text-lg leading-8 text-slate-700">
              レストラン、クリニック、ホテルの受付、空港カウンター、騒がしい部屋など、視覚的な返答のほうが伝わりやすい場面で役立ちます。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              便利なツールであり、必要な支援の代替ではありません
            </h2>
            <p className="text-lg leading-8 text-slate-700">
              ektoは日常の多くの場面で役立ちますが、専門通訳、CART字幕、補聴器、医療上の助言、法律で必要とされるアクセシビリティ支援の代わりにはなりません。医療、法律、教育、職場などの重要な場面では、状況と権利に合った支援を利用してください。
            </p>
          </section>

          <section className="rounded-3xl bg-slate-900 px-8 py-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              ektoで現実の会話を自立して進める
            </h2>
            <p className="text-lg leading-8 text-slate-300 mb-8">
              食事、病院、空港、ホテル、講義、イベントなど、現実の会話で話を追い、返答しやすくします。
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

export default DeafHardOfHearingCaptionsPageJa;
