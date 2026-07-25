import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import EventOrganizersPage from "./EventOrganizersPage.jsx";

const rootEl = document.getElementById("root");
const tree = (
  <StrictMode>
    <EventOrganizersPage />
    <Analytics />
  </StrictMode>
);

if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, tree);
} else {
  createRoot(rootEl).render(tree);
}
