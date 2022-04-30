require('dotenv').config()

const Initialize = require('./start/initialize');
const Help = require('./start/help');

const setMaxBagSize = require('./utils/setMaxBagSize');

const { Work, Slut, Rob, Crime } = require('./exports/earn');

const init = async () => {
    await Initialize(process.env.mongo);

    await setMaxBagSize(100)

    const a = new Crime({
        userId: '1',
        minWin: 10,
        maxWin: 20,
        minLose: 5,
        maxLose: 10,
        chance: 50,
        zeroChance: 20
    })

    const data = await a.getData()

    await a.save()
    console.log(a)
}

init();

module.exports = {
    Initialize,
    Help,
    setMaxBagSize,
    earn: { Work, Slut, Rob, Crime }
}