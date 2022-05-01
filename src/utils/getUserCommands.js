const profileSchema = require('../schemas/profile-schema');

module.exports = async (userId, type) => {
    const result = await profileSchema.findOne({ userId });
    const cmds = result?.allCmds[type] || 0;

    return cmds;
}