require('dotenv').config()

const Initialize = require('./start/initialize');
const Help = require('./start/help');

const setMaxBagSize = require('./utils/setMaxBagSize');
const newUser = require('./utils/newUser');

const Earn = require('./bases/earn');

const init = async () => {
    await Initialize(process.env.mongo);

    await setMaxBagSize(100, true)

    const a = new Earn({
        userId: '1',
        minWin: 10,
        maxWin: 15,
        minLose: 5,
        maxLose: 10,
        chance: 100
    })

    const { value, bagEccess, currentBagAmount, maxSize, cmdExecuted } = await a.getData()

    await a.save(true)

    console.log(`output: ${value}\neccess: ${bagEccess}\ncurrentBagAmount: ${currentBagAmount}\nmaxSize: ${maxSize}\nexecuted: ${cmdExecuted}`)
}

init();

module.exports = {
    Initialize,
    Help,
    setMaxBagSize,
    newUser,
    Earn
}