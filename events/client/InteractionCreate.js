const dotenv = require('dotenv'); dotenv.config();
const { Guild } = require('../../db/models/index');
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

            const rowTicket = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(`Close`)
                    .setLabel('Fermer le ticket')
                    .setStyle('DANGER'));

            const rowPlayerTicket = new MessageActionRow()
            .addComponents(
                    new MessageButton()
                        .setCustomId(`Close`)
                        .setLabel('Fermer le ticket')
                        .setStyle('DANGER'),
                        new MessageButton()
                        .setCustomId(`Whitelist`) 
                        .setLabel('Whitelist le joueur')
                        .setStyle('SUCCESS'));





            const guild = await Guild.findOne({ guildId: interaction.guild.id });

            switch(interaction.customId){
                case 'playertickets':
                    dbToUse = ['playerTickets','playerTicketCategory'];
                    row = rowPlayerTicket;
                    textToDisplay = `Voici ton ticket, c'est ici que tu dois poster ta candidature qui sera examinée par notre équipe. Si tu as des questions n'hésite pas à les poser ici, un staff va te répondre dès que possible.\n\nSi tu veux fermer ton ticket, tu peux le faire à tout moment en cliquant sur le bouton ci-dessous.`;
                    createTicket(guild,dbToUse,row,textToDisplay)
                    break;
                case 'stafftickets':
                    dbToUse = ['staffTickets','staffTicketCategory'];
                    row = rowTicket;
                    textToDisplay = `Voici ton ticket, c'est ici que tu dois poster ta candidature qui sera examinée par notre équipe. Si tu as des questions n'hésite pas à les poser ici, un staff va te répondre dès que possible.\n\nSi tu veux fermer ton ticket, tu peux le faire à tout moment en cliquant sur le bouton ci-dessous.`;
                    createTicket(guild,dbToUse,row,textToDisplay)
                    break;
                case 'supporttickets':
                    dbToUse = ['supportTickets','supportTicketCategory'];
                    row = rowTicket;
                    textToDisplay = `Voici ton ticket, c'est ici que tu dois faire ta demande qui sera examinée par notre équipe. Si tu as des questions n'hésite pas à les poser ici, un staff va te répondre dès que possible.\n\nSi tu veux fermer ton ticket, tu peux le faire à tout moment en cliquant sur le bouton ci-dessous.`;
                    createTicket(guild,dbToUse,row,textToDisplay)
                    break;
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