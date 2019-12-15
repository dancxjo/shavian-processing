import { expect } from "chai";
import { CmuFormatDictionaryEntry } from "./cmu-format-dictionary-entry";

describe("CmuFormatDictionaryEntry", function () {
    it("should parse a pure comment", function () {
        const line = new CmuFormatDictionaryEntry(";;; I'm just a girl in the world");
        expect(line.rawSpelling).to.equal("");
        expect(line.entryNumber).to.equal(0);
        expect(line.phonemes.length).to.equal(0);
        expect(line.notes).to.equal(";;; I'm just a girl in the world");
    });

    it("should parse EITHER(2)", function () {
        const line = new CmuFormatDictionaryEntry("EITHER(2)  AY1 DH AXR");
        expect(line.rawSpelling).to.equal("EITHER");
        expect(line.entryNumber).to.equal(2);
        expect(line.notes).to.equal("");
        expect(line.phonemes.length).to.equal(3);
    });
});