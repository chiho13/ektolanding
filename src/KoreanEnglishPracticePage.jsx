import appIcon from "./assets/ekto.png";

const examples = [
  { situation: "자기소개", korean: "저는 서울에서 일하는 디자이너예요.", english: "I'm a designer working in Seoul.", variation: "직업과 도시를 바꿔서 나를 소개해 보세요." },
  { situation: "카페에서 주문하기", korean: "아이스 라테 한 잔 주세요. 우유는 오트밀크로 바꿔 주실 수 있나요?", english: "I'd like an iced latte. Could you make it with oat milk?", variation: "음료와 원하는 옵션을 바꿔서 다시 말해 보세요." },
  { situation: "회의에서 의견 말하기", korean: "그 방법도 좋지만, 먼저 작은 규모로 테스트해 보면 어떨까요?", english: "That approach sounds good, but how about testing it on a smaller scale first?", variation: "내가 실제로 제안하고 싶은 내용을 한 문장으로 만들어 보세요." },
  { situation: "대화를 이어 가기", korean: "주말에 뭐 하셨어요? 저는 친구랑 등산을 갔어요.", english: "What did you do over the weekend? I went hiking with a friend.", variation: "지난 주말에 내가 한 일을 넣어 대답해 보세요." },
];

const steps = [
  { title: "한국어 → 영어로 설정하세요", body: "ekto의 번역 모드에서 입력 언어를 한국어, 번역 언어를 영어로 선택하세요. 인터넷 연결과 마이크 권한이 필요합니다. 조용한 곳에서 휴대폰 마이크에 잘 들리도록 말해 주세요." },
  { title: "말하고 싶은 내용을 한국어로 말하세요", body: "오늘 있었던 일이나 내일 회의에서 할 말을 한두 문장으로 말해 보세요. 여러 생각을 한꺼번에 넣기보다, 상대방에게 전하고 싶은 핵심부터 말하면 번역 내용을 확인하기 쉽습니다." },
  { title: "영어 번역을 읽고 뜻을 확인하세요", body: "말하는 동안 화면에 나타나는 영어 번역을 읽어 보세요. 문장이 정리될 때까지 잠시 기다린 다음, 이름·숫자·부정 표현과 내가 의도한 의미가 맞는지 확인하세요. 뜻이 달라졌다면 한국어 문장을 더 구체적으로 말해 보세요." },
  { title: "영어 문장을 소리 내어 말하세요", body: "번역을 보고 문장을 직접 말해 보세요. 처음에는 짧은 구절로 나누어 읽어도 됩니다. 눈으로 익숙한 표현과 입으로 말할 수 있는 표현이 같은지 직접 확인하는 단계입니다." },
  { title: "화면을 보지 않고 다시 말해 보세요", body: "휴대폰을 잠시 내려놓고 같은 생각을 영어로 표현해 보세요. 막히는 부분만 다시 확인한 뒤, 장소·시간·사람을 바꿔 새로운 문장을 만들어 보세요. 한 문장을 외우는 데서 멈추지 않고 내 상황에 맞게 써 보는 연습입니다." },
];

