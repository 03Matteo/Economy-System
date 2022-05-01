module.exports = (userId, minWin, maxWin, minLose, maxLose, chance, zeroChance) => {

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