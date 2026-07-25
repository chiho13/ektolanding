import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  Clock3,
  Ellipsis,
  ExternalLink,
  Globe2,
  Link2,
  MessageSquareText,
  RotateCw,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";
import appIcon from "./assets/ekto.png";

const APP_STORE_URL = "https://apps.apple.com/app/id6740196773";
const CUSTOM_EVENT_URL =
  "mailto:contact@verby.co?subject=Ekto%20event%20enquiry&body=Event%20name%3A%0AEvent%20date%3A%0ADuration%3A%0AEstimated%20audience%20size%3A%0ALanguages%20needed%3A%0ANumber%20of%20sessions%20or%20rooms%3A%0AAccessibility%20requirements%3A%0A%0AAnything%20else%20we%20should%20know%3A";

const eventTypes = [
  "Talks and panels",
  "Classes and workshops",
  "Church services",
  "Community meetings",
  "Business events",
  "Tours and presentations",
];

const faqs = [
  {
    question: "Do attendees need to download the Ekto app?",
    answer:
      "No. The organizer starts Live Link in the Ekto app, then attendees open the shared link in a web browser on their own device.",
  },
  {
    question: "How long does a self-serve Live Link last?",
    answer:
      "Each self-serve Live Link supports a session of up to one hour. It is a practical fit for talks, lessons, services, workshops, and other short sessions.",
  },
  {
    question: "What if our event is longer or more complex?",
    answer:
      "Tell us about your schedule, audience size, languages, rooms, and accessibility needs. We will review the request and confirm whether a tailored setup or pilot is possible.",
  },
  {
    question: "Is Ekto a replacement for professional interpretation?",
    answer:
      "Ekto provides AI-generated live captions and translation. For legal, medical, safety-critical, or guaranteed-accessibility requirements, use an appropriately qualified interpreter or captioning provider.",
  },
];

function BrandMark({ inverted = false }) {
  return (
    <a href="/" className="flex items-center gap-3" aria-label="Ekto home">
      <img
        src={appIcon}
        alt=""
        className="h-10 w-10 rounded-xl shadow-lg"
      />
      <span
        className={`text-lg font-bold tracking-tight ${
          inverted ? "text-white" : "text-slate-950"
        }`}
      >
        ekto
      </span>
    </a>
  );
}

function IphoneStatusIcons() {
  return (
    <svg
      viewBox="0 0 68 14"
      className="h-3.5 w-[68px] text-white"
      fill="none"
      aria-hidden="true"
    >
      <rect x="0" y="9" width="3" height="4" rx="1.2" fill="currentColor" />
      <rect x="5" y="7" width="3" height="6" rx="1.2" fill="currentColor" />
      <rect x="10" y="4" width="3" height="9" rx="1.2" fill="currentColor" />
      <rect x="15" y="1" width="3" height="12" rx="1.2" fill="currentColor" />

      <path
        d="M24 5.2C28.3 1.5 34.5 1.5 38.8 5.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M26.9 8.1C29.5 5.9 33.3 5.9 35.9 8.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="31.4" cy="11.3" r="1.25" fill="currentColor" />

      <rect
        x="45"
        y="2"
        width="19"
        height="10"
        rx="2.8"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect x="47" y="4" width="14" height="6" rx="1.4" fill="currentColor" />
      <path
        d="M65.8 5V9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function SafariPageControlIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="14" height="10" rx="2" />
      <path d="M3 17h11" />
      <path d="M3 21h8" />
    </svg>
  );
}

