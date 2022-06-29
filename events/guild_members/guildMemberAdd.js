const dotenv = require('dotenv'); dotenv.config();
const { User,Guild } = require('../../db/models/index');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    once : false,
    async execute(client, member) {

        const user = await User.findOne({ userId: member.id });
        const guild = await Guild.findOne({ guildId: member.guild.id });

        let rdm = Math.floor(Math.random() * 2);
        const file = new MessageAttachment(`./img/${rdm}.png`);

        const welcomeEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`Bienvenue à toi ${member.user} sur le serveur **${member.guild.name}**\nTu fais parti des ${member.guild.memberCount} personnes présentes sur le serveur !\n\nN'oublie pas de lire les règles !`)
            .setAuthor({ name : member.user.username,iconURL: member.displayAvatarURL()})
            .setImage(`attachment://${rdm}.png`);

        const logsEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${member.user.username} a rejoint le serveur`)
            .setAuthor({ name : member.user.username,iconURL: member.displayAvatarURL()})
            .setDescription(`création du compte : Le <t:${parseInt(member.user.createdTimestamp / 1000, 10)}:d> `)

        const generalEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`**Veuillez souhaiter la bienvenue à ${member.user}**\nN’hésite pas à faire ta candidature rp dans <#${guild.channels.candidature}>`)
            .setFooter({ text: 'Shinoda', iconURL: 'https://cdn.discordapp.com/attachments/970725972032770111/985957770866081832/F2109933-283B-44C3-83E5-3888721D5C09.png' });

            member.guild.channels.cache.get(guild.channels.join).send({embeds: [welcomeEmbed], files: [file]});
            member.guild.channels.cache.get(guild.channels.logs).send({embeds: [logsEmbed]});
            member.guild.channels.cache.get(guild.channels.general).send({embeds: [generalEmbed]});
            if(!member.roles.cache.has(member.guild.roles.cache.get(guild.roles.villageois))) member.roles.add(member.guild.roles.cache.get(guild.roles.villageois));

        if(!user) {

        const userCreate = await new User({
            userId: member.user.id,
            userName: member.user.username,
            userAvatar: member.displayAvatarURL(),
            joinDate: Date.now(),
            messagesCount: 0,
            numberOfJoin: 1,
            invites: 0,
            ticketStaff: 0,
            ticketPlayer: 0,
            ticketSupport: 0,
            ticketRP: 0,
        });

        userCreate.save();
        }else{
            user.numberOfJoin ++;
            user.save();
        }
    }

}