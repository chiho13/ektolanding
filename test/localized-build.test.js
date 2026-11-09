import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { locales, SITE_URL, articleSlugs, getArticlePath } from "../src/i18n/locales.js";
import { getTranslation } from "../src/i18n/translations.js";
import { escapeHtml } from "../src/i18n/seo.js";

const built = existsSync("dist/index.html");
const sitemapOrigin = "https://www.voicetranslate.app";
const decode = (text) => text.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

test("built locale pages contain complete visible content, SEO, working internal destinations and shared assets", { skip: !built && "Run npm run build first" }, () => {
  const sitemap = readFileSync("dist/sitemap.xml", "utf8");
  for (const locale of locales) {
    const html = readFileSync(`dist${locale.path}index.html`, "utf8");
    const t = getTranslation(locale.code);
    assert.ok(html.includes(`<html lang="${locale.lang}">`));
    assert.ok(html.includes(`<title>${escapeHtml(t.seoTitle)}</title>`));
    assert.ok(html.includes(`<link rel="canonical" href="${SITE_URL}${locale.path}"`));
    assert.equal([...html.matchAll(/hreflang=/g)].length, 14);
    const body = decode(html.slice(html.indexOf("<body>")));
    assert.equal([...body.matchAll(/<h1\b/g)].length, 1);
    assert.ok(body.includes(t.heroTitle));
    for (const text of [t.heroDescription, t.pricingDescription, t.rights, ...t.steps.flat(), ...t.features.flat(), ...t.useCases.flat(), ...t.articles.flat(), ...t.faqs.flat()]) {
      assert.ok(body.includes(text), `${locale.code}: missing visible copy: ${text}`);
    }
    assert.ok(body.includes("$14.99") && body.includes("$34.99") && body.includes("$79.99"));
    assert.ok(body.includes('id="landing-language-menu"'));
    for (const alternate of locales) assert.ok(body.includes(`href="${alternate.path}"`));
    for (const slug of articleSlugs) {
      const path = getArticlePath(locale.code, slug);
      assert.ok(body.includes(`href="${path}"`));
      assert.ok(existsSync(`dist${path}index.html`));
    }
    for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"?]+)"/g)) assert.ok(existsSync(`dist${match[1]}`));
    assert.ok(sitemap.includes(`<loc>${sitemapOrigin}${locale.path}</loc>`));
    assert.equal(html.includes('id="root"></div>'), false);
  }
  for (const path of ["/for-event-organizers/", "/ja/blog/", "/ko/blog/", "/es/blog/", "/es/blog/como-entender-clases-y-reuniones-de-trabajo-en-ingles/", "/es/blog/traductor-de-conversaciones-en-tiempo-real/", "/blog/"]) {
    const html = readFileSync(`dist${path}index.html`, "utf8");
    assert.ok(html.includes(`<link rel="canonical" href="${SITE_URL}${path}"`));
    assert.equal(html.includes("landing-language-menu"), false);
    assert.ok(sitemap.includes(`<loc>${sitemapOrigin}${path}</loc>`));
  }
  assert.ok(existsSync("dist/live/index.html"));
  assert.ok(readFileSync("vercel.json", "utf8").includes('"source": "/live/:code"'));
});

test("the iPhone translation guide is prerendered and discoverable in all four blog languages", { skip: !built && "Run npm run build first" }, () => {
  const slug = "best-live-translation-apps-for-iphone";
  const guidePaths = {
    en: `/blog/${slug}/`,
    ja: `/ja/blog/${slug}/`,
    ko: `/ko/blog/${slug}/`,
    es: "/es/blog/mejores-apps-de-traduccion-en-tiempo-real-para-iphone/",
  };
  const sitemap = readFileSync("dist/sitemap.xml", "utf8");
  assert.ok(readFileSync("dist/robots.txt", "utf8").includes(`Sitemap: ${sitemapOrigin}/sitemap.xml`));
  assert.ok([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].every(([, url]) => new URL(url).origin === sitemapOrigin));
  for (const [lang, path] of Object.entries(guidePaths)) {
    const html = readFileSync(`dist${path}index.html`, "utf8");
    const [head, body] = html.split("<body>");
    assert.ok(head.includes(`<html lang="${lang}">`));
    assert.match(head, /<title>[^<]*2027[^<]*<\/title>/);
    assert.ok(head.includes(`<link rel="canonical" href="${sitemapOrigin}${path}"`));
    assert.ok(head.includes(`<link rel="alternate" hreflang="x-default" href="${sitemapOrigin}${guidePaths.en}"`));
    assert.equal([...head.matchAll(/hreflang=/g)].length, 5);
    assert.equal([...body.matchAll(/<h1\b/g)].length, 1);
    assert.doesNotMatch(body, /<div id="root"><\/div>|\b2026\b/);
    for (const id of ["ekto", "transync", "apple", "google", "soniox", "hono"]) {
      assert.ok(body.includes(`href="#${id}"`) && body.includes(`id="${id}"`), `${lang}: ${id} comparison is missing`);
    }
    assert.equal(body.includes("id1147874819"), lang === "ja" || lang === "ko");
    if (lang === "en") assert.ok(body.includes("<strong>Life. Subtitled.</strong>"));
    for (const [alternateLang, alternatePath] of Object.entries(guidePaths)) {
      assert.ok(head.includes(`hreflang="${alternateLang}" href="${sitemapOrigin}${alternatePath}"`));
      if (alternateLang !== lang) assert.ok(body.includes(`href="${alternatePath}"`));
    }
    for (const match of body.matchAll(/<a\b[^>]*\bhref="(\/[^"#?]*)"/g)) {
      assert.ok(existsSync(`dist${match[1]}index.html`), `${lang}: broken link ${match[1]}`);
    }
    const blogPath = path.slice(0, path.lastIndexOf("/blog/") + "/blog/".length);
    const blog = readFileSync(`dist${blogPath}index.html`, "utf8");
    assert.ok(blog.includes(`href="${path}"`));
    assert.ok(sitemap.includes(`<loc>${sitemapOrigin}${path}</loc>`));
  }
});
