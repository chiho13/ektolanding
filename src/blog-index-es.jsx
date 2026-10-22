import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import BlogIndexPageEs from "./BlogIndexPageEs.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <BlogIndexPageEs />
    <Analytics />
  </StrictMode>
);
