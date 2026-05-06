import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import DeafHardOfHearingCaptionsPage from "./DeafHardOfHearingCaptionsPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DeafHardOfHearingCaptionsPage />
    <Analytics />
  </StrictMode>
);
