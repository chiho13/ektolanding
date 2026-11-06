import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_LIVE_APPEARANCE,
  advanceAudienceCaptionPresentation,
  getAudienceCaptionRows,
  getLiveFontFamily,
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

test("secondary captions without structured rows wait for the selected translation", () => {
  const pending = { sentenceId: 10, revision: 2, original: "Hello again", state: "pending" };
  const rows = upsertAudienceCaption([], pending);
  assert.deepEqual(getAudienceCaptionRows(rows, "es", false), []);
  assert.deepEqual(getAudienceCaptionRows(rows, "es", true), []);
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
  assert.deepEqual(getAudienceCaptionRows(result, "ja", false), []);
  const unavailable = upsertAudienceCaption(rows, { ...pending, state: "unavailable" });
  assert.deepEqual(getAudienceCaptionRows(unavailable, "es", false), []);
  assert.deepEqual(getAudienceCaptionRows(unavailable, "es", true), []);
});

test("secondary and tertiary captions advance only when their own translation arrives", () => {
  const first = makeRow({ original: " Hello ", state: "final" });
  const active = makeRow({
    id: "sentence-43", original: "Next sentence", translation: "Phrase suivante", speakerNumber: 3,
  });
  const structured = [first, active];
  const previous = {
    sentenceId: 42, revision: 1, original: "Hello",
    state: "translated", translations: { es: "Hola", ja: "こんにちは" },
  };
  const pending = { sentenceId: 43, revision: 1, original: "Next sentence", state: "pending" };

  assert.deepEqual(getAudienceCaptionRows([], "es", false, structured), []);
  const audience = upsertAudienceCaption([previous], pending);
  assert.deepEqual(
    getAudienceCaptionRows(audience, "es", false, structured),
    [{ ...first, translation: "Hola", language: "es" }],
  );

  const translated = upsertAudienceCaption(audience, {
    ...pending, state: "translated", translations: { es: "Siguiente frase" },
  });
  const visible = getAudienceCaptionRows(translated, "es", false, structured);
  assert.deepEqual(visible.map(getStructuredRowKey), structured.map(getStructuredRowKey));
  assert.deepEqual(visible[1], { ...active, translation: "Siguiente frase", language: "es" });
  assert.deepEqual(
    getAudienceCaptionRows(translated, "ja", false, structured),
    [{ ...first, translation: "こんにちは", language: "ja" }],
  );
  assert.deepEqual(getAudienceCaptionRows(translated, "es", false, []), []);
});

test("secondary translations wait for the matching source revision", () => {
  const pending = { sentenceId: 42, revision: 1, original: "Hello", state: "pending" };
  const older = { ...pending, state: "translated", translations: { es: "Hola" } };
  const corrected = makeRow({ original: "Hello again" });
  const revised = { ...pending, revision: 2, original: corrected.original };
  let audience = upsertAudienceCaption([], older);

  assert.deepEqual(getAudienceCaptionRows(audience, "es", false, [corrected]), []);
  audience = upsertAudienceCaption(audience, revised);
  assert.equal(upsertAudienceCaption(audience, older), audience);
  audience = upsertAudienceCaption(audience, {
    ...revised, state: "translated", translations: { es: "Hola de nuevo" },
  });
  assert.equal(getAudienceCaptionRows(audience, "es", false, [corrected])[0].translation, "Hola de nuevo");
  const sameTextDifferentSentence = { ...corrected, id: "sentence-43" };
  assert.deepEqual(getAudienceCaptionRows(audience, "es", false, [sameTextDifferentSentence]), []);
});

test("a missing secondary translation produces no row when structured originals are available", () => {
  const structured = [makeRow()];
  const pending = { sentenceId: 42, revision: 1, original: "Hello", state: "pending" };
  const unavailable = upsertAudienceCaption([], { ...pending, state: "unavailable" });
  assert.deepEqual(getAudienceCaptionRows(unavailable, "es", false, structured), []);
  assert.deepEqual(getAudienceCaptionRows(unavailable, "es", true, structured), []);
});

test("additional languages show ready rows one at a time with a 500 ms hold", () => {
  const initial = { language: "es", shownIDs: new Set(), nextRowAt: 0 };
  const first = makeRow({ id: "sentence-1" });
  const second = makeRow({ id: "sentence-2" });
  const third = makeRow({ id: "sentence-3" });

  const firstShown = advanceAudienceCaptionPresentation(initial, [first], "es", 100);
  assert.deepEqual([...firstShown.shownIDs], [first.id]);
  const burst = [first, second, third];
  assert.equal(advanceAudienceCaptionPresentation(firstShown, burst, "es", 599), firstShown);

  const secondShown = advanceAudienceCaptionPresentation(firstShown, burst, "es", 600);
  assert.deepEqual([...secondShown.shownIDs], [first.id, second.id]);
  assert.equal(advanceAudienceCaptionPresentation(secondShown, burst, "es", 1099), secondShown);

  const thirdShown = advanceAudienceCaptionPresentation(secondShown, burst, "es", 1100);
  assert.deepEqual([...thirdShown.shownIDs], [first.id, second.id, third.id]);
});

test("switching audience languages shows their available history and resets the hold", () => {
  const first = makeRow({ id: "sentence-1" });
  const second = makeRow({ id: "sentence-2" });
  const third = makeRow({ id: "sentence-3" });
  const previous = { language: "es", shownIDs: new Set([first.id]), nextRowAt: 500 };
  const switched = advanceAudienceCaptionPresentation(previous, [first, second], "ja", 200);
  assert.deepEqual([...switched.shownIDs], [first.id, second.id]);
  assert.equal(advanceAudienceCaptionPresentation(switched, [first, second, third], "ja", 699), switched);
  assert.equal(advanceAudienceCaptionPresentation(switched, [first, second, third], "ja", 700)
    .shownIDs.has(third.id), true);
});

test("audience row IDs survive toggling originals without restarting the hold", () => {
  const original = makeRow();
  const audience = [{
    sentenceId: 42, revision: 1, original: original.original,
    state: "translated", translations: { es: "Hola" },
  }];
  const paired = getAudienceCaptionRows(audience, "es", false, [original]);
  const translationOnly = getAudienceCaptionRows(audience, "es", true, [original]);
  const initial = { language: "es", shownIDs: new Set(), nextRowAt: 0 };
  const shown = advanceAudienceCaptionPresentation(initial, paired, "es", 100);

  assert.equal(translationOnly[0].original, "");
  assert.equal(translationOnly[0].id, paired[0].id);
  assert.equal(advanceAudienceCaptionPresentation(shown, translationOnly, "es", 200), shown);
});
