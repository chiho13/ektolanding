import appIcon from "./assets/ekto.png";

const examples = [
  {
    situation: "Introducing yourself",
    korean: "저는 서울에서 일하는 디자이너예요.",
    english: "I'm a designer working in Seoul.",
    variation: "Change the job and city to introduce yourself.",
  },
  {
    situation: "Ordering at a café",
    korean: "아이스 라테 한 잔 주세요. 우유는 오트밀크로 바꿔 주실 수 있나요?",
    english: "I'd like an iced latte. Could you make it with oat milk?",
    variation: "Change the drink and your preferred options, then try again.",
  },
  {
    situation: "Sharing an idea in a meeting",
    korean: "그 방법도 좋지만, 먼저 작은 규모로 테스트해 보면 어떨까요?",
    english: "That approach sounds good, but how about testing it on a smaller scale first?",
    variation: "Make a sentence about something you actually want to propose.",
  },
  {
    situation: "Keeping a conversation going",
    korean: "주말에 뭐 하셨어요? 저는 친구랑 등산을 갔어요.",
    english: "What did you do over the weekend? I went hiking with a friend.",
    variation: "Answer with something you did last weekend.",
  },
];

const steps = [
  {
    title: "Set the direction to Korean → English",
    body: "In ekto's translation mode, choose Korean as the source language and English as the target language. You need an internet connection and microphone access. Find a quiet place and speak clearly enough for your phone's microphone to capture your words.",
  },
  {
    title: "Say what you want to express in Korean",
    body: "Speak one or two sentences about your day or something you want to say in tomorrow's meeting. Start with the main idea you want another person to understand. Keeping each thought short makes it easier to check the translation.",
  },
  {
    title: "Read the English translation and check the meaning",
    body: "Read the English text as it appears. Give the sentence a moment to settle, then check names, numbers, negative statements, and whether it conveys what you meant. If the meaning has changed, try making your Korean sentence more specific.",
  },
  {
    title: "Say the English sentence aloud",
    body: "Use the translation to say the sentence yourself. You can break it into short phrases at first. This is a chance to find out whether an expression that looks familiar is also one you can say aloud.",
  },
  {
    title: "Try again without looking at the screen",
    body: "Put your phone down and express the same thought in English. Check only the parts you get stuck on. Then change the place, time, or person to make a new sentence, so you practice using the expression in your own situation.",
  },
];

