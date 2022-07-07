const dotenv = require('dotenv'); dotenv.config();
const {MessageEmbed} = require('discord.js');
const { Guild } = require('../../db/models/index');

module.exports = {
    name: 'messageDelete',
    once : false,
    async execute(client, message) {

        const guild = await Guild.findOne({ guildId: message.guild.id });

        const deletedMessageEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Un message de ${message.author} a été supprimé`)
        .addField(`Contennu du message :`, "```" +`${message.content}` + "```")
        .setTimestamp()
        message.guild.channels.cache.get(guild.channels.logs).send({embeds: [deletedMessageEmbed]});

    }

}