const dotenv = require('dotenv'); dotenv.config();
const {MessageEmbed} = require('discord.js');
const { Guild } = require('../../db/models/index');

module.exports = {
    name: 'guildBanRemove',
    once : false,
    async execute(client,guild) {

        const _guild = await Guild.findOne({ guildId: guild.guild.id });

        const UnbanEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`un utilisateur à été débannis`)
        .setTimestamp()
        guild.guild.channels.cache.get(_guild.channels.logs).send({embeds: [UnbanEmbed]});

    }

}