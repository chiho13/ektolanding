import { liveTranslationGuides } from "./content/live-translation-guide.js";
import { guideCopy } from "./content/live-translation-guide-copy.js";

function LiveTranslationGuidePage({ guide }) {
  const { locale } = guide;
  const copy = guideCopy[locale.code];
  const apps = Object.entries(copy.apps);
  const googleHelp = (id) => `https://support.google.com/translate/answer/${id}?co=GENIE.Platform%3DiOS&hl=${locale.code === "en" ? "en-GB" : locale.lang}`;
  const sources = {
    ekto: [guide.appStoreUrl],
    transync: ["https://www.transyncai.com/docs/mobile-quickstart/"],
    apple: [
      "https://support.apple.com/guide/iphone/translate-text-voice-and-conversations-iphd74cb450f/26/ios/26",
      "https://support.apple.com/guide/airpods/translate-in-person-conversations-dev9c215ca94/web",
    ],
    google: [googleHelp(6142474), googleHelp(9724492)],
    soniox: ["https://app.soniox.com/help-center/mobile-app/usage/getting-started"],
    hono: ["https://apps.apple.com/us/app/hono-translate-live-subtitles/id6799000160"],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white px-5 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <a href={locale.path} className="flex items-center gap-3 font-bold">
            <img src="/apple-touch-icon.png" width="40" height="40" alt="" className="rounded-lg shadow-sm" />
            ekto
          </a>
          <a href={guide.appStoreUrl} className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-800">
            {copy.download}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8 sm:py-12">
        <article>
          <nav aria-label={copy.languageLabel} className="mb-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            {liveTranslationGuides.map(({ locale: other, href }) => (
              other.code === locale.code
                ? <span key={other.code} aria-current="page">{other.name}</span>
                : <a key={other.code} href={href} lang={other.lang} hrefLang={other.lang} className="text-blue-700 underline underline-offset-4">{other.name}</a>
            ))}
          </nav>
          <div className="rounded-3xl border border-blue-100 bg-blue-50 px-5 py-7 sm:px-9 sm:py-10">
            <p className="mb-3 text-sm font-semibold text-blue-800">{guide.category}</p>
            <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{guide.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-800">{copy.taglinePrefix}<strong>{copy.tagline}</strong>{" "}{copy.intro}</p>
            <p className="mt-4 text-sm leading-6 text-slate-700">{copy.disclosure}</p>
          </div>

          <section aria-labelledby="app-comparison" className="mt-9">
            <h2 id="app-comparison" className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">{copy.compare}</h2>
            <ul className="mb-6 flex flex-wrap gap-2 text-sm font-semibold text-blue-700">
              {apps.map(([id, app]) => (
                <li key={id}><a href={`#${id}`} className="block rounded-full border border-slate-200 bg-white px-3 py-2 hover:bg-blue-50">{app.name}</a></li>
              ))}
            </ul>
            <div className="grid gap-4">
              {apps.map(([id, app]) => (
                <section key={id} id={id} className="scroll-mt-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                  <h3 className="text-2xl font-bold tracking-tight">{app.name}</h3>
                  <p className="mt-1 font-semibold text-blue-800">{app.fit}</p>
                  <p className="mt-3 leading-7 text-slate-700">{app.detail}</p>
                  <p className="mt-3 leading-7 text-slate-700"><strong>{copy.limitation}:</strong> {app.limit}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-blue-700">
                    {sources[id].map((href, index) => (
                      <li key={href}><a href={href} className="underline underline-offset-4">{app.links[index]}</a></li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>

          {copy.papago && (
            <aside className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <h2 className="text-xl font-bold">{copy.papago.title}</h2>
              <p className="my-2 leading-7 text-slate-700">{copy.papago.body}</p>
              <a href={`https://apps.apple.com/${guide.store}/app/id1147874819`} className="text-sm font-semibold text-blue-700 underline underline-offset-4">{copy.papago.link}</a>
            </aside>
          )}

          <section className="mt-9 border-t border-slate-200 pt-7">
            <h2 className="text-2xl font-bold tracking-tight">{copy.adviceTitle}</h2>
            <p className="mt-3 leading-7 text-slate-700">{copy.advice}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 font-semibold text-blue-700">
              <a href={guide.relatedPath} className="underline underline-offset-4">{copy.relatedLabel}</a>
              <a href={guide.blogPath} className="underline underline-offset-4">{copy.blogLabel}</a>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

export default LiveTranslationGuidePage;
