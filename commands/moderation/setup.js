const { Guild } = require('../../db/models/index');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "setup",
    description: "setup the guild",
    options: [
        {
            name: "channels",
            description: "setup channels",
            type: 1,
            options: [
                {
                    name: "logs",
                    description: "Logs channel",
                    type: 7
                },
                {
                    name: "question",
                    description: "Question channel",
                    type: 7
                },                {
                    name: "suggestion",
                    description: "Suggestion channel",
                    type: 7
                },
                {
                    name: "join",
                    description: "Join channel",
                    type: 7
                },                {
                    name: "candidature",
                    description: "Candidature channel",
                    type: 7
                },
                {
                    name: "tickets",
                    description: "Tickets channel",
                    type: 7
                },
                {
                    name: "boost",
                    description: "Boost channel",
                    type: 7
                }
            ]
        },{
            name: "pluggins",
            description: "setup channels",
            type: 1,
            options: [
                {
                    name: "playertickets",
                    description: "playerTickets",
                    type: 7
                },
                {
                    name: "stafftickets",
                    description: "staffTickets",
                    type: 7
                },                {
                    name: "supporttickets",
                    description: "supportTickets",
                    type: 7
                },
                {
                    name: "antiraid",
                    description: "antiRaid",
                    type: 7
                }
            ]
        }
    ],
    runSlash: async (client, interaction) => {

        let module = 0;

        for(i in interaction.options._hoistedOptions){
            switch(interaction.options._hoistedOptions[i].name){
                case "playertickets":
                    module = 1;
                break;
                case "stafftickets":
                    module = 1;
                break;
                case "supporttickets":
                    module = 1;
                break;
                case "antiraid":
                    module = 1;
                break;
        }
    }

    switch(module){
        case 0:
        const guild = await Guild.findOne({ guildId: interaction.guild.id });
        const chan = interaction.options._hoistedOptions;
        const guildCreate = await new Guild({
            guildId: interaction.guild.id,
            channels: {
                logs: '',
                question: '',
                suggestion: '',
                join: '',
                candidature: '',
                tickets: '',
                boost: '',
            }
        });

        for(i in chan){

            switch (chan[i].name) {
                case "logs":
                    if(guild)guild.channels.logs = chan[i].value;
                    guildCreate.channels.logs = chan[i].value;
                    break;
                case "question":
                    if(guild)guild.channels.question = chan[i].value;
                    guildCreate.channels.question = chan[i].value;
                    break;
                case "suggestion":
                    if(guild)guild.channels.suggestion = chan[i].value;
                    guildCreate.channels.suggestion = chan[i].value;
                    break;
                case "join":
                    if(guild)guild.channels.join = chan[i].value;
                    guildCreate.channels.join = chan[i].value;
                    break;
                case "candidature":
                    if(guild)guild.channels.candidature = chan[i].value;
                    guildCreate.channels.candidature = chan[i].value;
                    break;
                case "tickets":
                    if(guild)guild.channels.tickets = chan[i].value;
                    guildCreate.channels.tickets = chan[i].value;
                    break;
                case "boost":
                    if(guild)guild.channels.boost = chan[i].value;
                    guildCreate.channels.boost = chan[i].value;
                    break;
            }
            
        }

        if(!guild){

            guildCreate.save();

            const setupEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Liste des channels`)
                .setDescription(`Logs: <#${guildCreate.channels.logs}> \nQuestion: <#${guildCreate.channels.question}> \nSuggestion: <#${guildCreate.channels.suggestion}> \nJoin: <#${guildCreate.channels.join}> \nCandidature: <#${guildCreate.channels.candidature}> \nTickets: <#${guildCreate.channels.tickets}> \nBoost: <#${guildCreate.channels.boost}>`)

            interaction.reply({embeds: [setupEmbed]});

        }else{

            guild.save();

            const setupEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Liste des channels`)
                .setDescription(`Logs: <#${guild.channels.logs}> \nQuestion: <#${guild.channels.question}> \nSuggestion: <#${guild.channels.suggestion}> \nJoin: <#${guild.channels.join}> \nCandidature: <#${guild.channels.candidature}> \nTickets: <#${guild.channels.tickets}> \nBoost: <#${guild.channels.boost}>`)

            interaction.reply({embeds: [setupEmbed]});

        }

        break;

        case 1:
         console.log("plugin");
        break;
        
    }
}
}