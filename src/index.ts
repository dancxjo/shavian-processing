import { CmuFormatDictionary } from "./cmu-format-dictionary";
import { writeFileSync } from "fs";
import { CmuFormatDictionaryEntry } from "./cmu-format-dictionary-entry";

const ga = new CmuFormatDictionary();
ga.readFromFile('./res/us');

const rp = new CmuFormatDictionary();
rp.readFromFile('./res/rp');

const differences: { rp: CmuFormatDictionaryEntry; ga: CmuFormatDictionaryEntry }[] = [];
const rpOnly: CmuFormatDictionaryEntry[] = [];

const exactDuplicates = rp.entries.filter(rpEntry => {
    const gaCandidates = ga.findBySpelling(rpEntry.rawSpelling);
    if (gaCandidates.length == 0) {
        rpOnly.push(rpEntry);
        return false;
    }
    for (const candidate of gaCandidates) {
        if (candidate.matches(rpEntry)) {
            return true;
        }
        differences.push({ rp: rpEntry, ga: candidate });
    }
});

console.log(`RP: ${rp.entries.length}, US: ${ga.entries.length}, Exact Dups: ${exactDuplicates.length}`);
writeFileSync('./differences.json', JSON.stringify(differences));
writeFileSync('./rponly.json', JSON.stringify(rpOnly));