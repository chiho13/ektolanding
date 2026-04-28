import { useEffect, useMemo, useRef, useState } from "react";
import appIcon from "./assets/ekto.png";

const RECONNECT_DELAYS_MS = [1000, 2000, 5000, 10000];
const MAX_RENDERED_CAPTION_LINES = 10;
const FONT_SCALE_STORAGE_KEY = "ekto.live.fontScale";
const DEFAULT_FONT_SCALE = 1;
const MIN_FONT_SCALE = 0.75;
const MAX_FONT_SCALE = 1.6;
const FONT_SCALE_STEP = 0.05;

function clampFontScale(value) {
  if (value === null || value === undefined || value === "") {
    return DEFAULT_FONT_SCALE;
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return DEFAULT_FONT_SCALE;
  }

  const roundedValue =
    Math.round(numericValue / FONT_SCALE_STEP) * FONT_SCALE_STEP;

  return Math.min(MAX_FONT_SCALE, Math.max(MIN_FONT_SCALE, roundedValue));
}

function readStoredFontScale() {
  try {
    return clampFontScale(window.localStorage.getItem(FONT_SCALE_STORAGE_KEY));
  } catch {
    return DEFAULT_FONT_SCALE;
  }
}

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
      role: "translation-history",
    };
  }

  if (captionText.startsWith("C:")) {
    return {
      key: sourceKey,
      text: formatCaptionText(captionText.slice(2)),
      className: "text-white/60",
      role: "caption-history",
    };
  }

  if (captionText.startsWith("P:")) {
    return {
      key: sourceKey,
      text: formatCaptionText(captionText.slice(2)),
      className: "text-white/80",
      role: "caption-history",
    };
  }

  if (captionText.startsWith("T:")) {
    return {
      key: sourceKey,
      text: formatCaptionText(captionText.slice(2)),
      className: "text-[#8aeb9e]",
      role: "translation-active",
    };
  }

  return {
    key: sourceKey,
    text: formatCaptionText(captionText),
    className: "text-white",
    role: "caption-active",
  };
}

function getLineText(line) {
  return typeof line === "string" ? line : line?.text || "";
}

function isTranslateMessage(message) {
  return message?.mode === "translate";
}

function getMessageMode(message) {
  return typeof message?.mode === "string" ? message.mode : null;
}

function getMessageHideOriginals(message) {
  return typeof message?.hideOriginals === "boolean"
    ? message.hideOriginals
    : null;
}

function isOriginalCaptionPart(part) {
  return part.role === "caption-active" || part.role === "caption-history";
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

function splitPrefixedCaptionLines(text) {
  return text
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce(
      (lines, part) => {
        if (part.startsWith("P:") || part.startsWith("PT:")) {
          lines.final.push(part);
        } else if (part.startsWith("C:") || part.startsWith("T:")) {
          lines.active.push(part);
        } else {
          lines.unprefixed.push(part);
        }

        return lines;
      },
      { final: [], active: [], unprefixed: [] },
    );
}

function getMessageTranslationText(message) {
  return typeof message?.translationText === "string"
    ? message.translationText.trim()
    : "";
}

function getTranslateCaptionParts(message, sourceKey, isFinal = false) {
  const renderLines = getLineText(message)
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean);

  if (renderLines.length > 0) {
    return getCaptionPartsFromText(renderLines.join("\n"), sourceKey);
  }

  const captionText = getMessageCaptionText(message);
  const translationText = getMessageTranslationText(message);
  const fallbackLines = [];

  if (captionText) {
    fallbackLines.push(isFinal ? `P:${captionText}` : captionText);
  }

  if (translationText) {
    fallbackLines.push(`${isFinal ? "PT" : "T"}:${translationText}`);
  }

  return getCaptionPartsFromText(fallbackLines.join("\n"), sourceKey);
}

