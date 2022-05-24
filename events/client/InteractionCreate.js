const dotenv = require('dotenv'); dotenv.config();
const { Guild, User} = require('../../db/models/index');
const { MessageEmbed, MessageActionRow, MessageButton  } = require('discord.js');
const { konoha, kiri, suna,  kumo, iwa } = require('../../config/array');

module.exports = {
    name: 'interactionCreate',
    once : false,
    async execute(client, interaction) {
        if(interaction.isCommand()){
            const cmd = client.commands.get(interaction.commandName);
            if(!cmd) return interaction.reply(`Cette commande n'existe pas !`);

            if(!interaction.member.permissions.has(cmd.permissions)) return interaction.reply({content :`Vous n'avez pas la permission d'exécuter cette commande !`,ephemeral : true});

            if(interaction.channel.id == !cmd.channel || undefined) return interaction.reply({content: `Cette commande ne peut être exécutée que dans le salon <#${cmd.channel}> !`,ephemeral:true});

            cmd.runSlash(client, interaction);
        }

        if(interaction.isButton()){

            let dbToUse =[];
            let row='';
            let textToDisplay = '';
            let type ='';
            let id='';

            const wlEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`Candidature acceptée !`)

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

            const rowWhitelist = new MessageActionRow()
            .addComponents(
                    new MessageButton()
                        .setLabel('Konoha')
                        .setStyle('SUCCESS')
                        .setCustomId(`Konoha`),
                        new MessageButton()
                        .setLabel('Kiri')
                        .setStyle('SUCCESS')
                        .setCustomId(`Kiri`),
                        new MessageButton()
                        .setLabel('Suna')
                        .setStyle('SUCCESS')
                        .setCustomId(`Suna`),
                        new MessageButton()
                        .setLabel('Kumo')
                        .setStyle('SUCCESS')
                        .setCustomId(`Kumo`),
                        new MessageButton()
                        .setLabel('Iwa')
                        .setStyle('SUCCESS')
                        .setCustomId(`Iwa`),
                        );

            const rowWhitelist2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                        .setLabel('Autres')
                        .setStyle('SUCCESS')
                        .setCustomId(`Autres`));

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
                    type = 'ticketPlayer';
                    row = rowPlayerTicket;
                    row.components[0].setDisabled(true)
                    row.components[0].setCustomId('Closedisabled')
                    row.components[1].setDisabled(true)
                    row.components[1].setCustomId('Wldisabled')
                    closeTicket(row,type)
                    break;
                case 'Closestafftickets':
                    type = 'ticketStaff';
                    row = rowTicket;
                    row.components[0].setDisabled(true)
                    row.components[0].setCustomId('Closedisabled')
                    closeTicket(row,type)
                    break;
                case 'Closesupporttickets':
                    type = 'ticketSupport';
                    row = rowTicket;
                    row.components[0].setDisabled(true)
                    row.components[0].setCustomId('Closedisabled')
                    closeTicket(row,type)
                    break;
                case 'Closedemanderp':
                    type = 'ticketRP';
                    row = rowTicket;
                    row.components[0].setDisabled(true)
                    row.components[0].setCustomId('Closedisabled')
                    closeTicket(row,type)
                    break;
                case 'Whitelist':
                    if(!interaction.member.roles.cache.has(guild.roles.recruteur))return;
                    interaction.message.edit({embeds:[wlEmbed],components:[rowWhitelist,rowWhitelist2]})
                    interaction.deferUpdate()
                    break;
                case 'Konoha':
                    crateClanButtons(konoha);
                    interaction.deferUpdate()
                    break;
                case 'Kiri':
                    crateClanButtons(kiri);
                    interaction.deferUpdate()
                    break;
                case 'Suna':
                    crateClanButtons(suna);
                    interaction.deferUpdate()
                    break;
                case 'Kumo':
                    crateClanButtons(kumo);
                    interaction.deferUpdate()
                    break;
                case 'Iwa':
                    crateClanButtons(iwa);
                    interaction.deferUpdate()
                    break;
                case 'Autres':
                    break;
                case 'Uchiwa':
                    editClans("uchiwa","konoha");
                    interaction.deferUpdate()
                    break;
                case 'Hyuga':
                    editClans("hyuga","konoha");
                    interaction.deferUpdate()
                    break;
                case 'Senju':
                    editClans("senju","konoha");
                    interaction.deferUpdate()
                    break;
                case 'Nara':
                    editClans("nara","konoha");
                    interaction.deferUpdate()
                    break;
                case 'Uzumaki':
                    editClans("uzumaki","konoha");
                    interaction.deferUpdate()
                    break;
                case 'Momochi':
                    editClans("momochi","kiri");
                    interaction.deferUpdate()
                    break;
                case 'Yuki':
                    editClans("yuki","kiri");
                    interaction.deferUpdate()
                    break;
                case 'Kaguya':
                    editClans("kaguya","kiri");
                    interaction.deferUpdate()
                    break;
                case 'Karatashi':
                    editClans("karatashi","kiri");
                    interaction.deferUpdate()
                    break;
                case 'Hoshigaki':
                    editClans("hoshigaki","kiri");
                    interaction.deferUpdate()
                    break;
                case 'Shirogane':
                    editClans("shirogane","suna");
                    interaction.deferUpdate()
                    break;
                case 'Kibin':
                    editClans("kibin","suna");
                    interaction.deferUpdate()
                    break;
                case 'Tatsumaki':
                    editClans("tatsumaki","suna");
                    interaction.deferUpdate()
                    break;
                case 'Taku':
                    editClans("taku","suna");
                    interaction.deferUpdate()
                    break;
                case 'Hôki':
                    editClans("hôki","suna");
                    interaction.deferUpdate()
                    break;
                case 'Chinoike':
                    editClans("chinoike","kumo");
                    interaction.deferUpdate()
                    break;
                case 'Arashi':
                    editClans("arashi","kumo");
                    interaction.deferUpdate()
                    break;
                case 'Yotsuki':
                    editClans("yotsuki","kumo");
                    interaction.deferUpdate()
                    break;
                case 'Fujiwara':
                    editClans("fujiwara","kumo");
                    interaction.deferUpdate()
                    break;
                case 'Hatori':
                    editClans("hatori","kumo");
                    interaction.deferUpdate()
                    break;
                case 'Kamizuru':
                    editClans("kamizuru","iwa");
                    interaction.deferUpdate()
                    break;
                case 'Motori':
                    editClans("motori","iwa");
                    interaction.deferUpdate()
                    break;
                case 'Bakuhatsu':
                    editClans("bakuhatsu","iwa");
                    interaction.deferUpdate()
                    break;
                case 'Bakuho':
                    editClans("bakuho","iwa");
                    interaction.deferUpdate()
                    break;
                case 'Kaemuri':
                    editClans("kaemuri","iwa");
                    interaction.deferUpdate()
                    break;
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
                    interaction.deferUpdate()
                    createTicket(guild,dbToUse,row,textToDisplay)
                    user[type] = +user[type] + 1;
                    user.save();
                }
                
            }

            async function closeTicket(row,type){

                const ticketEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`${interaction.message.embeds[0].description}`)
                .setAuthor({ name : interaction.message.embeds[0].author.name,iconURL: interaction.message.embeds[0].author.iconURL})
                interaction.channel.setParent(guild.channels.closedTicketsCategory);
                interaction.message.edit({ embeds:[ticketEmbed],components: [row] });
                interaction.deferUpdate()

                const usr = await User.findOne({ userId: interaction.channel.topic });
                usr[type] = +usr[type] - 1;
                usr.save();
                interaction.channel.setTopic(null);
            }

            async function createTicket(guild,dbToUse,row,textToDisplay){

                const channel = await interaction.guild.channels.create(`Ticket de ${interaction.user.username}`, {
                    type: 'text',
                    topic:`${interaction.user.id}`,
                    parent: guild.plugins[dbToUse[0]][dbToUse[1]],
                }).then(async (channel) => {
                    await channel.lockPermissions()
                    channel.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: true });
                    const ticketEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor({name: `Ticket de ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
                    .setDescription(`${textToDisplay}`)
        
                    channel.send({content: `${interaction.user}` ,embeds: [ticketEmbed], components: [row]});
                })
            }

            async function crateClanButtons(clan){

                if(!interaction.member.roles.cache.has(guild.roles.recruteur))return;

                const rowclan = new MessageActionRow()
                for(i in clan){
                    rowclan.addComponents(
                        new MessageButton()
                                .setLabel(clan[i])
                                .setStyle('SUCCESS')
                                .setCustomId(clan[i]))
                            }
                
                interaction.message.edit({embeds:[wlEmbed],components:[rowclan]})
            }

            async function editClans(clan,village){
                interaction.message.edit({embeds:[wlEmbed],components:[]})
                guild.recensement[village][clan].place++;
                guild.recensement[village].place++;

                const recensementEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Recensement`)
                .setDescription(`**Ici se trouve les places disponibles dans les villages/clans**`)
                .addField(`Konoha : ${guild.recensement.konoha.place}/${guild.recensement.konoha.placemax}`,"```"+ `Uchiwa : ${guild.recensement.konoha.uchiwa.place}/${guild.recensement.konoha.uchiwa.placemax}\nHyuga : ${guild.recensement.konoha.hyuga.place}/${guild.recensement.konoha.hyuga.placemax}\nSenju : ${guild.recensement.konoha.senju.place}/${guild.recensement.konoha.senju.placemax}\nNara : ${guild.recensement.konoha.nara.place}/${guild.recensement.konoha.nara.placemax}\nUzumaki : ${guild.recensement.konoha.uzumaki.place}/${guild.recensement.konoha.uzumaki.placemax}`+ "```")
                .addField(`Kiri : ${guild.recensement.kiri.place}/${guild.recensement.kiri.placemax}`,"```"+ `Momochi : ${guild.recensement.kiri.momochi.place}/${guild.recensement.kiri.momochi.placemax}\nYuki : ${guild.recensement.kiri.yuki.place}/${guild.recensement.kiri.yuki.placemax}\nKaguya : ${guild.recensement.kiri.kaguya.place}/${guild.recensement.kiri.kaguya.placemax}\nKaratashi : ${guild.recensement.kiri.karatashi.place}/${guild.recensement.kiri.karatashi.placemax}\nHoshigaki : ${guild.recensement.kiri.hoshigaki.place}/${guild.recensement.kiri.hoshigaki.placemax}`+ "```")
                .addField(`Suna : ${guild.recensement.suna.place}/${guild.recensement.suna.placemax}`,"```"+ `Shirogane : ${guild.recensement.suna.shirogane.place}/${guild.recensement.suna.shirogane.placemax}\nKibin : ${guild.recensement.suna.kibin.place}/${guild.recensement.suna.kibin.placemax}\nTatsumaki : ${guild.recensement.suna.tatsumaki.place}/${guild.recensement.suna.tatsumaki.placemax}\nTaku : ${guild.recensement.suna.taku.place}/${guild.recensement.suna.taku.placemax}\nHôki : ${guild.recensement.suna.hôki.place}/${guild.recensement.suna.hôki.placemax}`+ "```")
                .addField(`Kumo : ${guild.recensement.kumo.place}/${guild.recensement.kumo.placemax}`,"```"+ `Chinoike : ${guild.recensement.kumo.chinoike.place}/${guild.recensement.kumo.chinoike.placemax}\nArashi : ${guild.recensement.kumo.arashi.place}/${guild.recensement.kumo.arashi.placemax}\nYotsuki : ${guild.recensement.kumo.yotsuki.place}/${guild.recensement.kumo.yotsuki.placemax}\nFujiwara : ${guild.recensement.kumo.fujiwara.place}/${guild.recensement.kumo.fujiwara.placemax}\nHatori : ${guild.recensement.kumo.hatori.place}/${guild.recensement.kumo.hatori.placemax}`+ "```")
                .addField(`Iwa : ${guild.recensement.iwa.place}/${guild.recensement.iwa.placemax}`,"```"+ `Kamizuru : ${guild.recensement.iwa.kamizuru.place}/${guild.recensement.iwa.kamizuru. placemax}\nMotori : ${guild.recensement.iwa.motori.place}/${guild.recensement.iwa.motori.placemax}\nBakuhatsu : ${guild.recensement.iwa.bakuhatsu.place}/${guild.recensement.iwa.bakuhatsu.placemax}\nBakuho : ${guild.recensement.iwa.bakuho.place}/${guild.recensement.iwa.bakuho.placemax}\nKaemuri : ${guild.recensement.iwa.kaemuri.place}/${guild.recensement.iwa.kaemuri.placemax}`+ "```")
    
                await guild.save()
                msg = await interaction.guild.channels.cache.get(guild.channels.recensement).messages.fetch(guild.plugins.recensementMsg);
                msg.edit({embeds:[recensementEmbed]});

                interaction.channel.setParent(guild.channels.acceptedTicketsCategory, true );

                const usr = await User.findOne({ userId: interaction.channel.topic });
                usr.ticketPlayer = +usr.ticketPlayer - 1;
                usr.save();

                interaction.guild.members.fetch(interaction.channel.topic).then( member =>{
                    if(!member.roles.cache.has(guild.roles[village]))member.roles.add(guild.roles[village]);
                    interaction.channel.permissionOverwrites.edit( interaction.channel.topic, { VIEW_CHANNEL: true });
                });
            
            }
                
        }
    }
}