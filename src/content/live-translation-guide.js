import { APP_STORE_URL, getBlogPath, getLocale } from "../i18n/locales.js";

// The apex host redirects to www in production. Use the destination in all guide metadata.
export const guideOrigin = "https://www.voicetranslate.app";

const entries = {
  en: {
    title: "Best Live Translation Apps for iPhone in 2027",
    description: "Compare six iPhone apps for live translation in 2027, from continuous translated captions for lectures and meetings to spoken translation and livestream subtitles.",
    category: "App guides",
    relatedPath: "/blog/how-to-understand-lectures-in-a-foreign-language/",
  },
  ja: {
    title: "【2027年】iPhoneのリアルタイム翻訳アプリおすすめ6選",
    description: "講義や対面会議で話を追える翻訳字幕から、会話の音声翻訳、ライブ配信の字幕まで。2027年に使いたいiPhoneのリアルタイム翻訳アプリ6つを比較します。",
    category: "アプリガイド",
    relatedPath: "/ja/blog/how-to-understand-lectures-in-a-foreign-language/",
    store: "jp",
  },
  ko: {
    title: "2027년 아이폰 실시간 번역 앱 추천 6선",
    description: "강의와 대면 회의에서 계속 표시되는 번역 자막부터 대화 음성 번역, 라이브 방송 자막까지. 2027년 아이폰 실시간 번역 앱 6개를 비교합니다.",
    category: "앱 가이드",
    relatedPath: "/ko/blog/how-to-understand-lectures-in-a-foreign-language/",
    store: "kr",
  },
  es: {
    title: "Las mejores apps de traducción en tiempo real para iPhone en 2027",
    description: "Compara seis apps para iPhone en 2027: subtítulos traducidos para clases y reuniones presenciales, traducción por voz y subtítulos para emisiones en directo.",
    category: "Guías de apps",
    slug: "mejores-apps-de-traduccion-en-tiempo-real-para-iphone",
    relatedPath: "/es/blog/como-entender-clases-y-reuniones-de-trabajo-en-ingles/",
    store: "es",
  },
};

export const liveTranslationGuides = Object.entries(entries).map(([code, entry]) => {
  const locale = getLocale(code);
  const blogPath = getBlogPath(code);
  const slug = entry.slug ?? "best-live-translation-apps-for-iphone";
  return {
    ...entry,
    locale,
    blogPath,
    href: `${blogPath}${slug}/`,
    appStoreUrl: entry.store ? `https://apps.apple.com/${entry.store}/app/id6740196773` : APP_STORE_URL,
  };
});

export const liveTranslationGuide = Object.fromEntries(
  liveTranslationGuides.map((guide) => [guide.locale.code, guide]),
);
