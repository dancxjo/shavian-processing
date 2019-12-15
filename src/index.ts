import { spell, Spellable } from './shavian-spelling';
import { writeFileSync } from 'fs';

const certified = require('../certified.json').map((entry: any) => ({
	rawSpelling: entry.rawSpelling,
	phonemes: entry._phonemes
}));
const merged = require('../merges.json');


export const latinToShavian: Map<string, Set<string>> = new Map<string, Set<string>>();

[ ...certified, ...merged ].forEach(spelling => {
    if (!latinToShavian.has(spelling.rawSpelling)) {
        latinToShavian.set(spelling.rawSpelling, new Set<string>());
    }
    
    const set = latinToShavian.get(spelling.rawSpelling);

    if (!set) {
        throw new Error('explosion');
    }

    set.add(spell(spelling));
});

export const goodWords: String[][] = [];

latinToShavian.forEach((shavians, latin) => {
    [...shavians.values()].forEach(shavian => goodWords.push([latin, shavian]));
});

writeFileSync(
	'./correct.csv',
    goodWords
        .map(
            ([latin, shavian]) => `${latin},${shavian}`).join('\n')
);