function LiveRoomHeroPreview() {
  return (
    <div className="relative mx-auto h-[590px] w-full max-w-[340px] sm:h-[565px] lg:h-[535px]">
      <div className="absolute left-1/2 top-0 w-full origin-top -translate-x-1/2 scale-[0.8] sm:scale-[0.76] lg:scale-[0.72]">
        <div className="absolute -inset-5 rounded-[3.5rem] border border-white/10 bg-white/5 blur-sm" />
        <div
          className="relative rounded-[3.25rem] border border-white/20 bg-[#050608] p-[7px] shadow-[0_32px_90px_rgba(0,0,0,0.6)] ring-1 ring-black/80"
          style={{ aspectRatio: "9 / 19.5" }}
          role="img"
          aria-label="iPhone showing an Ekto Live Link open in Safari"
        >
        <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[2.8rem] bg-neutral-950">
          <div className="relative flex h-11 shrink-0 items-center justify-between px-5 pt-1 text-[0.7rem] font-semibold text-white">
            <span>9:41</span>
            <span className="absolute left-1/2 top-2 h-6 w-20 -translate-x-1/2 rounded-full bg-black" />
            <IphoneStatusIcons />
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 px-3 pb-3 text-white/70">
            <div className="flex min-w-0 items-center gap-2.5">
              <img
                src={appIcon}
                alt="ekto"
                className="h-8 w-8 rounded-lg shadow-lg"
              />
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-white/85">
                  ekto live translation
                </p>
                <p className="mt-0.5 inline-flex max-w-full items-center gap-1.5 truncate rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-white/50">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-white/35" />
                  Broadcast DEMO24
                </p>
              </div>
            </div>
            <p className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#8aeb9e]/25 bg-[#8aeb9e]/10 px-2 py-1 font-mono text-[0.65rem] font-medium text-[#8aeb9e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8aeb9e]" />
              LIVE
            </p>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden bg-black shadow-2xl ring-1 ring-white/10">
            <span className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-md border border-white/15 bg-neutral-950/80 text-xs font-bold text-white/80 shadow-lg backdrop-blur">
              Aa
            </span>

            <div className="absolute inset-x-0 bottom-0 space-y-3 px-5 pb-7 text-center sm:px-7 sm:pb-9">
              <p className="text-lg font-medium leading-snug text-white/60 sm:text-xl">
                Welcome. Today we are bringing people together from across the
                world.
              </p>
              <p className="text-xl font-semibold leading-snug text-[#8aeb9e] sm:text-2xl">
                ようこそ。本日は世界中から皆様にお集まりいただきました。
              </p>
            </div>
          </div>

          <div className="relative shrink-0 overflow-hidden bg-[#08090c] px-3 pb-5 pt-4">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(108,140,255,0.09),transparent_68%)]" />
            <div className="relative flex items-center gap-2 text-white/90" aria-hidden="true">
              <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-white/15 bg-[#24262b]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.13),0_8px_22px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
                <span className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                <ChevronLeft className="h-5 w-5" strokeWidth={2} />
              </span>

              <span className="relative grid h-11 min-w-0 flex-1 grid-cols-[1.25rem_1fr_1.25rem] items-center gap-1 overflow-hidden rounded-full border border-white/15 bg-[#24262b]/80 px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.13),0_8px_22px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
                <span className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <span className="text-white/85">
                  <SafariPageControlIcon />
                </span>
                <span className="truncate text-center text-[0.7rem] font-medium text-white/90">
                  voicetranslate.app
                </span>
                <RotateCw className="h-4 w-4 justify-self-end" strokeWidth={2} />
              </span>

              <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-white/15 bg-[#24262b]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.13),0_8px_22px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
                <span className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                <Ellipsis className="h-5 w-5" strokeWidth={2.2} />
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function EventOrganizersPage() {
  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d1018]/90 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5">
          <BrandMark inverted />
          <nav className="flex items-center gap-5" aria-label="Main navigation">
            <a
              href="/"
              className="hidden text-sm font-semibold text-slate-300 transition-colors hover:text-white sm:inline"
            >
              For individuals
            </a>
            <a
              href={APP_STORE_URL}
              className="rounded-xl bg-gradient-to-r from-[#493cff] to-[#5aa8ff] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition-all hover:brightness-110 sm:px-5"
            >
              Download Ekto
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="event-organizer-hero relative overflow-hidden px-5 py-20 text-white md:py-24">
          <div className="pointer-events-none absolute -right-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-52 left-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-300/5 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-300/10 px-4 py-2 text-sm font-semibold text-blue-100">
                <Users className="h-4 w-4" aria-hidden="true" />
                For event organizers
              </p>
              <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
                Live captions and translation for{" "}
                <span className="hero-audience-highlight">
                  your audience
                  <svg
                    className="hero-audience-curve"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <defs>
                      <linearGradient
                        id="hero-audience-curve-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#493cff" />
                        <stop offset="30%" stopColor="#5aa8ff" />
                        <stop offset="50%" stopColor="#8cf5c7" />
                        <stop offset="70%" stopColor="#5aa8ff" />
                        <stop offset="100%" stopColor="#493cff" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 2 8 Q 50 1.5 98 8"
                      fill="none"
                      stroke="url(#hero-audience-curve-gradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100 md:text-xl">
                Run a one-hour session yourself with Ekto Live Link—or tell us
                about a tailored solution for a longer or more complex event.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={APP_STORE_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-800 shadow-xl transition-transform hover:-translate-y-0.5"
                >
                  Start with Live Link
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={CUSTOM_EVENT_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-bold text-white transition-colors hover:bg-white/15"
                >
                  Contact us about your event
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-5 text-sm leading-6 text-blue-200">
                Self-serve Live Links last up to one hour. Custom requests are
                reviewed individually and are subject to availability.
              </p>
            </div>

            <LiveRoomHeroPreview />
          </div>
        </section>

        <section className="organizer-surface-hex relative overflow-hidden px-5 pb-8 pt-14 md:pb-10 md:pt-16">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                Choose the right path
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Start now, or talk to us about your event
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Ekto works self-serve for short sessions. If your requirements
                go beyond that, share the details before making plans.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <article className="flex h-full flex-col rounded-3xl border border-blue-200 bg-white p-7 shadow-sm md:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Clock3 className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
                  Self-serve
                </p>
                <h3 className="mt-2 text-3xl font-bold tracking-tight">
                  Host a one-hour Live Link
                </h3>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Start captions or translation in the Ekto app and share a
                  browser link with your audience. No attendee app download is
                  required.
                </p>
                <ul className="mt-7 space-y-4 text-slate-700">
                  {[
                    "Up to one hour per Live Link",
                    "Share with attendees by link",
                    "Guests follow on their own devices",
                    "Built for short, in-person sessions",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={APP_STORE_URL}
                  className="mt-9 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 font-bold text-white transition-colors hover:bg-blue-800"
                >
                  Download Ekto to host
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>

              <article className="flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-950 p-7 text-white shadow-xl md:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/15 text-violet-300">
                  <MessageSquareText className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-violet-300">
                  Custom events
                </p>
                <h3 className="mt-2 text-3xl font-bold tracking-tight">
                  Tell us what your event needs
                </h3>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Planning a longer schedule, multiple sessions, or a specific
                  accessibility setup? Send us the details so we can assess a
                  tailored solution or pilot.
                </p>
                <ul className="mt-7 space-y-4 text-slate-300">
                  {[
                    "Event date and duration",
                    "Audience size and languages",
                    "Number of sessions or rooms",
                    "Accessibility and support requirements",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={CUSTOM_EVENT_URL}
                  className="mt-9 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-slate-950 transition-colors hover:bg-violet-100"
                >
                  Contact us about your event
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="organizer-surface-hex organizer-surface-hex-offset relative overflow-hidden border-y border-slate-200 px-5 pb-14 pt-8 md:pb-16 md:pt-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-10">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                  How Live Link works
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  From spoken words to every screen
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  The organizer runs Ekto near the speaker. Attendees follow the
                  live captions or translation from a shared web link.
                </p>
              </div>

              <ol className="grid gap-5 sm:grid-cols-3">
                {[
                  {
                    icon: Smartphone,
                    title: "Start in Ekto",
                    description:
                      "Choose live captions or translation and create a Live Link in the app.",
                  },
                  {
                    icon: Link2,
                    title: "Share the link",
                    description:
                      "Send it directly or display it for attendees to open on their devices.",
                  },
                  {
                    icon: Users,
                    title: "Read together",
                    description:
                      "Your audience follows the speaker in real time from their browser.",
                  },
                ].map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.title} className="rounded-2xl bg-slate-50 p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <span className="text-sm font-bold text-slate-400">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                      <p className="mt-3 leading-7 text-slate-600">
                        {step.description}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 rounded-[2rem] bg-blue-50 p-7 md:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                  A practical fit for
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Short sessions where everyone should be able to follow
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {eventTypes.map((eventType) => (
                  <div
                    key={eventType}
                    className="flex items-center gap-3 rounded-xl border border-blue-100 bg-white px-4 py-4 font-semibold text-slate-800"
                  >
                    <Check className="h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                    {eventType}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0b2147] px-5 py-20 text-white">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
                  Prepared for your event
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Teach Ekto the words your audience needs to hear
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                  Add Custom Words before the session for speaker names,
                  company vocabulary, acronyms, and technical terms. Ekto uses
                  them to improve caption accuracy when those words come up.
                </p>
                <a
                  href={APP_STORE_URL}
                  className="mt-7 inline-flex items-center gap-2 font-bold text-blue-200 transition-colors hover:text-white"
                >
                  Prepare your event in Ekto
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: MessageSquareText,
                    title: "Custom Words",
                    text: "Prepare names, brand terms, acronyms, and specialist vocabulary before people arrive.",
                  },
                  {
                    icon: Globe2,
                    title: "37+ languages",
                    text: "Support multilingual audiences with live captions and real-time translation.",
                  },
                  {
                    icon: Smartphone,
                    title: "Simple audience access",
                    text: "Attendees open your Live Link in their browser and follow on their own devices.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Private by design",
                    text: "Audio is processed in real time, never stored, and never used for AI training.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <article
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-6"
                    >
                      <Icon
                        className="h-6 w-6 text-blue-300"
                        aria-hidden="true"
                      />
                      <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                      <p className="mt-2 leading-7 text-slate-400">
                        {item.text}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Questions from event organizers
              </h2>
            </div>
            <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold text-slate-950">
                    {faq.question}
                    <span className="text-2xl font-normal text-blue-700 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-3xl pt-4 leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-blue-700 px-7 py-12 text-white shadow-2xl md:px-12 md:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-3 text-blue-100">
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm font-bold uppercase tracking-[0.18em]">
                    Your next event
                  </span>
                </div>
                <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
                  Start self-serve—or tell us what would make Ekto work for your audience
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href={APP_STORE_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-800 hover:bg-blue-50"
                >
                  Download Ekto
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={CUSTOM_EVENT_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-bold text-white hover:bg-white/10"
                >
                  Contact us about your event
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <BrandMark />
          <p>Live AI captions and translation for in-person understanding.</p>
        </div>
      </footer>
    </div>
  );
}

export default EventOrganizersPage;
