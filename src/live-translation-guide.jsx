import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import LiveTranslationGuidePage from "./LiveTranslationGuidePage.jsx";
import { liveTranslationGuide } from "./content/live-translation-guide.js";
import "./index.css";

const root = document.getElementById("root");
const guide = liveTranslationGuide[document.documentElement.lang];
const app = (
  <StrictMode>
    <LiveTranslationGuidePage guide={guide} />
    <Analytics />
  </StrictMode>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
