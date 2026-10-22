import { APP_STORE_URL, SITE_URL, getLocale, locales } from "./locales.js";
import { getTranslation } from "./translations.js";

export const SEO_START = "<!-- landing-seo:start -->";
export const SEO_END = "<!-- landing-seo:end -->";
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}
const jsonLd = (value) => `<script type="application/ld+json">${JSON.stringify(value).replace(/</g, "\\u003c")}</script>`;

export function renderSeo(code) {
  const locale = getLocale(code);
  const t = getTranslation(locale.code);
  const url = SITE_URL + locale.path;
  const meta = (name, content, property = false) => `<meta ${property ? "property" : "name"}="${name}" content="${escapeHtml(content)}" />`;
  return [
    SEO_START,
    `<title>${escapeHtml(t.seoTitle)}</title>`,
    meta("title", t.seoTitle), meta("description", t.seoDescription),
    meta("application-name", "ekto"), meta("author", "ekto: Live AI Captions"),
    meta("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"),
    meta("apple-itunes-app", `app-id=6740196773, app-argument=${APP_STORE_URL}`),
    `<link rel="canonical" href="${url}" />`,
    ...locales.map((item) => `<link rel="alternate" hreflang="${item.lang}" href="${SITE_URL}${item.path}" />`),
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`,
    meta("og:type", "website", true), meta("og:url", url, true),
    meta("og:locale", locale.ogLocale, true),
    ...locales.filter((item) => item.code !== locale.code).map((item) => meta("og:locale:alternate", item.ogLocale, true)),
    meta("og:site_name", "ekto: Live AI Captions", true),
    meta("og:title", t.seoTitle, true), meta("og:description", t.seoDescription, true),
    meta("og:image", `${SITE_URL}/opengraph.jpeg`, true), meta("og:image:alt", t.imageAlt, true),
    meta("twitter:card", "summary_large_image"), meta("twitter:url", url),
    meta("twitter:title", t.seoTitle), meta("twitter:description", t.seoDescription),
    meta("twitter:image", `${SITE_URL}/opengraph.jpeg`), meta("twitter:image:alt", t.imageAlt),
    jsonLd({
      "@context": "https://schema.org", "@type": "SoftwareApplication", name: "ekto",
      alternateName: "ekto: Live AI Captions", applicationCategory: "AccessibilityApplication",
      operatingSystem: "iOS", inLanguage: locale.lang, url, description: t.seoDescription,
      downloadUrl: APP_STORE_URL, sameAs: [APP_STORE_URL], image: `${SITE_URL}/opengraph.jpeg`,
      publisher: { "@type": "Organization", name: "ekto" },
      featureList: t.features.map(([title, description]) => `${title}: ${description}`),
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    }),
    jsonLd({
      "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`,
      name: "ekto", url: `${SITE_URL}/`, inLanguage: locales.map((item) => item.lang),
    }),
    jsonLd({
      "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#webpage`,
      name: t.seoTitle, description: t.seoDescription, url, inLanguage: locale.lang,
      isPartOf: { "@id": `${SITE_URL}/#website` },
    }),
    jsonLd({
      "@context": "https://schema.org", "@type": "FAQPage", inLanguage: locale.lang, url,
      mainEntity: t.faqs.map(([question, answer]) => ({
        "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    }),
    SEO_END,
  ].join("\n    ");
}

export function localizeHtml(html, code) {
  const start = html.indexOf(SEO_START);
  const end = html.indexOf(SEO_END, start);
  if (start === -1 || end === -1) throw new Error("Homepage SEO markers are missing");
  return (html.slice(0, start) + renderSeo(code) + html.slice(end + SEO_END.length))
    .replace(/<html\s+lang="[^"]*"/, `<html lang="${getLocale(code).lang}"`);
}
