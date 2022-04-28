const profileSchema = require('../schemas/profile-schema');

module.exports = async (userId) => {
    const result = await profileSchema.findOne({ userId })

    if (result) return false;

    return true;
}