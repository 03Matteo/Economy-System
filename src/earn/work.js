const Earn = require('../bases/earn');
const profileSchema = require('../schemas/profile-schema');

module.exports = class Work extends Earn {
    constructor({
        userId,
        minWin,
        maxWin,
        zeroChance
    }) {
        super(userId, minWin, maxWin, zeroChance);

        this.userId = userId;
        this.minWin = minWin;
        this.maxWin = maxWin;
        this.zeroChance = zeroChance || 0;

        validateProps(this.userId, this.minWin, this.maxWin, this.zeroChance);

        this.obj = {
            value: 0
        }
    }

    async getData() {
        const min = this.minWin;
        const max = this.maxWin;
        const zeroChance = this.zeroChance;
        const obj = this.obj;

        const zeroBool = Math.random() <= zeroChance / 100;
        if (zeroBool) return obj;

        let output = min - 1;
        while (output < min) {
            output = Math.round(Math.random() * max);
        }

        obj.value = output;
        return obj, this;
    }

    async save() {
        await profileSchema.findOneAndUpdate({
            userId: this.userId
        }, {
            userId: this.userId,
            lastUpdated: new Date(),
            $inc: {
                bag: +this.obj.value,
                "allCmds.earn.work": + 1
            }
        }, {
            upsert: true
        })
    }

    addSentence(type, sentence) {
        validateSentence(type, sentence);

        return this;
    }
}

const validateProps = (userId, minWin, maxWin, zeroChance) => {

    if (typeof userId !== 'string')
        throw new TypeError(`Cannot accept property 'userId' as ${typeof userId !== 'undefined' && userId !== null && typeof userId !== 'string' && (userId.length >= 0) ? 'array' : userId !== null ? typeof userId : null}.`);

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
}

const validateSentence = (type, sentence) => {
    if (typeof type !== 'string' || !['win', 'zero'].some(t => type === t || type === t.toUpperCase()))
        throw new TypeError(`Invalid sentence type '${type}', please provide one of these |win-zero|.`);
    if (typeof sentence !== 'string')
        throw new TypeError(`Cannot accept parameter 'sentence' as ${typeof sentence !== 'undefined' && sentence !== null && typeof sentence !== 'string' && (sentence.length >= 0) ? 'array' : sentence !== null ? typeof sentence : null}.`);
    if (!sentence.length) {
        throw new Error(`The sentence is too short.`)
    }
}