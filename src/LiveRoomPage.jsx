import { useEffect, useMemo, useRef, useState } from "react";
import appIcon from "./assets/ekto.png";

const RECONNECT_DELAYS_MS = [1000, 2000, 5000, 10000];
const MAX_RENDERED_CAPTION_LINES = 10;

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

function formatCaptionText(text) {
  return text
    .replace(/([。！？])\s*/g, "$1\n")
    .replace(/([.!?])\s+(?=[A-Z0-9"“'‘([]|[\u3400-\u9fff])/g, "$1\n")
    .trim();
}

function parseCaptionPart(text, sourceKey) {
  const captionText = text.trim();

  if (captionText.startsWith("PT:")) {
    return {
      key: sourceKey,
      text: formatCaptionText(captionText.slice(3)),
      className: "text-[#8aeb9e]/80",
    };
  }

  if (captionText.startsWith("C:")) {
    return {
      key: sourceKey,
      text: formatCaptionText(captionText.slice(2)),
      className: "text-white/60",
    };
  }

  if (captionText.startsWith("P:")) {
    return {
      key: sourceKey,
      text: formatCaptionText(captionText.slice(2)),
      className: "text-white/80",
    };
  }

  if (captionText.startsWith("T:")) {
    return {
      key: sourceKey,
      text: formatCaptionText(captionText.slice(2)),
      className: "text-[#8aeb9e]",
    };
  }

  return {
    key: sourceKey,
    text: formatCaptionText(captionText),
    className: "text-white",
  };
}

function getLineText(line) {
  return typeof line === "string" ? line : line?.text || "";
}

function getMessageCaptionText(message) {
  return typeof message?.captionText === "string" ? message.captionText.trim() : "";
}

function getActiveCaptionText(text) {
  return text
    .split("\n")
    .map((part) => part.trim())
    .filter((part) => {
      if (!part) {
        return false;
      }

      return !(
        part.startsWith("T:") ||
        part.startsWith("PT:") ||
        part.startsWith("P:") ||
        part.startsWith("C:")
      );
    })
    .join("\n");
}

function getCaptionPartsFromText(text, sourceKey) {
  return text
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part, partIndex) =>
      parseCaptionPart(part, `${sourceKey}-${partIndex}`),
    );
}

function getMessageTranslationText(message) {
  return typeof message?.translationText === "string"
    ? message.translationText.trim()
    : "";
}

function getPartialCaptionParts(message, sourceKey) {
  const captionText = getMessageCaptionText(message);
  const translationText = getMessageTranslationText(message);

  if (captionText || translationText) {
    const parts = [];

    if (captionText) {
      parts.push(...getCaptionPartsFromText(captionText, `${sourceKey}-caption`));
    }

    if (translationText) {
      parts.push(
        ...getCaptionPartsFromText(`T:${translationText}`, `${sourceKey}-translation`),
      );
    }

    return parts;
  }

  return getCaptionPartsFromText(getLineText(message), sourceKey);
}

function getFinalCaptionParts(message, fallbackCaptionText, sourceKey) {
  const captionText = getMessageCaptionText(message) || fallbackCaptionText.trim();
  const translationText = getMessageTranslationText(message);

  if (captionText || translationText) {
    const parts = [];

    if (captionText) {
      parts.push(
        ...getCaptionPartsFromText(`P:${captionText}`, `${sourceKey}-caption`),
      );
    }

    if (translationText) {
      parts.push(
        ...getCaptionPartsFromText(
          `PT:${translationText}`,
          `${sourceKey}-translation`,
        ),
      );
    }

    return parts;
  }

  return getCaptionPartsFromText(getLineText(message), sourceKey);
}

function LiveRoomPage() {
  const code = useMemo(() => normalizeCode(window.location.pathname), []);
  const [status, setStatus] = useState("connecting");
  const [finalizedCaptionParts, setFinalizedCaptionParts] = useState([]);
  const [activeCaptionParts, setActiveCaptionParts] = useState([]);
  const lastActiveCaptionTextRef = useRef("");
  const messageSequenceRef = useRef(0);
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

      if (message.type === "snapshot") {
        setFinalizedCaptionParts(
          Array.isArray(message.history)
            ? message.history.flatMap((item, index) =>
                typeof item.text === "string"
                  ? getFinalCaptionParts(item, "", `snapshot-${index}`)
                  : [],
              )
            : [],
        );
        const partialText = message.latestPartial?.text || "";
        lastActiveCaptionTextRef.current =
          getMessageCaptionText(message.latestPartial) ||
          getActiveCaptionText(partialText) ||
          lastActiveCaptionTextRef.current;
        setActiveCaptionParts(
          message.latestPartial
            ? getPartialCaptionParts(message.latestPartial, "partial")
            : [],
        );
        setStatus(message.status || "waiting");
        endedRef.current = message.status === "ended";
        return;
      }

      if (message.type === "status") {
        setStatus(message.status || "live");
        return;
      }

      if (message.type === "partial") {
        const partialText = message.text || "";
        lastActiveCaptionTextRef.current =
          getMessageCaptionText(message) ||
          getActiveCaptionText(partialText) ||
          lastActiveCaptionTextRef.current;
        messageSequenceRef.current += 1;
        setActiveCaptionParts(
          getPartialCaptionParts(
            message,
            `partial-${messageSequenceRef.current}`,
          ),
        );
        setStatus("live");
        return;
      }

      if (message.type === "final") {
        messageSequenceRef.current += 1;
        const partsToAppend = getFinalCaptionParts(
          message,
          lastActiveCaptionTextRef.current,
          `final-${messageSequenceRef.current}`,
        );
        setFinalizedCaptionParts((parts) => [...parts, ...partsToAppend]);
        lastActiveCaptionTextRef.current = "";
        setActiveCaptionParts([]);
        setStatus("live");
        return;
      }

      if (message.type === "ended") {
        if (typeof message.text === "string") {
          messageSequenceRef.current += 1;
          const partsToAppend = getFinalCaptionParts(
            message,
            lastActiveCaptionTextRef.current,
            `ended-${messageSequenceRef.current}`,
          );
          setFinalizedCaptionParts((parts) => [...parts, ...partsToAppend]);
        }
        lastActiveCaptionTextRef.current = "";
        setActiveCaptionParts([]);
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

  const visibleCaptionParts = useMemo(
    () =>
      [...finalizedCaptionParts, ...activeCaptionParts].slice(
        -MAX_RENDERED_CAPTION_LINES,
      ),
    [activeCaptionParts, finalizedCaptionParts],
  );

  return (
    <main className="live-room-page bg-neutral-950 px-3 py-3 text-white md:px-6 md:py-6">
      <section className="live-room-shell mx-auto flex max-w-6xl flex-col">
        <div className="mb-3 flex items-center justify-between gap-3 text-white/70">
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
          <div className="shrink-0 text-right font-mono text-xs font-medium text-white/70 md:text-sm">
            {status === "live" ? (
              <p className="inline-flex items-center gap-1.5 text-[#8aeb9e]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8aeb9e]" />
                LIVE
              </p>
            ) : (
              <p>{status === "reconnecting" ? "Reconnecting..." : statusLabel}</p>
            )}
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-lg bg-black shadow-2xl ring-1 ring-white/10">
          <div className="grid min-h-0 w-full grid-rows-[minmax(0,1fr)] overflow-hidden px-5 pb-6 pt-16 text-center md:px-10 md:pb-10 md:pt-20">
            {visibleCaptionParts.length === 0 ? (
              <div className="mx-auto flex h-full max-w-2xl items-end text-xl font-bold leading-snug text-white/60 md:text-4xl">
                Captions will appear here when the broadcaster starts speaking.
              </div>
            ) : (
              <div className="relative min-h-0 overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 space-y-2 md:space-y-3">
                  {visibleCaptionParts.map((caption) => (
                    <p
                      key={caption.key}
                      className={`whitespace-pre-line text-2xl font-bold leading-tight [overflow-wrap:anywhere] md:text-5xl ${caption.className}`}
                    >
                      {caption.text}
                    </p>
                  ))}
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
