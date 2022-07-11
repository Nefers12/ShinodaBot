const dotenv = require('dotenv'); dotenv.config();
const {MessageEmbed} = require('discord.js');
const { Guild } = require('../../db/models/index');

module.exports = {
    name: 'voiceStateUpdate',
    once : false,
    async execute(client, oldMember, newMember) {

        const guild = await Guild.findOne({ guildId: oldMember.guild.id });

        if(oldMember.channel === null && newMember.channel !== null) {
            const JoinEmbed = new MessageEmbed()
            .setColor('RED')
            .setAuthor({ name : newMember.member.user.username,iconURL: newMember.member.displayAvatarURL()})
            .setDescription(`${newMember.member} a rejoint le channel ${newMember.channel}`)
            .setTimestamp()
            newMember.guild.channels.cache.get(guild.channels.logs).send({embeds: [JoinEmbed]});
        }
        else if(oldMember.channel !== null && newMember.channel === null) {
            const LeaveEmbed = new MessageEmbed()
            .setColor('RED')
            .setAuthor({ name : oldMember.member.user.username,iconURL: oldMember.member.displayAvatarURL()})
            .setDescription(`${newMember.member} a quitté le channel ${oldMember.channel}`)
            .setTimestamp()
            newMember.guild.channels.cache.get(guild.channels.logs).send({embeds: [LeaveEmbed]});
        }
        else if(oldMember.channel !== null && newMember.channel !== null) {
            const MoveEmbed = new MessageEmbed()
            .setColor('RED')
            .setAuthor({ name : oldMember.member.user.username,iconURL: oldMember.member.displayAvatarURL()})
            .setDescription(`${newMember.member} a bougé du channel ${oldMember.channel} vers ${newMember.channel}`)
            .setTimestamp()
            newMember.guild.channels.cache.get(guild.channels.logs).send({embeds: [MoveEmbed]});
        }

    }

}