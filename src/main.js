const Initialize = require('./initialize');
const Work = require('./earn/work');
const Slut = require('./earn/slut');
const Rob = require('./earn/rob');
const Crime = require('./earn/crime');

module.exports = {
    Initialize,//work in progress
    earn: {
        Work,
        Slut,
        Rob,
        Crime
    }
}
