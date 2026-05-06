import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import BusinessConferenceTranslationPage from "./BusinessConferenceTranslationPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BusinessConferenceTranslationPage />
    <Analytics />
  </StrictMode>
);
