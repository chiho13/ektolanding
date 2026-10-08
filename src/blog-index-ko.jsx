import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import BlogIndexPageKo from "./BlogIndexPageKo.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <BlogIndexPageKo />
    <Analytics />
  </StrictMode>
);
