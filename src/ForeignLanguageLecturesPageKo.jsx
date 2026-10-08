import appStoreButton from "./assets/downloadbtn.svg";
import appIcon from "./assets/ekto.png";

const tips = [
  {
    title: "강의 전에 주제를 미리 살펴보세요",
    body:
      "수업 전에 강의 제목, 슬라이드, 읽기 자료, 강의계획서를 가볍게 훑어보세요. 아직 모든 내용을 이해할 필요는 없습니다. 어떤 주제를 다루는지, 어떤 용어가 나올지, 어떤 이름이나 공식이 등장할지 미리 알아두는 것이 목표입니다.",
  },
  {
    title: "단어 하나하나보다 강의의 흐름에 집중하세요",
    body:
      "빠르게 진행되는 강의에서 모든 문장을 번역하려고 하면 흐름을 놓치기 쉽습니다. 대신 “오늘 다룰 내용은”, “핵심은”, “예를 들어”, “시험에 나옵니다”처럼 강의의 방향을 알려주는 표현에 주목하세요. 전체 구성을 파악하면 세부 내용이 조금 불분명해도 현재 어떤 이야기를 하는지 따라갈 수 있습니다.",
  },
  {
    title: "교수님이 말하는 동안 실시간 자막을 활용하세요",
    body:
      "실시간 자막은 말소리를 이해하는 데 또 하나의 단서가 됩니다. 말이 빠르거나 억양이 낯설거나 주변이 시끄러워 단어를 놓쳤을 때, 자막을 읽으면 강의가 다음 주제로 넘어가기 전에 내용을 다시 따라잡는 데 도움이 됩니다.",
  },
  {
    title: "강의가 진행되는 동안 바로 번역해 보세요",
    body:
      "강의의 실시간 번역은 수업이 끝난 뒤 짧은 문장을 번역하는 것과 다릅니다. 교수님의 설명이 이어지는 순간에 내용을 이해할 수 있다는 점이 중요합니다. 전문 과목, 초청 강연, 세미나에서 특히 유용합니다.",
  },
  {
    title: "짧은 문장뿐 아니라 강의 전체에 맞는 도구를 선택하세요",
    body:
      "Google 번역은 단어나 짧은 문장을 확인할 때 유용하지만, 강의는 길고 연속적이며 문맥이 중요합니다. ekto는 최대 2시간의 긴 세션을 지원하므로 수업 내내 자막과 번역이 필요할 때 활용할 수 있습니다.",
  },
  {
    title: "잘 들리는 자리를 고르고, 여의치 않은 환경에도 대비하세요",
    body:
      "가능하면 앞쪽에 앉으세요. 다만 언제나 강의 환경을 선택할 수 있는 것은 아닙니다. 큰 강의실, 작은 목소리, 주변 대화, 발표자와의 거리는 듣기를 어렵게 만듭니다. ekto는 대면 환경에서 사용하도록 설계되어 강의실 뒤쪽에 앉아 있을 때도 음성을 번역하는 데 활용할 수 있습니다.",
  },
  {
    title: "모든 문장 대신 핵심 내용을 필기하세요",
    body:
      "필기는 나중에 공부하기 위한 자료입니다. 강의 내용을 한 문장도 빠짐없이 받아 적으려고 애쓸 필요는 없습니다. 정의, 예시, 공식, 마감일, 반복되는 표현, 교수님이 강조하는 내용을 중심으로 적으세요.",
  },
  {
    title: "수업 후 복습할 수 있도록 문자로 변환된 강의 내용을 저장하세요",
    body:
      "외국어 강의에서 어려움은 수업이 끝난 뒤에도 이어질 수 있습니다. 주제는 기억하지만 정확한 설명이 떠오르지 않는 경우입니다. ekto에서는 음성을 문자로 변환한 내용을 기록에 저장할 수 있어, 수업을 다시 살펴보고 낯선 단어를 확인하며 시험이나 과제 전에 필기의 빈 부분을 채울 수 있습니다.",
  },
  {
    title: "강의 기록으로 나만의 용어 목록을 만드세요",
    body:
      "수업이 끝나면 여러 번 등장한 단어를 모아보세요. 한국어로 짧은 뜻풀이를 적고, 강의에서 나온 예시 하나를 함께 기록하세요. 이렇게 반복하면 낯설었던 전문 용어가 점차 익숙해집니다.",
  },
];

