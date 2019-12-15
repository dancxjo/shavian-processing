import { exactDuplicates, rpOnly } from "./ambiguous-words";
import { expect } from "chai";

// SKIP: Too time consuming
describe.skip('ambiguous words', function () {
    it('should certify HEAVEN', function () {
        const heaven = exactDuplicates.find(entry => entry.rawSpelling === 'HEAVEN');
        expect(heaven).to.exist;
        expect(heaven).to.have
            .property('phonemes')
            .that.deep.equals(
            ['HH', 'EH1', 'V', 'AX', 'N']
        );
    });

    it.skip('should isolate HARBOUR', function() {
        const harbour = rpOnly.find(entry => entry.rawSpelling === 'HARBOUR');
        expect(harbour).to.exist;
        expect(harbour).to.have
            .property('phonemes')
            .that.deep.equals(
            ['HH', 'AH1', 'B', 'AX']
        );
    });
});