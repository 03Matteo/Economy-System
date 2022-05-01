const profileSchema = require('../schemas/profile-schema');

module.exports = async (maxSize) => {

    if (typeof maxSize !== 'number')
        throw new Error(`The parameter 'maxSize' must be a number.`);

    const result = await profileSchema.findOne({ 'bag.maxSize': maxSize });

    if (result) return false;

    await profileSchema.updateMany({
        _ID: 'all'
    }, {
        $set: {
            'bag.maxSize': maxSize
        }
    })
};