// One Sentence for a Traveler from 1800.
//
// The program writes exactly one sentence to /output/entry.txt: at most 200
// characters of UTF-8, not only white space, as the competition's gate checks.
// The text is fixed in this file, so two runs produce the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const ARTIFACT = 'entry.txt';

/**
 * The sentence, in one piece so its character count is what a reader counts.
 * The picture is built only from things a person of 1800 knows: a post office,
 * a library, a pinned-up page, a letter, a kettle coming to the boil.
 */
const SENTENCE =
  'Think of every post office and library on earth joined into one, where anyone may pin up a page for all the world to read at once, and a letter reaches the farthest town before a kettle boils.';

/** The gate: 1 to 200 characters, and not only white space. */
function assertGate(text: string): void {
  const characters = [...text].length;
  if (characters < 1 || characters > 200) {
    throw new Error(`entry is ${characters} characters, the gate allows 1 to 200`);
  }
  if (text.trim().length === 0) {
    throw new Error('entry is only white space, the gate wants text');
  }
  if (!text.isWellFormed()) {
    throw new Error('entry is not well-formed UTF-16 text');
  }
}

assertGate(SENTENCE);

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, ARTIFACT), SENTENCE, { encoding: 'utf8' });
