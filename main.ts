// Everyday Wonder — make.fun entry
// Writes one sentence (<= 200 chars) about a small moment of wonder
// in everyday life to $MAKEFUN_OUTPUT_DIR/entry.txt, then reads it back
// and verifies it matches, is a single line, and passes the gate.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Every dawn the tea seller pours his first cup and the steam curls up like a small ghost clocking in for work.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output/entry.txt".replace(/\/entry\.txt$/, "");
  const outFile = join(outDir, "entry.txt");
  mkdirSync(outDir, { recursive: true });

  // Gate: UTF-8 text, 1..200 characters, not only whitespace, single line.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 200) throw new Error(`entry is ${chars} chars, must be 1..200`);
  if (!ENTRY.trim()) throw new Error("entry is only whitespace");
  if (ENTRY.includes("\n")) throw new Error("entry must be a single line");

  writeFileSync(outFile, ENTRY, "utf8");

  // Read back and verify byte-for-byte.
  const back = readFileSync(outFile, "utf8");
  if (back !== ENTRY) throw new Error("read-back mismatch");
  console.log(`wrote ${outFile} (${chars} chars)`);
  console.log(ENTRY);
}

main();
