import { expect } from 'chai';
import { merges, mergePair } from './merge-words';
import { Phone } from './phone';

describe('merge words', function() {
	function getEntryBySpelling(spelling: string): { rawSpelling: string } {
		return merges.find((entry: { rawSpelling: string }) => entry.rawSpelling === spelling);
	}

	function checkPronunciation(spelling: string, pronunciation: Phone[]) {
		return function() {
			const word = getEntryBySpelling(spelling);
			expect(word).to.exist;
			expect(word).to.have.property('phonemes').that.deep.equals(pronunciation);
		};
	}

	[
		{ spelling: 'MORE', pronunciation: [ 'M', 'AO1 R' ] },
		{ spelling: 'HEART', pronunciation: [ 'HH', 'AA1 R', 'T' ] },
		{ spelling: 'HAPPY', pronunciation: [ 'HH', 'AE1', 'P', 'IH0' ] },
		{ spelling: 'IMMORTAL', pronunciation: [ 'IH0', 'M', 'AO1 R', 'T', 'AX', 'L' ] },
		{ spelling: 'IRON', pronunciation: [ 'AY1', 'AXR', 'N' ] },
		{ spelling: 'INTRUDER', pronunciation: [ 'IH0', 'N', 'T', 'R', 'UW1', 'D', 'AXR' ] },
		{ spelling: 'INTERRUPTION', pronunciation: [ 'IH2', 'N', 'T', 'AXR', 'AH1', 'P', 'SH', 'AX', 'N' ] },
		{ spelling: 'IDEA', pronunciation: [ 'AY0', 'D', 'I1', 'AX' ] },
		{ spelling: 'LONG', pronunciation: [ 'L', 'OH1', 'NG' ] },
		{ spelling: 'MATERIALLY', pronunciation: [ 'M', 'AX', 'T', 'IA1 R', 'I0', 'AX', 'L', 'IH0' ] },
        { spelling: 'APPARENT', pronunciation: [ 'AX', 'P', 'AE1 R', 'AX', 'N', 'T' ] },
        { spelling: 'COURAGE', pronunciation: [ 'K', 'AH1', 'R', 'IH0', 'JH' ] },
        { spelling: 'HURRY', pronunciation: [ 'HH', 'AH1', 'R', 'IH0' ] }

	].forEach((pair) =>
		it(
			`should resolve ${pair.spelling}`,
			checkPronunciation(pair.spelling, pair.pronunciation.map((phone) => phone.toString()))
		)
	);
});
