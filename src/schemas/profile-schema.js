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

module.exports = model('currency-profiles', new Schema({
    userId: reqString,
    lastUpdated: {
        type: Date,
        requried: true,
        default: new Date()
    },
    bag: reqNum,
    bank: reqNum,
    allCmds: {
        earn: {
            work: reqNum,
            slut: reqNum,
            rob: reqNum,
            crime: reqNum
        },
        inv: {
            bag: reqNum,
            bank: reqNum
        }
    }
}))