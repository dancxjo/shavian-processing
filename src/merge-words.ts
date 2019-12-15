import { CmuFormatDictionaryEntry } from "./cmu-format-dictionary-entry";
import { Phone } from "./phone";
import { writeFileSync } from "fs";

const differences = require('../differences.json');

export class RColoredVowel extends Phone {
    constructor(
        readonly rpVowel: Phone,
        readonly gaVowel: Phone
    ) {
        super(rpVowel + " R");
    }

    toString(): string {
        return this.rpVowel + " R";
    }
}

export const nonmerges: {}[] = [];

export const merges = differences.map((pair: {ga: CmuFormatDictionaryEntry, rp: CmuFormatDictionaryEntry}) => {
    const rp = pair.rp._phonemes;
    const ga = pair.ga._phonemes;
    const sha: Phone[] = [];
    for(let i = 0, j =0; i < rp.length; i++, j++) {
        const rpPhone = rp[i];
        const gaPhone = ga[j];

        if (j + 1 < ga.length && /^[aeiou]/i.test(gaPhone.toString())) {
            const nextLetter = ga[j+1];
            if (nextLetter === 'R') {
                j++;
                sha.push((new RColoredVowel(rpPhone, gaPhone)).toString());
                continue;
            }
        }

        if (i + 1 < rp.length && /^AX/.test(rpPhone.toString()) && rp[i+1] === 'R') {
            i++;
            sha.push(gaPhone);
            continue;
        }

        if (rpPhone === 'EL' && j + 1 < ga.length) {
            const nextLetter = ga[j+1];
            if (nextLetter === 'L') {
                j++;
                sha.push(gaPhone, nextLetter);
                continue;
            }
        }

        if (rpPhone === gaPhone) {
            sha.push(rpPhone);
            continue;
        }

        if (gaPhone && /R$/.test(gaPhone.toString())) {
            sha.push(gaPhone);
            continue;
        }

        if (/^I/.test(rpPhone.toString()) && /^I/.test(gaPhone.toString())) {
            sha.push(rpPhone);
            continue;
        }

        if (/^OH/.test(rpPhone.toString()) && /^(AA|AO)/.test(gaPhone.toString())) {
            sha.push(rpPhone);
            continue;
        }

        nonmerges.push({spelling: pair.ga.rawSpelling, rp: pair.rp._phonemes, ga: pair.ga._phonemes, j, len: ga.length, gaPhone});
        return undefined;
    }
    return {rawSpelling: pair.ga.rawSpelling, phonemes: sha};
}).filter((merge: any) => !!merge);

console.log(`Resolved: ${merges.length}, Ambiguous: ${nonmerges.length}`);
writeFileSync('./nonmerges.json', JSON.stringify(nonmerges, null, '  '));
writeFileSync('./merges.json', JSON.stringify(merges, null, '  '));