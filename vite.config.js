import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, "index.html"),
        liveRoom: resolve(rootDir, "live/index.html"),
        lectureCaptionsArticle: resolve(
          rootDir,
          "blog/top-5-best-live-caption-apps-for-lectures/index.html"
        ),
        foreignLanguageLecturesArticle: resolve(
          rootDir,
          "blog/how-to-understand-lectures-in-a-foreign-language/index.html"
        ),
        lectureCaptionsArticleJa: resolve(
          rootDir,
          "ja/blog/top-5-best-live-caption-apps-for-lectures/index.html"
        ),
        foreignLanguageLecturesArticleJa: resolve(
          rootDir,
          "ja/blog/how-to-understand-lectures-in-a-foreign-language/index.html"
        ),
      },
    },
  },
});
