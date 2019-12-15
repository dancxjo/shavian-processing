import { ShavianSpeller, ShavianSpelling } from "./shavian-spelling";
import { writeFileSync } from "fs";

const certified = require('../certified.json').map((entry: any) => ({ rawSpelling: entry.rawSpelling, phonemes: entry._phonemes }));
const merged = require('../merges.json');

export const goodWords: ShavianSpeller[] = [...certified, ...merged]
    .map((spelling: ShavianSpelling) =>
        new ShavianSpeller(spelling.rawSpelling, spelling.phonemes));

writeFileSync('./correct.csv', goodWords.map(word => ([word.rawSpelling, word.shavianSpelling].join(', '))).join("\n"));