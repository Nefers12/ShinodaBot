const dotenv = require('dotenv'); dotenv.config();
const {MessageEmbed} = require('discord.js');
const { Guild } = require('../../db/models/index');

module.exports = {
    name: 'roleDelete',
    once : false,
    async execute(client, role) {

        const guild = await Guild.findOne({ guildId: role.guild.id });

        const roleEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Le role ${role.name} a été supprimé`)
        .setTimestamp()
        role.guild.channels.cache.get(guild.channels.logs).send({embeds: [roleEmbed]});

    }

}