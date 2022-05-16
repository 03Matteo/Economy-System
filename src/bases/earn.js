const mongoose = require('mongoose');
const profileSchema = require('../schemas/profile-schema');
const getMaxBagSize = require('../utils/getMaxBagSize');
const getUserBag = require('../utils/checkUserBag');
const getUserCommands = require('../utils/getUserCommands');
const validateProps = require('../utils/validateProps');
const connected = mongoose.connection._hasOpened;

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

        this.cmdExecuted = null;
        this.currentBagAmount = null;
        this.maxSize = null;

        if (connected) {
            this.cmdExecuted = getUserCommands(this.userId, 'earn');
            this.currentBagAmount = getUserBag(this.userId);
            this.maxSize = getMaxBagSize();
        }

        this.value = null;
        this.bagEccess = null;
    }

    async getData() {
        const min = this.minWin;
        const max = this.maxWin;
        const minL = this.minLose;
        const maxL = this.maxLose;
        const chance = this.chance;
        const zeroChance = this.zeroChance;
        const maxSize = await this.maxSize;
        const bagAmount = await this.currentBagAmount;

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

            if (connected) {
                if (bagAmount + this.value > maxSize) {
                    this.bagEccess = bagAmount + this.value - maxSize;
                    this.value = maxSize - bagAmount;
                }
                this.currentBagAmount = bagAmount + this.value;
            }
            return this;
        }

        let output = minL - 1;
        while (output < minL) {
            output = Math.round(Math.random() * maxL);
        }
        this.value = -output;
        return this;
    }

    async save(log = false) {
        await setTimeout(async () => {
            if (this.value === null)
                throw new Error(`You cannot call 'save()' before 'getData()'.`);

            await profileSchema.findOneAndUpdate({
                _ID: 'all',
                userId: this.userId
            }, {
                _ID: 'all',
                userId: this.userId,
                lastUpdated: new Date(),
                $inc: {
                    'bag.amount': this.value,
                    'allCmds.earn': + 1
                },
                $set: {
                    'bag.maxSize': this.maxSize
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