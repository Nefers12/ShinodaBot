const dotenv = require('dotenv'); dotenv.config();
const { Guild } = require('../../db/models/index');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'guildMemberUpdate',
    once : false,
    async execute(client, oldMember, newMember) {

        const guild = await Guild.findOne({ guildId: oldMember.guild.id });

        const wasBoosting = oldMember.roles.cache.has(guild.roles.booster);
	    const isBoosting = newMember.roles.cache.has(guild.roles.booster);

        const boostEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor({name: `${newMember.user.username} a boost le serveur 🥳 `, iconURL: newMember.user.displayAvatarURL()})
        .setDescription(`Merci ${newMember.user} pour ton boost !`)
        .setTimestamp()

        if (!wasBoosting && isBoosting) {
            oldMember.guild.channels.cache.get(guild.channels.boost).send({embeds:[boostEmbed]});
          }
    }

}