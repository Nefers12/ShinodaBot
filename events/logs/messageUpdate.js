const dotenv = require('dotenv'); dotenv.config();
const {MessageEmbed} = require('discord.js');
const { Guild } = require('../../db/models/index');

module.exports = {
    name: 'messageUpdate',
    once : false,
    async execute(client, oldMessage, newMessage) {

        const guild = await Guild.findOne({ guildId: oldMessage.guild.id });

        const editedMessageEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Un message de ${oldMessage.author} a été modiffié`)
        .addField(`Ancien message :`, "```" +`${oldMessage.content}` + "```")
        .addField(`Nouveau message :`, "```" +`${newMessage.content}` + "```")
        .setTimestamp()
        oldMessage.guild.channels.cache.get(guild.channels.logs).send({embeds: [editedMessageEmbed]});

    }

}