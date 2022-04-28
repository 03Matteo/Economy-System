const Initialize = require('./start/initialize');
const Help = require('./start/help');

const earn = require('./exports/earn');


require('dotenv').config()


Initialize(process.env.mongo, true);

module.exports = {
    Initialize,
    Help,
    earn
}