const faqs = [
  {
    question: "Google 번역으로 강의를 이해할 수 있나요?",
    answer:
      "Google 번역은 단어나 짧은 문장을 확인할 때 도움이 되지만, 강의 전체를 따라가기 위한 주된 도구로는 아쉬울 수 있습니다. 유학생에게는 연속적인 듣기, 실시간 자막, 실시간 번역, 수업 후 다시 확인할 수 있는 강의 기록이 필요한 경우가 많습니다.",
  },
  {
    question: "외국어 강의를 따라가기 위한 좋은 방법은 무엇인가요?",
    answer:
      "수업 전에 중요한 용어를 익히고, 수업 중에는 실시간 자막이나 번역을 활용하며, 핵심 내용을 필기한 뒤 수업 후 강의 기록을 복습하는 방법을 추천합니다.",
  },
  {
    question: "강의는 왜 일상 대화보다 어려운가요?",
    answer:
      "강의는 더 길고 빠르게 진행되며, 격식 있는 표현과 전문 용어가 많이 쓰이기 때문입니다. 중간에 질문하거나 같은 말을 다시 해달라고 요청할 기회도 일상 대화보다 적습니다.",
  },
];

function ForeignLanguageLecturesPageKo() {
  return (
    <div className="min-h-screen bg-slate-50" lang="ko">
      <header className="px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <img
              src={appIcon}
              alt="ekto 앱 아이콘"
              className="w-10 h-10 rounded-lg shadow-lg"
            />
            <span className="text-lg font-bold text-slate-900" lang="en">
              ekto: Live AI Captions
            </span>
          </a>
          <a
            href="https://apps.apple.com/kr/app/id6740196773"
            className="bg-blue-700 text-white px-4 sm:px-5 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm sm:text-base"
          >
            앱 다운로드
          </a>
        </div>
      </header>

      <main className="px-6 py-16">
        <article className="max-w-[1000px] mx-auto break-keep">
          <a href="/ko/blog/" className="mb-6 inline-flex text-sm font-semibold text-blue-700 underline underline-offset-4">블로그 전체 보기</a>
          <nav aria-label="글 언어" className="mb-6 flex flex-wrap gap-4 text-sm">
            <a href="/blog/how-to-understand-lectures-in-a-foreign-language/" lang="en" className="font-semibold text-blue-700 underline underline-offset-4">English</a>
            <a href="/ja/blog/how-to-understand-lectures-in-a-foreign-language/" lang="ja" className="font-semibold text-blue-700 underline underline-offset-4">日本語</a>
            <span aria-current="page" className="font-semibold text-slate-900">한국어</span>
          </nav>
          <p className="text-sm text-slate-500 mb-6">2026년 10월 8일 한국어판</p>
          <figure className="mb-10 overflow-hidden rounded-2xl bg-white border border-slate-200">
            <img
              src="/blog/foreign-language-lecture-illustration.png"
              alt="교실 앞 칠판의 도표를 설명하는 선생님의 일러스트"
              className="w-full max-h-[520px] object-contain p-4 sm:p-8"
            />
          </figure>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            외국어 강의를 이해하는 방법: 유학생을 위한 9가지 팁
          </h1>
          <p className="text-lg leading-8 text-slate-700 mb-8">
            해외 대학의 강의실에 앉아 있다고 생각해 보세요. 교수님은 빠르게 말하고, 슬라이드에는 낯선 용어가 가득합니다. 머릿속에서 한 문장을 번역하는 동안 강의는 이미 다음 내용으로 넘어갑니다. 외국어 강의가 어려운 이유는 단순히 듣기만 하는 것이 아니라, 듣고 번역하고 필기하면서 동시에 강의 흐름을 놓치지 않아야 하기 때문입니다.
          </p>
          <p className="text-lg leading-8 text-slate-700 mb-10">
            외국어로 진행되는 강의를 어떻게 이해해야 할지 고민이라면, 아래의 유학생을 위한 팁을 활용해 보세요. 수업 중에는 내용을 따라가고, 수업 후에는 부담을 덜고 복습하는 데 도움이 됩니다.
          </p>

          <section className="mb-12 rounded-2xl bg-white p-6 border border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              외국어 강의가 어려운 이유
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              일상 대화에서는 잠시 멈추거나 질문하거나 문맥으로 뜻을 짐작할 여유가 있습니다. 강의는 다릅니다. 교수님은 이론을 소개하고, 전문 용어를 정의하고, 도표를 가리키고, 학생의 질문에 답한 뒤에도 계속 설명합니다. 모든 단어를 이해할 때까지 기다려주지는 않습니다.
            </p>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              생물학, 법학, 경영학, 공학, 의학처럼 전문 용어가 많은 과목에서는 특히 어렵습니다. 단어 하나를 놓치면 이후 몇 분간의 설명을 다르게 이해할 수도 있습니다. 사전이나 간단한 번역 앱으로 나중에 확인할 수는 있지만, 지금 진행 중인 강의를 따라가야 하는 문제는 남습니다.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              유학생을 위한 강의 앱은 강의가 진행되는 동안 내용을 따라갈 수 있게 돕고, 수업 후에는 복습에 쓸 수 있는 자료를 남겨주는 것이 중요합니다.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              외국어 강의를 이해하는 데 도움이 되는 9가지 팁
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
              실제 강의에서 ekto가 도움이 되는 이유
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              ekto는 대면 환경에서 실시간 자막과 번역을 제공하도록 만들어져 실제 강의의 흐름에 맞게 사용할 수 있습니다. 앱을 열고 교수님의 설명을 문자나 번역 자막으로 읽으며 긴 수업을 따라가세요. 짧은 문장 번역을 계속 새로 시작하는 수고를 줄일 수 있습니다.
            </p>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              90분짜리 세미나, 2시간 강의, 뒤쪽 자리에서 듣는 초청 강연처럼 실제 교실에서는 이런 차이가 더 중요합니다. ekto는 최대 2시간의 긴 세션, 떨어진 곳의 음성 인식, 강의 기록 저장을 지원하므로 수업이 끝난 뒤에도 내용을 다시 확인할 수 있습니다.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              도구를 비교하고 있다면 다음 가이드도 읽어 보세요: {" "}
              <a
                href="/blog/top-5-best-live-caption-apps-for-lectures/"
                className="font-semibold text-blue-700 underline underline-offset-4"
              >
                강의용 실시간 자막 앱 추천 (영문)
              </a>
              .
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              자주 묻는 질문
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
              수업 전 준비부터 수업 후 복습까지
            </h2>
            <p className="text-lg leading-8 text-slate-700">
              외국어 강의를 이해하기 위해 하루아침에 유창해질 필요는 없습니다. 한꺼번에 처리해야 하는 일을 줄이는 것부터 시작해 보세요. 주제를 미리 살펴보고, 강의의 흐름에 집중하고, 수업 중에는 실시간 자막이나 번역을 활용한 뒤 저장한 기록으로 복습하세요. 이런 학습 흐름을 만들면 강의를 따라가고 공부할 자료로 활용하기가 더 수월해집니다.
            </p>
          </section>

          <section className="rounded-3xl bg-slate-900 px-8 py-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              다음 강의는 ekto와 함께 따라가 보세요
            </h2>
            <p className="text-lg leading-8 text-slate-300 mb-8">
              긴 강의와 세미나, 유학 중 수업에서 실시간 자막, 번역, 저장한 강의 기록을 활용해 보세요.
            </p>
            <a
              href="https://apps.apple.com/kr/app/id6740196773"
              aria-label="App Store에서 ekto 다운로드"
            >
              <img
                src={appStoreButton}
                alt="App Store에서 ekto 다운로드"
                className="h-16 mx-auto hover:scale-105 transition-transform"
              />
            </a>
          </section>
        </article>
      </main>
    </div>
  );
}

export default ForeignLanguageLecturesPageKo;
