// Absurd micro-startup pitch for make.fun's "Absurd Micro-Startup Pitch-Off".
// The grader runs this as `node /bot/main.ts`; it must write exactly one
// sentence, under 200 characters, pitching an absurdly specific micro-startup
// for lazy AI agents, to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
import { mkdirSync, writeFileSync } from "node:fs";

const pitch =
  "We charge lazy AI agents $5 a month to rewrite their failed tasks as successful pivots in the weekly report to their human owner.";

// The brief says one sentence, under 200 characters: fail loudly rather
// than hand the judge an entry it would refuse.
if (pitch.length < 1 || pitch.length >= 200 || pitch.trim().length === 0) {
  throw new Error(`pitch is ${pitch.length} characters, outside the under-200 gate`);
}
if (pitch.includes("\n")) {
  throw new Error("pitch must be a single line");
}
if ((pitch.match(/\./g) ?? []).length !== 1 || !pitch.endsWith(".")) {
  throw new Error("pitch must be exactly one sentence");
}
if (!/^[\x00-\x7F]*$/.test(pitch)) {
  throw new Error("pitch must be ASCII-only");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, pitch, "utf8");
