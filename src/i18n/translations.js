import en from "./locales/en.js";
import fr from "./locales/fr.js";
import es from "./locales/es.js";
import it from "./locales/it.js";
import de from "./locales/de.js";
import ptBr from "./locales/pt-br.js";
import nb from "./locales/nb.js";
import sv from "./locales/sv.js";
import fi from "./locales/fi.js";
import ko from "./locales/ko.js";
import ja from "./locales/ja.js";
import zhHans from "./locales/zh-hans.js";
import nl from "./locales/nl.js";
import { getLocale, supportedLanguages } from "./locales.js";

export const translations = { en, fr, es, it, de, "pt-br": ptBr, nb, sv, fi, ko, ja, "zh-hans": zhHans, nl };
export const getTranslation = (code) => translations[getLocale(code).code];

// Validate every leaf and array length: missing copy must never silently ship in English.
export function validateTranslations(dictionaries = translations) {
  function compare(reference, value, path) {
    if (typeof reference === "string") {
      if (typeof value !== "string" || !value.trim()) throw new Error(`Missing translation: ${path}`);
      return;
    }
    if (Array.isArray(reference)) {
      if (!Array.isArray(value) || value.length !== reference.length) throw new Error(`Translation array mismatch: ${path}`);
      reference.forEach((item, index) => compare(item, value[index], `${path}[${index}]`));
      return;
    }
    if (!value || typeof value !== "object" || Object.keys(value).sort().join() !== Object.keys(reference).sort().join()) {
      throw new Error(`Translation keys mismatch: ${path}`);
    }
    Object.keys(reference).forEach((key) => compare(reference[key], value[key], `${path}.${key}`));
  }
  supportedLanguages.forEach((code) => compare(en, dictionaries[code], code));
}
