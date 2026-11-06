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
const AUDIENCE_CAPTION_HOLD_MS = 500;

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

export function getRoomTitle(statusPayload) {
  const title = statusPayload?.title;
  return typeof title === "string" ? title.trim() || null : null;
}

export function getRoomLogoUrl(statusPayload, statusUrl) {
  const { status, logoVersion } = statusPayload ?? {};
  if ((status !== "waiting" && status !== "live") ||
      typeof logoVersion !== "string" || !/^[a-f0-9]{64}$/.test(logoVersion)) {
    return null;
  }
  return statusUrl.replace(/\/status$/, "/logo/" + logoVersion);
}

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

const CAPTION_LANGUAGE_CODE = /^[a-z]{2,3}(?:-[a-z]{4})?(?:-(?:[a-z]{2}|[0-9]{3}))?$/i;

export function getTargetLanguages(value) {
  if (!Array.isArray(value) || value.length < 2 || value.length > 5 ||
      !value.every((code) => typeof code === "string" &&
        CAPTION_LANGUAGE_CODE.test(code) && code.toLowerCase() !== "und") ||
      new Set(value.map((code) => code.toLowerCase())).size !== value.length) return [];
  return value;
}

export function resolveCaptionLanguage(languages, selection, roomMode, hideOriginals) {
  if (roomMode !== "translate" || languages.length < 2) return null;
  if (languages.includes(selection) || (selection === "original" && !hideOriginals)) return selection;
  return languages[0];
}

export function upsertAudienceCaption(rows, event) {
  const { sentenceId, revision, original, speakerNumber, state, translations } = event ?? {};
  if (!Number.isSafeInteger(sentenceId) || sentenceId < 0 ||
      !Number.isSafeInteger(revision) || revision < 1 ||
      typeof original !== "string" || !original.trim() ||
      !["pending", "translated", "unavailable"].includes(state)) return rows;

  const index = rows.findIndex((row) => row.sentenceId === sentenceId);
  const previous = rows[index];
  if (previous && (revision < previous.revision ||
      (revision === previous.revision && (previous.state !== "pending" || state === "pending")))) return rows;

  const next = rows.filter((row) => row.sentenceId !== sentenceId);
  next.push({ sentenceId, revision, original, speakerNumber: normalizeSpeakerNumber(speakerNumber), state, translations });
  return next.sort((first, second) => first.sentenceId - second.sentenceId).slice(-10);
}

function getAudienceTranslation(row, language) {
  const text = row?.state === "translated" && row.translations?.[language];
  return typeof text === "string" && text.trim() ? text : "";
}

export function getAudienceCaptionRows(rows, language, hideOriginals, structuredRows = null) {
  if (!hideOriginals && structuredRows !== null) {
    const audienceByID = new Map(rows.map((row) => [`sentence-${row.sentenceId}`, row]));

    return structuredRows.flatMap((row) => {
      const audience = audienceByID.get(row.id);
      if (audience?.original.trim() !== row.original.trim()) return [];

      const translation = getAudienceTranslation(audience, language);
      return translation ? [{ ...row, translation, language }] : [];
    });
  }

  return rows.flatMap((row) => {
    const translation = getAudienceTranslation(row, language);
    if (!translation) return [];

    return [{
      id: "sentence-" + row.sentenceId,
      speakerNumber: row.speakerNumber,
      original: hideOriginals ? "" : row.original,
      translation,
      language,
      state: "final",
    }];
  });
}

export function getAudienceTranscriptRows(structuredRows, legacyCaptionParts, translatedRows) {
  if (structuredRows !== null) {
    const translatedByID = new Map(translatedRows.map((row) => [row.id, row]));
    return structuredRows
      .filter((row) => row.original.trim())
      .map((row) => translatedByID.get(row.id) ?? { ...row, translation: "" });
  }

  const latest = legacyCaptionParts.findLast(
    ({ role, text }) => role === "caption-active" && text.trim(),
  );
  if (!latest || latest.text.trim() === translatedRows.at(-1)?.original.trim()) {
    return translatedRows;
  }
  return [...translatedRows, {
    id: `legacy-${latest.key}`, original: latest.text, translation: "", state: "active",
  }];
}

export function getMiniAudienceCaptionRows(rows) {
  const latest = rows.at(-1);
  if (!latest) return [];
  if (latest.translation) return [latest];

  const latestTranslated = rows.findLast((row) => row.translation);
  return latestTranslated ? [latestTranslated, latest] : [latest];
}

export function advanceAudienceCaptionPresentation(presentation, rows, language, now) {
  if (presentation.language !== language) {
    return {
      language,
      shownIDs: new Set(rows.map((row) => row.id)),
      nextRowAt: rows.length ? now + AUDIENCE_CAPTION_HOLD_MS : 0,
    };
  }

  if (now < presentation.nextRowAt) return presentation;
  const nextRow = rows.find((row) => !presentation.shownIDs.has(row.id));
  if (!nextRow) return presentation;

  const shownIDs = new Set(rows
    .filter((row) => presentation.shownIDs.has(row.id))
    .map((row) => row.id));
  shownIDs.add(nextRow.id);

  return { language, shownIDs, nextRowAt: now + AUDIENCE_CAPTION_HOLD_MS };
}
