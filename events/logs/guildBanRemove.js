const dotenv = require('dotenv'); dotenv.config();
const {MessageEmbed} = require('discord.js');
const { Guild } = require('../../db/models/index');

module.exports = {
    name: 'guildBanRemove',
    once : false,
    async execute(client,guildBan) {

        const _guild = await Guild.findOne({ guildId: guildBan.guild.id });

        const UnbanEmbed = new MessageEmbed()
        .setColor('RED')
        .setAuthor({ name : guildBan.user.username,iconURL: guildBan.user.displayAvatarURL()})
        .setDescription(`${guildBan.user} à été débanni`)
        .setTimestamp()
        guildBan.guild.channels.cache.get(_guild.channels.logs).send({embeds: [UnbanEmbed]});

    }

}