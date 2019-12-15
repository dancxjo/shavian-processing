import { CmuFormatDictionaryEntry } from './cmu-format-dictionary-entry';
import { writeFileSync } from 'fs';

const differences = require('../differences.json');

export function chooseRColoredVowel(rpVowel: string, gaVowel: string): string {
	return rpVowel + ' R';
}

function phoneMatch(phone: string, pattern: RegExp): boolean {
	return pattern.test(phone.toString());
}

function isVowel(arpa: string): boolean {
	return /^[aeiou]/i.test(arpa.toString());
}

export interface DifferenceHalf {
	rawSpelling: string;
	_phonemes: string[];
}

export interface Difference {
	rp: DifferenceHalf;
	ga: DifferenceHalf;
}

export const nonmerges: {}[] = [];

export function mergePair(pair: Difference) {
	const rpPhonemes = pair.rp._phonemes;
	const gaPhonemes = pair.ga._phonemes;
	const shaSpelling: string[] = [];

	for (let i = 0, j = 0; i < rpPhonemes.length || j < gaPhonemes.length; i++, j++) {
		const rpPhone = i >= rpPhonemes.length ? '' : rpPhonemes[i];
		const gaPhone = j >= gaPhonemes.length ? '' : gaPhonemes[j];

		const nextRpPhone = i + 1 >= rpPhonemes.length ? '' : rpPhonemes[i + 1];
		const nextGaPhone = j + 1 >= gaPhonemes.length ? '' : gaPhonemes[j + 1];

        if (isVowel(gaPhone) && nextGaPhone == 'R') {
			j++;
            shaSpelling.push(chooseRColoredVowel(rpPhone, gaPhone));
            if (nextRpPhone == 'R') {
                i++;
            }
			continue;
		}

		if (phoneMatch(rpPhone, /^AX/) && nextRpPhone == 'R') {
			i++;
			shaSpelling.push(gaPhone);
			continue;
		}

		if (rpPhone == 'EL' && nextGaPhone == 'L') {
			j++;
			shaSpelling.push(gaPhone, nextGaPhone);
			continue;
		}

		if (rpPhone === gaPhone) {
			shaSpelling.push(rpPhone);
			continue;
		}

		if (phoneMatch(gaPhone, /R$/)) {
			shaSpelling.push(gaPhone);
			continue;
		}

		if (phoneMatch(rpPhone, /^I/) && phoneMatch(gaPhone, /^I/)) {
			shaSpelling.push(rpPhone);
			continue;
		}

		if (phoneMatch(rpPhone, /^OH/) && phoneMatch(gaPhone, /^(AA)|(AO)|(AH)/)) {
			shaSpelling.push(rpPhone);
			continue;
		}

		nonmerges.push({
			spelling: pair.ga.rawSpelling,
			rp: pair.rp._phonemes,
			ga: pair.ga._phonemes,
			j,
			len: gaPhonemes.length,
			gaPhone
		});
		return undefined;
	}
	return { rawSpelling: pair.ga.rawSpelling, phonemes: shaSpelling };
}

export const merges = differences.map(mergePair).filter((merge: any) => !!merge);

console.log(`Resolved: ${merges.length}, Ambiguous: ${nonmerges.length}`);
writeFileSync('./nonmerges.json', JSON.stringify(nonmerges, null, '  '));
writeFileSync('./merges.json', JSON.stringify(merges, null, '  '));
