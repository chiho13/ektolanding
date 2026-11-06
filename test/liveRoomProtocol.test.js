import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_LIVE_APPEARANCE,
  getAudienceCaptionRows,
  getLiveFontFamily,
  getMiniAudienceCaptionRows,
  getRoomLogoUrl,
  getRoomTitle,
  getSpeakerColor,
  getStructuredMessageRows,
  getStructuredRowKey,
  getTargetLanguages,
  getTranslationColor,
  normalizeLiveAppearance,
  normalizeStructuredRows,
  resolveCaptionLanguage,
  upsertAudienceCaption,
} from "../src/liveRoomProtocol.js";

test("status payloads can add or clear a title and support older relays", () => {
  assert.equal(getRoomTitle({ status: "waiting", title: "  春の講演  " }), "春の講演");
  assert.equal(getRoomTitle({ status: "live", title: "New title" }), "New title");
  assert.equal(getRoomTitle({ status: "live", title: null }), null);
  assert.equal(getRoomTitle({ status: "live", title: "  " }), null);
  assert.equal(getRoomTitle({ status: "live" }), null);
  assert.equal(getRoomTitle({ status: "live", title: 42 }), null);
});

test("waiting and live status can add, replace, or clear the viewer logo", () => {
  const statusUrl = "https://broadcast.voicetranslate.app/rooms/DEMO24/status";
  const firstVersion = "a".repeat(64);
  const replacement = "b".repeat(64);
  assert.equal(
    getRoomLogoUrl({ status: "waiting", logoVersion: firstVersion }, statusUrl),
    statusUrl.replace("/status", "/logo/" + firstVersion)
  );
  assert.equal(
    getRoomLogoUrl({ status: "live", logoVersion: replacement }, statusUrl),
    statusUrl.replace("/status", "/logo/" + replacement)
  );
  assert.equal(getRoomLogoUrl({ status: "live" }, statusUrl), null);
  assert.equal(getRoomLogoUrl({ status: "ended", logoVersion: replacement }, statusUrl), null);
  assert.equal(getRoomLogoUrl({ status: "expired", logoVersion: replacement }, statusUrl), null);
  assert.equal(getRoomLogoUrl({ status: "live", logoVersion: "https://other.test/image.png" }, statusUrl), null);
  assert.equal(
    getRoomLogoUrl({ status: "live", logoVersion: replacement }, "/api/rooms/DEMO24/status"),
    "/api/rooms/DEMO24/logo/" + replacement
  );
});

function makeRow(overrides = {}) {
  return {
    id: "sentence-42",
    speakerNumber: 2,
    original: "Hello",
    translation: "Bonjour",
    state: "active",
    ...overrides,
  };
}

test("missing appearance preserves the released sans and mint defaults", () => {
  assert.deepEqual(normalizeLiveAppearance(undefined), DEFAULT_LIVE_APPEARANCE);
  assert.deepEqual(
    normalizeLiveAppearance({ fontStyle: "unknown", translationColor: "unknown" }),
    DEFAULT_LIVE_APPEARANCE,
  );
  assert.match(getLiveFontFamily("sans"), /Poppins/);
  assert.match(getLiveFontFamily("serif"), /Georgia/);
  assert.equal(getTranslationColor("mint"), "#8aeb9e");
});

test("absent rows remain distinguishable from an intentional structured clear", () => {
  assert.equal(getStructuredMessageRows({ type: "partial", text: "legacy" }), null);
  assert.deepEqual(getStructuredMessageRows({ type: "partial", rows: [] }), []);
});

test("structured rows retain stable IDs and separate speaker metadata", () => {
  const rows = normalizeStructuredRows([makeRow()]);
  assert.equal(rows[0].id, "sentence-42");
  assert.equal(rows[0].speakerNumber, 2);
  assert.equal(rows[0].original, "Hello");
  assert.equal(rows[0].original.includes("Speaker"), false);

  const updatedRow = makeRow({ original: "Hello again", translation: "Salut" });
  assert.equal(getStructuredRowKey(rows[0]), getStructuredRowKey(updatedRow));
});

