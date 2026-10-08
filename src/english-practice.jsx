import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import EnglishPracticePage from "./EnglishPracticePage.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <EnglishPracticePage />
    <Analytics />
  </StrictMode>
);
