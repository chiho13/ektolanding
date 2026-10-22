import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getLocaleFromPath, isLandingPath } from "./src/i18n/locales.js";
import { localizeHtml } from "./src/i18n/seo.js";
import { validateTranslations } from "./src/i18n/translations.js";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), tailwindcss(),
    {
      name: "landing-localization",
      buildStart() { validateTranslations(); },
      transformIndexHtml(html, context) {
        const pathname = (context.originalUrl || context.path).split("?")[0];
        return isLandingPath(pathname) ? localizeHtml(html, getLocaleFromPath(pathname).code) : html;
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, "index.html"),
        liveRoom: resolve(rootDir, "live/index.html"),
        eventOrganizers: resolve(rootDir, "for-event-organizers/index.html"),
        blogIndex: resolve(rootDir, "blog/index.html"),
        lectureCaptionsArticle: resolve(
          rootDir,
          "blog/top-5-best-live-caption-apps-for-lectures/index.html"
        ),
        foreignLanguageLecturesArticle: resolve(
          rootDir,
          "blog/how-to-understand-lectures-in-a-foreign-language/index.html"
        ),
        businessConferenceTranslationArticle: resolve(
          rootDir,
          "blog/live-translation-for-business-conferences/index.html"
        ),
        deafHardOfHearingCaptionsArticle: resolve(
          rootDir,
          "blog/live-captions-for-deaf-hard-of-hearing-events/index.html"
        ),
        englishPracticeArticle: resolve(
          rootDir,
          "blog/practice-english-with-korean-to-english-live-translation/index.html"
        ),
        foreignLanguageLecturesArticleKo: resolve(
          rootDir,
          "ko/blog/how-to-understand-lectures-in-a-foreign-language/index.html"
        ),
        blogIndexKo: resolve(rootDir, "ko/blog/index.html"),
        koreanEnglishPracticeArticle: resolve(
          rootDir,
          "ko/blog/practice-english-with-korean-to-english-live-translation/index.html"
        ),
        blogIndexEs: resolve(rootDir, "es/blog/index.html"),
        spanishConversationsArticle: resolve(
          rootDir,
          "es/blog/traductor-de-conversaciones-en-tiempo-real/index.html"
        ),
        spanishLecturesWorkArticle: resolve(
          rootDir,
          "es/blog/como-entender-clases-y-reuniones-de-trabajo-en-ingles/index.html"
        ),
        blogIndexJa: resolve(rootDir, "ja/blog/index.html"),
        lectureCaptionsArticleJa: resolve(
          rootDir,
          "ja/blog/top-5-best-live-caption-apps-for-lectures/index.html"
        ),
        foreignLanguageLecturesArticleJa: resolve(
          rootDir,
          "ja/blog/how-to-understand-lectures-in-a-foreign-language/index.html"
        ),
        businessConferenceTranslationArticleJa: resolve(
          rootDir,
          "ja/blog/live-translation-for-business-conferences/index.html"
        ),
        deafHardOfHearingCaptionsArticleJa: resolve(
          rootDir,
          "ja/blog/live-captions-for-deaf-hard-of-hearing-events/index.html"
        ),
      },
    },
  },
});
