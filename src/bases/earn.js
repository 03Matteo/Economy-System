const profileSchema = require('../schemas/profile-schema');
const getMaxBagSize = require('../utils/getMaxBagSize');
const getUserBag = require('../utils/checkUserBag');
const validateProps = require('../utils/validateProps');

module.exports = class Earn {
    constructor({
        name,
        userId,
        minWin,
        maxWin,
        minLose,
        maxLose,
        chance,
        zeroChance
    }) {
        this.name = name;
        this.userId = userId;
        this.minWin = minWin;
        this.maxWin = maxWin;
        this.minLose = minLose;
        this.maxLose = maxLose;
        this.chance = chance || 100;
        this.zeroChance = zeroChance || 0;

        validateProps(this.name, this.userId, this.minWin, this.maxWin, this.minLose, this.maxLose, this.chance, this.zeroChance);

        this.maxSize = getMaxBagSize();
        this.currentBagAmount = getUserBag(this.userId);

        this.value = null;
        this.bagEccess = 0;
    }

    async getData() {
        const min = this.minWin;
        const max = this.maxWin;
        const zeroChance = this.zeroChance;
        const minL = this.minLose;
        const maxL = this.maxLose;
        const chance = this.chance;
        const bagAmount = (await this.currentBagAmount).bagAmount;
        const maxSize = await this.maxSize;

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
            this.currentBagAmount = bagAmount + this.value;
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