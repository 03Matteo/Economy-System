module.exports = class Earn {
    static types = ['work', 'slut', 'rob', 'crime'];

    constructor({
        userId,
        minWin,
        maxWin,
        zeroChance,
        minLose,
        maxLose,
        chance
    }) {
        this.userId = userId;
        this.minWin = minWin;
        this.maxWin = maxWin;
        this.zeroChance = zeroChance;
        this.minLose = minLose;
        this.maxLose = maxLose;
        this.chance = chance;
    }
}
