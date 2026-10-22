import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { locales, getLocale, getLocaleFromPath, isLandingPath, articleSlugs, getArticlePath, getBlogPath, SITE_URL } from "../src/i18n/locales.js";
import { translations, getTranslation, validateTranslations } from "../src/i18n/translations.js";
import { escapeHtml, localizeHtml, renderSeo } from "../src/i18n/seo.js";

test("all 13 locales have unique URLs, correct language variants and explicit URL resolution", () => {
  assert.equal(locales.length, 13);
  assert.equal(new Set(locales.map((locale) => locale.path)).size, 13);
  for (const locale of locales) {
    for (const path of [locale.path, `${locale.path}index.html`, ...(locale.code === "en" ? [] : [locale.path.slice(0, -1)])]) {
      assert.equal(getLocaleFromPath(path).code, locale.code);
      assert.ok(isLandingPath(path));
    }
  }
  for (const path of ["/fr/blog/", "/ja/blog/", "/live/ABC123", "/french/", "/france/", "/fr/extra/"]) {
    assert.equal(getLocaleFromPath(path).code, "en");
    assert.equal(isLandingPath(path), false);
  }
  assert.equal(getLocaleFromPath().code, "en");
  assert.equal(getLocale("pt-br").lang, "pt-BR");
  assert.equal(getLocale("zh-hans").lang, "zh-Hans");
  assert.equal(getLocale("nb").lang, "nb");
  assert.equal(getTranslation("unsupported"), translations.en);
});

test("incomplete dictionaries fail instead of silently falling back to English", () => {
  validateTranslations();
  for (const mutate of [
    (copy) => { delete copy.fr.download; },
    (copy) => { copy.fr.faqs[0][1] = " "; },
    (copy) => { copy.fr.steps.pop(); },
    (copy) => { delete copy.fr; },
  ]) {
    const copy = structuredClone(translations);
    mutate(copy);
    assert.throws(() => validateTranslations(copy), /Translation|translation/);
  }
  for (const locale of locales.slice(1)) {
    const t = getTranslation(locale.code);
    assert.notEqual(t.heroTitle, translations.en.heroTitle);
    assert.notEqual(t.seoDescription, translations.en.seoDescription);
    assert.notEqual(t.faqs[6][1], translations.en.faqs[6][1]);
  }
});

test("article links prefer only the translations that actually exist", () => {
  for (const locale of locales) {
    assert.ok(existsSync(`.${getBlogPath(locale.code)}index.html`));
    for (const slug of articleSlugs) {
      assert.ok(existsSync(`.${getArticlePath(locale.code, slug)}index.html`));
    }
  }
  assert.equal(getArticlePath("ja", articleSlugs[0]), `/ja/blog/${articleSlugs[0]}/`);
  assert.equal(getArticlePath("ko", articleSlugs[0]), `/blog/${articleSlugs[0]}/`);
  assert.equal(getArticlePath("ko", articleSlugs[2]), `/ko/blog/${articleSlugs[2]}/`);
});

test("every locale has reciprocal alternates, self canonical, social metadata and localized FAQ schema", () => {
  for (const locale of locales) {
    const t = getTranslation(locale.code);
    const html = renderSeo(locale.code);
    assert.ok(html.includes(`<link rel="canonical" href="${SITE_URL}${locale.path}"`));
    assert.ok(html.includes(`<title>${escapeHtml(t.seoTitle)}</title>`));
    assert.ok(html.includes(`property="og:locale" content="${locale.ogLocale}"`));
    assert.ok(html.includes(`name="twitter:url" content="${SITE_URL}${locale.path}"`));
    assert.equal([...html.matchAll(/hreflang=/g)].length, 14);
    for (const alternate of locales) {
      assert.ok(html.includes(`hreflang="${alternate.lang}" href="${SITE_URL}${alternate.path}"`));
    }
    assert.ok(html.includes(`hreflang="x-default" href="${SITE_URL}/"`));
    const data = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
    const faq = data.find((item) => item["@type"] === "FAQPage");
    assert.equal(faq.inLanguage, locale.lang);
    assert.deepEqual(faq.mainEntity.map((item) => [item.name, item.acceptedAnswer.text]), t.faqs);
    assert.equal(data.find((item) => item["@type"] === "WebPage").url, SITE_URL + locale.path);
  }
});

test("HTML localization replaces metadata idempotently while preserving assets and the body", () => {
  const original = readFileSync("index.html", "utf8");
  const localized = localizeHtml(original, "fr");
  assert.equal(localizeHtml(localized, "fr"), localized);
  assert.match(localized, /<html lang="fr">/);
  assert.equal([...localized.matchAll(/<title>/g)].length, 1);
  assert.equal([...localized.matchAll(/rel="canonical"/g)].length, 1);
  assert.equal(localized.slice(localized.indexOf("<body>")), original.slice(original.indexOf("<body>")));
  assert.match(localized, /\/src\/main.jsx/);
  assert.equal(escapeHtml('<script title="x">&\''), "&lt;script title=&quot;x&quot;&gt;&amp;&#39;");
  assert.throws(() => localizeHtml("<html></html>", "fr"), /markers/);
});
