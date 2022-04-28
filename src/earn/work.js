const Earn = require('../bases/earn');
const profileSchema = require('../schemas/profile-schema');
const newUser = require('../utils/newUser');

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

        this.data = {
            value: null
        }
    }

    getData() {
        const min = this.minWin;
        const max = this.maxWin;
        const zeroChance = this.zeroChance;
        const data = this.data;

        const zeroBool = Math.random() <= zeroChance / 100;
        if (zeroBool) {
            this.data.value = 0;
            return this;
        }

        let output = min - 1;
        while (output < min) {
            output = Math.round(Math.random() * max);
        }

        data.value = output;
        return this;
    }

    async save(log = false) {
        if (this.data.value === null)
            throw new Error(`You cannot call 'save()' before 'getData()'.`);

        await profileSchema.findOneAndUpdate({
            userId: this.userId
        }, {
            userId: this.userId,
            lastUpdated: new Date(),
            $inc: {
                bag: +this.data.value,
                'allCmds.earn.work': + 1
            }
        }, {
            upsert: true
        }).then(() => {
            if (typeof log === 'boolean' && log) {
                const date = new Date();
                console.log(`[${date.toLocaleDateString().replace(/\//g, '-')} | ${date.getHours()}:${date.getMinutes()}] Succesfully saved to MongoDB all data!`);
            }
        })
    }
}

const validateProps = (userId, minWin, maxWin, zeroChance) => {

    if (typeof userId !== 'string')
        throw new TypeError(`Cannot accept property 'userId' as ${typeof userId !== 'undefined' && userId !== null && typeof userId !== 'string' && (userId.length >= 0) ? 'array' : userId !== null ? typeof userId : null}.`);
    if (!userId.length)
        throw new TypeError(`Cannot accept property 'userId' as an empty string.`);

    if (typeof minWin !== 'number')
        throw new TypeError(`Cannot accept property 'minWin' as ${typeof minWin !== 'undefined' && minWin !== null && typeof minWin !== 'string' && (minWin.length >= 0) ? 'array' : minWin !== null ? typeof minWin : null}.`);
    if (typeof maxWin !== 'number')
        throw new TypeError(`Cannot accept property 'maxWin' as ${typeof maxWin !== 'undefined' && maxWin !== null && typeof maxWin !== 'string'(maxWin.length >= 0) ? 'array' : maxWin !== null ? typeof maxWin : null}.`);

    if (minWin <= 0 || maxWin <= 0)
        throw new Error(`The property '${minWin <= 0 ? 'minWin' : 'maxWin'}' cannot be less or equal to zero.`);
    if (minWin > maxWin)
        throw new Error(`The property 'minWin' cannot be greater than 'maxWin'.`);

    if (typeof zeroChance !== 'number')
        throw new TypeError(`Cannot accept property 'zeroChance' as ${typeof zeroChance !== 'undefined' && zeroChance !== null && typeof zeroChance !== 'string' && (zeroChance.length >= 0) ? 'array' : zeroChance !== null ? typeof zeroChance : null}.`);
    if (zeroChance < 0 || zeroChance > 100)
        throw new Error(`Be sure to set property 'zeroChance' between 0 and 100 (included).`);
}