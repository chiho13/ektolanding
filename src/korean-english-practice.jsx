import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import KoreanEnglishPracticePage from "./KoreanEnglishPracticePage.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <KoreanEnglishPracticePage />
    <Analytics />
  </StrictMode>
);
