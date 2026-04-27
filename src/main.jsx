import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LiveRoomPage from "./LiveRoomPage.jsx";
import { Analytics } from "@vercel/analytics/react";

const Page = window.location.pathname.startsWith("/live/")
  ? LiveRoomPage
  : App;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Page />
    <Analytics />
  </StrictMode>
);
