import { useState, useEffect } from "react";
import appStoreButton from "./assets/download-on-the-app-store-white.svg";
import appIcon from "./assets/ekto.png";
import backgroundImage from "./assets/ektolanding4.jpg";
import appStoreQr from "./assets/appstore-qr.svg";

const APP_STORE_URL = "https://apps.apple.com/app/id6740196773";

const useCases = [
  {
    title: "Live captions for lectures and seminars",
    description:
      "Follow fast-talking lecturers word for word, even from the back row. Save transcripts to review before exams.",
    href: "/blog/how-to-understand-lectures-in-a-foreign-language/",
  },
  {
    title: "Real-time translation at conferences and events",
    description:
      "Understand talks, panels, and networking conversations when speakers use another language — no interpreter needed.",
    href: "/blog/live-translation-for-business-conferences/",
  },
  {
    title: "Captions for deaf and hard-of-hearing users",
    description:
      "Read what is being said in dinners, appointments, and events in real time, and reply with Big Reply when it is easier to show than speak.",
    href: "/blog/live-captions-for-deaf-hard-of-hearing-events/",
  },
  {
    title: "Live captions for church sermons",
    description:
      "Follow sermons and services in your own language. Live Link lets the whole congregation read along on their own phones.",
  },
  {
    title: "Real-time conversation translator",
    description:
      "Talk with anyone face to face. Two-Way Mode translates both sides of the conversation as you speak.",
  },
  {
    title: "Doctor's appointments and travel",
    description:
      "Don't nod along and hope you understood. Read every detail at appointments, help desks, and tours where mishearing is not an option.",
  },
];

const faqs = [
  {
    question: "Is ekto free to download?",
    answer:
      "Yes. ekto is free to download on the App Store, so you can try live captions and translation right away. A premium subscription unlocks unlimited captions and translation, with each live session supporting up to 2 hours.",
  },
  {
    question: "How accurate are the live captions?",
    answer:
      "ekto uses advanced AI speech recognition designed for real-world listening, so captions stay accurate even when you are seated far from the speaker. You can also add custom words to improve accuracy for names, jargon, and technical terms.",
  },
  {
    question: "What languages does ekto translate?",
    answer:
      "ekto translates speech between 37+ languages in real time, with automatic language detection. You can read live captions in the original language or translated subtitles in yours.",
  },
  {
    question: "Does ekto work offline?",
    answer:
      "No. ekto needs an internet connection to deliver its most accurate live captions and translation. Microphone access is also required.",
  },
  {
    question: "Does ekto record or store my audio?",
    answer:
      "No audio is stored, and nothing you capture is used for AI training. You can optionally save transcripts of your sessions to review later, and they stay under your control.",
  },
  {
    question: "Can I use ekto for lectures, church services, or conferences?",
    answer:
      "Yes. ekto is built for in-person events like lectures, sermons, conferences, meetings, and tours. Picture-in-picture mode keeps captions visible while you take notes, and Live Link lets an audience follow along on their own devices through a web link.",
  },
  {
    question:
      "How is ekto different from Google Translate's conversation mode?",
    answer:
      "Google Translate's conversation mode is built for two-way language exchange: it reads translations aloud with text-to-speech, which is great for short back-and-forth chats. ekto is built for continuous, hands-free listening instead. Tap once and it keeps up with multi-hour lectures and talks, shows live captions on screen, captures speech from across the room, saves transcripts, and generates AI summaries of what was said.",
  },
];

const pricingPlans = [
  {
    name: "Weekly",
    price: "$14.99",
    cadence: "per week",
  },
  {
    name: "Monthly",
    price: "$29.99",
    cadence: "per month",
  },
  {
    name: "Quarterly",
    price: "$59.99",
    cadence: "per 3 months",
    badge: "Best value",
  },
];

