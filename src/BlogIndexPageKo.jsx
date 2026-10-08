import appIcon from "./assets/ekto.png";

function BlogIndexPageKo() {
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
        <section className="mx-auto max-w-[1000px] break-keep">
          <nav aria-label="블로그 언어" className="mb-8 flex flex-wrap gap-4 text-sm">
            <a href="/blog/" lang="en" className="font-semibold text-blue-700 underline underline-offset-4">English</a>
            <a href="/ja/blog/" lang="ja" className="font-semibold text-blue-700 underline underline-offset-4">日本語</a>
            <span aria-current="page" className="font-semibold text-slate-900">한국어</span>
          </nav>
          <p className="mb-4 text-sm font-semibold text-blue-700">ekto 블로그</p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">실시간 번역과 영어 회화 연습 가이드</h1>
          <p className="mb-12 max-w-3xl text-lg leading-8 text-slate-700">강의와 일상에서 실시간 자막과 번역을 활용하는 방법을 소개합니다. 외국어 강의를 따라가고 영어 표현을 연습하는 과정을 ekto와 함께 시작해 보세요.</p>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg">
            <p className="mb-3 text-sm font-semibold text-blue-700">영어 회화 연습</p>
            <h2 className="mb-3 text-2xl font-bold text-slate-900">
              <a href="/ko/blog/practice-english-with-korean-to-english-live-translation/" className="hover:text-blue-700">한국어로 말하고 영어 번역으로 회화 연습하는 방법</a>
            </h2>
            <p className="mb-4 text-lg leading-8 text-slate-700">한국어로 말한 내용을 영어 번역으로 확인하고 직접 말해 보세요. 상황별 예문과 하루 5분 연습 루틴을 소개합니다.</p>
            <a href="/ko/blog/practice-english-with-korean-to-english-live-translation/" className="inline-flex font-semibold text-blue-700 hover:text-blue-800">가이드 읽기 →</a>
          </article>
          <article className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg">
            <p className="mb-3 text-sm font-semibold text-blue-700">유학과 강의</p>
            <h2 className="mb-3 text-2xl font-bold text-slate-900">
              <a href="/ko/blog/how-to-understand-lectures-in-a-foreign-language/" className="hover:text-blue-700">외국어 강의를 이해하는 방법</a>
            </h2>
            <p className="mb-4 text-lg leading-8 text-slate-700">실시간 자막과 번역으로 강의를 따라가고, 저장한 강의 기록으로 복습하는 유학생을 위한 9가지 팁을 소개합니다.</p>
            <a href="/ko/blog/how-to-understand-lectures-in-a-foreign-language/" className="inline-flex font-semibold text-blue-700 hover:text-blue-800">가이드 읽기 →</a>
          </article>
        </section>
      </main>
    </div>
  );
}

export default BlogIndexPageKo;
