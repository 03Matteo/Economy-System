const Earn = require('../bases/earn');

const validateProps = (minWin, maxWin, zeroChance, minLose, maxLose, chance, randomSentences) => {

    if (typeof minWin !== 'number')
        throw new TypeError(`Cannot accept property 'minWin' as ${typeof minWin !== 'undefined' && minWin !== null && typeof minWin !== 'string' && (minWin.length >= 0) ? 'array' : minWin !== null ? typeof minWin : null}.`);
    if (typeof maxWin !== 'number')
        throw new TypeError(`Cannot accept property 'maxWin' as ${typeof maxWin !== 'undefined' && maxWin !== null && typeof maxWin !== 'string'(maxWin.length >= 0) ? 'array' : maxWin !== null ? typeof maxWin : null}.`);

    if (typeof minLose !== 'number')
        throw new TypeError(`Cannot accept property 'minLose' as ${typeof minLose !== 'undefined' && minLose !== null && typeof minLose !== 'string' && (minLose.length >= 0) ? 'array' : minLose !== null ? typeof minLose : null}.`);
    if (typeof maxLose !== 'number')
        throw new TypeError(`Cannot accept property 'maxLose' as ${typeof maxLose !== 'undefined' && maxLose !== null && typeof maxLose !== 'string' && (maxLose.length >= 0) ? 'array' : maxLose !== null ? typeof maxLose : null}.`);

    if (minWin <= 0 || maxWin <= 0)
        throw new Error(`The property '${minWin <= 0 ? 'minWin' : 'maxWin'}' cannot be less or equal to zero.`);
    if (minWin > maxWin)
        throw new Error(`The property 'minWin' cannot be greater than 'maxWin'.`);

    if (typeof zeroChance !== 'number')
        throw new TypeError(`Cannot accept property 'zeroChance' as ${typeof zeroChance !== 'undefined' && zeroChance !== null && typeof zeroChance !== 'string' && (zeroChance.length >= 0) ? 'array' : zeroCHance !== null ? typeof zeroChance : null}.`);
    if (zeroChance < 0 || zeroChance > 100)
        throw new Error(`Be sure to set property 'zeroChance' between 0 and 100 (included).`);

    if (minLose <= 0 || maxLose <= 0)
        throw new Error(`The property '${minLose <= 0 ? 'minLose' : 'maxLose'}' cannot be less or equal to zero.`);
    if (minLose > maxLose)
        throw new Error(`The property 'minLose' cannot be greater than 'maxLose'.`);

    if (typeof chance !== 'number')
        throw new TypeError(`Cannot accept property 'chance' as ${typeof chance !== 'undefined' && chance !== null && typeof chance !== 'string' && (chance.length >= 0) ? 'array' : chance !== null ? typeof chance : null}.`);
    if (chance < 0.01 || chance > 100)
        throw new Error(`Be sure to set property 'zeroChance' between 0 and 100 (included).`);

    if (typeof randomSentences !== 'boolean')
        throw new TypeError(`Cannot accept property 'randomSentences' as ${typeof randomSentences !== 'undefined' && randomSentences !== null && typeof randomSentences !== 'string' && (randomSentences.length >= 0) ? 'array' : randomSentences !== null ? typeof randomSentences : null}`);
}

const validateSentences = (type, sentence) => {
    if (typeof type !== 'string' || !['win', 'zero', 'lose'].some(t => type.toLowerCase() === t))
        throw new TypeError(`Invalid sentence type '${type}', please provide one of these |lose-zero-win|.`);
    if (typeof sentence !== 'string')
        throw new TypeError(`Cannot accept parameter 'sentence' as ${typeof sentence !== 'undefined' && sentence !== null && typeof sentence !== 'string' && (sentence.length >= 0) ? 'array' : sentence !== null ? typeof sentence : null}.`);
    if (!sentence.length) {
        throw new Error(`Sentence too short.`)
    }
}

module.exports = class Crime extends Earn {
    /**
    * @param {number} minWin - The minimum amount of earn
    * @param {number} maxWin - The maximum amount of earn
    * @param {number} zeroChance - The chance to recive 0 coins
    * @param {number} minLose - The minimum amount of lose
    * @param {number} maxLose - The maximum amount of lose
    * @param {number} chance - The chance to win or lose coins
    * @param {boolean} randomSentences - By default is false, enable or not random sentences output
    */
    constructor({
        minWin,
        maxWin,
        zeroChance,
        minLose,
        maxLose,
        chance,
        randomSentences
    }) {
        super(minWin, maxWin, zeroChance, minLose, maxLose, chance, randomSentences);
        this.invSchema = super.invSchema;

        this.minWin = minWin;
        this.maxWin = maxWin;
        this.zeroChance = zeroChance || 0;
        this.minLose = minLose;
        this.maxLose = maxLose;
        this.chance = chance;
        this.randomSentences = randomSentences || false;

        this._sentences = {
            win: [],
            zero: [],
            lose: []
        }

        validateProps(this.minWin, this.maxWin, this.zeroChance, this.minLose, this.maxLose, this.chance, this.randomSentences);
    }

    getValues() {
        const min = this.minWin;
        const max = this.maxWin;
        const zeroChance = this.zeroChance;
        const minL = this.minLose;
        const maxL = this.maxLose;
        const chance = this.chance;
        const { zero, win, lose } = this.sentences;

        const zeroBool = Math.random() <= zeroChance / 100;

        if (zeroBool) {
            if (this.randomSentences) return {
                value: 0,
                sentence: zero[Math.floor(Math.random() * zero.length)]
            }
            return { value: 0 };
        }

        const success = Math.random() <= chance / 100;

        if (success) {
            let output = min - 1;

            while (output < min) {
                output = Math.round(Math.random() * max);
            }

            if (this.sentences) return {
                value: output,
                sentence: win[Math.floor(Math.random() * win.length)]
            }

            return { value: output };
        }

        let output = minL - 1;

        while (output < minL) {
            output = Math.round(Math.random() * maxL);
        }

        if (this.sentences) return {
            value: -output,
            sentence: lose[Math.floor(Math.random() * lose.length)]
        }

        return { value: -output };
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