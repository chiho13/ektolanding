import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import BlogIndexPage from "./BlogIndexPage.jsx";
import BlogArticlePage from "./BlogArticlePage.jsx";
import ForeignLanguageLecturesPage from "./ForeignLanguageLecturesPage.jsx";
import BusinessConferenceTranslationPage from "./BusinessConferenceTranslationPage.jsx";
import DeafHardOfHearingCaptionsPage from "./DeafHardOfHearingCaptionsPage.jsx";
import BlogIndexPageJa from "./BlogIndexPageJa.jsx";
import BlogArticlePageJa from "./BlogArticlePageJa.jsx";
import ForeignLanguageLecturesPageJa from "./ForeignLanguageLecturesPageJa.jsx";
import BusinessConferenceTranslationPageJa from "./BusinessConferenceTranslationPageJa.jsx";
import DeafHardOfHearingCaptionsPageJa from "./DeafHardOfHearingCaptionsPageJa.jsx";

// Maps each built HTML file (relative to dist/) to the component that should be
// rendered into its <div id="root"> at build time. Keep this in sync with the
// Rollup inputs in vite.config.js.
const pages = [
  ["index.html", App],
  ["blog/index.html", BlogIndexPage],
  ["blog/top-5-best-live-caption-apps-for-lectures/index.html", BlogArticlePage],
  ["blog/how-to-understand-lectures-in-a-foreign-language/index.html", ForeignLanguageLecturesPage],
  ["blog/live-translation-for-business-conferences/index.html", BusinessConferenceTranslationPage],
  ["blog/live-captions-for-deaf-hard-of-hearing-events/index.html", DeafHardOfHearingCaptionsPage],
  ["ja/blog/index.html", BlogIndexPageJa],
  ["ja/blog/top-5-best-live-caption-apps-for-lectures/index.html", BlogArticlePageJa],
  ["ja/blog/how-to-understand-lectures-in-a-foreign-language/index.html", ForeignLanguageLecturesPageJa],
  ["ja/blog/live-translation-for-business-conferences/index.html", BusinessConferenceTranslationPageJa],
  ["ja/blog/live-captions-for-deaf-hard-of-hearing-events/index.html", DeafHardOfHearingCaptionsPageJa],
];

export function renderAll() {
  const out = {};
  for (const [htmlPath, Component] of pages) {
    out[htmlPath] = renderToString(<Component />);
  }
  return out;
}
