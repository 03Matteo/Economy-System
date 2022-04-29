require('dotenv').config()

const Initialize = require('./start/initialize');
const Help = require('./start/help');

const setMaxBagSize = require('./utils/setMaxBagSize');

const { Work, Slut, Rob, Crime } = require('./exports/earn');

//Initialize(process.env.mongo, true);


module.exports = {
    Initialize,
    Help,
    setMaxBagSize,
    earn: { Work, Slut, Rob, Crime }
}