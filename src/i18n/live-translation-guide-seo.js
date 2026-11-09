import { guideOrigin, liveTranslationGuide, liveTranslationGuides } from "../content/live-translation-guide.js";
import { escapeHtml } from "./seo.js";

export const GUIDE_SEO_MARKER = "<!-- live-translation-guide-seo -->";

export function addGuideSeo(html, guide) {
  const { locale, title, description, href } = guide;
  const canonical = guideOrigin + href;
  const image = `${guideOrigin}/opengraph.jpeg`;
  const meta = (name, content, attribute = "name") =>
    `<meta ${attribute}="${name}" content="${escapeHtml(content)}" />`;
  const og = (name, content) => meta(`og:${name}`, content, "property");
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: locale.lang,
    mainEntityOfPage: canonical,
    image,
    author: { "@type": "Organization", name: "ekto", url: guideOrigin + locale.path },
    publisher: { "@type": "Organization", name: "ekto", url: `${guideOrigin}/` },
  };
  const tags = [
    `<title>${escapeHtml(title)} | ekto</title>`,
    meta("description", description),
    `<link rel="canonical" href="${canonical}" />`,
    ...liveTranslationGuides.map((other) =>
      `<link rel="alternate" hreflang="${other.locale.lang}" href="${guideOrigin + other.href}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${guideOrigin + liveTranslationGuide.en.href}" />`,
    og("type", "article"),
    og("title", title),
    og("description", description),
    og("url", canonical),
    og("image", image),
    og("locale", locale.ogLocale),
    meta("twitter:card", "summary_large_image"),
    meta("twitter:title", title),
    meta("twitter:description", description),
    meta("twitter:image", image),
    `<script type="application/ld+json">${JSON.stringify(article).replace(/</g, "\\u003c")}</script>`,
  ];
  return html.replace(GUIDE_SEO_MARKER, () => tags.join("\n    "));
}
