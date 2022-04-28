require('dotenv').config()

const Initialize = require('./start/initialize');
const Help = require('./start/help');

const earn = require('./exports/earn');

Initialize(process.env.mongo, false);

const a = new earn.Work({
    userId: 'id',
    minWin: 2,
    maxWin: 5,
    zeroChance: 30
}).getData()

const amount = a.data;
a.save(true)

console.log(amount)

module.exports = {
    Initialize,
    Help,
    earn
}