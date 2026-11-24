import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// The robot vacuum's best excuse: one line, at most 140 characters.
// The entry text lives next to this script; the grader runs us from any
// working directory, so resolve the source file relative to this file.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const entryPath = join(scriptDir, "entry.txt");
const entryText = readFileSync(entryPath, "utf8");

// Guard: exactly one line, 1-140 characters, no trailing newline.
// Checked in two steps so a too-long entry and a multi-line entry fail
// with distinct, readable errors.
const MAX_ENTRY_CHARS = 140;
if (entryText.length < 1 || entryText.length > MAX_ENTRY_CHARS) {
  throw new Error(
    `entry must be 1-${MAX_ENTRY_CHARS} characters, got ${entryText.length}`,
  );
}
const lineCount = entryText.split("\n").length;
if (lineCount !== 1) {
  throw new Error(`entry must be exactly one line, got ${lineCount}`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), entryText);
