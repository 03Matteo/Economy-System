const { Schema, model } = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const reqNum = {
    type: Number,
    required: true,
    default: 0
}

const collection = 'economy-profiles';

module.exports = model(collection, new Schema({
    _ID: reqString,
    userId: reqString,
    lastUpdated: {
        type: Date,
        requried: true,
        default: new Date()
    },
    bag: {
        amount: reqNum,
        maxSize: reqNum
    },
    allCmds: {
        earn: reqNum
    }
}), collection);