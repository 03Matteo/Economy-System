const Initialize = require('./start/initialize');
const Help = require('./start/help');
const earn = require('./exports/earn');

Initialize('mognoUrl', true);

module.exports = {
    Initialize,
    Help,
    earn
}