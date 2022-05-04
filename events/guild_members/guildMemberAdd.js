const dotenv = require('dotenv'); dotenv.config();
const { User } = require('../../db/models/index');

module.exports = {
    name: 'guildMemberAdd',
    once : false,
    async execute(client, member) {

        const user = await User.findOne({ userId: member.id });

        if(!user) {

        const userCreate = await new User({
            userId: member.user.id,
            userName: member.user.username,
            userAvatar: member.displayAvatarURL(),
            joinDate: Date.now(),
            messagesCount: 0,
            numberOfJoin: 1,
            invites: 0
        });

        userCreate.save();
        }else{
            user.numberOfJoin ++;
            user.save();
        }
    }

}