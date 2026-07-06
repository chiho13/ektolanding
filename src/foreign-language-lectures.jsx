import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import ForeignLanguageLecturesPage from "./ForeignLanguageLecturesPage.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <ForeignLanguageLecturesPage />
    <Analytics />
  </StrictMode>
);
