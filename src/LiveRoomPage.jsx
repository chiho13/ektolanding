import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PictureInPicture2, Share2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import appIcon from "./assets/ekto.png";

const RECONNECT_DELAYS_MS = [1000, 2000, 5000, 10000];
const MAX_RENDERED_CAPTION_LINES = 10;
const MAX_MINI_CAPTION_LINES = 2;
const FONT_SCALE_STORAGE_KEY = "ekto.live.fontScale";
const DEFAULT_FONT_SCALE = 1;
const MIN_FONT_SCALE = 0.75;
const MAX_FONT_SCALE = 1.6;
const FONT_SCALE_STEP = 0.05;
const ROOM_CODE_PATTERN = /^[A-Z0-9]{6,24}$/;
const RETRYABLE_ROOM_STATUSES = new Set(["missing", "expired"]);
const ROOM_FULL_CLOSE_CODE = 4409;
const DESKTOP_MEDIA_QUERY = "(min-width: 768px) and (hover: hover) and (pointer: fine)";
const MINI_CAPTION_WINDOW_SIZE = {
  width: 520,
  height: 140,
};
const MINI_CAPTION_WINDOW_TITLE = "Live captions";
const FADED_CAPTION_OPACITY = 0.56;
const QR_CODE_OPTIONS = {
  color: {
    dark: "#111827",
    light: "#ffffff",
  },
  margin: 1,
  width: 320,
};
const MotionDiv = motion.div;
const MotionButton = motion.button;
const MotionSection = motion.section;

const MINI_CAPTION_WINDOW_STYLES = `
  :root {
    color-scheme: dark;
    font-family: "Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body,
  #ekto-mini-caption-root {
    height: 100%;
    margin: 0;
    overflow: hidden;
    background: #000;
    color: #fff;
  }

  body {
    min-width: 320px;
  }

  .mini-caption-window {
    display: grid;
    height: 100%;
    min-height: 0;
    padding: 10px 16px 12px;
    background: #000;
  }

  .mini-caption-stage {
    position: relative;
    min-height: 0;
    overflow: hidden;
  }

  .mini-caption-stack {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 7px;
    text-align: center;
  }

  .mini-caption-line {
    margin: 0;
    color: #fff;
    font-size: calc(1.28rem * var(--caption-font-scale, 1));
    font-weight: 650;
    line-height: 1.16;
    overflow-wrap: anywhere;
    white-space: pre-line;
  }

  .mini-caption-line.translation-active,
  .mini-caption-line.translation-history {
    color: #8aeb9e;
  }

  .mini-caption-line.caption-history {
    color: #fff;
  }

  .mini-caption-empty {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: 0;
    color: rgba(255, 255, 255, 0.62);
    font-size: 1.12rem;
    font-weight: 650;
    line-height: 1.2;
    overflow-wrap: anywhere;
    text-align: center;
  }

  @media (max-height: 150px), (max-width: 300px) {
    .mini-caption-window {
      padding: 8px 12px 10px;
    }

    .mini-caption-stack {
      gap: 4px;
    }

    .mini-caption-line {
      font-size: calc(1.12rem * var(--caption-font-scale, 1));
    }

    .mini-caption-empty {
      font-size: 1rem;
    }
  }
`;

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

function getRoomStatusUrl(code) {
  const httpBaseUrl =
    import.meta.env.VITE_BROADCAST_HTTP_BASE_URL ||
    "https://broadcast.voicetranslate.app";

  return `${httpBaseUrl.replace(/\/$/, "")}/rooms/${code}/status`;
}

function getLiveRoomUrl() {
  return window.location.href;
}

function isValidRoomCode(code) {
  return ROOM_CODE_PATTERN.test(code);
}

function isRetryableRoomStatus(status) {
  return RETRYABLE_ROOM_STATUSES.has(status);
}

function normalizeRoomMode(mode) {
  return mode === "translate" || mode === "captions" ? mode : null;
}

function normalizedRoomStatus(status) {
  return isRetryableRoomStatus(status) ? "waiting" : status;
}

function getTerminalRoomStatus(status) {
  if (status === "full") {
    return "full";
  }

  return status === "expired" ? "expired" : "ended";
}

function getNextNonSpaceCharacter(text, index) {
  return text.slice(index + 1).match(/\S/)?.[0] || "";
}

