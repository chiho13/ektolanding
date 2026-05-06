import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import BusinessConferenceTranslationPageJa from "./BusinessConferenceTranslationPageJa.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BusinessConferenceTranslationPageJa />
    <Analytics />
  </StrictMode>
);
