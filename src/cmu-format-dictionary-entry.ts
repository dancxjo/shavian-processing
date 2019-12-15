import { Phone } from "./phone";

//const CMU_FORMAT_LINE_PATTERN = /^(([^;]*?)(\((.*?)\))*\s+((\w+\d+?)( (\w+\d+?))*)(#@@(.*?)@@)?)?\s*(;.*?)?$/
const CMU_FORMAT_LINE_PATTERN = /^(([^;]*?)(\((.*?)\))*\s+(.+?))?\s*([;#].*?)?$/

const MATCH_SPELLING = 2;
const MATCH_ENTRY = 4;
const MATCH_PHONEMES = 5;
const MATCH_NOTES = 6;

export class CmuFormatDictionaryEntry {
    public rawSpelling = "";
    public notes = "";
    public entryNumber = 0;
    public entryModifier = "";
    public _phonemes: Phone[] = [];

    constructor (cmuFormatLine: String) {
        this.parse(cmuFormatLine);
    }

    public set phonemes(phonemes: Phone[]) {
        this._phonemes = phonemes.filter(phoneme => phoneme !== '-');
    }

    public get phonemes() {
        return this._phonemes;
    }

    parse(cmuFormatLine: String) {
        const matches = cmuFormatLine.match(CMU_FORMAT_LINE_PATTERN);
        if (!matches) {
            throw new Error('incompatible line format: ' + cmuFormatLine);
        }

        // console.log(matches);

        this.rawSpelling = matches[MATCH_SPELLING] || "";
        if (matches[MATCH_ENTRY]) {
            try {
                this.entryNumber = parseInt(matches[MATCH_ENTRY]);
            } catch {
                this.entryNumber = 0;
                this.entryModifier = matches[MATCH_ENTRY];
            }
        } else if (this.rawSpelling.length > 0) {
            this.entryNumber = 1;
        }
        this.notes = matches[MATCH_NOTES] || "";
        if (matches[MATCH_PHONEMES]) {
            const notesPattern = /\#\@\@(.*?)\@\@/;
            // TODO: Save extra notes with entries
            // this.extras = matches[MATCH_PHONEMES].match(notesPattern).map(notes => JSON.parse(notes));
            this.phonemes = matches[MATCH_PHONEMES].replace(notesPattern, "").split(" ");
        }
    }

    matches(other: CmuFormatDictionaryEntry): boolean {
        return this.rawSpelling === other.rawSpelling && this.phonemes.toString() === other.phonemes.toString() && this.notes == other.notes;
    }
}