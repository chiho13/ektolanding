import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import BlogIndexPage from "./BlogIndexPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BlogIndexPage />
    <Analytics />
  </StrictMode>
);
