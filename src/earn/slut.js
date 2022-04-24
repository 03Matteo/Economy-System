const Earn = require('../bases/earn');

const validateProps = (userId, minWin, maxWin, zeroChance, minLose, maxLose, chance) => {

    if (typeof userId !== 'string')
        throw new TypeError(`Cannot accept property 'userId' as ${userId.length || userId.length === 0 ? 'array' : typeof userId}.`);
    if (isNaN(parseInt(userId)))
        throw new TypeError(`Invalid 'userId' given, check for what are you trying to provide.`);

    if (typeof minWin !== 'number')
        throw new TypeError(`Cannot accept property 'minWin' as ${typeof minWin !== 'undefined' && (minWin.length || minWin.length === 0) && typeof minWin !== 'string' ? 'array' : typeof minWin}.`);
    if (typeof maxWin !== 'number')
        throw new TypeError(`Cannot accept property 'maxWin' as ${typeof maxWin !== 'undefined' && (maxWin.length || maxWin.length === 0) && typeof maxWin !== 'string' ? 'array' : typeof maxWin}.`);

    if (typeof minLose !== 'number')
        throw new TypeError(`Cannot accept property 'minLose' as ${typeof minLose !== 'undefined' && (minLose.length || minLose.length === 0) && typeof minLose !== 'string' ? 'array' : typeof minLose}.`);
    if (typeof maxLose !== 'number')
        throw new TypeError(`Cannot accept property 'maxLose' as ${typeof maxLose !== 'undefined' && (maxLose.length || maxLose.length === 0) && typeof maxLose !== 'string' ? 'array' : typeof maxLose}.`);

    if (minWin <= 0 || maxWin <= 0)
        throw new Error(`The property '${minWin <= 0 ? 'minWin' : 'maxWin'}' cannot be less or equal to zero.`);
    if (minWin > maxWin)
        throw new Error(`The property 'minWin' cannot be greater than 'maxWin'.`);

    if (typeof zeroChance !== 'number')
        throw new TypeError(`Cannot accept property 'zeroChance' as ${typeof zeroChance !== 'undefined' && (zeroChance.length || zeroChance.length === 0) && typeof zeroChance !== 'string' ? 'array' : typeof zeroChance}.`);
    if (zeroChance < 0.01 || zeroChance > 100)
        throw new Error(`Be sure to set property 'zeroChance' between 0.01 and 100 (included).`);

    if (minLose <= 0 || maxLose <= 0)
        throw new Error(`The property '${minLose <= 0 ? 'minLose' : 'maxLose'}' cannot be less or equal to zero.`);
    if (minLose > maxLose)
        throw new Error(`The property 'minLose' cannot be greater than 'maxLose'.`);

    if (typeof chance !== 'number')
        throw new TypeError(`Cannot accept property 'chance' as ${typeof chance !== 'undefined' && (chance.length || chance.length === 0) && typeof chance !== 'string' ? 'array' : typeof chance}.`);
    if (chance < 0.01 || chance > 100)
        throw new Error(`Be sure to set property 'zeroChance' between 0.01 and 100 (included).`);
}

module.exports = class Slut extends Earn {
    /**
     * @param {string} userId - The ID of the user that run the command
     * @param {number} minWin - The minimum amount of earn
     * @param {number} maxWin - The maximum amount of earn
     * @param {number} zeroChance - The chance to recive 0 coins
     * @param {number} minLose - The minimum amount of lose
     * @param {number} maxLose - The maximum amount of lose
     * @param {number} chance - The chance to win or lose coins
     */
    constructor({
        userId,
        minWin,
        maxWin,
        zeroChance,
        minLose,
        maxLose,
        chance,
    }) {
        super(userId, minWin, maxWin, zeroChance, minLose, maxLose, chance);

        this.userId = userId;
        this.minWin = minWin;
        this.maxWin = maxWin;
        this.zeroChance = zeroChance;
        this.minLose = minLose;
        this.maxLose = maxLose;
        this.chance = chance;

        validateProps(this.userId, this.minWin, this.maxWin, this.zeroChance, this.minLose, this.maxLose, this.chance);
    }

    getValue() {
        const min = this.minWin;
        const max = this.maxWin;
        const zeroChance = this.zeroChance;
        const minL = this.minLose;
        const maxL = this.maxLose;
        const chance = this.chance;

        const zero = Math.random() <= zeroChance / 100;

        if (zero) return 0;

        const success = Math.random() <= chance / 100;

        if (success) {
            let output = min - 1;

            while (output < min) {
                output = Math.round(Math.random() * max);
            }

            return output;
        }

        let output = minL - 1;

        while (output < minL) {
            output = Math.round(Math.random() * maxL);
        }

        return -output;
    }

    help() {
        return super.help();
    }
}