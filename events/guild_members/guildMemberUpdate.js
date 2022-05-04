const dotenv = require('dotenv'); dotenv.config();

module.exports = {
    name: 'guildMemberUpdate',
    once : false,
    async execute(client, oldMember, newMember) {

        const wasBoosting = oldMember.premiumSince;
	    const isBoosting = newMember.premiumSince;

        if (!wasBoosting && isBoosting) {
            client.channels.cache.get(971242680371781653).send(`${newMember.user.username} a boosté le serveur !`);
          }

    }

}