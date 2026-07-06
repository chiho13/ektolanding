import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import ForeignLanguageLecturesPageJa from "./ForeignLanguageLecturesPageJa.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <ForeignLanguageLecturesPageJa />
    <Analytics />
  </StrictMode>
);
