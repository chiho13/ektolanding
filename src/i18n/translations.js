export const translations = {
  en: {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    hero: {
      rotatingWord: "Lectures",
      tagline: "too fast to follow?",
      description: "Understand every word in real time.",
      descriptionLine2: "See real-time captions that works even when seated far away from the speaker thanks to acoustic intelligence",
      download: "Download",
      onAppStore: "on App Store",
    },
  },
  fr: {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
    hero: {
      rotatingWord: "Conférences",
      tagline: "trop rapide à suivre ?",
      description: "Comprenez chaque mot en temps réel.",
      descriptionLine2: "Voyez des sous-titres en temps réel qui fonctionnent même lorsque vous êtes assis loin de l'orateur grâce à l'intelligence acoustique",
      download: "Télécharger",
      onAppStore: "sur l'App Store",
    },
  },
  it: {
    code: "it",
    name: "Italiano",
    flag: "🇮🇹",
    hero: {
      rotatingWord: "Lezioni",
      tagline: "troppo veloce da seguire?",
      description: "Comprendi ogni parola in tempo reale.",
      descriptionLine2: "Visualizza sottotitoli in tempo reale che funzionano anche quando sei seduto lontano dall'oratore grazie all'intelligenza acustica",
      download: "Scarica",
      onAppStore: "su App Store",
    },
  },
  es: {
    code: "es",
    name: "Español",
    flag: "🇪🇸",
    hero: {
      rotatingWord: "Conferencias",
      tagline: "¿demasiado rápido para seguir?",
      description: "Entiende cada palabra en tiempo real.",
      descriptionLine2: "Ve subtítulos en tiempo real que funcionan incluso cuando estás sentado lejos del orador gracias a la inteligencia acústica",
      download: "Descargar",
      onAppStore: "en App Store",
    },
  },
  zh: {
    code: "zh",
    name: "中文",
    flag: "🇨🇳",
    hero: {
      rotatingWord: "讲座",
      tagline: "语速太快跟不上？",
      description: "实时理解每一个词。",
      descriptionLine2: "借助声学智能技术，即使坐在远离演讲者的位置，也能看到实时字幕",
      download: "下载",
      onAppStore: "在 App Store",
    },
  },
  ja: {
    code: "ja",
    name: "日本語",
    flag: "🇯🇵",
    hero: {
      rotatingWord: "こうぎ",
      tagline: "速すぎてついていけない？",
      description: "すべての言葉をリアルタイムで理解。",
      descriptionLine2: "音響インテリジェンスにより、話者から離れた席でもリアルタイム字幕が機能します",
      download: "ダウンロード",
      onAppStore: "App Store で",
    },
  },
  ko: {
    code: "ko",
    name: "한국어",
    flag: "🇰🇷",
    hero: {
      rotatingWord: "강의",
      tagline: "너무 빨라서 못 따라가겠나요?",
      description: "모든 단어를 실시간으로 이해하세요.",
      descriptionLine2: "음향 지능 덕분에 발표자로부터 멀리 떨어져 앉아 있어도 실시간 자막이 작동합니다",
      download: "다운로드",
      onAppStore: "App Store에서",
    },
  },
};

// Array of rotating words in different languages for the hero animation
export const rotatingWords = [
  { word: "lectures", lang: "en" },
  { word: "講義", lang: "ja" },
  { word: "meetings", lang: "en" },
  { word: "会議", lang: "ja" },
  { word: "conferences", lang: "en" },
  { word: "カンファレンス", lang: "ja" },
  { word: "sermons", lang: "en" },
  { word: "説教", lang: "ja" },
];

export const supportedLanguages = Object.keys(translations);

export const getDefaultLanguage = () => {
  if (typeof navigator === "undefined") return "en";
  
  const browserLang = navigator.language?.split("-")[0];
  return supportedLanguages.includes(browserLang) ? browserLang : "en";
};
