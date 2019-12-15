import { readFileSync } from 'fs';
import { CmuFormatDictionaryEntry } from './cmu-format-dictionary-entry';

export class CmuFormatDictionary {
    entries: CmuFormatDictionaryEntry[] = [];

    constructor() { }

    readFromFile(path: string) {
        const lines = readFileSync(path).toString().split("\n");
        this.entries = lines.map(line => new CmuFormatDictionaryEntry(line)).filter(entry => !!entry.rawSpelling);
    }

    findBySpelling(spelling: string): CmuFormatDictionaryEntry[] {
        return this.entries.filter(entry =>
            spelling.toLowerCase() === entry.rawSpelling.toLowerCase());
    }
}