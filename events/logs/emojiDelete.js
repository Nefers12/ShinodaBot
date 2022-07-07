const dotenv = require('dotenv'); dotenv.config();
const {MessageEmbed} = require('discord.js');
const { Guild } = require('../../db/models/index');

module.exports = {
    name: 'emojiDelete',
    once : false,
    async execute(client, emoji) {

        const guild = await Guild.findOne({ guildId: emoji.guild.id });

        const emojiEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`L'émoji' ${emoji} a été supprimé`)
        .setTimestamp()
        emoji.guild.channels.cache.get(guild.channels.logs).send({embeds: [emojiEmbed]});

    }

}