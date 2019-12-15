import { Phone } from './phone';

export interface Spellable {
	rawSpelling: string;
	phonemes: Phone[];
}

const rules = [
	{ pattern: /^IA\d+ R$/, replacement: '𐑽' },
	{ pattern: /^ER[12]?( R)?$/, replacement: '𐑻' },
	{ pattern: /^EA[12] R$/, replacement: '𐑺' },
	{ pattern: /^AO\d R$/, replacement: '𐑹' },
	{ pattern: /^AA\d R$/, replacement: '𐑸' },
	{ pattern: /^AXR$/, replacement: '𐑼' },
	{ pattern: /^UA\d R$/, replacement: '𐑫𐑼' },
	{ pattern: /^UW\d?$/, replacement: '𐑵' },
	{ pattern: /^UH\d?$/, replacement: '𐑫' },
	{ pattern: /^AW\d?$/, replacement: '𐑬' },
	{ pattern: /^OY\d?$/, replacement: '𐑶' },
	{ pattern: /^EH\d?$/, replacement: '𐑧' },
	{ pattern: /^EY\d?$/, replacement: '𐑱' },
	{ pattern: /^AY\d?$/, replacement: '𐑲' },
	{ pattern: /^AE\d?$/, replacement: '𐑨' },
	{ pattern: /^OW\d?$/, replacement: '𐑴' },
	{ pattern: /^OH\d?$/, replacement: '𐑪' },
	{ pattern: /^AX0?$/, replacement: '𐑩' },
	{ pattern: /^AH\d?$/, replacement: '𐑳' },
	{ pattern: /^AA\d?$/, replacement: '𐑭' },
	{ pattern: /^AO\d$/, replacement: '𐑷' },
	{ pattern: /^IH\d+$/, replacement: '𐑦' },
	{ pattern: /^IY\d+$/, replacement: '𐑰' },
	{ pattern: /^IA\d+$/, replacement: '𐑾' },
	{ pattern: 'B', replacement: '𐑚' },
	{ pattern: 'CH', replacement: '𐑗' },
	{ pattern: 'D', replacement: '𐑛' },
	{ pattern: 'DH', replacement: '𐑞' },
	{ pattern: 'F', replacement: '𐑓' },
	{ pattern: 'G', replacement: '𐑜' },
	{ pattern: 'HH', replacement: '𐑣' },
	{ pattern: 'JH', replacement: '𐑡' },
	{ pattern: 'K', replacement: '𐑒' },
	{ pattern: 'L', replacement: '𐑤' },
	{ pattern: 'M', replacement: '𐑥' },
	{ pattern: 'N', replacement: '𐑯' },
	{ pattern: 'NG', replacement: '𐑙' },
	{ pattern: 'P', replacement: '𐑐' },
	{ pattern: 'R', replacement: '𐑮' },
	{ pattern: 'S', replacement: '𐑕' },
	{ pattern: 'SH', replacement: '𐑖' },
	{ pattern: 'T', replacement: '𐑑' },
	{ pattern: 'TH', replacement: '𐑔' },
	{ pattern: 'V', replacement: '𐑝' },
	{ pattern: 'W', replacement: '𐑢' },
	{ pattern: 'Y', replacement: '𐑘' },
	{ pattern: 'Z', replacement: '𐑟' },
	{ pattern: 'ZH', replacement: '𐑠' }
];

export function shavianize(phone: Phone): string {
	for (let rule of rules) {
		if (typeof rule.pattern === 'string' && rule.pattern === phone) {
			return rule.replacement;
		}
		if (rule.pattern instanceof RegExp && rule.pattern.test(phone.toString())) {
			return rule.replacement;
		}
	}

	return phone.toString();
}

export function spell(spellable: Spellable): string {
	const phonemes = spellable.phonemes.map(shavianize);

	if (spellable.rawSpelling.match(/ED$/)) {
		phonemes[phonemes.length - 2] = phonemes[phonemes.length - 2].replace(/𐑦$/, '𐑩');
	}

	return phonemes.join('').replace('𐑘𐑵', '𐑿');
}
