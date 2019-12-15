import { CmuFormatDictionary } from "./cmu-format-dictionary";
import { expect } from "chai";

describe("CmuFormatDictionary", function () {
    const dictionary = new CmuFormatDictionary();
    dictionary.readFromFile('./res/us');

    it("should read in real cmu file", function () {    
        expect(dictionary.entries.length).to.be.greaterThan(100);
    });

    it("should know there are at least two ways to say NEITHER", function () {
        const either = dictionary.findBySpelling("neither");
        expect(either).to.be.an("array").which.has.length.that.is.greaterThan(1);
    });
});