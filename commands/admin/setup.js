const { Guild } = require('../../db/models/index');
const { MessageEmbed, MessageActionRow, MessageButton  } = require('discord.js');

module.exports = {
    name: "setup",
    description: "setup the guild",
    permissions: ['BAN_MEMBERS'],
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
                },
                {
                    name: "partenariat",
                    description: "Partenariat channel",
                    type: 7
                },
                {
                    name: "playerticketcategory",
                    description: "playerTicket Category",
                    type: 7
                },
                {
                    name: "staffticketcategory",
                    description: "staffTicket Category",
                    type: 7
                },
                {
                    name: "supportticketcategory",
                    description: "supportTicket Category",
                    type: 7
                },
                {
                    name: "demanderpcategory",
                    description: "DemandeRP Category",
                    type: 7
                },
                {
                    name: "closedticketscategory",
                    description: "closedTickets Category",
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
                    type: 5
                },
                {
                    name: "stafftickets",
                    description: "staffTickets",
                    type: 5
                },
                {
                    name: "supporttickets",
                    description: "supportTickets",
                    type: 5
                },
                {
                    name: "demanderp",
                    description: "demanderp",
                    type: 5
                },
                {
                    name: "antiraid",
                    description: "antiRaid",
                    type: 5
                },
            ]
        }
    ],
    runSlash: async (client, interaction) => {

        let module = 0;
        const guild = await Guild.findOne({ guildId: interaction.guild.id });

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
                case "demanderp":
                    module = 1;
                break;
                case "antiraid":
                    module = 1;
                break;
        }
    }

    switch(module){
        case 0:
        
        const chan = interaction.options._hoistedOptions;

        for(i in chan){
            switch (chan[i].name){
                case "logs":
                    guild.channels.logs = chan[i].value;
                    break;
                case "question":
                    guild.channels.question = chan[i].value;
                    break;
                case "suggestion":
                    guild.channels.suggestion = chan[i].value;
                    break;
                case "join":
                    guild.channels.join = chan[i].value;
                    break;
                case "candidature":
                    guild.channels.candidature = chan[i].value;
                    break;
                case "tickets":
                    guild.channels.tickets = chan[i].value;
                    break;
                case "boost":
                    guild.channels.boost = chan[i].value;
                    break;
                case "partenariat":
                    guild.channels.partenariat = chan[i].value;
                    break;
                case "playerticketcategory":
                    guild.plugins.playerTickets.playerTicketCategory = chan[i].value;
                    break;
                case "staffticketcategory":
                    guild.plugins.staffTickets.staffTicketCategory = chan[i].value;
                    break;
                case "supportticketcategory":
                    guild.plugins.supportTickets.supportTicketCategory = chan[i].value;
                    break;
                case "closedticketscategory":
                    guild.channels.closedTicketsCategory = chan[i].value;
                    break;
                case "demanderpcategory":
                    guild.plugins.demandeRP.demandeRPCategory = chan[i].value;
                    break;
            }
            
        }

            guild.save();

            const setupChanEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Liste des channels`)
                .setDescription(`Logs: <#${guild.channels.logs}> \nQuestion: <#${guild.channels.question}> \nSuggestion: <#${guild.channels.suggestion}> \nJoin: <#${guild.channels.join}> \nCandidature: <#${guild.channels.candidature}> \nTickets: <#${guild.channels.tickets}> \nBoost: <#${guild.channels.boost}> \nPartenariat: <#${guild.channels.partenariat}> \nPlayerTicketCategory: <#${guild.plugins.playerTickets.playerTicketCategory}> \nStaffTicketCategory: <#${guild.plugins.staffTickets.staffTicketCategory}> \nSupportTicketCategory: <#${guild.plugins.supportTickets.supportTicketCategory}> \nClosedTicketsCategory: <#${guild.channels.closedTicketsCategory}> \nDemandeRPCategory: <#${guild.plugins.demandeRP.demandeRPCategory}>`)

            interaction.reply({embeds: [setupChanEmbed], ephemeral: true});
            

        

        break;

        case 1:

            let chanToSend = '';
            let dbTosend = '';
            let candidMsg = '';

            const plugin = interaction.options._hoistedOptions;
    
            for(i in plugin){
                switch (plugin[i].name) {
                    case "playertickets":
                        chanToSend = guild.channels.candidature;
                        dbTosend = 'playerTickets'
                        candidMsg = 'Ticket de candidature RP'
                        await updateCandidMsg(guild,plugin[i],chanToSend,dbTosend,candidMsg);

                    break;
                    case "stafftickets":
                        chanToSend = guild.channels.candidature;
                        dbTosend = 'staffTickets'
                        candidMsg = 'Ticket de candidature Staff'
                        await updateCandidMsg(guild,plugin[i],chanToSend,dbTosend,candidMsg);
                    break;
                    case "supporttickets":
                        chanToSend = guild.channels.tickets;
                        dbTosend = 'supportTickets';
                        candidMsg = 'Contacter le Support'
                        await updateCandidMsg(guild,plugin[i],chanToSend,dbTosend,candidMsg);
                    break;
                    case "demanderp":
                        chanToSend = guild.channels.tickets;
                        dbTosend = 'demandeRP';
                        candidMsg = 'Faire une demande RP'
                        await updateCandidMsg(guild,plugin[i],chanToSend,dbTosend,candidMsg);
                    break;
                    case "antiraid":
                        guild.plugins.antiRaid.enable = plugin[i].value;
                    break;
                }
                
            }

            async function updateCandidMsg(guild,plugin,chanToSend,dbTosend,candidMsg){

                if(plugin.value == guild.plugins[dbTosend].enabled)return;

                const row = new MessageActionRow()
                    .addComponents(
				        new MessageButton()
					        .setCustomId(`${plugin.name}`)
					        .setLabel('📩')
					        .setStyle('PRIMARY'));


                const ticketEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`${candidMsg}`)
                .setDescription(`Pour créer un ticket réagis avec 📩`)


                guild.plugins[dbTosend].enabled = plugin.value;
                if(plugin.value){
                    interaction.guild.channels.cache.get(chanToSend).send({embeds: [ticketEmbed], components: [row]})
                    .then(m => {
                        guild.plugins[dbTosend].messageID = `${m.id}`;
                        guild.save();
                });
                }else{
                    msg = await interaction.guild.channels.cache.get(chanToSend).messages.fetch(guild.plugins[dbTosend].messageID);
                    msg.delete();
                    guild.plugins[dbTosend].messageID = '';
                }

            }

            guild.save();

            let setupPlugEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Statut des pluggins`)
                .setDescription(`PlayerTickets: ${guild.plugins.playerTickets.enabled ? ":white_check_mark:" : ":x: "} \nStaffTickets: ${guild.plugins.staffTickets.enabled ? ":white_check_mark:" : ":x: "} \nSupportTickets: ${guild.plugins.supportTickets.enabled ? ":white_check_mark:" : ":x: "} \nAntiRaid: ${guild.plugins.antiRaid.enable ? ":white_check_mark:" : ":x: "}`)

            interaction.reply({embeds: [setupPlugEmbed], ephemeral: true});

        break;
        
    }
}
}