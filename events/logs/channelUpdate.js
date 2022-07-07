const dotenv = require('dotenv'); dotenv.config();
const {MessageEmbed} = require('discord.js');
const { Guild } = require('../../db/models/index');

module.exports = {
    name: 'channelUpdate',
    once : false,
    async execute(client, oldChannel, newChannel) {

        const guild = await Guild.findOne({ guildId: oldChannel.guild.id });

        const channelEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Le channel "${oldChannel.name}" a été modifié`)
        .addField(`Avant la modification`, `Nom : ${oldChannel.name}\nPosition : ${oldChannel.rawPosition}\nTopic : ${oldChannel.topic}\nNsfw : ${oldChannel.nsfw}`)
        .addField(`Après la modification`, `Nom : ${newChannel.name}\nPosition : ${newChannel.rawPosition}\nTopic : ${newChannel.topic}\nNsfw : ${newChannel.nsfw}`)
        .setTimestamp()
        oldChannel.guild.channels.cache.get(guild.channels.logs).send({embeds: [channelEmbed]});

    }

}