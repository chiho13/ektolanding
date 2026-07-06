import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import BusinessConferenceTranslationPage from "./BusinessConferenceTranslationPage.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <BusinessConferenceTranslationPage />
    <Analytics />
  </StrictMode>
);
