import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_LIVE_APPEARANCE,
  getLiveFontFamily,
  getSpeakerColor,
  getStructuredMessageRows,
  getStructuredRowKey,
  getTranslationColor,
  normalizeLiveAppearance,
  normalizeStructuredRows,
} from "../src/liveRoomProtocol.js";

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
