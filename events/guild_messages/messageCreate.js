const dotenv = require('dotenv'); dotenv.config();
var {banlist, messagesCount} = require('../../config/array.js');
const { Cache } = require('../../index');
const { Guild } = require('../../db/models/index');
const guild = require('../../db/models/guild.js');
const { MessageEmbed } = require('discord.js');



module.exports = {
    name: 'messageCreate',
    once : false,
    async execute(client, message) {

        if(message.author.bot) return;
        if(message.channel.type === "DM") return;


        guild.channels = Cache.get( "channels" );
        if(!guild){
            guild = await Guild.findOne({ guildId: message.guild.id });
            Cache.set( "channels", guild.channels);
        };


        if(message.channel != guild.channels.partenariat && message.content.includes('https://discord.gg/')) {
            message.delete();
            message.guild.channels.cache.get(guild.channels.logs).send(`${message.author} a tenté d'envoyer une invitation dans le salon ${message.channel}`);
        }

        if(!messagesCount[message.author.id]){
            messagesCount[message.author.id] = 1;
        }else{
            messagesCount[message.author.id] = +messagesCount[message.author.id] + 1;
        }

        banlist.some(word => { 
            if(message.content.toLowerCase().includes(word)){

                const logsEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`${message.author.username} a utilisé le mot interdit "${word}" dans la phrase :\n `+"```"+ message.content +"```")
                .setAuthor({ name : message.author.username,iconURL: message.author.displayAvatarURL()})
                .setDescription(`Pour voir le message, veuillez cliquer [ici](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)

                message.guild.channels.cache.get(guild.channels.logs).send({embeds: [logsEmbed]})
            }
        });

    },
};