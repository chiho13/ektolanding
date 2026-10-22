# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Landing-page localization

The homepage uses custom dictionaries in `src/i18n/locales/` and the shared locale
registry in `src/i18n/locales.js`. English is served at `/`; the other homepage
routes are `/fr/`, `/es/`, `/it/`, `/de/`, `/pt-br/`, `/nb/`, `/sv/`, `/fi/`,
`/ko/`, `/ja/`, `/zh-hans/`, and `/nl/`.

The URL determines the language before React hydration. The header links to the
other versions; there are no browser-language or stored-preference redirects.
Existing Japanese and Korean article translations are linked where available.
Other article destinations and the event-organizer and live-room pages retain
their existing behavior.

`npm run build` compiles the shared homepage once and prerenders each dictionary
into a separate static document. The Vite HTML hook uses the same SEO renderer
for local development. Titles, descriptions, social cards, reciprocal hreflang,
self canonicals and localized structured data are generated from the registry
and dictionaries. FAQ schema and visible answers share the same source. The
English metadata in the source `index.html` is also readable without a build;
the build refreshes it from the dictionary.

Run `npm run build` followed by `npm test`. Tests cover dictionary completeness,
locale resolution, article destinations, SEO generation, and the contents of all
built homepage documents. Build-output tests skip if `dist/` does not exist.
Use `npm run preview` to inspect the static output and `npm run dev` during edits.
When adding a locale, register its complete dictionary and add its public URL to
`public/sitemap.xml`; missing dictionary entries stop the build.

### Search positioning researched on 22 October 2026

The homepage targets people attending lectures and meetings in person, using
continuous translated captions on their own iPhone. Captions, translations and
post-session transcripts are explained as distinct benefits. Existing prices,
media and brand names are retained. No new articles or comparison pages were
added.

Sources reviewed:

- [Cuckoo homepage](https://www.cuckoo.so/): business teams, technical conversation
  context and live meeting translation.
- [Cuckoo events](https://www.cuckoo.so/events): live translated captions, audience
  links/QR access and event presentation workflows.
- [Maestra education](https://live.maestra.ai/education-translation/): separate
  lecture/class translation intent, in-class and online scenarios, captions,
  transcripts and school-meeting questions.
- [BBNotes lecture translation](https://bbnotes.app/lecture-translation/): student
  listening and bilingual lecture captions with later review.
- [Soniox lecture captions](https://soniox.com/soniox-app/for/language-students-lecture-captions):
  same-language live-caption and student-accessibility intent.

These are observed positioning and search-result themes, not verified organic
rankings, search-volume estimates, or keyword-difficulty figures. Native-language
query samples combined the following concepts to distinguish in-room listening
from recorded-media tools, video-call integrations and organizer services:

| Locale | Candidate concepts used in research and localized copy |
| --- | --- |
| English | live lecture translation; in-person meeting translation; continuous translated captions |
| French | traduction en direct; cours en présentiel; réunions; sous-titres en temps réel |
| Spanish | traducción en vivo; clases presenciales; reuniones; subtítulos en tiempo real |
| Italian | traduzione in tempo reale; lezioni in presenza; riunioni; sottotitoli dal vivo |
| German | Vorlesung live übersetzen; Meetings vor Ort; Live-Untertitel |
| Brazilian Portuguese | tradução ao vivo; aulas presenciais; reuniões; legendas em tempo real |
| Norwegian Bokmål | oversette forelesninger; fysiske møter; direkteteksting |
| Swedish | översätta föreläsningar; fysiska möten; livetextning |
| Finnish | luentojen reaaliaikainen käännös; lähikokoukset; reaaliaikainen tekstitys |
| Korean | 강의 실시간 번역; 대면 회의; 실시간 자막 |
| Japanese | 講義 リアルタイム翻訳; 対面 会議; 字幕 アプリ |
| Simplified Chinese | 现场会议; 讲座实时翻译; 实时字幕 |
| Dutch | colleges live vertalen; fysieke vergaderingen; live ondertiteling |

Each homepage has one primary title/heading about meetings and lectures.
Supporting sections address continuous speech translation, same-language
captioning, conferences, accessibility and face-to-face conversation naturally.
Language-specific wording is adapted rather than forced into an identical phrase
order. No ranking or traffic uplift is promised. After deployment, Search Console
can be used to assess indexing, impressions and clicks by page and country.
