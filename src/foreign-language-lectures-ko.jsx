import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import ForeignLanguageLecturesPageKo from "./ForeignLanguageLecturesPageKo.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <ForeignLanguageLecturesPageKo />
    <Analytics />
  </StrictMode>
);
