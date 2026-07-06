import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import BusinessConferenceTranslationPageJa from "./BusinessConferenceTranslationPageJa.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <BusinessConferenceTranslationPageJa />
    <Analytics />
  </StrictMode>
);
