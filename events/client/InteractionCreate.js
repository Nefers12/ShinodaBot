const dotenv = require('dotenv'); dotenv.config();
const { Guild, User} = require('../../db/models/index');
const { MessageEmbed, MessageActionRow, MessageButton  } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    once : false,
    async execute(client, interaction) {
        if(interaction.isCommand()){
            const cmd = client.commands.get(interaction.commandName);
            if(!cmd) return interaction.reply(`Cette commande n'xiste pas !`);

            if(!interaction.member.permissions.has(cmd.permissions)) return interaction.reply(`Vous n'avez pas la permission d'exécuter cette commande !`);

            if(interaction.channel.id == !cmd.channel || undefined) return interaction.reply({content: `Cette commande ne peut être exécutée que dans le salon <#${cmd.channel}> !`,ephemeral:true});

            cmd.runSlash(client, interaction);
        }

        if(interaction.isButton()){

            let dbToUse =[];
            let row='';
            let textToDisplay = '';
            let type ='';

            const rowTicket = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Fermer le ticket')
                    .setStyle('DANGER'));

            const rowPlayerTicket = new MessageActionRow()
            .addComponents(
                    new MessageButton()
                        .setLabel('Fermer le ticket')
                        .setStyle('DANGER'),
                        new MessageButton()
                        .setCustomId(`Whitelist`) 
                        .setLabel('Whitelist le joueur')
                        .setStyle('SUCCESS'));


            const guild = await Guild.findOne({ guildId: interaction.guild.id });
            const user = await User.findOne({ userId: interaction.user.id });

            switch(interaction.customId){
                case 'playertickets':
                    dbToUse = ['playerTickets','playerTicketCategory'];
                    row = rowPlayerTicket;
                    row.components[0].setCustomId(`Closeplayertickets`)
                    type = 'ticketPlayer';
                    textToDisplay = `Voici ton ticket, c'est ici que tu dois poster ta candidature qui sera examinée par notre équipe. Si tu as des questions n'hésite pas à les poser ici, un staff va te répondre dès que possible.\n\nSi tu veux fermer ton ticket, tu peux le faire à tout moment en cliquant sur le bouton ci-dessous.`;
                    dbUpdate(user,type,guild,dbToUse,row,textToDisplay);

                    break;
                case 'stafftickets':
                    dbToUse = ['staffTickets','staffTicketCategory'];
                    type = 'ticketStaff';
                    row = rowTicket;
                    row.components[0].setCustomId(`Closestafftickets`)
                    textToDisplay = `Voici ton ticket, c'est ici que tu dois poster ta candidature qui sera examinée par notre équipe. Si tu as des questions n'hésite pas à les poser ici, un staff va te répondre dès que possible.\n\nSi tu veux fermer ton ticket, tu peux le faire à tout moment en cliquant sur le bouton ci-dessous.`;
                    dbUpdate(user,type,guild,dbToUse,row,textToDisplay);
                    break;
                case 'supporttickets':
                    dbToUse = ['supportTickets','supportTicketCategory'];
                    type = 'ticketSupport';
                    row = rowTicket;
                    row.components[0].setCustomId(`Closesupporttickets`)
                    textToDisplay = `Voici ton ticket, c'est ici que tu dois faire ta demande qui sera examinée par notre équipe. Si tu as des questions n'hésite pas à les poser ici, un staff va te répondre dès que possible.\n\nSi tu veux fermer ton ticket, tu peux le faire à tout moment en cliquant sur le bouton ci-dessous.`;
                    dbUpdate(user,type,guild,dbToUse,row,textToDisplay);
                    break;
                case 'demanderp':
                        dbToUse = ['demandeRP','demandeRPCategory'];
                        type = 'ticketRP';
                        row = rowTicket;
                        row.components[0].setCustomId(`Closedemanderp`)
                        textToDisplay = `Voici ton ticket, c'est ici que tu dois faire ta demande RP qui sera examinée par notre équipe. Si tu as des questions n'hésite pas à les poser ici, un staff va te répondre dès que possible.\n\nSi tu veux fermer ton ticket, tu peux le faire à tout moment en cliquant sur le bouton ci-dessous.`;
                        dbUpdate(user,type,guild,dbToUse,row,textToDisplay);
                        break;
                case 'Closeplayertickets':
                    row = rowPlayerTicket;
                    row.components[0].setDisabled(true)
                    row.components[0].setCustomId('Closedisabled')
                    row.components[1].setDisabled(true)
                    row.components[1].setCustomId('Wldisabled')
                    closeTicket(row)
                    break;
                case 'Closestafftickets':
                    row = rowTicket;
                    row.components[0].setDisabled(true)
                    row.components[0].setCustomId('Closedisabled')
                    closeTicket(row)
                    break;
                case 'Closesupporttickets':
                    row = rowTicket;
                    row.components[0].setDisabled(true)
                    row.components[0].setCustomId('Closedisabled')
                    closeTicket(row)
                    break;
                case 'Closedemanderp':
                    row = rowTicket;
                    row.components[0].setDisabled(true)
                    row.components[0].setCustomId('Closedisabled')
                    closeTicket(row)
            }

            async function dbUpdate(user,type,guild,dbToUse,row,textToDisplay){

                let max = 0;
                
                switch(type){
                    case 'ticketSupport':
                        max = 3;
                    break;
                    default:
                        max = 1;
                    break;
                }
                if(user[type] == max){
                    return interaction.reply({content : `Vous avez atteint le nombre maximum de ticket dans cette catégorie !`, ephemeral:true});
                }else{
                    interaction.reply({content : `Ticket créé`, ephemeral:true})
                    createTicket(guild,dbToUse,row,textToDisplay)
                    user[type] = +user[type] + 1;
                    user.save();
                }
                
            }

            async function closeTicket(row){

                const ticketEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`${interaction.message.embeds[0].description}`)
                .setAuthor({ name : interaction.message.embeds[0].author.name,iconURL: interaction.message.embeds[0].author.iconURL})
                interaction.channel.setParent(guild.channels.closedTicketsCategory);
                interaction.message.edit({ embeds:[ticketEmbed],components: [row] });
                interaction.reply({content: `Ticket fermé`, ephemeral:true});
            }

            async function createTicket(guild,dbToUse,row,textToDisplay){

                const channel = await interaction.guild.channels.create(`Ticket de ${interaction.user.username}`, {
                    type: 'text',
                    parent: guild.plugins[dbToUse[0]][dbToUse[1]],
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: interaction.member.id,
                            allow: ['VIEW_CHANNEL'],
                        },
                    ],
                }).then(async (channel) => {
                    const ticketEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor({name: `Ticket de ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
                    .setDescription(`${textToDisplay}`)
        
                    channel.send({content: `${interaction.user}` ,embeds: [ticketEmbed], components: [row]});
                })
            }
                
        }
    }
}