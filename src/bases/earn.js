const help = () => {
    return 'Here some infoes';//da informazioni dettagliate
}

module.exports = class Earn {
    static types = ['work', 'slut', 'rob', 'crime'];
    static sentences = {
        earn: {
            work: [],
            slut: [],
            rob: [],
            crime: []
        }
    }

    constructor({
        userId,
        minWin,
        maxWin,
        zeroChance,
        minLose,
        maxLose,
        chance,
        prisonChance,
    }) {
        this.userId = userId;
        this.minWin = minWin;
        this.maxWin = maxWin;
        this.zeroChance = zeroChance;
        this.minLose = minLose;
        this.maxLose = maxLose;
        this.chance = chance;
        this.prisonChance = prisonChance;
    }

    help() {
        return help();
    }
}