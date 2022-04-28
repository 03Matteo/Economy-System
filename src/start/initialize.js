const mongoose = require('mongoose');

module.exports = async (Mongo_URL, log = false) => {
    if (typeof Mongo_URL !== 'string' || !Mongo_URL.startsWith('mongodb'))
        throw new Error(`Invalid Mongo URL provided.`);

    await mongoose.connect(Mongo_URL, {
        useNewUrlParser: true
    }).catch((e) => {
        throw new Error(`${e}`);
    }).then(() => {
        if (typeof log === 'boolean' && log) {
            const date = new Date();
            console.log(`[${date.toLocaleDateString().replace(/\//g, '-')} | ${date.getHours()}:${date.getMinutes()}] Succesfully connected to MongoDB!`);
        }
    })
}