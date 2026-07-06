import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import BlogArticlePage from "./BlogArticlePage.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <BlogArticlePage />
    <Analytics />
  </StrictMode>
);
