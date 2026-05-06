import appStoreButton from "./assets/downloadbtn.svg";
import appIcon from "./assets/ekto.png";

const useCases = [
  "International business conferences",
  "Trade shows and exhibitions",
  "Investor events and product launches",
  "Industry summits and panel discussions",
  "Global company meetings",
  "Training workshops and partner events",
  "Academic and research conferences",
];

const attendeeBenefits = [
  "Follow speakers who are not presenting in English.",
  "Understand English talks more clearly when English is your second language.",
  "Read key points in your preferred language while the speaker continues.",
  "Take better notes during technical or fast-moving sessions.",
  "Feel more confident during Q&A and networking.",
  "Get more value from international travel and event tickets.",
];

const organizerBenefits = [
  "Support international attendees more easily.",
  "Make sessions easier to follow without changing the event format.",
  "Improve accessibility for multilingual audiences.",
  "Increase attendee satisfaction at global events.",
  "Add a practical language layer to talks, panels, and workshops.",
];

const faqs = [
  {
    question: "What is live translation for business conferences?",
    answer:
      "Live translation turns spoken language into translated text in real time. At a conference, attendees can read the talk in their preferred language while the speaker keeps presenting.",
  },
  {
    question: "Can live translation help if the speaker is already using English?",
    answer:
      "Yes. Many attendees understand some English but prefer to read business or technical content in their native language. Live translation can reduce listening fatigue and make details easier to follow.",
  },
  {
    question: "Who should use live translation at a conference?",
    answer:
      "Live translation is useful for business travelers, international teams, event organizers, exhibitors, students, researchers, and anyone attending a session in a language they do not fully understand.",
  },
];

function BusinessConferenceTranslationPage() {
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
            Live Translation for Business Conferences: Understand Every Speaker
          </h1>
          <p className="text-lg leading-8 text-slate-700 mb-8">
            Business conferences are more international than ever. People travel
            across countries to hear new ideas, meet partners, find customers,
            and learn from industry leaders.
          </p>
          <p className="text-lg leading-8 text-slate-700 mb-10">
            But language often gets in the way. Many conferences do not provide
            real-time subtitles or interpretation. Some speakers do not present
            in English. Some attendees understand English, but not well enough
            to follow fast, technical, or detailed talks. Live translation helps
            solve this problem.
          </p>

          <section className="mb-12 rounded-2xl bg-white p-6 border border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              What Is Live Translation?
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              Live translation converts spoken language into translated text in
              real time. At a business conference, this means an attendee can
              read a speaker&apos;s words in the language they understand best
              while the session continues.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              For example, a speaker may present in German, Chinese, Japanese,
              French, Spanish, or Italian. With live translation, an attendee
              can follow the talk in English or another preferred language
              without waiting for a written summary after the event.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              The Language Problem at International Conferences
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              A conference in Europe, China, Japan, Korea, or Latin America may
              include excellent sessions that are not held in English. For an
              English-speaking attendee, those sessions can be hard to follow
              without translation.
            </p>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              The reverse is also common. Many global events use English as the
              main conference language, but many attendees are not native
              English speakers. They may understand everyday English, yet still
              miss important points when a speaker talks quickly, uses industry
              terms, or has an unfamiliar accent.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              At a business event, missing details matters. It can mean weaker
              notes, fewer questions, less confidence, and less value from the
              session.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Why Attendees Use Live Translation
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-8 text-slate-700">
              {attendeeBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Why Organizers Should Offer Live Translation
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              Live translation is not only useful for attendees. It also helps
              event organizers create a better experience for international
              guests. A multilingual event is easier to attend, easier to
              recommend, and easier to trust.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-8 text-slate-700">
              {organizerBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Where Live Translation Works Best
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              Live translation is useful anywhere people need to understand
              speech across languages. It is especially helpful when the room is
              international and the content is important.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-8 text-slate-700">
              {useCases.map((useCase) => (
                <li key={useCase}>{useCase}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              Why Native Language Understanding Matters
            </h2>
            <p className="text-lg leading-8 text-slate-700 mb-5">
              Business conference talks often include strategy, market data,
              regulation, finance, product details, technical terms, and fast
              panel discussion. Even a fluent second-language speaker can lose
              context when the topic is dense.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              Reading live translation in your preferred language reduces the
              effort of decoding speech. It helps you focus on the idea, not the
              language barrier.
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
            <p className="text-lg leading-8 text-slate-700 mb-5">
              International conferences should be easier to understand. If a
              venue does not provide translation, or if a speaker presents in a
              language you do not fully understand, live translation gives you a
              simple way to follow the session in real time.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              For business travelers, international teams, and event organizers,
              live translation makes global conferences more useful, more
              accessible, and more valuable.
            </p>
          </section>

          <section className="rounded-3xl bg-slate-900 px-8 py-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Follow Your Next Conference with Ekto
            </h2>
            <p className="text-lg leading-8 text-slate-300 mb-8">
              Use live translation to understand talks, panels, and business
              sessions in the language that works best for you.
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

export default BusinessConferenceTranslationPage;
