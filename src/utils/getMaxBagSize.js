const profileSchema = require('../schemas/profile-schema');

module.exports = async () => {
    const result = await profileSchema.find({ _ID: 'all' })

    let done = false;
    let maxSize = null;
    for (const profile of result) {
        if (done) return;

        if (profile.bag?.maxSize !== undefined) {
            maxSize = profile.bag.maxSize;
            done = true;
        }
    }

    return maxSize;
}