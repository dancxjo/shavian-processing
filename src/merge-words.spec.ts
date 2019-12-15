import { exactDuplicates, rpOnly } from "./ambiguous-words";
import { expect } from "chai";
import { merges } from "./merge-words";
import { Phone } from "./phone";

describe('merge words', function () {
    function getEntryBySpelling(spelling: string): { rawSpelling: string } {
        return merges.find((entry: { rawSpelling: string }) => entry.rawSpelling === spelling);
    }

    function checkPronunciation(spelling: string, pronunciation: Phone[]) {
        return function () {
            const word = getEntryBySpelling(spelling);
            expect(word).to.exist;
            expect(word).to.have
                .property('phonemes')
                .that.deep.equals(pronunciation);
        }
    }

    [
        { spelling: 'MORE', pronunciation: ['M', 'AO1 R'] },
        { spelling: 'HEART', pronunciation: ['HH', 'AA1 R', 'T'] },
        { spelling: 'HAPPY', pronunciation: ['HH', 'AE1', 'P', 'IH0'] }

    ].forEach(pair => it(`should resolve ${pair.spelling}`, checkPronunciation(pair.spelling, pair.pronunciation.map(phone => phone.toString()))));
});