function App() {
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Star rating component with proper half-star support
  const StarRating = ({ rating = 4.5 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const starPath =
      "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {/* Full stars */}
          {[...Array(fullStars)].map((_, i) => (
            <svg
              key={`full-${i}`}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d={starPath} />
            </svg>
          ))}
          {/* Half star */}
          {hasHalfStar && (
            <svg key="half" className="w-5 h-5" viewBox="0 0 20 20">
              <defs>
                <linearGradient id="halfGradient">
                  <stop offset="50%" stopColor="#FACC15" />
                  <stop offset="50%" stopColor="#bcc0c7ff" />
                </linearGradient>
              </defs>
              <path d={starPath} fill="url(#halfGradient)" />
            </svg>
          )}
          {/* Empty stars */}
          {[...Array(emptyStars)].map((_, i) => (
            <svg
              key={`empty-${i}`}
              className="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d={starPath} />
            </svg>
          ))}
        </div>
        <span className="text-sm font-semibold text-gray-200">{rating}</span>
        <span className="text-xs text-gray-300">on App Store</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-6 py-4 backdrop-blur-xl bg-white/40 border-b border-white/40 sticky top-0 z-50 ring-1 ring-white/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={appIcon}
              alt="ekto: Live AI Captions app icon"
              className="w-10 h-10 rounded-lg shadow-lg"
            />
            <span className="text-xl font-bold text-gray-800 hidden sm:inline">
              ekto
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/for-event-organizers/"
              className="hidden md:inline-flex text-sm font-semibold text-gray-700 hover:text-blue-700"
            >
              For event organizers
            </a>
            <a
              href="/blog/"
              className="hidden sm:inline-flex text-sm font-semibold text-gray-700 hover:text-blue-700"
            >
              Blog
            </a>
            {/* Language Selector */}
            {/* <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 hover:bg-white/80 transition-all duration-200 border border-white/40 shadow-sm"
                aria-label="Select language"
              >
                <span className="text-lg">{translations[language].flag}</span>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">{translations[language].name}</span>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isLangMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 py-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                    {Object.values(translations).map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-blue-50 transition-colors ${
                          language === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div> */}

            <a
              href="https://apps.apple.com/app/id6740196773"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg backdrop-blur-sm text-sm sm:text-base"
              aria-label="Download ekto on the App Store"
            >
              Download
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-[#07152c] px-6 py-16 md:py-20 lg:py-24">
        <div
          className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -right-24 bottom-0 h-128 w-lg rounded-full bg-cyan-400/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] lg:gap-16">
            {/* Left side - Content */}
            <div className="relative z-10 max-w-xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Understand anyone, anywhere
              </p>
              <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4rem]">
                <span className="bg-linear-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                  Live translation
                </span>{" "}
                that keeps up
              </h1>
              <p className="mb-8 max-w-lg text-lg leading-8 text-slate-300 md:text-xl">
                Real-time translation and captions for long meetings, lectures,
                and everyday conversations. Follow every word in 37+ languages.
              </p>

              {/* CTA */}
              <div className="mb-5 flex flex-wrap items-center gap-4">
                <a
                  href={APP_STORE_URL}
                  aria-label="Download ekto on the App Store"
                  className="shrink-0 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <img
                    src={appStoreButton}
                    alt="Download ekto: Live AI Captions on the App Store"
                    className="h-14 drop-shadow-xl"
                  />
                </a>
                <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-2.5 pr-4 backdrop-blur-sm lg:flex">
                  <img
                    src={appStoreQr}
                    alt="QR code to download ekto on the App Store"
                    className="h-14 w-14 rounded-lg bg-white p-1"
                  />
                  <span className="max-w-28 text-xs font-medium leading-snug text-slate-300">
                    Scan to download on iPhone
                  </span>
                </div>
              </div>

              <a
                href="https://www.uneed.best/tool/ekto-live-translator"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View ekto Live Translator on Uneed (opens in a new tab)"
                className="relative mb-7 inline-flex aspect-[639/171] w-[250px] overflow-hidden rounded-xl bg-slate-200 shadow-lg shadow-black/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cyan-950/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                <span
                  className="absolute inset-0 animate-pulse bg-linear-to-r from-slate-200 via-white to-slate-200"
                  aria-hidden="true"
                />
                <img
                  src="https://www.uneed.best/POTD2A.png"
                  alt="Uneed Product of the Day #2 badge"
                  width="639"
                  height="171"
                  decoding="async"
                  className="relative h-full w-full object-contain"
                />
              </a>

              {/* Social Proof */}
              <div className="flex flex-col gap-4">
                <StarRating rating={4.5} reviews={16} />
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
                  {["Free to download", "37+ languages", "No setup required"].map(
                    (item) => (
                      <span key={item} className="inline-flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-emerald-300"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.296-7.293a1 1 0 011.408 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Right side - Product demo */}
            <div className="relative mx-auto w-full max-w-150 lg:mx-0 lg:ml-auto">
              <div
                className="absolute -inset-5 rounded-[2.75rem] bg-linear-to-br from-blue-500/30 via-cyan-400/10 to-emerald-300/20 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/6 p-3 shadow-[0_32px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                <video
                  className="aspect-square w-full rounded-3xl bg-slate-950 object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="metadata"
                  poster={backgroundImage}
                  aria-label="Demo of ekto generating live captions and translations"
                >
                  <source src="/productdemo.mp4" type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="px-6 py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How ekto works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to follow conversations in real time
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center backdrop-blur-xl bg-white/25 rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/35 transition-all duration-300 ring-1 ring-white/15">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Open ekto
              </h3>
              <p className="text-gray-700">
                Start captions in seconds and choose the language pair you want
                for talks, classes, tours, or face-to-face conversations.
              </p>
            </div>

            <div className="text-center backdrop-blur-xl bg-white/25 rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/35 transition-all duration-300 ring-1 ring-white/15">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Capture speech live
              </h3>
              <p className="text-gray-700">
                ekto listens and turns spoken audio into readable captions and
                translations as the moment happens.
              </p>
            </div>

            <div className="text-center backdrop-blur-xl bg-white/25 rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/35 transition-all duration-300 ring-1 ring-white/15">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Keep up naturally
              </h3>
              <p className="text-gray-700">
                Read along on screen while you watch, listen, or talk without
                asking people to slow down or repeat themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Built for in-person understanding
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 backdrop-blur-xl bg-white/30 rounded-2xl border border-white/40 shadow-xl hover:bg-white/40 transition-all duration-300 ring-1 ring-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-Time AI Captions
              </h3>
              <p className="text-gray-700">
                Get accurate captions for live events, plus speaker
                identification for meetings (beta).
              </p>
            </div>

            <div className="text-center p-8 backdrop-blur-xl bg-white/30 rounded-2xl border border-white/40 shadow-xl hover:bg-white/40 transition-all duration-300 ring-1 ring-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7M3 18h.01M3 12h.01M3 6h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Picture-in-Picture Mode
              </h3>
              <p className="text-gray-700">
                Keep captions visible in a floating window while you move
                through talks, tours, classes, and other live moments.
              </p>
            </div>

            <div className="text-center p-8 backdrop-blur-xl bg-white/30 rounded-2xl border border-white/40 shadow-xl hover:bg-white/40 transition-all duration-300 ring-1 ring-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                37+ Language AI Translation
              </h3>
              <p className="text-gray-700">
                ekto supports instant translation between 37+ languages for
                multilingual conversations in shared, real-world spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              One app for lectures, conferences, sermons, and conversations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Wherever you need to understand what is being said in person,
              ekto keeps up in real time.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-700 leading-7">{useCase.description}</p>
                {useCase.href && (
                  <a
                    href={useCase.href}
                    className="mt-4 inline-flex font-semibold text-blue-700 hover:text-blue-800"
                  >
                    Learn more
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Mid-page CTA */}
          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-blue-700 px-6 py-10 text-center shadow-xl">
            <h3 className="text-2xl font-bold text-white">
              Try live captions at your next lecture, meeting, or service
            </h3>
            <a
              href={APP_STORE_URL}
              className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 text-lg font-bold text-blue-800 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-50"
              aria-label="Download ekto free on the App Store"
            >
              Download Free
            </a>
            <p className="text-sm text-blue-100">
              4.5 stars on the App Store • 37+ languages • No signup required
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 mb-3">
              Pricing
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Unlimited captions and translation
            </h2>
            <p className="text-lg leading-8 text-gray-700">
              Use ekto as much as you need, with each live session supporting up
              to 2 hours. US App Store pricing is shown below; prices may vary
              by country or region.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 shadow-lg ${
                  plan.badge
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                {plan.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-blue-700 px-3 py-1 text-xs font-semibold text-white">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {plan.name}
                </h3>
                <p className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="ml-2 text-gray-600">{plan.cadence}</span>
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Unlimited usage • 2-hour sessions
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-base leading-7 text-gray-700">
              Final subscription options and local pricing are confirmed in the
              App Store before purchase.
            </p>
            <a
              href="https://apps.apple.com/app/id6740196773"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-800"
            >
              View on App Store
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 mb-3">
                From the Blog
              </p>
              <h2 className="text-3xl font-bold text-slate-900">
                Live translation and caption guides
              </h2>
            </div>
            <a
              href="/blog/"
              className="inline-flex text-lg font-semibold text-blue-700 hover:text-blue-800"
            >
              View all articles
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700 mb-3">
                Accessibility
              </p>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Live Captions for Deaf and Hard-of-Hearing People
              </h3>
              <p className="text-base leading-7 text-slate-700 mb-5">
                Follow speech and respond clearly in dinners, appointments,
                travel, lectures, and events.
              </p>
              <a
                href="/blog/live-captions-for-deaf-hard-of-hearing-events/"
                className="inline-flex font-semibold text-blue-700 hover:text-blue-800"
              >
                Read article
              </a>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700 mb-3">
                Conferences
              </p>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Live Translation for Business Conferences
              </h3>
              <p className="text-base leading-7 text-slate-700 mb-5">
                Understand talks, panels, and sessions when speakers use
                another language.
              </p>
              <a
                href="/blog/live-translation-for-business-conferences/"
                className="inline-flex font-semibold text-blue-700 hover:text-blue-800"
              >
                Read article
              </a>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700 mb-3">
                Lectures
              </p>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                How to Understand Lectures in a Foreign Language
              </h3>
              <p className="text-base leading-7 text-slate-700 mb-5">
                Practical tips for following lectures with live translation and
                saved transcripts.
              </p>
              <a
                href="/blog/how-to-understand-lectures-in-a-foreign-language/"
                className="inline-flex font-semibold text-blue-700 hover:text-blue-800"
              >
                Read article
              </a>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700 mb-3">
                App guides
              </p>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Top 5 Best Live Caption Apps for Lectures
              </h3>
              <p className="text-base leading-7 text-slate-700 mb-5">
                Compare live caption tools for students who need real-time
                translation.
              </p>
              <a
                href="/blog/top-5-best-live-caption-apps-for-lectures/"
                className="inline-flex font-semibold text-blue-700 hover:text-blue-800"
              >
                Read article
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16 bg-blue-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know before your first live session
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <svg
                    className="h-5 w-5 shrink-0 text-blue-700 transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-4 leading-7 text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="px-6 py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start using your pocket interpreter for real life
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Use live captions and translation when there is no interpreter, no
            AV team, and no Zoom transcript. Open ekto and follow what is being
            said in seconds.
          </p>
          <a
            href="https://apps.apple.com/app/id6740196773"
            aria-label="Download AI Voice Translator App"
          >
            <img
              src={appStoreButton}
              alt="Download ekto: Live AI Captions on the App Store"
              className="h-16 mx-auto hover:scale-105 transition-transform cursor-pointer"
            />
          </a>
          <p className="text-gray-400 mt-6 text-sm">
            Available on iOS • No signup required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400 pb-16 sm:pb-0">
          <p>
            &copy; {new Date().getFullYear()} ekto: Live AI Captions. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* Sticky mobile download bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.12)] backdrop-blur-md transition-transform duration-300 sm:hidden ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={appIcon}
              alt=""
              aria-hidden="true"
              className="h-10 w-10 shrink-0 rounded-lg shadow"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-gray-900">
                ekto: Live AI Captions
              </p>
              <p className="text-xs text-gray-600">
                4.5 stars • 37+ languages
              </p>
            </div>
          </div>
          <a
            href={APP_STORE_URL}
            className="shrink-0 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg"
            aria-label="Download ekto free on the App Store"
          >
            Download Free
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
