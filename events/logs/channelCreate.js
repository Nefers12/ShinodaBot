const dotenv = require('dotenv'); dotenv.config();
const {MessageEmbed} = require('discord.js');
const { Guild } = require('../../db/models/index');

module.exports = {
    name: 'channelCreate',
    once : false,
    async execute(client, channel) {

        const guild = await Guild.findOne({ guildId: channel.guild.id });

        const channelEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Le channel ${channel} a été créer`)
        .setTimestamp()

        channel.guild.channels.cache.get(guild.channels.logs).send({embeds: [channelEmbed]});

    }

}