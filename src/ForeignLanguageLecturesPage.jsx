import appStoreButton from "./assets/downloadbtn.svg";
import appIcon from "./assets/ekto.png";

const tips = [
  {
    title: "Preview the lecture topic before class",
    body:
      "Before class, skim the lecture title, slides, reading list, or syllabus notes. You do not need to understand everything yet. The goal is to recognize the subject, the likely vocabulary, and the names or formulas that may appear later.",
  },
  {
    title: "Listen for structure, not every word",
    body:
      "In a fast lecture, trying to translate every sentence can make you fall behind. Instead, listen for signposts like today we will cover, the main point is, for example, and this will be on the exam. Structure helps you stay oriented even when some details are unclear.",
  },
  {
    title: "Use real-time captions while the professor is speaking",
    body:
      "Real-time captions for students give you a second way to process speech. If you miss a word because of speed, accent, or background noise, the caption line can help you reconnect before the lecture moves to the next idea.",
  },
  {
    title: "Translate the lecture as it happens",
    body:
      "Live translation for lectures is different from translating a phrase after class. The value is immediate: you can follow the professor's explanation while it is still happening, which is especially useful in technical classes, guest lectures, and seminars.",
  },
  {
    title: "Use a tool made for full lectures, not short phrases",
    body:
      "Google Translate is useful for quick words or short sentences, but lectures are long, continuous, and full of context. Ekto is built for long sessions up to 2 hours, making it a better fit when you need steady captions and translation through an entire class.",
  },
  {
    title: "Choose the clearest seat, but plan for imperfect rooms",
    body:
      "Sit closer when you can, but you will not always control the room. Large lecture halls, quiet professors, side conversations, and distance from the speaker all make listening harder. Ekto is designed for in-person rooms and can translate speech even when you are seated toward the back of the classroom.",
  },
  {
    title: "Write down key ideas, not every sentence",
    body:
      "Your notes should help you study later, not become a live transcript you struggle to maintain. Focus on definitions, examples, formulas, deadlines, repeated phrases, and anything the professor emphasizes.",
  },
  {
    title: "Save the transcript for review after class",
    body:
      "The most stressful part of foreign language lectures is often what happens afterward: you remember the topic, but not the exact explanation. Ekto saves transcripts to history, so you can review the class later, check unfamiliar words, and fill gaps in your notes before an exam or assignment.",
  },
  {
    title: "Turn each transcript into a vocabulary list",
    body:
      "After class, collect the words that appeared again and again. Add short definitions in your own language and one example from the lecture. Over time, the same academic terms stop feeling like obstacles and start feeling familiar.",
  },
];

const faqs = [
  {
    question: "Can Google Translate help with lectures?",
    answer:
      "Google Translate can help with quick words and short phrases, but it is not ideal as your main tool for a full lecture. International students usually need continuous listening, real-time captions, live translation, and a saved transcript they can review afterward.",
  },
  {
    question: "What is the best way to follow a lecture in another language?",
    answer:
      "The best approach is to prepare key vocabulary before class, use real-time captions or live translation during class, take notes on the main ideas, and review the transcript after class.",
  },
  {
    question: "Why are lectures harder than normal conversations?",
    answer:
      "Lectures are harder because they are longer, faster, more formal, and often full of technical vocabulary. You also have fewer chances to interrupt and ask the speaker to repeat something.",
  },
];

function ForeignLanguageLecturesPage() {
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
        <article className="max-w-[1000px] mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 mb-4">
            Blog
          </p>
          <figure className="mb-10 overflow-hidden rounded-2xl bg-white border border-slate-200">
            <img
              src="/blog/foreign-language-lecture-illustration.png"
              alt="Illustration of a teacher explaining a lecture chart in front of a classroom board"
              className="w-full max-h-[520px] object-contain p-4 sm:p-8"
            />
          </figure>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            How to Understand Lectures in a Foreign Language: 9 Tips for
            International Students
          </h1>
          <p className="text-lg leading-8 text-slate-700 mb-8">
            You are sitting in a lecture hall abroad. The professor is speaking
            quickly, the slides are full of unfamiliar terms, and by the time
            you translate one sentence in your head, the class has already moved
            to the next idea. That is the real problem behind foreign language
            lectures: you are not just listening, you are listening, translating,
            taking notes, and trying not to fall behind at the same time.
          </p>
          <p className="text-lg leading-8 text-slate-700 mb-10">
            If you are wondering how to understand lectures in a foreign
            language, these study abroad lecture tips will help you follow class
            in real time and review it later with less stress.
          </p>

          <section className="mb-12 rounded-2xl bg-white p-6 border border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Why Foreign Language Lectures Are So Hard
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              Everyday conversations usually give you room to pause, ask a
              question, or guess from context. Lectures are different. A
              professor may introduce a theory, define a technical term, point
              to a chart, answer a student, and continue without waiting for you
              to catch every word.
            </p>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              This is especially hard in biology, law, business, engineering,
              medicine, and other classes where one missed word can change the
              meaning of the next five minutes. A standard dictionary or quick
              translation app can help after the fact, but it does not solve the
              real-time classroom problem.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              The best international student lecture app should help you follow
              the room while the lecture is still happening, then give you
              something useful to review afterward.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              9 Practical Tips for Understanding Lectures in a Foreign Language
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
              Why Ekto Helps During Real Lectures
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              Ekto is built for in-person live captions and translation, so it
              fits the way lectures actually happen. You can open the app,
              follow the professor as live text or translated captions, and keep
              listening through a long class instead of restarting a short
              phrase translator again and again.
            </p>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              The difference matters most in real classrooms: a 90-minute
              seminar, a two-hour lecture, or a guest talk where you are seated
              near the back. Ekto is designed for long sessions up to 2 hours,
              distance speech capture, and saved transcript history, so the
              lecture does not disappear when class ends.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              If you are comparing tools, you can also read our guide to the{" "}
              <a
                href="/blog/top-5-best-live-caption-apps-for-lectures/"
                className="font-semibold text-blue-700 underline underline-offset-4"
              >
                best live caption apps for lectures
              </a>
              .
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
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
              Final Thoughts
            </h2>
            <p className="text-lg leading-8 text-slate-700">
              Understanding lectures in a foreign language is not about becoming
              fluent overnight. It is about reducing the number of things you
              have to solve at once. Prepare the topic, listen for structure,
              use real-time captions or live translation during class, and
              review saved transcripts afterward. With the right workflow, each
              lecture becomes easier to follow and easier to study from.
            </p>
          </section>

          <section className="rounded-3xl bg-slate-900 px-8 py-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Follow Your Next Lecture with Ekto
            </h2>
            <p className="text-lg leading-8 text-slate-300 mb-8">
              Use long-session live captions, real-time translation, and saved
              transcript history for lectures, seminars, and study abroad.
            </p>
            <a
              href="https://apps.apple.com/app/id6740196773"
              aria-label="Download ekto: Live AI Captions on the App Store"
            >
              <img
                src={appStoreButton}
                alt="Download ekto: Live AI Captions on the App Store"
                className="h-16 mx-auto hover:scale-105 transition-transform"
              />
            </a>
          </section>
        </article>
      </main>
    </div>
  );
}

export default ForeignLanguageLecturesPage;
