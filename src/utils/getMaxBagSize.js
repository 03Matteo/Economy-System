const profileSchema = require('../schemas/profile-schema');

module.exports = async () => {
    const result = await profileSchema.find({ _ID: 'all' })

    let done = false;
    for (const profile of result) {
        if (done) return;

        if (profile.bag?.maxSize !== undefined) {
            done = true;
            return profile.bag.maxSize;
        }
    }
}