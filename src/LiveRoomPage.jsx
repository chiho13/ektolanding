import { useEffect, useMemo, useRef, useState } from "react";
import appIcon from "./assets/ekto.png";

const HISTORY_LIMIT = 50;
const RECONNECT_DELAYS_MS = [1000, 2000, 5000, 10000];

function normalizeCode(pathname) {
  const match = pathname.match(/^\/live\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]).toUpperCase() : "";
}

function getViewerSocketUrl(code) {
  const wsBaseUrl =
    import.meta.env.VITE_BROADCAST_WS_BASE_URL ||
    "wss://broadcast.voicetranslate.app";

  return `${wsBaseUrl.replace(/\/$/, "")}/rooms/${code}/viewer`;
}

function LiveRoomPage() {
  const code = useMemo(() => normalizeCode(window.location.pathname), []);
  const [status, setStatus] = useState("connecting");
  const [finalLines, setFinalLines] = useState([]);
  const [partialLine, setPartialLine] = useState("");
  const [language, setLanguage] = useState("");
  const [mode, setMode] = useState("");
  const [lastUpdatedAt, setLastUpdatedAt] = useState("");
  const reconnectAttemptRef = useRef(0);
  const reconnectTimerRef = useRef(null);
  const shouldReconnectRef = useRef(true);
  const endedRef = useRef(false);

  useEffect(() => {
    if (!code) {
      setStatus("missing");
      return undefined;
    }

    shouldReconnectRef.current = true;

    function connect() {
      setStatus((currentStatus) =>
        currentStatus === "ended" ? "ended" : "connecting",
      );

      const socket = new WebSocket(getViewerSocketUrl(code));

      socket.addEventListener("open", () => {
        reconnectAttemptRef.current = 0;
        setStatus("waiting");
      });

      socket.addEventListener("message", (event) => {
        let message;

        try {
          message = JSON.parse(event.data);
        } catch {
          return;
        }

        handleBroadcastMessage(message);
      });

      socket.addEventListener("close", (event) => {
        if (!shouldReconnectRef.current) {
          return;
        }

        if (event.reason === "ended" || endedRef.current) {
          setStatus("ended");
          return;
        }

        const delay =
          RECONNECT_DELAYS_MS[
            Math.min(reconnectAttemptRef.current, RECONNECT_DELAYS_MS.length - 1)
          ];
        reconnectAttemptRef.current += 1;
        setStatus("reconnecting");
        reconnectTimerRef.current = window.setTimeout(connect, delay);
      });

      socket.addEventListener("error", () => {
        setStatus("reconnecting");
      });

      return socket;
    }

    function handleBroadcastMessage(message) {
      if (!message || typeof message !== "object") {
        return;
      }

      if (typeof message.language === "string") {
        setLanguage(message.language);
      }

      if (typeof message.mode === "string") {
        setMode(message.mode);
      }

      if (typeof message.sentAt === "string") {
        setLastUpdatedAt(message.sentAt);
      }

      if (message.type === "snapshot") {
        setFinalLines(
          Array.isArray(message.history)
            ? message.history.filter((item) => typeof item.text === "string")
            : [],
        );
        setPartialLine(message.latestPartial?.text || "");
        setStatus(message.status || "waiting");
        endedRef.current = message.status === "ended";
        return;
      }

      if (message.type === "status") {
        setStatus(message.status || "live");
        return;
      }

      if (message.type === "partial") {
        setPartialLine(message.text || "");
        setStatus("live");
        return;
      }

      if (message.type === "final") {
        setFinalLines((lines) => [...lines, message].slice(-HISTORY_LIMIT));
        setPartialLine("");
        setStatus("live");
        return;
      }

      if (message.type === "ended") {
        if (typeof message.text === "string") {
          setFinalLines((lines) => [...lines, message].slice(-HISTORY_LIMIT));
        }
        setPartialLine("");
        setStatus("ended");
        endedRef.current = true;
      }
    }

    const socket = connect();

    return () => {
      shouldReconnectRef.current = false;
      window.clearTimeout(reconnectTimerRef.current);
      socket?.close();
    };
  }, [code]);

  const statusLabel = {
    connecting: "Connecting",
    waiting: "Waiting for captions",
    live: "Live",
    reconnecting: "Reconnecting",
    ended: "Broadcast ended",
    missing: "Invalid room",
  }[status];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={appIcon}
              alt="ekto"
              className="h-10 w-10 rounded-lg shadow-lg"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-300">
                ekto live captions
              </p>
              <h1 className="truncate text-lg font-bold text-white">
                Room {code || "unknown"}
              </h1>
            </div>
          </div>
          <div
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold ${
              status === "live"
                ? "bg-emerald-400 text-emerald-950"
                : status === "ended"
                  ? "bg-slate-200 text-slate-900"
                  : "bg-amber-300 text-amber-950"
            }`}
          >
            {statusLabel}
          </div>
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-4xl flex-col px-4 py-6 md:py-10">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-400">
          {mode && <span className="rounded-full bg-white/10 px-3 py-1">{mode}</span>}
          {language && (
            <span className="rounded-full bg-white/10 px-3 py-1">
              {language}
            </span>
          )}
          {lastUpdatedAt && (
            <span className="rounded-full bg-white/10 px-3 py-1">
              Updated {new Date(lastUpdatedAt).toLocaleTimeString()}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-end gap-4">
          {finalLines.length === 0 && !partialLine ? (
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6 text-slate-300">
              Captions will appear here when the broadcaster starts speaking.
            </div>
          ) : (
            <div className="space-y-3">
              {finalLines.map((line, index) => (
                <p
                  key={`${line.sentAt || "line"}-${index}`}
                  className="text-2xl font-semibold leading-snug text-white md:text-4xl"
                >
                  {line.text}
                </p>
              ))}
            </div>
          )}

          {partialLine && (
            <p className="min-h-[3rem] text-2xl font-medium leading-snug text-slate-300 md:text-4xl">
              {partialLine}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default LiveRoomPage;
