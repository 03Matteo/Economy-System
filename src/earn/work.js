const Earn = require('../bases/earn');

const validateProps = (userId, minWin, maxWin, zeroChance) => {

    if (typeof userId !== 'string')
        throw new TypeError(`Cannot accept property 'userId' as ${userId.length || userId.length === 0 ? 'array' : typeof userId}.`);
    if (isNaN(parseInt(userId)))
        throw new TypeError(`Invalid 'userId' given, check for what are you trying to provide.`);

    if (typeof minWin !== 'number')
        throw new TypeError(`Cannot accept property 'minWin' as ${typeof minWin !== 'undefined' && (minWin.length || minWin.length === 0) && typeof minWin !== 'string' ? 'array' : typeof minWin}.`);
    if (typeof maxWin !== 'number')
        throw new TypeError(`Cannot accept property 'maxWin' as ${typeof maxWin !== 'undefined' && (maxWin.length || maxWin.length === 0) && typeof maxWin !== 'string' ? 'array' : typeof maxWin}.`);

    if (minWin <= 0 || maxWin <= 0)
        throw new Error(`The property '${minWin <= 0 ? 'minWin' : 'maxWin'}' cannot be less or equal to zero.`);
    if (minWin > maxWin)
        throw new Error(`The property 'minWin' cannot be greater than 'maxWin'.`);

    if (typeof zeroChance !== 'number')
        throw new TypeError(`Cannot accept property 'zeroChance' as ${typeof zeroChance !== 'undefined' && (zeroChance.length || zeroChance.length === 0) && typeof zeroChance !== 'string' ? 'array' : typeof zeroChance}.`);
    if (zeroChance < 0.01 || zeroChance > 100)
        throw new Error(`Be sure to set property 'zeroChance' between 0.01 and 100 (included).`);
}

module.exports = class Work extends Earn {
    /**
     * @param {string} userId - The ID of the user that run the command
     * @param {number} minWin - The minimum amount of earn
     * @param {number} maxWin - The maximum amount of earn
     * @param {number} zeroChance - The chance to recive 0 coins
     */
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
        this.zeroChance = zeroChance;

        validateProps(this.userId, this.minWin, this.maxWin, this.zeroChance);
    }

    getValue() {
        const min = this.minWin;
        const max = this.maxWin;
        const zeroChance = this.zeroChance;

        const zero = Math.random() <= zeroChance / 100;

        if (zero) return 0;

        let output = min - 1;

        while (output < min) {
            output = Math.round(Math.random() * max);
        }

        return output;
    }

    help() {
        return super.help();
    }
}