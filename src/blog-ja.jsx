import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import BlogArticlePageJa from "./BlogArticlePageJa.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BlogArticlePageJa />
    <Analytics />
  </StrictMode>
);
