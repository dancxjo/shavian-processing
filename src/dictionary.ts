import { Phone } from "./phone";

export interface Entry {
    orthographies: String[];
    pronunciations: Phone[][];
}

export interface Dictionary {
    entries: Entry[];
    getEntry(orthography: String): Phone[][];
}