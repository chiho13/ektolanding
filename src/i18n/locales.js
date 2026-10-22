export const SITE_URL = "https://voicetranslate.app";
export const APP_STORE_URL = "https://apps.apple.com/app/id6740196773";

export const locales = [
  { code: "en", name: "English", path: "/", lang: "en", ogLocale: "en_US" },
  { code: "fr", name: "Français", path: "/fr/", lang: "fr", ogLocale: "fr_FR" },
  { code: "es", name: "Español", path: "/es/", lang: "es", ogLocale: "es_ES" },
  { code: "it", name: "Italiano", path: "/it/", lang: "it", ogLocale: "it_IT" },
  { code: "de", name: "Deutsch", path: "/de/", lang: "de", ogLocale: "de_DE" },
  { code: "pt-br", name: "Português (Brasil)", path: "/pt-br/", lang: "pt-BR", ogLocale: "pt_BR" },
  { code: "nb", name: "Norsk bokmål", path: "/nb/", lang: "nb", ogLocale: "nb_NO" },
  { code: "sv", name: "Svenska", path: "/sv/", lang: "sv", ogLocale: "sv_SE" },
  { code: "fi", name: "Suomi", path: "/fi/", lang: "fi", ogLocale: "fi_FI" },
  { code: "ko", name: "한국어", path: "/ko/", lang: "ko", ogLocale: "ko_KR" },
  { code: "ja", name: "日本語", path: "/ja/", lang: "ja", ogLocale: "ja_JP" },
  { code: "zh-hans", name: "简体中文", path: "/zh-hans/", lang: "zh-Hans", ogLocale: "zh_CN" },
  { code: "nl", name: "Nederlands", path: "/nl/", lang: "nl", ogLocale: "nl_NL" },
];

export const supportedLanguages = locales.map(({ code }) => code);
export const getLocale = (code) => locales.find((locale) => locale.code === code) || locales[0];

export function isLandingPath(pathname) {
  return locales.some(({ path }) => pathname === path || pathname === `${path}index.html` || (path !== "/" && pathname === path.slice(0, -1)));
}

export function getLocaleFromPath(pathname = "/") {
  return locales.find(({ path }) => pathname === path || pathname === `${path}index.html` || (path !== "/" && pathname === path.slice(0, -1))) || locales[0];
}

export const articleSlugs = [
  "live-captions-for-deaf-hard-of-hearing-events",
  "live-translation-for-business-conferences",
  "how-to-understand-lectures-in-a-foreign-language",
  "top-5-best-live-caption-apps-for-lectures",
  "practice-english-with-korean-to-english-live-translation",
];
const translatedArticles = {
  ja: articleSlugs.slice(0, 4),
  ko: [articleSlugs[2], articleSlugs[4]],
};
export function getArticlePath(code, slug) {
  const prefix = translatedArticles[code]?.includes(slug) ? `/${code}` : "";
  return `${prefix}/blog/${slug}/`;
}
// Articles written only for one language. They replace the default link on that
// locale's use-case card so visitors land on an article in their own language.
const localUseCaseArticles = {
  es: {
    0: "/es/blog/como-entender-clases-y-reuniones-de-trabajo-en-ingles/",
    4: "/es/blog/traductor-de-conversaciones-en-tiempo-real/",
  },
};
export function getLocalUseCaseArticle(code, index) {
  return localUseCaseArticles[code]?.[index];
}
export function getBlogPath(code) {
  return ["ja", "ko", "es"].includes(code) ? `/${code}/blog/` : "/blog/";
}
