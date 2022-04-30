const profileSchema = require('../schemas/profile-schema');
const getMaxBagSize = require('../utils/getMaxBagSize');

module.exports = async (userId) => {
    const result = await profileSchema.findOne({ userId })

    const maxSize = getMaxBagSize();
    const bagAmount = result?.bag.amount || 0;

    return {
        maxSize,
        bagAmount
    }
}