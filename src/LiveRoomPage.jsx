import { useEffect, useMemo, useRef, useState } from "react";
import appIcon from "./assets/ekto.png";

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

function getCaptionDisplay(line, index, totalLines) {
  const text = typeof line === "string" ? line : line.text || "";
  const isNewestFinal = index === totalLines - 1;

  if (text.startsWith("PT:")) {
    return {
      text: text.slice(3),
      className: "text-[#8aeb9e]/80",
    };
  }

  if (text.startsWith("T:")) {
    return {
      text: text.slice(2),
      className: "text-[#8aeb9e]",
    };
  }

  if (text.startsWith("C:")) {
    return {
      text: text.slice(2),
      className: "text-white/60",
    };
  }

  if (text.startsWith("P:")) {
    return {
      text: text.slice(2),
      className: "text-white/80",
    };
  }

  return {
    text,
    className: isNewestFinal ? "text-white/90" : "text-white/60",
  };
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
        setFinalLines((lines) => [...lines, message]);
        setPartialLine("");
        setStatus("live");
        return;
      }

      if (message.type === "ended") {
        if (typeof message.text === "string") {
          setFinalLines((lines) => [...lines, message]);
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
    <main className="min-h-screen bg-neutral-950 px-3 py-3 text-white md:px-6 md:py-6">
      <section className="mx-auto flex min-h-[calc(100vh-24px)] max-w-6xl flex-col md:min-h-[calc(100vh-48px)]">
        <div className="mb-3 flex items-center gap-3 text-white/70">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={appIcon}
              alt="ekto"
              className="h-9 w-9 rounded-lg shadow-lg"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                ekto live captions
              </p>
              <p className="truncate font-mono text-xs text-white/45">
                Room {code || "unknown"}
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 overflow-hidden rounded-lg bg-black shadow-2xl ring-1 ring-white/10">
          <div className="absolute left-4 top-4 z-10 flex max-w-[55%] flex-wrap gap-2 text-xs font-medium text-white/60 md:left-6 md:top-6">
            {mode && <span>{mode}</span>}
            {language && <span>{language}</span>}
          </div>

          <div className="absolute right-4 top-4 z-10 text-right font-mono text-xs font-medium text-white/70 md:right-6 md:top-6 md:text-sm">
            <p>{status === "reconnecting" ? "Reconnecting..." : statusLabel}</p>
            {lastUpdatedAt && (
              <p className="mt-1 text-[10px] text-white/45 md:text-xs">
                {new Date(lastUpdatedAt).toLocaleTimeString()}
              </p>
            )}
          </div>

          <div className="grid min-h-[70vh] w-full grid-rows-[minmax(0,1fr)] overflow-hidden px-5 pb-6 pt-16 text-center md:min-h-[78vh] md:px-10 md:pb-10 md:pt-20">
            {finalLines.length === 0 && !partialLine ? (
              <div className="mx-auto flex h-full max-w-2xl items-end text-xl font-bold leading-snug text-white/60 md:text-4xl">
                Captions will appear here when the broadcaster starts speaking.
              </div>
            ) : (
              <div className="relative min-h-0 overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 space-y-2 md:space-y-3">
                  {finalLines.map((line, index) => {
                    const caption = getCaptionDisplay(
                      line,
                      index,
                      finalLines.length,
                    );

                    return (
                      <p
                        key={`${line.sentAt || "line"}-${index}`}
                        className={`text-2xl font-bold leading-tight [overflow-wrap:anywhere] md:text-5xl ${caption.className}`}
                      >
                        {caption.text}
                      </p>
                    );
                  })}

                  {partialLine && (
                    <p className="mt-2 min-h-[2.5rem] text-2xl font-bold leading-tight text-white [overflow-wrap:anywhere] md:mt-3 md:min-h-[4rem] md:text-5xl">
                      {partialLine}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default LiveRoomPage;
