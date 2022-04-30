const Earn = require('../bases/earn');
const profileSchema = require('../schemas/profile-schema');
const getMaxBagSize = require('../utils/getMaxBagSize');
const getUserBag = require('../utils/checkUserBag');

module.exports = class Crime extends Earn {
    constructor({
        userId,
        minWin,
        maxWin,
        zeroChance,
        minLose,
        maxLose,
        chance
    }) {
        super(userId, minWin, maxWin, zeroChance, minLose, maxLose, chance);

        this.userId = userId;
        this.minWin = minWin;
        this.maxWin = maxWin;
        this.zeroChance = zeroChance || 0;
        this.minLose = minLose;
        this.maxLose = maxLose;
        this.chance = chance;

        validateProps(this.userId, this.minWin, this.maxWin, this.zeroChance, this.minLose, this.maxLose, this.chance);

        this.maxSize = 0;
        this.value = null;
        this.bagEccess = 0;
        this.currentAmount;
    }

    async getData() {
        const min = this.minWin;
        const max = this.maxWin;
        const zeroChance = this.zeroChance;
        const minL = this.minLose;
        const maxL = this.maxLose;
        const chance = this.chance;
        const { maxSize, bagAmount } = await getUserBag(this.userId);
        this.maxSize = maxSize;

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

            if (bagAmount + this.value > maxSize) {
                this.bagEccess = bagAmount + this.value - maxSize;
                this.value = maxSize - bagAmount;
            }
            this.currentAmount = bagAmount + this.value;
            return this;
        }

        let output = minL - 1;
        while (output < minL) {
            output = Math.round(Math.random() * maxL);
        }
        this.value = -output;
        return this;
    }

    save(log = false) {
        setTimeout(async () => {
            if (this.value === null)
                throw new Error(`You cannot call 'save()' before 'getData()'.`);

            let maxSize = await getMaxBagSize();

            await profileSchema.findOneAndUpdate({
                _ID: 'all',
                userId: this.userId
            }, {
                _ID: 'all',
                userId: this.userId,
                lastUpdated: new Date(),
                $inc: {
                    'bag.amount': this.value,
                    'allCmds.earn.crime': + 1
                },
                $set: {
                    'bag.maxSize': maxSize
                }
            }, {
                upsert: true
            }).then(() => {
                if (typeof log === 'boolean' && log) {
                    const date = new Date();
                    console.log(`[${date.toLocaleDateString().replace(/\//g, '-')} | ${date.getHours()}:${date.getMinutes()}] Succesfully saved to MongoDB all data!`);
                }
            })
        }, 2000)
    }
}

const validateProps = (userId, minWin, maxWin, zeroChance, minLose, maxLose, chance) => {

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

    if (typeof minLose !== 'number')
        throw new TypeError(`Cannot accept property 'minLose' as ${typeof minLose !== 'undefined' && minLose !== null && typeof minLose !== 'string' && (minLose.length >= 0) ? 'array' : minLose !== null ? typeof minLose : null}.`);
    if (typeof maxLose !== 'number')
        throw new TypeError(`Cannot accept property 'maxLose' as ${typeof maxLose !== 'undefined' && maxLose !== null && typeof maxLose !== 'string'(maxLose.length >= 0) ? 'array' : maxLose !== null ? typeof maxLose : null}.`);

    if (minLose <= 0 || maxLose <= 0)
        throw new Error(`The property '${minLose <= 0 ? 'minLose' : 'maxLose'}' cannot be less or equal to zero.`);
    if (minLose > maxLose)
        throw new Error(`The property 'minLose' cannot be greater than 'maxLose'.`);

    if (typeof chance !== 'number')
        throw new TypeError(`Cannot accept property 'chance' as ${typeof chance !== 'undefined' && chance !== null && typeof chance !== 'string' && (chance.length >= 0) ? 'array' : chance !== null ? typeof chance : null}.`);
    if (chance < 0 || chance > 100)
        throw new Error(`Be sure to set property 'chance' between 0 and 100 (included).`);
}