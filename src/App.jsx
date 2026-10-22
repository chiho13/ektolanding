import { useState, useEffect } from "react";
import appStoreButton from "./assets/download-on-the-app-store-white.svg";
import appIcon from "./assets/ekto.png";
import backgroundImage from "./assets/ektolanding4.jpg";
import appStoreQr from "./assets/appstore-qr.svg";

import { getTranslation, getLocale, getArticlePath, getBlogPath } from "./i18n/index.js";
import { APP_STORE_URL, articleSlugs, getLocalUseCaseArticle } from "./i18n/locales.js";
import LanguageSelector from "./i18n/LanguageSelector.jsx";

function App({ locale = "en" }) {
  const currentLocale = getLocale(locale);
  const t = getTranslation(currentLocale.code);
  const articlePath = (slug) => getArticlePath(currentLocale.code, slug);
  const useCases = t.useCases.map(([title, description], index) => ({
    title, description,
    href: getLocalUseCaseArticle(currentLocale.code, index) ?? (index < 3 ? articlePath([articleSlugs[2], articleSlugs[1], articleSlugs[0]][index]) : undefined),
  }));
  const faqs = t.faqs.map(([question, answer]) => ({ question, answer }));
  const pricingPlans = t.plans.map(([name, cadence], index) => ({
    name, cadence, price: ["$14.99", "$34.99", "$79.99"][index],
    badge: index === 2 ? t.bestValue : undefined,
  }));
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
        <div className="flex gap-0.5" aria-hidden="true">
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
        <span className="text-sm font-semibold text-gray-200">{new Intl.NumberFormat(currentLocale.lang).format(rating)}</span>
        <span className="text-xs text-gray-300">{t.onAppStore}</span>
      </div>
    );
  };

  return (
    <div className="landing-page min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-6 py-4 backdrop-blur-xl bg-white/40 border-b border-white/40 sticky top-0 z-50 ring-1 ring-white/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={appIcon}
              alt={t.iconAlt}
              className="w-10 h-10 rounded-lg shadow-lg"
            />
            <span className="text-xl font-bold text-gray-800 hidden sm:inline">
              ekto
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="/for-event-organizers/"
              className="hidden md:inline-flex text-sm font-semibold text-gray-700 hover:text-blue-700"
            >{t.organizers}</a>
            <a
              href={getBlogPath(currentLocale.code)}
              className="hidden sm:inline-flex text-sm font-semibold text-gray-700 hover:text-blue-700"
            >{t.blog}</a>
            <LanguageSelector locale={currentLocale.code} label={t.chooseLanguage} />

            <a
              href="https://apps.apple.com/app/id6740196773"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 sm:px-5 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg backdrop-blur-sm text-sm sm:text-base"
              aria-label={t.downloadLabel}
            >{t.download}</a>
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
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">{t.heroEyebrow}</p>
              <h1 className="mb-6 text-4xl font-bold leading-[1.12] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.5rem]">{t.heroTitle}</h1>
              <p className="mb-8 max-w-lg text-lg leading-8 text-slate-300 md:text-xl">{t.heroDescription}</p>

              {/* CTA */}
              <div className="mb-5 flex flex-wrap items-center gap-4">
                <a
                  href={APP_STORE_URL}
                  aria-label={t.downloadLabel}
                  className="shrink-0 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <img
                    src={appStoreButton}
                    alt={t.downloadLabel}
                    className="h-14 drop-shadow-xl"
                  />
                </a>
                <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-2.5 pr-4 backdrop-blur-sm lg:flex">
                  <img
                    src={appStoreQr}
                    alt={t.qrAlt}
                    className="h-14 w-14 rounded-lg bg-white p-1"
                  />
                  <span className="max-w-28 text-xs font-medium leading-snug text-slate-300">{t.scan}</span>
                </div>
              </div>

              <a
                href="https://www.uneed.best/tool/ekto-live-translator"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.uneedLabel}
                className="relative mb-7 inline-flex aspect-[639/171] w-[250px] overflow-hidden rounded-xl bg-slate-200 shadow-lg shadow-black/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cyan-950/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                <span
                  className="absolute inset-0 animate-pulse bg-linear-to-r from-slate-200 via-white to-slate-200"
                  aria-hidden="true"
                />
                <img
                  src="https://www.uneed.best/POTD2A.png"
                  alt={t.uneedAlt}
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
                  {t.proof.map((item) => (
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
                  ))}
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
                  aria-label={t.demoLabel}
                >
                  <source src="/productdemo.mp4" type="video/mp4" />{t.videoFallback}</video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="px-6 py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.howTitle}</h2>
            <p className="text-lg text-gray-600">{t.howDescription}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center backdrop-blur-xl bg-white/25 rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/35 transition-all duration-300 ring-1 ring-white/15">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.steps[0][0]}</h3>
              <p className="text-gray-700">{t.steps[0][1]}</p>
            </div>

            <div className="text-center backdrop-blur-xl bg-white/25 rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/35 transition-all duration-300 ring-1 ring-white/15">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.steps[1][0]}</h3>
              <p className="text-gray-700">{t.steps[1][1]}</p>
            </div>

            <div className="text-center backdrop-blur-xl bg-white/25 rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/35 transition-all duration-300 ring-1 ring-white/15">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.steps[2][0]}</h3>
              <p className="text-gray-700">{t.steps[2][1]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">{t.featuresTitle}</h2>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.features[0][0]}</h3>
              <p className="text-gray-700">{t.features[0][1]}</p>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.features[1][0]}</h3>
              <p className="text-gray-700">{t.features[1][1]}</p>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.features[2][0]}</h3>
              <p className="text-gray-700">{t.features[2][1]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.useCasesTitle}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.useCasesDescription}</p>
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
                  >{t.learnMore}</a>
                )}
              </div>
            ))}
          </div>

          {/* Mid-page CTA */}
          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-blue-700 px-6 py-10 text-center shadow-xl">
            <h3 className="text-2xl font-bold text-white">{t.ctaTitle}</h3>
            <a
              href={APP_STORE_URL}
              className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 text-lg font-bold text-blue-800 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-50"
              aria-label={t.downloadLabel}
            >{t.downloadFree}</a>
            <p className="text-sm text-blue-100">{t.ctaProof}</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 mb-3">{t.pricingEyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.pricingTitle}</h2>
            <p className="text-lg leading-8 text-gray-700">{t.pricingDescription}</p>
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
                <div className="mb-3 min-h-8">
                  {plan.badge && (
                    <span className="inline-flex rounded-full bg-blue-700 px-3 py-1 text-xs font-semibold text-white">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {plan.name}
                </h3>
                <p className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="ml-2 text-gray-600">{plan.cadence}</span>
                </p>
                <p className="text-sm font-medium text-gray-600">{t.usage}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-base leading-7 text-gray-700">{t.pricingNote}</p>
            <a
              href="https://apps.apple.com/app/id6740196773"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-800"
            >{t.viewStore}</a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 mb-3">{t.blogEyebrow}</p>
              <h2 className="text-3xl font-bold text-slate-900">{t.blogTitle}</h2>
            </div>
            <a href={getBlogPath(currentLocale.code)} className="inline-flex text-lg font-semibold text-blue-700 hover:text-blue-800">{t.allArticles}</a>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.articles.map(([category, title, description], index) => (
              <article key={articleSlugs[index]} className={`rounded-2xl border p-6 ${index === 4 ? "border-blue-200 bg-blue-50 md:col-span-2 lg:col-span-4" : "border-slate-200 bg-slate-50"}`}>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700 mb-3">{category}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                <p className="text-base leading-7 text-slate-700 mb-5">{description}</p>
                <a href={articlePath(articleSlugs[index])} className="inline-flex font-semibold text-blue-700 hover:text-blue-800">{t.readArticle}<span aria-hidden="true"> →</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16 bg-blue-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.faqTitle}</h2>
            <p className="text-lg text-gray-600">{t.faqDescription}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.finalTitle}</h2>
          <p className="text-xl text-gray-300 mb-8">{t.finalDescription}</p>
          <a
            href="https://apps.apple.com/app/id6740196773"
            aria-label={t.downloadLabel}
          >
            <img
              src={appStoreButton}
              alt={t.downloadLabel}
              className="h-16 mx-auto hover:scale-105 transition-transform cursor-pointer"
            />
          </a>
          <p className="text-gray-400 mt-6 text-sm">{t.availability}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400 pb-16 sm:pb-0">
          <p>
            &copy; {new Date().getFullYear()} ekto: Live AI Captions. {t.rights}
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
              <p className="text-xs text-gray-600">{t.stickyProof}</p>
            </div>
          </div>
          <a
            href={APP_STORE_URL}
            className="shrink-0 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg"
            aria-label={t.downloadLabel}
          >{t.downloadFree}</a>
        </div>
      </div>
    </div>
  );
}

export default App;
