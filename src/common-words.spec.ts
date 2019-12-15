import { readFileSync } from "fs";
import { latinToShavian } from "./index";
import { expect } from "chai";

const commonWords = readFileSync('./res/kingsley.txt').toString().trim().split("\n").map(line => line.replace("[𐑣]", "").split(/\s+/));

describe('common words', function () {
    commonWords.forEach(([latin, shavian]) => it(`should spell "${latin}" as ${shavian}`, function () {
        if (!latinToShavian.has(latin.toUpperCase())) {
            this.skip();
        }
        
        const entries = latinToShavian.get(latin.toUpperCase());

        if (!entries) {
            this.fail();
        }

        const spelling = entries?.has(shavian);

        if (!spelling) {
            // console.log(Array.from(entries?.join('\t'));
        }

        expect(spelling).to.exist;
    }));
});