function KoreanEnglishPracticePage() {
  return (
    <div className="min-h-screen bg-slate-50" lang="ko">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <img src={appIcon} alt="ekto 앱 아이콘" className="h-10 w-10 rounded-lg shadow-lg" />
            <span className="text-lg font-bold text-slate-900" lang="en">ekto: Live AI Captions</span>
          </a>
          <a href="https://apps.apple.com/kr/app/id6740196773" className="shrink-0 rounded-lg bg-blue-700 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-800 sm:text-base">앱 다운로드</a>
        </div>
      </header>

      <main className="px-6 py-12 sm:py-16">
        <article className="mx-auto max-w-[1000px] break-keep">
          <nav aria-label="현재 위치" className="mb-6 text-sm text-slate-600">
            <a href="/ko/blog/" className="font-semibold text-blue-700 underline underline-offset-4">블로그 전체 보기</a>
            <span className="mx-2" aria-hidden="true">/</span>영어 회화 연습
          </nav>
          <nav aria-label="글 언어" className="mb-6 flex flex-wrap gap-4 text-sm">
            <a href="/blog/practice-english-with-korean-to-english-live-translation/" lang="en" className="font-semibold text-blue-700 underline underline-offset-4">English</a>
            <span aria-current="page" className="font-semibold text-slate-900">한국어</span>
          </nav>
          <p className="mb-2 text-sm font-semibold text-blue-700">한국어 → 영어 · 실시간 번역 활용 가이드</p>
          <p className="mb-6 text-sm text-slate-500">ekto 팀 · <time dateTime="2026-10-08">2026년 10월 8일</time></p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">한국어로 말하고 영어 번역으로 회화 연습하는 방법</h1>
          <p className="mb-6 text-lg leading-8 text-slate-700">하고 싶은 말은 분명한데 영어 문장이 바로 떠오르지 않나요? ekto에서 한국어를 입력 언어, 영어를 번역 언어로 설정하면 한국어로 말하면서 영어 번역을 읽을 수 있습니다. 그 문장을 소리 내어 말하고, 화면을 보지 않고 다시 표현하는 방식으로 나에게 필요한 영어를 연습해 보세요.</p>
          <p className="mb-10 text-lg leading-8 text-slate-700">이 가이드는 ekto의 실시간 번역을 활용한 개인 연습 방법입니다. 자기소개, 카페 주문, 회의에서 의견 말하기처럼 실제로 쓰고 싶은 문장부터 시작할 수 있습니다.</p>

          <aside aria-label="연습 순서 요약" className="mb-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <h2 className="mb-3 text-2xl font-bold text-slate-900">한국어로 생각하고, 영어로 다시 말해 보세요</h2>
            <p className="text-lg leading-8 text-slate-700">한국어로 말하기 → 영어 번역 확인하기 → 영어로 소리 내어 말하기 → 화면 없이 다시 말하기</p>
            <p className="mt-4 text-base leading-7 text-slate-600">예를 들어 “내일 오전에 잠깐 통화할 수 있을까요?”라고 말한 뒤, <span lang="en">“Could we have a quick call tomorrow morning?”</span>이라는 표현을 연습할 수 있습니다. 이 글의 영어 문장은 예시이며, 실제 번역은 말한 내용과 문맥에 따라 달라집니다.</p>
          </aside>

          <section aria-labelledby="setup" className="mb-12">
            <h2 id="setup" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">한국어를 입력 언어로 선택하는 이유</h2>
            <p className="mb-5 text-lg leading-8 text-slate-700">입력 언어는 마이크로 들어오는 말의 언어이고, 번역 언어는 화면에서 읽고 싶은 언어입니다. 내가 한국어로 말한 내용을 영어로 보고 싶다면 한국어 → 영어로 설정하세요. 휴대폰의 표시 언어가 한국어여도 이 방향을 선택할 수 있습니다.</p>
            <p className="text-lg leading-8 text-slate-700">반대로 영어 강의나 영어로 말하는 상대방을 한국어로 이해하려면 영어 → 한국어를 선택하면 됩니다. 연습을 시작하기 전에 내가 말할 언어와 읽을 언어가 맞는지 확인하세요.</p>
          </section>

          <section aria-labelledby="steps" className="mb-12">
            <h2 id="steps" className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">ekto로 영어 표현을 연습하는 5단계</h2>
            <ol className="list-decimal space-y-7 pl-6 text-lg leading-8 text-slate-700">
              {steps.map((step) => <li key={step.title}><h3 className="font-bold text-slate-900">{step.title}</h3><p className="mt-2">{step.body}</p></li>)}
            </ol>
          </section>

          <section aria-labelledby="examples" className="mb-12">
            <h2 id="examples" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">바로 연습할 수 있는 한국어·영어 예문</h2>
            <p className="mb-6 text-lg leading-8 text-slate-700">아래는 상황별 표현 예시입니다. 먼저 한국어 문장을 내 상황에 맞게 바꾸고, 번역을 확인한 뒤 영어로 말해 보세요. 같은 뜻도 말하는 상황과 어조에 따라 여러 영어 표현으로 옮길 수 있습니다.</p>
            <div className="grid gap-6 md:grid-cols-2">
              {examples.map((example) => (
                <section key={example.situation} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="mb-4 text-xl font-bold text-slate-900">{example.situation}</h3>
                  <p className="mb-1 text-sm font-semibold text-slate-500">한국어로 말하기</p>
                  <p className="mb-4 text-lg leading-8 text-slate-700">{example.korean}</p>
                  <p className="mb-1 text-sm font-semibold text-blue-700">영어 표현 예시</p>
                  <p className="mb-4 text-lg leading-8 text-slate-900" lang="en">{example.english}</p>
                  <p className="border-t border-slate-100 pt-4 text-base leading-7 text-slate-600">{example.variation}</p>
                </section>
              ))}
            </div>
          </section>

          <section aria-labelledby="routine" className="mb-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 id="routine" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">하루 5분, 내가 쓸 문장으로 연습하기</h2>
            <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-slate-700">
              <li><strong>첫 1분:</strong> 오늘 말하고 싶은 주제 하나를 고르세요. 예를 들어 내일 회의에서 설명할 일이나 친구에게 전할 소식입니다.</li>
              <li><strong>다음 2분:</strong> 한국어로 짧은 문장 세 개를 말하고 영어 번역을 확인하세요. 의도한 뜻이 맞는 문장부터 소리 내어 읽어 보세요.</li>
              <li><strong>다음 1분:</strong> 화면을 보지 않고 같은 내용을 영어로 말해 보세요. 기억나지 않는 표현만 다시 확인하세요.</li>
              <li><strong>마지막 1분:</strong> 주어·시간·장소를 바꿔 한 문장을 새로 만들어 보세요. 내일 다시 써 보고 싶은 표현 하나를 따로 적어 두세요.</li>
            </ul>
          </section>

          <section aria-labelledby="review" className="mb-12">
            <h2 id="review" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">번역을 확인할 때 살펴볼 것</h2>
            <p className="mb-5 text-lg leading-8 text-slate-700">한국어에서 생략한 주어나 관계가 영어에서는 필요할 수 있습니다. “내일 보내 주세요”보다 “수정한 파일을 내일 오전까지 저에게 보내 주세요”처럼 문맥을 구체적으로 말해 보세요. 정중한 부탁인지, 친구에게 하는 말인지도 표현을 고르는 데 영향을 줍니다.</p>
            <p className="mb-5 text-lg leading-8 text-slate-700">잡음이나 잘못 인식된 단어 때문에 번역의 의미가 달라질 수 있습니다. 어색한 결과가 나오면 한국어를 짧게 나누어 다시 말하고, 중요한 이름과 숫자는 한 번 더 확인하세요. 번역은 표현을 찾는 출발점으로 활용하고, 낯선 표현의 뜻과 발음은 사전이나 선생님에게 확인해 보세요.</p>
            <p className="text-lg leading-8 text-slate-700">ekto는 이 연습에서 실시간 번역을 제공합니다. 발음 점수, 문법 채점, 수준별 수업을 제공하는 학습 모드와는 구분해서 활용하세요.</p>
          </section>

          <section aria-labelledby="faq" className="mb-12">
            <h2 id="faq" className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">자주 묻는 질문</h2>
            <div className="space-y-6">
              <div><h3 className="mb-2 text-xl font-bold text-slate-900">한국어로 말하면 영어 번역이 바로 나오나요?</h3><p className="text-lg leading-8 text-slate-700">ekto의 번역 모드에서 입력 언어를 한국어, 번역 언어를 영어로 설정하면 말하는 동안 영어 번역을 읽을 수 있습니다. 인터넷 연결과 마이크 권한이 필요하며, 말이 이어지면서 번역 표현이 바뀔 수 있습니다.</p></div>
              <div><h3 className="mb-2 text-xl font-bold text-slate-900">ekto가 영어 발음이나 문법을 채점해 주나요?</h3><p className="text-lg leading-8 text-slate-700">이 가이드에서 사용하는 기능은 한국어 음성을 영어 텍스트로 번역하는 기능입니다. 영어 표현을 찾아 직접 말해 보는 연습에 활용할 수 있지만, 번역 결과를 발음 점수나 문법 평가로 해석하지 마세요.</p></div>
              <div><h3 className="mb-2 text-xl font-bold text-slate-900">영어를 한국어로 이해하려면 어떻게 설정하나요?</h3><p className="text-lg leading-8 text-slate-700">입력 언어를 영어, 번역 언어를 한국어로 바꾸세요. 내가 한국어로 말할 때는 한국어 → 영어, 영어로 말하는 상대방을 이해할 때는 영어 → 한국어를 선택하면 됩니다.</p></div>
              <div><h3 className="mb-2 text-xl font-bold text-slate-900">인터넷 없이도 연습할 수 있나요?</h3><p className="text-lg leading-8 text-slate-700">ekto의 실시간 번역에는 인터넷 연결이 필요합니다. 번역으로 확인한 표현을 따로 적어 두면, 이후에는 화면을 보지 않고 직접 말해 보는 연습을 이어 갈 수 있습니다.</p></div>
            </div>
          </section>

          <section className="rounded-3xl bg-slate-900 px-6 py-10 text-center sm:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white">지금 하고 싶은 말부터 영어로 연습해 보세요</h2>
            <p className="mb-6 text-lg leading-8 text-slate-300">ekto에서 한국어 → 영어를 선택하고, 오늘 쓰고 싶은 문장 하나를 말해 보세요.</p>
            <a href="https://apps.apple.com/kr/app/id6740196773" className="inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-blue-50">App Store에서 ekto 다운로드</a>
            <p className="mt-4 text-sm leading-6 text-slate-400">무료 다운로드 · 프리미엄 기능은 구독이 필요할 수 있습니다</p>
          </section>
          <footer className="mt-10 text-base leading-7 text-slate-600">
            <p>강의나 회의에서 번역을 활용하는 방법도 궁금하다면 <a href="/ko/blog/how-to-understand-lectures-in-a-foreign-language/" className="font-semibold text-blue-700 underline underline-offset-4">외국어 강의 이해하기 가이드</a>를 읽어 보세요.</p>
          </footer>
        </article>
      </main>
    </div>
  );
}

export default KoreanEnglishPracticePage;
