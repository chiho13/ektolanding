import appStoreButton from "./assets/downloadbtn.svg";
import appIcon from "./assets/AppIcon.jpg";

const lectureCaptionApps = [
  {
    name: "ekto: Live AI Captions",
    summary:
      "Best for students who need live captions and real-time translation during lectures, seminars, and study sessions abroad.",
    highlight:
      "Ekto is built for understanding speech as it happens, with live captions that stay useful even when you are seated far from the speaker.",
  },
  {
    name: "Otter",
    summary:
      "Strong for note-taking and transcription when you want lecture summaries after class.",
    highlight:
      "Often used for recordings and meeting notes, though many students still need a faster translation-first workflow for multilingual classrooms.",
  },
  {
    name: "Microsoft Translator",
    summary:
      "Useful for basic live translation in multilingual settings.",
    highlight:
      "Good for simple cross-language support, especially when you need a familiar tool across devices.",
  },
  {
    name: "Google Translate",
    summary:
      "Convenient for quick translation checks before or after class.",
    highlight:
      "Helpful for short phrases and vocabulary, but less specialized for long lecture-style listening.",
  },
  {
    name: "AVA",
    summary:
      "Known for accessibility-focused captions in conversations and events.",
    highlight:
      "A reasonable option when the priority is caption visibility, though students may compare it against translation quality and speed.",
  },
];

function BlogArticlePage() {
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Top 5 Best Live Caption Apps for Lectures in 2025
          </h1>
          <p className="text-lg leading-8 text-slate-700 mb-8">
            Finding the best live caption app for lectures matters most when
            you need to keep up with fast-speaking professors, technical
            vocabulary, and multilingual classrooms. For international students
            studying abroad, the challenge is even harder: you often need both
            real-time captions and real-time translation at the same time.
          </p>
          <p className="text-lg leading-8 text-slate-700 mb-10">
            This guide compares five popular live caption tools for lectures
            and explains why real-time translated captions can make a major
            difference for note-taking, comprehension, and confidence in class.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Top 5 Best Live Caption Apps for Lectures
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
              Why Real-Time Translation Is So Important for Studying Abroad
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              If you are studying abroad, live captions alone may not be enough.
              Even when you understand everyday conversation, lectures can
              include specialized academic terms, unfamiliar accents, and rapid
              explanations that are hard to process in a second language.
            </p>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              Real-time translation helps international students follow lectures
              more naturally. Instead of mentally translating each sentence
              after hearing it, you can read translated captions on screen
              while the lecture continues. That reduces cognitive load and
              makes it easier to stay focused on the lesson itself.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              This use case is especially valuable in large lecture halls, guest
              talks, fast seminars, and recorded classes where missing one
              concept can make the next ten minutes harder to understand.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Why ekto: Live AI Captions Stands Out
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              ekto: Live AI Captions is a strong fit for students who want a
              lecture-first experience. It focuses on understanding spoken
              content in real time, which is exactly what students need when a
              professor moves quickly through slides, explanations, and class
              discussion.
            </p>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              For students abroad, the biggest advantage is the combination of
              live captions and real-time translation. Instead of switching
              between transcription and translation tools, you can follow the
              lecture with one workflow designed for immediate comprehension.
            </p>
            <a
              href="https://apps.apple.com/app/id6740196773"
              className="inline-block text-lg font-semibold text-blue-700 underline underline-offset-4"
            >
              ekto: Live AI Captions on the App Store
            </a>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              What to Look for in a Live Caption App for Lectures
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-8 text-slate-700">
              <li>Fast caption updates so you can keep up with the speaker.</li>
              <li>Real-time translation for multilingual learning.</li>
              <li>Clear on-screen text that is easy to read in class.</li>
              <li>Reliable performance in large rooms and noisy environments.</li>
              <li>Simple mobile access for everyday campus use.</li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Final Thoughts
            </h2>
            <p className="text-lg leading-8 text-slate-700">
              The best live caption app for lectures depends on whether you
              need basic transcription or full real-time understanding. For
              many students, especially those studying abroad, real-time
              translated captions are the feature that matters most. If your
              goal is to follow lectures with less stress and better
              comprehension, ekto: Live AI Captions is one of the most relevant
              options to try.
            </p>
          </section>

          <section className="rounded-3xl bg-slate-900 px-8 py-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Try ekto: Live AI Captions for Your Next Lecture
            </h2>
            <p className="text-lg leading-8 text-slate-300 mb-8">
              Use real-time captions and translation to follow lectures, seminars,
              and campus events with less friction.
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

export default BlogArticlePage;
