import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import BlogArticlePageJa from "./BlogArticlePageJa.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <BlogArticlePageJa />
    <Analytics />
  </StrictMode>
);
