require('dotenv').config()

//Connect to MongoDB
const Initialize = require('./src/start/initialize');

//Complete log of informations
const Help = require('./src/start/help');

//Set the max size of each user bag
const setMaxBagSize = require('./src/utils/setMaxBagSize');

//Returns true if the user has never played
const newUser = require('./src/utils/newUser');

//Earn class
const Earn = require('./src/bases/earn');

//Exports
module.exports = {
    Help,
    Initialize,
    setMaxBagSize,
    newUser,
    Earn
}