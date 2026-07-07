import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LiveRoomPage from "./LiveRoomPage.jsx";
import { Analytics } from "@vercel/analytics/react";

const Page = window.location.pathname.startsWith("/live/")
  ? LiveRoomPage
  : App;

const rootEl = document.getElementById("root");
const tree = (
  <StrictMode>
    <Page />
    <Analytics />
  </StrictMode>
);

// The homepage is prerendered at build time (see scripts/prerender.js), so
// hydrate when server-rendered markup is present; fall back to a client
// render in dev and for the /live/ SPA route.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, tree);
} else {
  createRoot(rootEl).render(tree);
}
