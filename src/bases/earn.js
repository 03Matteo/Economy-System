const validateProps = require('../utils/validateProps');

module.exports = class Earn {
    constructor({
        userId,
        minWin,
        maxWin,
        minLose,
        maxLose,
        chance,
        zeroChance
    }) {
        this.userId = userId;
        this.minWin = minWin;
        this.maxWin = maxWin;
        this.minLose = minLose || 1;
        this.maxLose = maxLose || 1;
        this.chance = chance || 100;
        this.zeroChance = zeroChance || 0;

        validateProps(this.userId, this.minWin, this.maxWin, this.minLose, this.maxLose, this.chance, this.zeroChance);

        this.value = null;
    }

    getData() {
        const min = this.minWin;
        const max = this.maxWin;
        const minL = this.minLose;
        const maxL = this.maxLose;
        const chance = this.chance;
        const zeroChance = this.zeroChance;

        const zeroBool = Math.random() <= zeroChance / 100;
        if (zeroBool) {
            this.value = 0;
            return this;
        }

        const chanceBool = Math.random() <= chance / 100;
        if (chanceBool) {
            let output = min - 1;
            while (output < min) {
                output = Math.round(Math.random() * max);
            }
            this.value = output;
            return this;
        }

        let output = minL - 1;
        while (output < minL) {
            output = Math.round(Math.random() * maxL);
        }
        this.value = -output;
        return this;
    }
}