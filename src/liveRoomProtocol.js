export const DEFAULT_LIVE_APPEARANCE = Object.freeze({
  fontStyle: "sans",
  translationColor: "mint",
});

const FONT_STYLES = new Set(["sans", "serif"]);
const TRANSLATION_COLORS = new Set([
  "mint",
  "yellow",
  "rose",
  "accent",
  "primary",
  "teal",
  "purple",
]);
const ROW_STATES = new Set(["active", "final"]);

const TRANSLATION_COLOR_VALUES = Object.freeze({
  mint: "#8aeb9e",
  yellow: "#ffe066",
  rose: "#f5b8d9",
  accent: "#72a6e8",
  primary: "#ffffff",
  teal: "#51ffeb",
  purple: "#9b59b6",
});

const SPEAKER_PALETTE = Object.freeze([
  { family: "rose", color: "#ff9cc7" },
  { family: "teal", color: "#55d6c2" },
  { family: "purple", color: "#d0a7ff" },
  { family: "green", color: "#8fe388" },
  { family: "indigo", color: "#9bb5ff" },
]);
const SPEAKER_NEUTRAL = "#c7c7c7";

export function normalizeLiveAppearance(appearance) {
  if (!appearance || typeof appearance !== "object" || Array.isArray(appearance)) {
    return DEFAULT_LIVE_APPEARANCE;
  }

  const fontStyle = FONT_STYLES.has(appearance.fontStyle)
    ? appearance.fontStyle
    : DEFAULT_LIVE_APPEARANCE.fontStyle;
  const translationColor = TRANSLATION_COLORS.has(appearance.translationColor)
    ? appearance.translationColor
    : DEFAULT_LIVE_APPEARANCE.translationColor;

  return { fontStyle, translationColor };
}

export function getLiveFontFamily(fontStyle) {
  return fontStyle === "serif"
    ? 'ui-serif, Georgia, Cambria, "Times New Roman", serif'
    : '"Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
}

export function getTranslationColor(token) {
  return (
    TRANSLATION_COLOR_VALUES[token] ||
    TRANSLATION_COLOR_VALUES[DEFAULT_LIVE_APPEARANCE.translationColor]
  );
}

export function getSpeakerColor(token, speakerNumber) {
  if (!Number.isInteger(speakerNumber) || speakerNumber <= 1) {
    return getTranslationColor(token);
  }

  const selectedFamily = token === "accent" ? "indigo" : token === "mint" ? "green" : token;
  const index = (speakerNumber - 2) % SPEAKER_PALETTE.length;
  const excludedIndex = SPEAKER_PALETTE.findIndex(
    (entry) => entry.family === selectedFamily,
  );

  if (excludedIndex === -1) {
    return SPEAKER_PALETTE[index].color;
  }
  if (index < excludedIndex) {
    return SPEAKER_PALETTE[index].color;
  }
  if (index < SPEAKER_PALETTE.length - 1) {
    return SPEAKER_PALETTE[index + 1].color;
  }
  return SPEAKER_NEUTRAL;
}

function normalizeSpeakerNumber(speakerNumber) {
  return Number.isInteger(speakerNumber) && speakerNumber > 0
    ? speakerNumber
    : null;
}

export function normalizeStructuredRows(rows) {
  if (!Array.isArray(rows)) {
    return [];
  }

  const seenIDs = new Set();
  const normalizedRows = [];

  for (const row of rows) {
    if (
      !row ||
      typeof row !== "object" ||
      typeof row.id !== "string" ||
      !row.id ||
      seenIDs.has(row.id) ||
      typeof row.original !== "string" ||
      typeof row.translation !== "string" ||
      !ROW_STATES.has(row.state)
    ) {
      continue;
    }

    if (!row.original.trim() && !row.translation.trim()) {
      continue;
    }

    seenIDs.add(row.id);
    normalizedRows.push({
      id: row.id,
      speakerNumber: normalizeSpeakerNumber(row.speakerNumber),
      original: row.original,
      translation: row.translation,
      state: row.state,
    });
  }

  return normalizedRows;
}

export function getStructuredMessageRows(message) {
  if (!message || !Object.hasOwn(message, "rows")) {
    return null;
  }

  return normalizeStructuredRows(message.rows);
}

export function getStructuredRowKey(row) {
  return row.id;
}
