const dotenv = require('dotenv'); dotenv.config();
const {MessageEmbed} = require('discord.js');
const { Guild } = require('../../db/models/index');

module.exports = {
    name: 'roleUpdate',
    once : false,
    async execute(client, oldRole, newRole) {

        const guild = await Guild.findOne({ guildId: oldRole.guild.id });

        const channelEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Le role "${oldRole}" a été modifié`)
        .addField(`Avant la modification`, `Nom : ${oldRole.name}\n`)
        .addField(`Après la modification`, `Nom : ${newRole.name}\n\n**Les permissions ont peut-être étées modifiées**`)
        .setTimestamp()
        oldRole.guild.channels.cache.get(guild.channels.logs).send({embeds: [channelEmbed]});

    }

}