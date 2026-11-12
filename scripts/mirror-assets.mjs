// Downloads every official photograph listed in src/data/assets.ts into
// public/media/<same path>, so production can self-host them.
// Usage: npm run mirror-assets   then build with NEXT_PUBLIC_ASSET_MODE=local
import { readFile, mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const ORIGIN = "https://www.kahanilondon.com/wp-content/uploads";
const src = await readFile(new URL("../src/data/assets.ts", import.meta.url), "utf8");
const files = [...src.matchAll(/file:\s*"([^"]+)"/g)].map((m) => m[1]);
let ok = 0, failed = [];
for (const file of files) {
  const out = path.join("public/media", file);
  try { await access(out); ok++; continue; } catch {}
  try {
    const res = await fetch(`${ORIGIN}/${file}`);
    if (!res.ok) throw new Error(String(res.status));
    await mkdir(path.dirname(out), { recursive: true });
    await writeFile(out, Buffer.from(await res.arrayBuffer()));
    ok++;
    console.log("✓", file);
  } catch (e) {
    failed.push(`${file} (${e.message})`);
  }
}
console.log(`\n${ok}/${files.length} assets in public/media`);
if (failed.length) console.log("Failed:\n  " + failed.join("\n  "));
