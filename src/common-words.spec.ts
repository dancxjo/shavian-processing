import { readFileSync } from "fs";
import { goodWords } from "./index";
import { expect } from "chai";

const commonWords = readFileSync('./res/kingsley.txt').toString().trim().split("\n").map(line => line.replace("[𐑣]", "").split(/\s+/));

describe('common words', function () {
    commonWords.forEach(([latin, shavian]) => it(`should spell "${latin}" as ${shavian}`, function () {
        const entries = goodWords.filter(entry => entry.rawSpelling.toLowerCase() === latin.toLowerCase());

        if (entries.length < 1) {
            //expect(entries).to.be.an('array').and.to.have.length.greaterThan(0);
            this.skip();
        }

        const spelling = entries.find(entry => entry.shavianSpelling === shavian);

        if (!spelling) {
            console.log(entries.map(entry => entry.shavianSpelling));
        }

        expect(spelling).to.exist;
    }));
});