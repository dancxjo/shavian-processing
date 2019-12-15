import { Dictionary, Entry } from "./dictionary";
import { Phone } from "./phone";

export class Wiktionary implements Dictionary {
    entries: Entry[] = [];

    constructor(readonly locale: String) {}
    getEntry(orthography: String): Phone[][] {
        return [];
    }
}