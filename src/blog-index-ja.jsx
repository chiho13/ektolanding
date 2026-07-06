import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import BlogIndexPageJa from "./BlogIndexPageJa.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <BlogIndexPageJa />
    <Analytics />
  </StrictMode>
);
