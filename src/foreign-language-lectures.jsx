import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import ForeignLanguageLecturesPage from "./ForeignLanguageLecturesPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ForeignLanguageLecturesPage />
    <Analytics />
  </StrictMode>
);
