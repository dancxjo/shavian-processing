import { Phone } from "./phone";

export interface ShavianSpelling {
    rawSpelling: string;
    phonemes: Phone[];
}

export class ShavianSpeller implements ShavianSpelling {
    constructor(readonly rawSpelling: string, readonly phonemes: Phone[]) { }
    get shavianSpelling(): string {
        return this.phonemes.map(phone => {
            if (phone.match(/^UW\d?/)) {
                return '𐑵';
            }

            if (phone.match(/^AW\d?/)) {
                return '𐑬';
            }

            if (phone.match(/^OY\d?/)) {
                return '𐑶';
            }

            if (phone.match(/^EH\d?/)) {
                return '𐑧';
            }

            if (phone.match(/^EY\d?/)) {
                return '𐑱';
            }

            if (phone.match(/^AE\d?/)) {
                return '𐑨';
            }

            if (phone.match(/^AY\d?/)) {
                return '𐑲';
            }

            if (phone.match(/^OH\d?/)) {
                return '𐑪';
            }

            if (phone.match(/^OW\d?/)) {
                return '𐑴';
            }

            if (phone.match(/^UH\d?/)) {
                return '𐑫';
            }

            if (phone.match(/^AXR$/)) {
                return '𐑼';
            }

            if (phone.match(/^AX0?$/)) {
                return '𐑩';
            }

            if (phone.match(/^ER[12]?/)) {
                return '𐑻';
            }


            if (phone.match(/^EA[12] R?/)) {
                return '𐑺';
            }

            if (phone.match(/^AH1?/)) {
                return '𐑳';
            }
           
            if (phone.match(/^AO\d R?/)) {
                return '𐑹';
            }

            if (phone.match(/^AA\d R?/)) {
                return '𐑸';
            }

            if (phone.match(/^AA\d?/)) {
                return '𐑭';
            }

            if (phone.match(/^UA\d R?/)) {
                return '𐑫𐑼';
            }


            if (phone.match(/^AO\d?/)) {
                return '𐑷';
            }

            if (phone.match(/^IH\d+?/)) {
                return '𐑦';
            }

            if (phone.match(/^IY\d+?/)) {
                return '𐑰';
            }

            if (phone.match(/^IA\d+ R?/)) {
                return '𐑽';
            }

            if (phone.match(/^IA\d+/)) {
                return '𐑾';
            }

            switch (phone) {
                case 'B': return '𐑚';
                case 'CH': return '𐑗';
                case 'D': return '𐑛';
                case 'DH': return '𐑞';
                case 'F': return '𐑓';
                case 'G': return '𐑜';
                case 'HH': return '𐑣';
                case 'JH': return '𐑡';
                case 'K': return '𐑒';
                case 'L': return '𐑤';
                case 'M': return '𐑥';
                case 'N': return '𐑯';
                case 'NG': return '𐑙';
                case 'P': return '𐑐';
                case 'R': return '𐑮';
                case 'S': return '𐑕';
                case 'SH': return '𐑖';
                case 'T': return '𐑑';
                case 'TH': return '𐑔';
                case 'V': return '𐑝';
                case 'W': return '𐑢';
                case 'Y': return '𐑘';
                case 'Z': return '𐑟';
                case 'ZH': return '𐑠';
            }
            return phone;
        }).join('').replace("𐑘𐑵", "𐑿");
    }
}