function getTokenBeforeIndex(text, index) {
  return text
    .slice(0, index + 1)
    .split(/\s/)
    .pop()
    .replace(/^[("'“‘[]+/, "");
}

function isProtectedPeriod(text, index) {
  const previousCharacter = text[index - 1] || "";
  const nextCharacter = text[index + 1] || "";

  if (/\d/.test(previousCharacter) && /\d/.test(nextCharacter)) {
    return true;
  }

  const token = getTokenBeforeIndex(text, index);
  const normalizedToken = token.toLowerCase();
  const protectedAbbreviations = new Set([
    "mr.",
    "mrs.",
    "ms.",
    "dr.",
    "prof.",
    "sr.",
    "jr.",
    "st.",
    "vs.",
    "etc.",
    "e.g.",
    "i.e.",
  ]);

  if (protectedAbbreviations.has(normalizedToken)) {
    return true;
  }

  if (/^[A-Z]\.$/.test(token)) {
    return true;
  }

  if (/^(?:[A-Za-z]\.){2,}$/.test(token)) {
    const nextNonSpaceCharacter = getNextNonSpaceCharacter(text, index);
    return !nextNonSpaceCharacter || /[a-z]/.test(nextNonSpaceCharacter);
  }

  return false;
}

function splitCaptionTextIntoSentences(text) {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return [];
  }

  const sentences = [];
  let sentenceStartIndex = 0;

  for (let index = 0; index < trimmedText.length; index += 1) {
    const character = trimmedText[index];

    if (!/[.!?。！？]/.test(character)) {
      continue;
    }

    if (character === "." && isProtectedPeriod(trimmedText, index)) {
      continue;
    }

    let sentenceEndIndex = index + 1;
    while (
      sentenceEndIndex < trimmedText.length &&
      /["'”’)\]]/.test(trimmedText[sentenceEndIndex])
    ) {
      sentenceEndIndex += 1;
    }

    const sentence = trimmedText.slice(sentenceStartIndex, sentenceEndIndex).trim();
    if (sentence) {
      sentences.push(sentence);
    }

    while (
      sentenceEndIndex < trimmedText.length &&
      /\s/.test(trimmedText[sentenceEndIndex])
    ) {
      sentenceEndIndex += 1;
    }

    sentenceStartIndex = sentenceEndIndex;
    index = sentenceEndIndex - 1;
  }

  const trailingSentence = trimmedText.slice(sentenceStartIndex).trim();
  if (trailingSentence) {
    sentences.push(trailingSentence);
  }

  return sentences;
}

function formatCaptionText(text) {
  return text
    .replace(/([。！？])\s*/g, "$1\n")
    .replace(/([.!?])\s+(?=[A-Z0-9"“'‘([]|[\u3400-\u9fff])/g, "$1\n")
    .trim();
}

function createCaptionPartsFromText(
  text,
  sourceKey,
  className,
  role,
  { splitSentences = false } = {},
) {
  if (splitSentences) {
    return splitCaptionTextIntoSentences(text).map((sentence, index) => ({
      key: `${sourceKey}-sentence-${index}`,
      text: sentence,
      className,
      role,
    }));
  }

  const formattedText = formatCaptionText(text);

  if (!formattedText) {
    return [];
  }

  return [
    {
      key: sourceKey,
      text: formattedText,
      className,
      role,
    },
  ];
}

function parseCaptionPart(text, sourceKey, options = {}) {
  const captionText = text.trim();

  if (captionText.startsWith("PT:")) {
    return createCaptionPartsFromText(
      captionText.slice(3),
      sourceKey,
      "text-[#8aeb9e]/80",
      "translation-history",
      options,
    );
  }

  if (captionText.startsWith("C:")) {
    return createCaptionPartsFromText(
      captionText.slice(2),
      sourceKey,
      options.splitSentences ? "text-white" : "text-white/60",
      "caption-history",
      options,
    );
  }

  if (captionText.startsWith("P:")) {
    return createCaptionPartsFromText(
      captionText.slice(2),
      sourceKey,
      options.splitSentences ? "text-white" : "text-white/80",
      "caption-history",
      options,
    );
  }

  if (captionText.startsWith("T:")) {
    return createCaptionPartsFromText(
      captionText.slice(2),
      sourceKey,
      "text-[#8aeb9e]",
      "translation-active",
      options,
    );
  }

  return createCaptionPartsFromText(
    captionText,
    sourceKey,
    "text-white",
    "caption-active",
    options,
  );
}

function getLineText(line) {
  return typeof line === "string" ? line : line?.text || "";
}

function isTranslateMessage(message) {
  return normalizeRoomMode(message?.mode) === "translate";
}

function getMessageMode(message) {
  return normalizeRoomMode(message?.mode);
}

function getMessageHideOriginals(message) {
  return typeof message?.hideOriginals === "boolean"
    ? message.hideOriginals
    : null;
}

function isOriginalCaptionPart(part) {
  return part.role === "caption-active" || part.role === "caption-history";
}

function isActiveCaptionPart(part) {
  return part.role === "caption-active" || part.role === "translation-active";
}

function getCaptionWeightClassName(part, roomMode) {
  if (part.role === "translation-active") {
    return "font-semibold";
  }

  if (part.role === "translation-history") {
    return "font-semibold";
  }

  if (part.role === "caption-active") {
    return roomMode === "translate" ? "font-medium" : "font-semibold";
  }

  if (part.role === "caption-history") {
    return roomMode === "captions" ? "font-semibold" : "font-medium";
  }

  return "font-medium";
}

function getBrightCaptionStartIndex(parts) {
  const lastIndex = parts.length - 1;

  if (lastIndex < 0) {
    return 0;
  }

  const lastPart = parts[lastIndex];
  const previousPart = parts[lastIndex - 1];

  if (
    lastPart?.role === "translation-active" &&
    previousPart?.role === "caption-active"
  ) {
    return lastIndex - 1;
  }

  return lastIndex;
}

function getCaptionOpacity(parts, index, roomMode) {
  if (roomMode !== "captions") {
    return 1;
  }

  return index < getBrightCaptionStartIndex(parts) ? FADED_CAPTION_OPACITY : 1;
}

function promoteCaptionPartToActive(part) {
  if (part.role === "caption-history") {
    return {
      ...part,
      key: `${part.key}-active`,
      className: "text-white",
      role: "caption-active",
    };
  }

  if (part.role === "translation-history") {
    return {
      ...part,
      key: `${part.key}-active`,
      className: "text-[#8aeb9e]",
      role: "translation-active",
    };
  }

  return part;
}

function keepLatestTranslateSentenceActive(parts) {
  if (parts.some(isActiveCaptionPart)) {
    return parts;
  }

  const lastOriginalIndex = parts.findLastIndex(
    (part) => part.role === "caption-history",
  );
  const lastTranslationIndex = parts.findLastIndex(
    (part) => part.role === "translation-history",
  );

  if (lastOriginalIndex === -1 && lastTranslationIndex === -1) {
    return parts;
  }

  const indexesToPromote = new Set();

  if (lastOriginalIndex !== -1) {
    indexesToPromote.add(lastOriginalIndex);
  }

  if (lastTranslationIndex !== -1) {
    indexesToPromote.add(lastTranslationIndex);
  }

  return parts.map((part, index) =>
    indexesToPromote.has(index) ? promoteCaptionPartToActive(part) : part,
  );
}

function keepLatestCaptionSentenceActive(parts) {
  if (parts.some((part) => part.role === "caption-active")) {
    return parts;
  }

  const lastCaptionIndex = parts.findLastIndex(
    (part) => part.role === "caption-history",
  );

  if (lastCaptionIndex === -1) {
    return parts;
  }

  return parts.map((part, index) =>
    index === lastCaptionIndex ? promoteCaptionPartToActive(part) : part,
  );
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

function getCaptionPartsFromText(text, sourceKey, options = {}) {
  return text
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean)
    .flatMap((part, partIndex) =>
      parseCaptionPart(part, `${sourceKey}-${partIndex}`, options),
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
      parts.push(
        ...getCaptionPartsFromText(captionText, `${sourceKey}-caption`, {
          splitSentences: true,
        }),
      );
    }

    if (translationText) {
      parts.push(
        ...getCaptionPartsFromText(`T:${translationText}`, `${sourceKey}-translation`),
      );
    }

    return parts;
  }

  return getCaptionPartsFromText(getLineText(message), sourceKey, {
    splitSentences: true,
  });
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
        ...getCaptionPartsFromText(`P:${captionText}`, `${sourceKey}-caption`, {
          splitSentences: true,
        }),
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

  return getCaptionPartsFromText(getLineText(message), sourceKey, {
    splitSentences: true,
  });
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
      { mode: null, hideOriginals: false },
    );
}

function getLiveRoomTitle(roomMode) {
  if (roomMode === "translate") {
    return "ekto live translation";
  }

  if (roomMode === "captions") {
    return "ekto live captions";
  }

  return "ekto live room";
}

function ShareActionButton({ children, onClick, variant = "secondary" }) {
  const variantClassName =
    variant === "primary"
      ? "border-[#8aeb9e]/40 bg-[#8aeb9e] text-neutral-950 hover:bg-[#9df3ae]"
      : "border-white/10 bg-white/[0.06] text-white/80 hover:border-white/20 hover:bg-white/[0.10] hover:text-white";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-11 flex-1 cursor-pointer rounded-md border px-3 text-sm font-semibold transition ${variantClassName}`}
    >
      {children}
    </button>
  );
}

function LiveRoomQrCode({ qrCodeDataUrl, liveRoomUrl, className = "" }) {
  return (
    <div
      className={`grid place-items-center rounded-md bg-white p-2 shadow-lg ${className}`}
    >
      {qrCodeDataUrl ? (
        <img
          src={qrCodeDataUrl}
          alt={`QR code for ${liveRoomUrl}`}
          className="h-full w-full"
        />
      ) : (
        <div className="grid h-full w-full place-items-center rounded-sm bg-neutral-100 text-xs font-semibold text-neutral-500">
          QR
        </div>
      )}
    </div>
  );
}

function DesktopQrCard({ liveRoomUrl, qrCodeDataUrl, onShareClick }) {
  return (
    <aside className="absolute bottom-4 left-4 z-20 hidden w-36 rounded-lg border border-white/10 bg-neutral-950/86 p-3 text-center shadow-2xl backdrop-blur lg:block">
      <LiveRoomQrCode
        qrCodeDataUrl={qrCodeDataUrl}
        liveRoomUrl={liveRoomUrl}
        className="mx-auto h-24 w-24"
      />
      <p className="mt-2 text-center text-xs font-semibold text-white/88">
        Scan to Join
      </p>
      <button
        type="button"
        aria-label="Share live room"
        onClick={onShareClick}
        className="mx-auto mt-1.5 inline-flex cursor-pointer items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[0.68rem] font-semibold text-white/52 transition hover:border-white/18 hover:bg-white/[0.08] hover:text-white/78"
      >
        <Share2 size={11} strokeWidth={2.2} />
        Share
      </button>
    </aside>
  );
}

function LiveRoomShareDialog({
  code,
  liveRoomUrl,
  qrCodeDataUrl,
  shareFeedback,
  onClose,
  onCopy,
  onShare,
}) {
  function handleDragEnd(_event, info) {
    if (info.offset.y > 80 || info.velocity.y > 650) {
      onClose();
    }
  }

  return (
    <MotionDiv
      className="fixed inset-0 z-50 grid place-items-end md:place-items-center"
      initial="closed"
      animate="open"
      exit="closed"
    >
      <MotionButton
        type="button"
        aria-label="Close share sheet"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-black/62 backdrop-blur-sm"
        variants={{
          closed: { opacity: 0 },
          open: { opacity: 1 },
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
      <MotionSection
        className="relative z-10 w-full max-w-xl rounded-t-[1.7rem] border border-white/10 bg-neutral-950 px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-3 shadow-2xl md:w-[min(92vw,420px)] md:rounded-3xl md:pb-6"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.34 }}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ touchAction: "none" }}
        variants={{
          closed: { y: "105%", scale: 0.98 },
          open: { y: 0, scale: 1 },
        }}
        transition={{
          type: "spring",
          stiffness: 430,
          damping: 38,
          mass: 0.9,
        }}
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-white/24" />
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-lg font-semibold text-white">Share live room</p>
            <p className="mt-1 truncate font-mono text-xs uppercase text-white/45">
              Broadcast {code || "unknown"}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/[0.06] text-lg leading-none text-white/70 transition hover:bg-white/[0.10] hover:text-white"
          >
            <X size={18} strokeWidth={2.3} />
          </button>
        </div>

        <LiveRoomQrCode
          qrCodeDataUrl={qrCodeDataUrl}
          liveRoomUrl={liveRoomUrl}
          className="mx-auto mt-5 h-52 w-52"
        />

        <p className="mx-auto mt-4 max-w-xs truncate text-center font-mono text-xs text-white/45">
          {liveRoomUrl}
        </p>

        <div className="mt-5 flex gap-3">
          <ShareActionButton onClick={onCopy}>
            {shareFeedback || "Copy link"}
          </ShareActionButton>
          <ShareActionButton onClick={onShare} variant="primary">
            <span className="inline-flex items-center justify-center gap-2">
              <Share2 size={16} strokeWidth={2.2} />
              Share
            </span>
          </ShareActionButton>
        </div>
      </MotionSection>
    </MotionDiv>
  );
}

function getMiniCaptionClassName(part) {
  return `mini-caption-line ${part.role}`;
}

function MiniCaptionWindowContent({
  visibleCaptionParts,
  emptyCaptionMessage,
  fontScale,
  roomMode,
}) {
  const miniCaptionParts = visibleCaptionParts.slice(-MAX_MINI_CAPTION_LINES);

  return (
    <div
      className="mini-caption-window"
      style={{ "--caption-font-scale": fontScale }}
    >
      <div className="mini-caption-stage" aria-live="polite">
        {miniCaptionParts.length === 0 ? (
          <p className="mini-caption-empty">{emptyCaptionMessage}</p>
        ) : (
          <div className="mini-caption-stack">
            {miniCaptionParts.map((caption, index) => (
              <p
                key={caption.key}
                className={getMiniCaptionClassName(caption)}
                style={{
                  opacity: getCaptionOpacity(miniCaptionParts, index, roomMode),
                }}
              >
                {caption.text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LiveRoomPage() {
  const code = useMemo(() => normalizeCode(window.location.pathname), []);
  const canShareLiveRoom = Boolean(code && isValidRoomCode(code));
  const liveRoomUrl = useMemo(getLiveRoomUrl, []);
  const [status, setStatus] = useState("connecting");
  const [finalizedCaptionParts, setFinalizedCaptionParts] = useState([]);
  const [activeCaptionParts, setActiveCaptionParts] = useState([]);
  const [roomMode, setRoomMode] = useState(null);
  const [hideOriginals, setHideOriginals] = useState(false);
  const [fontScale, setFontScale] = useState(readStoredFontScale);
  const [isFontControlOpen, setIsFontControlOpen] = useState(false);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [isMiniCaptionSupported, setIsMiniCaptionSupported] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [miniCaptionWindow, setMiniCaptionWindow] = useState(null);
  const [miniCaptionRoot, setMiniCaptionRoot] = useState(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [shareFeedback, setShareFeedback] = useState("");
  const effectiveRoomMode = roomMode || "captions";
  const liveRoomTitle = getLiveRoomTitle(roomMode);
  const lastActiveCaptionTextRef = useRef("");
  const appendedPrefixedFinalLinesRef = useRef(new Set());
  const messageSequenceRef = useRef(0);
  const reconnectAttemptRef = useRef(0);
  const reconnectTimerRef = useRef(null);
  const socketRef = useRef(null);
  const shouldReconnectRef = useRef(true);
  const endedRef = useRef(false);
  const latestStatusRef = useRef("connecting");
  const viewerSocketAttachedRef = useRef(false);
  const liveReconnectRequestedRef = useRef(false);
  const reconnectImmediatelyRef = useRef(false);
  const reconnectNowRef = useRef(() => {});
  const fontControlRef = useRef(null);
  const shareFeedbackTimerRef = useRef(null);

  const applyRoomStatus = useCallback((nextStatus) => {
    const normalizedStatus = normalizedRoomStatus(nextStatus || "waiting");
    latestStatusRef.current = normalizedStatus;
    if (normalizedStatus === "live") {
      endedRef.current = false;
    }
    setStatus(normalizedStatus);
  }, []);
  const shouldShowMiniCaptionButton =
    isMiniCaptionSupported && isDesktopViewport;

  function showShareFeedback(message) {
    window.clearTimeout(shareFeedbackTimerRef.current);
    setShareFeedback(message);
    shareFeedbackTimerRef.current = window.setTimeout(() => {
      setShareFeedback("");
    }, 1600);
  }

  async function openMiniCaptionWindow() {
    const documentPictureInPicture = window.documentPictureInPicture;

    if (!isDesktopViewport || !documentPictureInPicture) {
      return;
    }

    if (miniCaptionWindow && !miniCaptionWindow.closed) {
      miniCaptionWindow.focus();
      return;
    }

    let nextMiniCaptionWindow;

    try {
      nextMiniCaptionWindow = await documentPictureInPicture.requestWindow({
        width: MINI_CAPTION_WINDOW_SIZE.width,
        height: MINI_CAPTION_WINDOW_SIZE.height,
        disallowReturnToOpener: false,
      });
    } catch {
      return;
    }

    nextMiniCaptionWindow.document.title = MINI_CAPTION_WINDOW_TITLE;
    nextMiniCaptionWindow.document.head.innerHTML = "";
    nextMiniCaptionWindow.document.body.innerHTML = "";

    const style = nextMiniCaptionWindow.document.createElement("style");
    style.textContent = MINI_CAPTION_WINDOW_STYLES;
    nextMiniCaptionWindow.document.head.append(style);

    const root = nextMiniCaptionWindow.document.createElement("div");
    root.id = "ekto-mini-caption-root";
    nextMiniCaptionWindow.document.body.append(root);

    nextMiniCaptionWindow.addEventListener(
      "pagehide",
      () => {
        setMiniCaptionWindow(null);
        setMiniCaptionRoot(null);
      },
      { once: true },
    );

    setMiniCaptionWindow(nextMiniCaptionWindow);
    setMiniCaptionRoot(root);
  }

  async function copyLiveRoomLink() {
    try {
      await navigator.clipboard.writeText(liveRoomUrl);
      showShareFeedback("Copied");
    } catch {
      showShareFeedback("Copy failed");
    }
  }

  async function shareLiveRoomLink() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: liveRoomTitle,
          text: "Join this ekto live room.",
          url: liveRoomUrl,
        });
        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          return;
        }
      }
    }

    await copyLiveRoomLink();
  }

  useEffect(() => {
    try {
      window.localStorage.setItem(FONT_SCALE_STORAGE_KEY, String(fontScale));
    } catch {
      // Ignore storage failures; the control should still work for this page.
    }
  }, [fontScale]);

  useEffect(() => {
    setIsMiniCaptionSupported(
      typeof window.documentPictureInPicture?.requestWindow === "function",
    );

    return () => {
      const activeMiniCaptionWindow = window.documentPictureInPicture?.window;

      if (activeMiniCaptionWindow && !activeMiniCaptionWindow.closed) {
        activeMiniCaptionWindow.close();
      }
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

    function updateDesktopViewport(eventOrQuery) {
      setIsDesktopViewport(eventOrQuery.matches);
    }

    updateDesktopViewport(mediaQuery);
    mediaQuery.addEventListener("change", updateDesktopViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateDesktopViewport);
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    import("qrcode")
      .then(({ default: QRCode }) =>
        QRCode.toDataURL(liveRoomUrl, QR_CODE_OPTIONS),
      )
      .then((dataUrl) => {
        if (!isCancelled) {
          setQrCodeDataUrl(dataUrl);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setQrCodeDataUrl("");
        }
      });

    return () => {
      isCancelled = true;
      window.clearTimeout(shareFeedbackTimerRef.current);
    };
  }, [liveRoomUrl]);

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
    if (!code || !isValidRoomCode(code)) {
      return undefined;
    }

    let isCancelled = false;

    async function refreshRoomStatus() {
      try {
        const response = await fetch(getRoomStatusUrl(code), {
          cache: "no-store",
        });
        const payload = await response.json().catch(() => null);
        const nextStatus = payload?.status;
        const nextMode = getMessageMode(payload);

        if (!isCancelled && nextMode) {
          setRoomMode(nextMode);
        }

        if (isCancelled || !nextStatus) {
          return;
        }

        if (nextStatus === "live") {
          applyRoomStatus(nextStatus);
          if (
            !viewerSocketAttachedRef.current &&
            !liveReconnectRequestedRef.current
          ) {
            liveReconnectRequestedRef.current = true;
            reconnectNowRef.current();
          }
          return;
        }

        liveReconnectRequestedRef.current = false;

        if (latestStatusRef.current !== "live") {
          applyRoomStatus(nextStatus);
        }
      } catch {
        // WebSocket remains the primary live path.
      }
    }

    refreshRoomStatus();
    const interval = window.setInterval(refreshRoomStatus, 2_000);

    return () => {
      isCancelled = true;
      window.clearInterval(interval);
    };
  }, [applyRoomStatus, code]);

  useEffect(() => {
    if (!code || !isValidRoomCode(code)) {
      setStatus("invalid");
      latestStatusRef.current = "invalid";
      return undefined;
    }

    shouldReconnectRef.current = true;

    function scheduleReconnect(delay) {
      window.clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = window.setTimeout(connect, delay);
    }

    function connect() {
      window.clearTimeout(reconnectTimerRef.current);
      viewerSocketAttachedRef.current = false;
      setStatus((currentStatus) =>
        currentStatus === "ended" ? "ended" : "connecting",
      );
      latestStatusRef.current =
        latestStatusRef.current === "ended" ? "ended" : "connecting";

      const socket = new WebSocket(getViewerSocketUrl(code));
      socketRef.current = socket;

      socket.addEventListener("open", () => {
        reconnectAttemptRef.current = 0;
        applyRoomStatus("waiting");
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
        if (socketRef.current === socket) {
          socketRef.current = null;
        }
        viewerSocketAttachedRef.current = false;

        if (!shouldReconnectRef.current) {
          return;
        }

        if (reconnectImmediatelyRef.current) {
          reconnectImmediatelyRef.current = false;
          scheduleReconnect(0);
          return;
        }

        if (event.code === ROOM_FULL_CLOSE_CODE || event.reason === "full") {
          applyRoomStatus("full");
          return;
        }

        if (event.reason === "ended" || endedRef.current) {
          setStatus((currentStatus) =>
            currentStatus === "invalid" ? currentStatus : "ended",
          );
          latestStatusRef.current = "ended";
          return;
        }

        const delay =
          RECONNECT_DELAYS_MS[
            Math.min(reconnectAttemptRef.current, RECONNECT_DELAYS_MS.length - 1)
          ];
        reconnectAttemptRef.current += 1;
        applyRoomStatus(
          event.code === 4004 || isRetryableRoomStatus(event.reason)
            ? "waiting"
            : "reconnecting",
        );
        liveReconnectRequestedRef.current = false;
        scheduleReconnect(delay);
      });

      socket.addEventListener("error", () => {
        viewerSocketAttachedRef.current = false;
        if (shouldReconnectRef.current) {
          applyRoomStatus("reconnecting");
        }
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
        const nextStatus = message.status || "waiting";
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
        viewerSocketAttachedRef.current = true;
        liveReconnectRequestedRef.current = false;
        applyRoomStatus(nextStatus);
        endedRef.current = nextStatus === "ended";
        return;
      }

      if (message.type === "status") {
        const nextStatus = message.status || "live";
        if (isRetryableRoomStatus(nextStatus)) {
          applyRoomStatus("waiting");
          return;
        }
        if (nextStatus === "full") {
          applyRoomStatus("full");
          endedRef.current = true;
          return;
        }
        applyRoomStatus(nextStatus);
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
            { splitSentences: true },
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
                { splitSentences: true },
              )
            : getPartialCaptionParts(
                message,
                `partial-${messageSequenceRef.current}`,
              );

        setActiveCaptionParts(nextActiveCaptionParts);
        applyRoomStatus("live");
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
        applyRoomStatus("live");
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

        if (isRetryableRoomStatus(message.status)) {
          applyRoomStatus("waiting");
          endedRef.current = false;
          return;
        }

        applyRoomStatus(getTerminalRoomStatus(message.status));
        endedRef.current = true;
      }
    }

    reconnectNowRef.current = () => {
      if (!shouldReconnectRef.current) {
        return;
      }

      reconnectAttemptRef.current = 0;
      window.clearTimeout(reconnectTimerRef.current);

      const socket = socketRef.current;
      if (
        socket &&
        (socket.readyState === WebSocket.CONNECTING ||
          socket.readyState === WebSocket.OPEN)
      ) {
        reconnectImmediatelyRef.current = true;
        socket.close(1000, "refreshing");
        return;
      }

      scheduleReconnect(0);
    };

    const socket = connect();

    return () => {
      shouldReconnectRef.current = false;
      window.clearTimeout(reconnectTimerRef.current);
      reconnectNowRef.current = () => {};
      const activeSocket = socketRef.current || socket;
      socketRef.current = null;
      activeSocket?.close();
    };
  }, [applyRoomStatus, code]);

  const visibleCaptionParts = useMemo(
    () => {
      const shouldHideOriginals =
        effectiveRoomMode === "translate" && hideOriginals;
      const rawParts =
        effectiveRoomMode === "translate" && activeCaptionParts.length > 0
          ? activeCaptionParts
          : [...finalizedCaptionParts, ...activeCaptionParts];
      const parts =
        effectiveRoomMode === "translate"
          ? keepLatestTranslateSentenceActive(rawParts)
          : keepLatestCaptionSentenceActive(rawParts);

      return (shouldHideOriginals
        ? parts.filter((part) => !isOriginalCaptionPart(part))
        : parts
      ).slice(-MAX_RENDERED_CAPTION_LINES);
    },
    [activeCaptionParts, effectiveRoomMode, finalizedCaptionParts, hideOriginals],
  );
  const captionFontPercent = Math.round(fontScale * 100);
  const shouldShowStatusChip = status === "live" || status === "ended";
  const emptyCaptionMessage = status === "invalid"
    ? "This live link is invalid."
    : status === "full"
      ? "This live broadcast is full."
    : status === "ended"
      ? "This live broadcast has ended."
      : status === "waiting" || status === "reconnecting" || status === "connecting"
        ? "Waiting for the presenter to start this live broadcast."
      : "Captions will appear here when speaking starts.";

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
              <p className="truncate text-sm font-semibold text-white/85">
                {liveRoomTitle}
              </p>
              <p className="mt-0.5 inline-flex max-w-full items-center gap-1.5 truncate rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-white/50">
                <span className="h-1 w-1 shrink-0 rounded-full bg-white/35" />
                Broadcast {code || "unknown"}
              </p>
            </div>
          </div>
          {shouldShowStatusChip ? (
            <div className="flex shrink-0 items-center gap-2 text-right font-mono text-xs font-medium text-white/70 md:text-sm">
              {status === "live" ? (
                <p className="inline-flex items-center gap-1.5 rounded-full border border-[#8aeb9e]/25 bg-[#8aeb9e]/10 px-2.5 py-1 text-[#8aeb9e]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8aeb9e]" />
                  LIVE
                </p>
              ) : (
                <p className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-white/60">
                  Broadcast ended
                </p>
              )}
            </div>
          ) : null}
        </div>

        <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-lg bg-black shadow-2xl ring-1 ring-white/10">
          <div className="grid min-h-0 w-full grid-rows-[minmax(0,1fr)] overflow-hidden px-5 pb-6 pt-0 text-center md:px-10 md:pb-10 md:pt-0">
            {visibleCaptionParts.length === 0 ? (
              <div className="mx-auto flex h-full max-w-2xl items-end text-xl font-bold leading-snug text-white/60 md:text-4xl">
                {emptyCaptionMessage}
              </div>
            ) : (
              <div className="relative min-h-0 overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 space-y-2 md:space-y-3 md:px-44">
                  {visibleCaptionParts.map((caption, index) => (
                    <p
                      key={caption.key}
                      className={`live-caption-text whitespace-pre-line leading-tight [overflow-wrap:anywhere] ${getCaptionWeightClassName(caption, effectiveRoomMode)} ${caption.className}`}
                      style={{
                        opacity: getCaptionOpacity(
                          visibleCaptionParts,
                          index,
                          effectiveRoomMode,
                        ),
                      }}
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
            className="absolute right-3 top-3 z-20 flex items-start gap-2 md:right-4 md:top-4"
          >
            {isFontControlOpen ? (
              <div className="absolute right-0 top-11 flex h-10 items-center gap-2 rounded-md border border-white/15 bg-neutral-950/90 px-2 shadow-xl backdrop-blur">
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
            {canShareLiveRoom ? (
              <button
                type="button"
                aria-label="Open room QR code"
                title="Open room QR code"
                onClick={() => setIsShareSheetOpen(true)}
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-md border border-white/15 bg-neutral-950/80 text-white/80 shadow-lg backdrop-blur transition hover:border-white/25 hover:bg-neutral-900 hover:text-white lg:hidden"
              >
                <Share2 size={16} strokeWidth={2.3} />
              </button>
            ) : null}
            {shouldShowMiniCaptionButton ? (
              <button
                type="button"
                aria-label={
                  miniCaptionWindow
                    ? "Focus mini captions window"
                    : "Open mini captions window"
                }
                title={
                  miniCaptionWindow
                    ? "Focus mini captions window"
                    : "Open mini captions window"
                }
                onClick={openMiniCaptionWindow}
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-md border border-white/15 bg-neutral-950/80 text-white/80 shadow-lg backdrop-blur transition hover:border-white/25 hover:bg-neutral-900 hover:text-white"
              >
                <PictureInPicture2 size={17} strokeWidth={2.3} />
              </button>
            ) : null}
            <button
              type="button"
              aria-label="Caption font size settings"
              aria-expanded={isFontControlOpen}
              title="Caption font size"
              onClick={() => setIsFontControlOpen((isOpen) => !isOpen)}
              className="h-10 w-10 cursor-pointer rounded-md border border-white/15 bg-neutral-950/80 text-sm font-bold text-white/80 shadow-lg backdrop-blur transition hover:border-white/25 hover:bg-neutral-900 hover:text-white"
            >
              Aa
            </button>
          </div>
          {canShareLiveRoom ? (
            <DesktopQrCard
              liveRoomUrl={liveRoomUrl}
              qrCodeDataUrl={qrCodeDataUrl}
              onShareClick={() => setIsShareSheetOpen(true)}
            />
          ) : null}
        </div>
      </section>
      <AnimatePresence>
        {isShareSheetOpen && canShareLiveRoom ? (
          <LiveRoomShareDialog
            code={code}
            liveRoomUrl={liveRoomUrl}
            qrCodeDataUrl={qrCodeDataUrl}
            shareFeedback={shareFeedback}
            onClose={() => setIsShareSheetOpen(false)}
            onCopy={copyLiveRoomLink}
            onShare={shareLiveRoomLink}
          />
        ) : null}
      </AnimatePresence>
      {miniCaptionRoot
        ? createPortal(
            <MiniCaptionWindowContent
              visibleCaptionParts={visibleCaptionParts}
              emptyCaptionMessage={emptyCaptionMessage}
              fontScale={fontScale}
              roomMode={effectiveRoomMode}
            />,
            miniCaptionRoot,
          )
        : null}
    </main>
  );
}

export default LiveRoomPage;