function EnglishPracticePage() {
  return (
    <div className="min-h-screen bg-slate-50" lang="en">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <img src={appIcon} alt="ekto app icon" className="h-10 w-10 rounded-lg shadow-lg" />
            <span className="text-lg font-bold text-slate-900">ekto: Live AI Captions</span>
          </a>
          <a href="https://apps.apple.com/app/id6740196773" className="shrink-0 rounded-lg bg-blue-700 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-800 sm:text-base">Download</a>
        </div>
      </header>

      <main className="px-6 py-12 sm:py-16">
        <article className="mx-auto max-w-[1000px]">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600">
            <a href="/blog/" className="font-semibold text-blue-700 underline underline-offset-4">All articles</a>
            <span className="mx-2" aria-hidden="true">/</span>English practice
          </nav>
          <nav aria-label="Article language" className="mb-6 flex flex-wrap gap-4 text-sm">
            <span aria-current="page" className="font-semibold text-slate-900">English</span>
            <a href="/ko/blog/practice-english-with-korean-to-english-live-translation/" lang="ko" className="font-semibold text-blue-700 underline underline-offset-4">한국어</a>
          </nav>
          <p className="mb-2 text-sm font-semibold text-blue-700">Korean → English · A guide to using live translation</p>
          <p className="mb-6 text-sm text-slate-500">ekto team · <time dateTime="2026-10-08">October 8, 2026</time></p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">How to Practice English with Korean-to-English Live Translation</h1>
          <p className="mb-6 text-lg leading-8 text-slate-700">You know what you want to say in Korean, but the English sentence does not come to mind. Set Korean as the source language and English as the target in ekto to read an English translation while you speak. Say the translated sentence aloud, then try expressing the same thought without looking at the screen.</p>
          <p className="mb-10 text-lg leading-8 text-slate-700">This guide describes a personal practice routine using ekto&apos;s live translation. Start with expressions you actually want to use: introducing yourself, ordering at a café, or sharing an idea in a meeting.</p>

          <aside aria-label="Practice routine summary" className="mb-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <h2 className="mb-3 text-2xl font-bold text-slate-900">Think in Korean, then say it again in English</h2>
            <p className="text-lg leading-8 text-slate-700">Speak in Korean → Check the English translation → Say it aloud → Try again without the screen</p>
            <p className="mt-4 text-base leading-7 text-slate-600">For example, say <span lang="ko">“내일 오전에 잠깐 통화할 수 있을까요?”</span> and practice the expression “Could we have a quick call tomorrow morning?” The English sentences in this guide are examples; actual translations depend on what you say and the context.</p>
          </aside>

          <section aria-labelledby="setup" className="mb-12">
            <h2 id="setup" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">Why choose Korean as the source language?</h2>
            <p className="mb-5 text-lg leading-8 text-slate-700">The source language is the speech entering your microphone. The target language is the translation you want to read. Choose Korean → English when you want to see your Korean speech expressed in English. Your phone&apos;s display language can still be Korean.</p>
            <p className="text-lg leading-8 text-slate-700">To understand an English lecture or an English-speaking conversation partner in Korean, choose English → Korean instead. Before practicing, check that the source matches the language you will speak and the target matches the language you want to read.</p>
          </section>

          <section aria-labelledby="steps" className="mb-12">
            <h2 id="steps" className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Five steps to practice English expressions with ekto</h2>
            <ol className="list-decimal space-y-7 pl-6 text-lg leading-8 text-slate-700">
              {steps.map((step) => <li key={step.title}><h3 className="font-bold text-slate-900">{step.title}</h3><p className="mt-2">{step.body}</p></li>)}
            </ol>
          </section>

          <section aria-labelledby="examples" className="mb-12">
            <h2 id="examples" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">Korean and English examples you can practice now</h2>
            <p className="mb-6 text-lg leading-8 text-slate-700">Adapt these Korean sentences to your own situation, check the translation, and say the result in English. The same idea can be expressed in several ways depending on the situation and tone.</p>
            <div className="grid gap-6 md:grid-cols-2">
              {examples.map((example) => (
                <section key={example.situation} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="mb-4 text-xl font-bold text-slate-900">{example.situation}</h3>
                  <p className="mb-1 text-sm font-semibold text-slate-500">Say it in Korean</p>
                  <p className="mb-4 break-keep text-lg leading-8 text-slate-700" lang="ko">{example.korean}</p>
                  <p className="mb-1 text-sm font-semibold text-blue-700">Example English expression</p>
                  <p className="mb-4 text-lg leading-8 text-slate-900">{example.english}</p>
                  <p className="border-t border-slate-100 pt-4 text-base leading-7 text-slate-600">{example.variation}</p>
                </section>
              ))}
            </div>
          </section>

          <section aria-labelledby="routine" className="mb-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 id="routine" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">A five-minute routine using things you want to say</h2>
            <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-slate-700">
              <li><strong>First minute:</strong> Choose one topic: something to explain in tomorrow&apos;s meeting or news you want to share with a friend.</li>
              <li><strong>Next two minutes:</strong> Say three short sentences in Korean and check their English translations. Read aloud the sentences that convey your intended meaning.</li>
              <li><strong>Next minute:</strong> Express the same ideas in English without looking at the screen. Check only the phrases you cannot remember.</li>
              <li><strong>Final minute:</strong> Change the person, time, or place to make a new sentence. Write down one expression you want to use again tomorrow.</li>
            </ul>
          </section>

          <section aria-labelledby="review" className="mb-12">
            <h2 id="review" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">What to check in a translation</h2>
            <p className="mb-5 text-lg leading-8 text-slate-700">English may need a subject or relationship that you leave implicit in Korean. Try a specific request such as “Please send me the revised file by tomorrow morning” rather than simply “Send it tomorrow.” Whether you are making a polite request or talking to a friend also affects the expression you choose.</p>
            <p className="mb-5 text-lg leading-8 text-slate-700">Background noise or a misheard word can change the meaning of a translation. If a result seems unusual, break your Korean sentence into shorter parts and try again. Double-check important names and numbers. Use the translation as a starting point for finding an expression, and check unfamiliar meanings and pronunciation with a dictionary or teacher.</p>
            <p className="text-lg leading-8 text-slate-700">ekto provides live translation for this routine. Use it as a translation aid, with separate tools or guidance for pronunciation scores, grammar assessment, and lessons matched to your level.</p>
          </section>

          <section aria-labelledby="faq" className="mb-12">
            <h2 id="faq" className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Frequently asked questions</h2>
            <div className="space-y-6">
              <div><h3 className="mb-2 text-xl font-bold text-slate-900">Can I see English translations while I speak Korean?</h3><p className="text-lg leading-8 text-slate-700">Yes. In ekto&apos;s translation mode, choose Korean as the source language and English as the target. You can read English translations while you speak. Internet access and microphone permission are required, and the wording may change as you continue speaking.</p></div>
              <div><h3 className="mb-2 text-xl font-bold text-slate-900">Does ekto score my English pronunciation or grammar?</h3><p className="text-lg leading-8 text-slate-700">This guide uses Korean speech translated into English text. You can use the result to find expressions and practice saying them yourself, but a translation is not a pronunciation score or a grammar assessment.</p></div>
              <div><h3 className="mb-2 text-xl font-bold text-slate-900">How do I understand English speech in Korean?</h3><p className="text-lg leading-8 text-slate-700">Choose English as the source language and Korean as the target. Use Korean → English for your Korean speech, and English → Korean when you want to understand someone speaking English.</p></div>
              <div><h3 className="mb-2 text-xl font-bold text-slate-900">Can I practice without an internet connection?</h3><p className="text-lg leading-8 text-slate-700">ekto requires an internet connection for live translation. You can write down expressions you have checked and continue practicing them aloud without looking at the screen afterward.</p></div>
            </div>
          </section>

          <section className="rounded-3xl bg-slate-900 px-6 py-10 text-center sm:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white">Start with something you want to say today</h2>
            <p className="mb-6 text-lg leading-8 text-slate-300">Choose Korean → English in ekto and say one sentence you want to use.</p>
            <a href="https://apps.apple.com/app/id6740196773" className="inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-blue-50">Download ekto on the App Store</a>
            <p className="mt-4 text-sm leading-6 text-slate-400">Free to download · Premium features may require a subscription</p>
          </section>
          <footer className="mt-10 text-base leading-7 text-slate-600">
            <p>For ways to use translation during lectures and meetings, read our <a href="/blog/how-to-understand-lectures-in-a-foreign-language/" className="font-semibold text-blue-700 underline underline-offset-4">guide to understanding lectures in another language</a>.</p>
          </footer>
        </article>
      </main>
    </div>
  );
}

export default EnglishPracticePage;