test("malformed and duplicate structured rows are discarded defensively", () => {
  const rows = normalizeStructuredRows([
    makeRow(),
    makeRow({ translation: "duplicate" }),
    makeRow({ id: "sentence-43", original: "", translation: "" }),
    makeRow({ id: "sentence-44", state: "history" }),
  ]);
  assert.deepEqual(rows, [makeRow()]);
});

test("speaker colors mirror the app dark palette and avoid the selected family", () => {
  assert.equal(getSpeakerColor("mint", null), "#8aeb9e");
  assert.equal(getSpeakerColor("mint", 1), "#8aeb9e");
  assert.equal(getSpeakerColor("mint", 2), "#ff9cc7");
  assert.equal(getSpeakerColor("mint", 5), "#9bb5ff");
  assert.equal(getSpeakerColor("mint", 6), "#c7c7c7");
  assert.equal(getSpeakerColor("accent", 6), "#c7c7c7");
});

test("the language picker requires at least two distinct translated targets in Translate mode", () => {
  for (const value of [undefined, [], ["fr"], ["fr", "FR"], ["fr", "original"]]) {
    assert.equal(resolveCaptionLanguage(getTargetLanguages(value), null, "translate", false), null);
  }
  const languages = getTargetLanguages(["fr", "es", "ja", "de", "zh-Hant"]);
  assert.equal(resolveCaptionLanguage(languages, null, "captions", false), null);
  assert.equal(resolveCaptionLanguage(languages, null, "translate", false), "fr");
  assert.equal(resolveCaptionLanguage(languages, "es", "translate", false), "es");
  assert.equal(resolveCaptionLanguage(languages, "it", "translate", false), "fr");
  assert.equal(resolveCaptionLanguage(languages, "original", "translate", false), "original");
  assert.equal(resolveCaptionLanguage(languages, "original", "translate", true), "fr");
});

test("secondary captions update in place and fall back only when originals are visible", () => {
  const pending = { sentenceId: 10, revision: 2, original: "Hello again", state: "pending" };
  const rows = upsertAudienceCaption([], pending);
  const [pendingOriginal] = getAudienceCaptionRows(rows, "es", false);
  assert.equal(pendingOriginal.original, "Hello again");
  assert.equal(pendingOriginal.translation, "");
  assert.equal(upsertAudienceCaption(rows, {
    ...pending, revision: 1, state: "translated", translations: { es: "Hola" },
  }), rows);
  const result = upsertAudienceCaption(rows, {
    ...pending, state: "translated", translations: { es: "Hola de nuevo" },
  });
  const paired = getAudienceCaptionRows(result, "es", false)[0];
  assert.equal(paired.original, "Hello again");
  assert.equal(paired.translation, "Hola de nuevo");
  const translationOnly = getAudienceCaptionRows(result, "es", true)[0];
  assert.equal(translationOnly.original, "");
  assert.equal(translationOnly.translation, "Hola de nuevo");
  const fallback = upsertAudienceCaption(rows, { ...pending, state: "unavailable" });
  assert.equal(getAudienceCaptionRows(fallback, "es", false)[0].original, "Hello again");
  assert.equal(getAudienceCaptionRows(fallback, "es", true)[0].original, "");
  assert.equal(getAudienceCaptionRows(fallback, "es", true)[0].translation, "Translation unavailable");
});

test("secondary viewers receive live originals from frames without structured rows", () => {
  const pending = { sentenceId: 42, revision: 1, original: "Hello", state: "pending" };
  const audience = upsertAudienceCaption([], pending);
  const parts = [
    { key: "previous", role: "caption-history", text: "Previous" },
    { key: "same", role: "caption-active", text: " Hello " },
    { key: "current", role: "caption-active", text: "Next sentence" },
    { key: "primary", role: "translation-active", text: "Phrase suivante" },
  ];

  assert.deepEqual(
    getAudienceCaptionRows([], "es", false, null, parts).map((row) => row.original),
    [" Hello ", "Next sentence"],
  );
  assert.deepEqual(
    getAudienceCaptionRows(audience, "es", false, null, parts)
      .map(({ original, translation, state }) => [original, translation, state]),
    [["Hello", "", "final"], ["Next sentence", "", "active"]],
  );
  assert.deepEqual(getAudienceCaptionRows(audience, "es", true, null, parts), []);
});

