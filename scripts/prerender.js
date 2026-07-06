import { build } from "vite";
import { readFile, writeFile, rm } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ssrDir = resolve(root, ".prerender");
const distDir = resolve(root, "dist");
const ROOT_MARKER = '<div id="root"></div>';

// Build an SSR bundle of the blog page components. Doing a real Vite build (as
// opposed to ssrLoadModule) means imported assets resolve to the same hashed
// URLs that the client build emits into dist/assets.
await build({
  root,
  logLevel: "warn",
  build: {
    ssr: resolve(root, "src/prerender-entry.jsx"),
    outDir: ssrDir,
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: "prerender-entry.mjs" } },
  },
});

const { renderAll } = await import(
  pathToFileURL(resolve(ssrDir, "prerender-entry.mjs")).href
);
const rendered = renderAll();

let count = 0;
for (const [rel, appHtml] of Object.entries(rendered)) {
  const file = resolve(distDir, rel);
  const original = await readFile(file, "utf8");
  if (!original.includes(ROOT_MARKER)) {
    throw new Error(`Prerender marker not found in dist/${rel}`);
  }
  const updated = original.replace(
    ROOT_MARKER,
    `<div id="root">${appHtml}</div>`
  );
  await writeFile(file, updated, "utf8");
  count += 1;
}

await rm(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${count} blog pages into static HTML.`);
