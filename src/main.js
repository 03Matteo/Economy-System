require('dotenv').config()

const Initialize = require('./start/initialize');
const Help = require('./start/help');

const earn = require('./exports/earn');

Initialize(process.env.mongo, true);

const a = new earn.Work()

module.exports = {
    Initialize,
    Help,
    earn
}