import { useState, useEffect, useCallback } from "react";
import { translations, getDefaultLanguage, supportedLanguages } from "./translations";

export const useLanguage = () => {
  const [language, setLanguageState] = useState(() => {
    // Check localStorage first
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("preferredLanguage");
      if (saved && supportedLanguages.includes(saved)) {
        return saved;
      }
    }
    return getDefaultLanguage();
  });

  const setLanguage = useCallback((lang) => {
    if (supportedLanguages.includes(lang)) {
      setLanguageState(lang);
      if (typeof window !== "undefined") {
        localStorage.setItem("preferredLanguage", lang);
      }
    }
  }, []);

  const t = translations[language] || translations.en;

  return {
    language,
    setLanguage,
    t,
    supportedLanguages,
    translations,
  };
};