test("secondary language keeps live originals and adds late translations to the matching row", () => {
  const first = makeRow({ original: " Hello ", state: "final" });
  const active = makeRow({ id: "sentence-43", original: "Next sentence", speakerNumber: 3 });
  const structured = [first, active];
  const pending = { sentenceId: 42, revision: 1, original: "Hello", state: "pending" };

  for (const audience of [[], upsertAudienceCaption([], pending)]) {
    const visible = getAudienceCaptionRows(audience, "es", false, structured);
    assert.deepEqual(visible.map(({ translation }) => translation), ["", ""]);
    assert.deepEqual(visible.map(({ original }) => original), [" Hello ", "Next sentence"]);
    assert.equal(visible[1].state, "active");
    assert.equal(visible[1].speakerNumber, 3);
  }

  const translated = upsertAudienceCaption([pending], {
    ...pending, state: "translated", translations: { es: "Hola", ja: "こんにちは" },
  });
  const visible = getAudienceCaptionRows(translated, "es", false, structured);
  assert.deepEqual(visible.map(getStructuredRowKey), structured.map(getStructuredRowKey));
  assert.deepEqual(visible.map(({ translation }) => translation), ["Hola", ""]);
  assert.equal(visible[0].language, "es");
  assert.equal(getAudienceCaptionRows(translated, "ja", false, structured)[0].translation, "こんにちは");
  assert.deepEqual(getAudienceCaptionRows(translated, "es", false, []), []);
});

test("secondary translations wait for the matching source revision", () => {
  const pending = { sentenceId: 42, revision: 1, original: "Hello", state: "pending" };
  const older = { ...pending, state: "translated", translations: { es: "Hola" } };
  const corrected = makeRow({ original: "Hello again" });
  const revised = { ...pending, revision: 2, original: corrected.original };
  let audience = upsertAudienceCaption([], older);

  assert.equal(getAudienceCaptionRows(audience, "es", false, [corrected])[0].translation, "");
  audience = upsertAudienceCaption(audience, revised);
  assert.equal(upsertAudienceCaption(audience, older), audience);
  audience = upsertAudienceCaption(audience, {
    ...revised, state: "translated", translations: { es: "Hola de nuevo" },
  });
  assert.equal(getAudienceCaptionRows(audience, "es", false, [corrected])[0].translation, "Hola de nuevo");
  const sameTextDifferentSentence = { ...corrected, id: "sentence-43" };
  assert.equal(getAudienceCaptionRows(audience, "es", false, [sameTextDifferentSentence])[0].translation, "");
});

test("secondary captions respect hide originals while a translation is pending or unavailable", () => {
  const structured = [makeRow()];
  const pending = { sentenceId: 42, revision: 1, original: "Hello", state: "pending" };
  const audience = upsertAudienceCaption([], pending);
  assert.deepEqual(getAudienceCaptionRows(audience, "es", true, structured), []);

  const failed = upsertAudienceCaption(audience, { ...pending, state: "unavailable" });
  const [hidden] = getAudienceCaptionRows(failed, "es", true, structured);
  assert.equal(hidden.original, "");
  assert.equal(hidden.translation, "Translation unavailable");
  const [visible] = getAudienceCaptionRows(failed, "es", false, structured);
  assert.equal(visible.original, "Hello");
  assert.equal(visible.translation, "");
});

test("mini captions keep the latest translated pair above the newest original", () => {
  const translated = makeRow({ translation: "Hola", state: "final" });
  const pending = makeRow({ id: "sentence-43", translation: "", state: "final" });
  const active = makeRow({ id: "sentence-44", translation: "" });
  assert.deepEqual(getMiniAudienceCaptionRows([]), []);
  assert.deepEqual(getMiniAudienceCaptionRows([pending, active]), [active]);
  assert.deepEqual(getMiniAudienceCaptionRows([translated, pending, active]), [translated, active]);
  const ready = { ...active, translation: "Adiós" };
  assert.deepEqual(getMiniAudienceCaptionRows([translated, pending, ready]), [ready]);
});
