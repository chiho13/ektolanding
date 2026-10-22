import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import SpanishLecturesWorkPage from "./SpanishLecturesWorkPage.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <SpanishLecturesWorkPage />
    <Analytics />
  </StrictMode>
);
