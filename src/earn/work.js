const Earn = require('../bases/earn');

const validateProps = (minWin, maxWin, zeroChance, randomSentences) => {

    if (typeof minWin !== 'number')
        throw new TypeError(`Cannot accept property 'minWin' as ${typeof minWin !== 'undefined' && minWin !== null && typeof minWin !== 'string' && (minWin.length >= 0) ? 'array' : minWin !== null ? typeof minWin : null}.`);
    if (typeof maxWin !== 'number')
        throw new TypeError(`Cannot accept property 'maxWin' as ${typeof maxWin !== 'undefined' && maxWin !== null && typeof maxWin !== 'string'(maxWin.length >= 0) ? 'array' : maxWin !== null ? typeof maxWin : null}.`);

    if (minWin <= 0 || maxWin <= 0)
        throw new Error(`The property '${minWin <= 0 ? 'minWin' : 'maxWin'}' cannot be less or equal to zero.`);
    if (minWin > maxWin)
        throw new Error(`The property 'minWin' cannot be greater than 'maxWin'.`);

    if (typeof zeroChance !== 'number')
        throw new TypeError(`Cannot accept property 'zeroChance' as ${typeof zeroChance !== 'undefined' && zeroChance !== null && typeof zeroChance !== 'string' && (zeroChance.length >= 0) ? 'array' : zeroCHance !== null ? typeof zeroChance : null}.`);
    if (zeroChance < 0 || zeroChance > 100)
        throw new Error(`Be sure to set property 'zeroChance' between 0 and 100 (included).`);

    if (typeof randomSentences !== 'boolean')
        throw new TypeError(`Cannot accept property 'randomSentences' as ${typeof randomSentences !== 'undefined' && randomSentences !== null && typeof randomSentences !== 'string' && (randomSentences.length >= 0) ? 'array' : randomSentences !== null ? typeof randomSentences : null}`);
}

const validateSentences = (type, sentence) => {
    if (typeof type !== 'string' || !['win', 'zero'].some(t => type.toLowerCase() === t))
        throw new TypeError(`Invalid sentence type '${type}', please provide one of these |win-zero|.`);
    if (typeof sentence !== 'string')
        throw new TypeError(`Cannot accept parameter 'sentence' as ${typeof sentence !== 'undefined' && sentence !== null && typeof sentence !== 'string' && (sentence.length >= 0) ? 'array' : sentence !== null ? typeof sentence : null}.`);
    if (!sentence.length) {
        throw new Error(`Sentence too short.`)
    }
}

module.exports = class Work extends Earn {
    /**
     * @param {number} minWin - The minimum amount of earn
     * @param {number} maxWin - The maximum amount of earn
     * @param {number} zeroChance - The chance to recive 0 coins
     * @param {boolean} randomSentences - By default is false, enable or not random sentences output
     */
    constructor({
        minWin,
        maxWin,
        zeroChance,
        randomSentences
    }) {
        super(minWin, maxWin, zeroChance, randomSentences);
        this.invSchema = super.invSchema;

        this.minWin = minWin;
        this.maxWin = maxWin;
        this.zeroChance = zeroChance || 0;
        this.randomSentences = randomSentences || false;

        this._sentences = {
            win: [],
            zero: []
        }

        validateProps(this.minWin, this.maxWin, this.zeroChance, this.randomSentences);
    }

    getValues() {
        const min = this.minWin;
        const max = this.maxWin;
        const zeroChance = this.zeroChance;
        const { zero, win } = this.sentences;

        const zeroBool = Math.random() <= zeroChance / 100;

        if (zeroBool) {
            if (this.randomSentences) return {
                value: 0,
                sentence: zero[Math.floor(Math.random() * zero.length)]
            };

            return { value: 0 };
        }

        let output = min - 1;

        while (output < min) {
            output = Math.round(Math.random() * max);
        }

        if (this.randomSentences) return {
            value: output,
            sentence: win[Math.floor(Math.random() * win.length)]
        };

        return { value: output };
    }

    get sentences() {
        return this._sentences;
    }
    /**
     * @param {string} type
     * @param {string} sentence 
     */
    addSentence(type, sentence) {
        validateSentences(type, sentence);
        this._sentences[type].push(sentence);
        return this;
    }

    help() {
        return super.help();
    }
}