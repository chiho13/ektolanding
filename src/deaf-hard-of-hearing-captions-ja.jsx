import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import DeafHardOfHearingCaptionsPageJa from "./DeafHardOfHearingCaptionsPageJa.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <DeafHardOfHearingCaptionsPageJa />
    <Analytics />
  </StrictMode>
);
