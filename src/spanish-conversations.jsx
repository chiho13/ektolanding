import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import SpanishConversationsPage from "./SpanishConversationsPage.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <SpanishConversationsPage />
    <Analytics />
  </StrictMode>
);
