import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import BlogIndexPage from "./BlogIndexPage.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <BlogIndexPage />
    <Analytics />
  </StrictMode>
);
