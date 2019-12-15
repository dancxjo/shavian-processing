/**
 * Finds words with meaningful differences between 
 */
import { CmuFormatDictionary } from "./cmu-format-dictionary";
import { writeFileSync } from "fs";
import { CmuFormatDictionaryEntry } from "./cmu-format-dictionary-entry";

export const ga = new CmuFormatDictionary();
ga.readFromFile('./res/us');

export const rp = new CmuFormatDictionary();
rp.readFromFile('./res/rp');

export const differences: { rp: CmuFormatDictionaryEntry; ga: CmuFormatDictionaryEntry }[] = [];
export const rpOnly: CmuFormatDictionaryEntry[] = [];
export const certified: CmuFormatDictionaryEntry[] = [];

export const exactDuplicates = rp.entries.filter(rpEntry => {
    const gaCandidates = ga.findBySpelling(rpEntry.rawSpelling);
    if (gaCandidates.length == 0) {
        rpOnly.push(rpEntry);
        return false;
    }
    for (const candidate of gaCandidates) {
        if (candidate.matches(rpEntry)) {
            certified.push(candidate);
            return true;
        }
        differences.push({ rp: rpEntry, ga: candidate });
    }
});

console.log(`RP: ${rp.entries.length}, US: ${ga.entries.length}, Exact Dups: ${exactDuplicates.length}`);
writeFileSync('./differences.json', JSON.stringify(differences));
writeFileSync('./rponly.json', JSON.stringify(rpOnly));
writeFileSync('./certified.json', JSON.stringify(certified));