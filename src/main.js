require('dotenv').config()

const Initialize = require('./start/initialize');
const Help = require('./start/help');

const setMaxBagSize = require('./utils/setMaxBagSize');

const Earn = require('./bases/earn');

const init = async () => {
    await Initialize(process.env.mongo);

    await setMaxBagSize(100)

    const a = new Earn({
        userId: '1',
        minWin: 10,
        maxWin: 15,
        minLose: 5,
        maxLose: 10,
        chance: 100
    })

    const { value, bagEccess, currentAmount, maxSize } = await a.getData()

    await a.save()
    console.log(value, bagEccess, currentAmount, maxSize)
}

init();

module.exports = {
    Initialize,
    Help,
    setMaxBagSize,
    Earn
}