const dotenv = require('dotenv'); dotenv.config();
const { User } = require('../../db/models/index');
const { Cache } = require('../../index');
const { Guild } = require('../../db/models/index');
const guild = require('../../db/models/guild.js');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    once : false,
    async execute(client, member) {

        const user = await User.findOne({ userId: member.id });

        guild.channels = Cache.get( "channels" );
        guild.roles = Cache.get( "roles" );
        if(!guild){
            guild = await Guild.findOne({ guildId: member.guild.id });
            Cache.set( "channels", guild.channels);
            Cache.set( "roles", guild.roles);
        };

        let rdm = Math.floor(Math.random() * 2);
        const file = new MessageAttachment(`./img/${rdm}.png`);

        const welcomeEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`Bienvenue à toi <@${member.id}> sur le serveur **${member.guild.name}**\nTu fais parti des ${member.guild.memberCount} personnes présentes sur le serveur !\n\nN'oublie pas de lire les règles !`)
            .setAuthor({ name : member.user.username,iconURL: member.displayAvatarURL()})
            .setImage(`attachment://${rdm}.png`);

        const logsEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${member.user.username} a rejoint le serveur`)
            .setDescription(`création du compte : Le ${member.user.createdAt.getDate()}/${member.user.createdAt.getMonth()}/${member.user.createdAt.getFullYear()}`)


            member.guild.channels.cache.get(guild.channels.join).send({embeds: [welcomeEmbed], files: [file]});
            member.guild.channels.cache.get(guild.channels.logs).send({embeds: [logsEmbed]});
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