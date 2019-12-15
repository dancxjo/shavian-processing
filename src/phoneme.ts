import { Phone } from "./phone";
import { Environment } from "./environment";

export class Phoneme {
    constructor (readonly defaultRealization: Phone[]) {}

    addRule(realization: Phone[], environment: Environment) {}
}