import appStoreButton from "./assets/downloadbtn.svg";
import appIcon from "./assets/ekto.png";

const everydaySituations = [
  "Dinner with friends or family, especially when people speak across the table.",
  "Lectures, talks, meetups, and church services where the speaker is not nearby.",
  "Doctor appointments, clinics, and reception desks where details matter.",
  "Airports, hotels, travel counters, and other busy public places.",
  "Conferences, tours, workshops, and community events with changing speakers.",
];

function DeafHardOfHearingCaptionsPage() {
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
            Live Captions for Deaf and Hard-of-Hearing People at In-Person Events
          </h1>
          <p className="text-lg leading-8 text-slate-700 mb-8">
            Live captions are not only for video calls. They can also help Deaf
            and hard-of-hearing people follow what is being said in real-world
            places: at dinner, in lectures, during doctor appointments, at the
            airport, at a hotel desk, or inside a busy event room.
          </p>
          <p className="text-lg leading-8 text-slate-700 mb-10">
            The goal is simple: helping you stay independent and confident in
            your everyday life.
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
              What Live Captions Do
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              Live captions convert spoken words into readable text in real
              time. Instead of guessing what someone said, you can read the
              words as the conversation continues.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              This is useful when speech is fast, the room is noisy, the speaker
              is far away, or you need a second way to follow the conversation.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Why Long-Distance Captions Matter
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              Many important conversations do not happen face to face at a quiet
              desk. They happen across a dinner table, from the front of a
              lecture hall, behind a hotel counter, or from a doctor standing a
              few steps away.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              ekto can help capture speech from across a table or room when
              conditions allow. That matters because distance is one of the
              everyday reasons people miss details, even when they are paying
              close attention.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Everyday Places Where Live Captions Help
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-8 text-slate-700">
              {everydaySituations.map((situation) => (
                <li key={situation}>{situation}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Stay Independent in Everyday Conversations
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              Missing speech can make people feel left out, even in ordinary
              moments. A server asks a question. A friend tells a story. A
              doctor explains the next step. An airport worker gives an update.
              When you miss the words, you may also miss the chance to respond.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              Fast live captions can make those moments easier to handle. They
              give you more context and more time to respond, so you can make
              your own decisions without waiting for someone else to explain
              what was said.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Big Reply Helps You Answer Clearly
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              Understanding speech is only one side of a conversation. Sometimes
              you also need a simple way to answer. Big Reply lets you type a
              response in large text and show it to another person.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              That can help at restaurants, clinics, hotel desks, airport
              counters, noisy rooms, and other situations where a clear visual
              reply is easier than repeating yourself.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              A Helpful Tool, Not a Replacement for Required Support
            </h2>
            <p className="text-lg leading-8 text-slate-700">
              ekto can help in many everyday situations, but it does not replace
              professional interpreters, CART captioning, hearing aids, medical
              advice, or legally required accessibility services. For important
              medical, legal, educational, or workplace settings, use the
              support that fits the situation and your rights.
            </p>
          </section>

          <section className="rounded-3xl bg-slate-900 px-8 py-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Use ekto to Stay Independent in Real Conversations
            </h2>
            <p className="text-lg leading-8 text-slate-300 mb-8">
              Follow speech and respond in real-world conversations, from
              dinners and appointments to airports, hotels, lectures, and
              events.
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

export default DeafHardOfHearingCaptionsPage;
