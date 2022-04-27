const invSchema = require('../schemas/inventories-schema');

const help = () => {
    return 'Here some infoes...';
}

module.exports = class Earn {
    static types = ['work', 'slut', 'rob', 'crime'];

    constructor({
        minWin,
        maxWin,
        zeroChance,
        minLose,
        maxLose,
        chance,
        randomSentences
    }) {
        this.minWin = minWin;
        this.maxWin = maxWin;
        this.zeroChance = zeroChance;
        this.minLose = minLose;
        this.maxLose = maxLose;
        this.chance = chance;
        this.randomSentences = randomSentences;

        this.invSchema = invSchema;
    }

    help() {
        return help();
    }
}
