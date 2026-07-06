import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import DeafHardOfHearingCaptionsPage from "./DeafHardOfHearingCaptionsPage.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <DeafHardOfHearingCaptionsPage />
    <Analytics />
  </StrictMode>
);