function getPartialCaptionParts(message, sourceKey) {
  if (isTranslateMessage(message)) {
    return getTranslateCaptionParts(message, sourceKey);
  }

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
  if (isTranslateMessage(message)) {
    return getTranslateCaptionParts(message, sourceKey, true);
  }

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

function getSnapshotDisplayState(message) {
  return [
    ...(Array.isArray(message.history) ? message.history : []),
    message.latestPartial,
  ]
    .filter(Boolean)
    .reduce(
      (state, item) => ({
        mode: getMessageMode(item) || state.mode,
        hideOriginals: getMessageHideOriginals(item) ?? state.hideOriginals,
      }),
      { mode: "captions", hideOriginals: false },
    );
}

function LiveRoomPage() {
  const code = useMemo(() => normalizeCode(window.location.pathname), []);
  const [status, setStatus] = useState("connecting");
  const [finalizedCaptionParts, setFinalizedCaptionParts] = useState([]);
  const [activeCaptionParts, setActiveCaptionParts] = useState([]);
  const [roomMode, setRoomMode] = useState("captions");
  const [hideOriginals, setHideOriginals] = useState(false);
  const [fontScale, setFontScale] = useState(readStoredFontScale);
  const [isFontControlOpen, setIsFontControlOpen] = useState(false);
  const lastActiveCaptionTextRef = useRef("");
  const appendedPrefixedFinalLinesRef = useRef(new Set());
  const messageSequenceRef = useRef(0);
  const reconnectAttemptRef = useRef(0);
  const reconnectTimerRef = useRef(null);
  const shouldReconnectRef = useRef(true);
  const endedRef = useRef(false);
  const fontControlRef = useRef(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(FONT_SCALE_STORAGE_KEY, String(fontScale));
    } catch {
      // Ignore storage failures; the control should still work for this page.
    }
  }, [fontScale]);

  useEffect(() => {
    if (!isFontControlOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!fontControlRef.current?.contains(event.target)) {
        setIsFontControlOpen(false);
      }
    }

    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isFontControlOpen]);

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

      const nextMode = getMessageMode(message);
      if (nextMode) {
        setRoomMode(nextMode);
      }

      const nextHideOriginals = getMessageHideOriginals(message);
      if (nextHideOriginals !== null) {
        setHideOriginals(nextHideOriginals);
      }

      if (message.type === "snapshot") {
        const snapshotState = getSnapshotDisplayState(message);
        setRoomMode(snapshotState.mode);
        setHideOriginals(snapshotState.hideOriginals);
        appendedPrefixedFinalLinesRef.current = new Set();
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
          isTranslateMessage(message)
            ? lastActiveCaptionTextRef.current
            : getMessageCaptionText(message) ||
              getActiveCaptionText(partialText) ||
              lastActiveCaptionTextRef.current;
        messageSequenceRef.current += 1;
        const prefixedLines = splitPrefixedCaptionLines(partialText);

        const finalizedLines = isTranslateMessage(message) ? [] : prefixedLines.final;

        if (finalizedLines.length > 0) {
          const newFinalLines = finalizedLines.filter((line) => {
            if (appendedPrefixedFinalLinesRef.current.has(line)) {
              return false;
            }

            appendedPrefixedFinalLinesRef.current.add(line);
            return true;
          });
          const finalParts = getCaptionPartsFromText(
            newFinalLines.join("\n"),
            `partial-final-${messageSequenceRef.current}`,
          );

          if (finalParts.length > 0) {
            setFinalizedCaptionParts((parts) => [...parts, ...finalParts]);
          }
        }

        const nextActiveCaptionParts = isTranslateMessage(message)
          ? getTranslateCaptionParts(
              message,
              `partial-${messageSequenceRef.current}`,
            )
          : prefixedLines.final.length > 0
            ? getCaptionPartsFromText(
                [...prefixedLines.active, ...prefixedLines.unprefixed].join("\n"),
                `partial-${messageSequenceRef.current}`,
              )
            : getPartialCaptionParts(
                message,
                `partial-${messageSequenceRef.current}`,
              );

        setActiveCaptionParts(nextActiveCaptionParts);
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
        if (!isTranslateMessage(message)) {
          lastActiveCaptionTextRef.current = "";
          setActiveCaptionParts([]);
        }
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
    () => {
      const shouldHideOriginals = roomMode === "translate" && hideOriginals;
      const parts =
        roomMode === "translate" && activeCaptionParts.length > 0
          ? activeCaptionParts
          : [...finalizedCaptionParts, ...activeCaptionParts];

      return (shouldHideOriginals
        ? parts.filter((part) => !isOriginalCaptionPart(part))
        : parts
      ).slice(-MAX_RENDERED_CAPTION_LINES);
    },
    [activeCaptionParts, finalizedCaptionParts, hideOriginals, roomMode],
  );
  const captionFontPercent = Math.round(fontScale * 100);

  return (
    <main
      className="live-room-page bg-neutral-950 px-3 py-3 text-white md:px-6 md:py-6"
      style={{ "--caption-font-scale": fontScale }}
    >
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
          <div className="grid min-h-0 w-full grid-rows-[minmax(0,1fr)] overflow-hidden px-5 pb-6 pt-8 text-center md:px-10 md:pb-10 md:pt-12">
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
                      className={`live-caption-text whitespace-pre-line font-bold leading-tight [overflow-wrap:anywhere] ${caption.className}`}
                    >
                      {caption.text}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div
            ref={fontControlRef}
            className="absolute right-3 top-3 z-20 flex flex-col items-end gap-2 md:right-4 md:top-4"
          >
            {isFontControlOpen ? (
              <div className="flex h-10 items-center gap-2 rounded-md border border-white/15 bg-neutral-950/90 px-2 shadow-xl backdrop-blur">
                <button
                  type="button"
                  aria-label="Decrease caption font size"
                  title="Decrease caption font size"
                  disabled={fontScale <= MIN_FONT_SCALE}
                  onClick={() =>
                    setFontScale((currentScale) =>
                      clampFontScale(currentScale - FONT_SCALE_STEP),
                    )
                  }
                  className="h-7 w-8 cursor-pointer rounded-sm border border-white/10 text-xs font-bold text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                >
                  A-
                </button>
                <input
                  aria-label="Caption font size"
                  type="range"
                  min={MIN_FONT_SCALE}
                  max={MAX_FONT_SCALE}
                  step={FONT_SCALE_STEP}
                  value={fontScale}
                  onChange={(event) =>
                    setFontScale(clampFontScale(event.target.value))
                  }
                  className="h-7 w-24 cursor-pointer accent-[#8aeb9e] md:w-32"
                />
                <button
                  type="button"
                  aria-label="Increase caption font size"
                  title="Increase caption font size"
                  disabled={fontScale >= MAX_FONT_SCALE}
                  onClick={() =>
                    setFontScale((currentScale) =>
                      clampFontScale(currentScale + FONT_SCALE_STEP),
                    )
                  }
                  className="h-7 w-8 cursor-pointer rounded-sm border border-white/10 text-xs font-bold text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                >
                  A+
                </button>
                <span className="w-9 text-right font-mono text-[0.65rem] font-semibold text-white/50">
                  {captionFontPercent}%
                </span>
              </div>
            ) : null}
            <button
              type="button"
              aria-label="Caption font size settings"
              aria-expanded={isFontControlOpen}
              title="Caption font size"
              onClick={() => setIsFontControlOpen((isOpen) => !isOpen)}
              className="h-9 w-10 cursor-pointer rounded-md border border-white/15 bg-neutral-950/80 text-sm font-bold text-white/80 shadow-lg backdrop-blur transition hover:border-white/25 hover:bg-neutral-900 hover:text-white"
            >
              Aa
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LiveRoomPage;
