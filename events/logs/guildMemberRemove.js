const dotenv = require('dotenv'); dotenv.config();
const {MessageEmbed} = require('discord.js');
const { Guild } = require('../../db/models/index');

module.exports = {
    name: 'guildMemberRemove',
    once : false,
    async execute(client, member) {

        const _guild = await Guild.findOne({ guildId: member.guild.id });

        const LeaveEmbed = new MessageEmbed()
        .setColor('RED')
        .setAuthor({ name : member.user.username,iconURL: member.displayAvatarURL()})
        .setDescription(`${member} a quité le serveur\nMembre depuis le : <t:${parseInt(member.joinedAt / 1000, 10)}:d>`)
        .setTimestamp()
        member.guild.channels.cache.get(_guild.channels.logs).send({embeds: [LeaveEmbed]});

    }

}