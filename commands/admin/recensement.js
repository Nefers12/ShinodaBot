const { Guild, User } = require('../../db/models/index');
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'recensement',
    permissions: ['SEND_MESSAGES'],
    description : 'permet d\'éditer les options de recensement',
    options: [
        {
            name: "villagemax",
            description: "places dans le village",
            type: 1,
            options: [
                {
                    name: "konoha",
                    description: "konoha",
                    type: 10
                },
                {
                    name: "kiri",
                    description: "kiri",
                    type: 10
                },{
                    name: "suna",
                    description: "suna",
                    type: 10
                },
                {
                    name: "kumo",
                    description: "kumo",
                    type: 10
                },{
                    name: "iwa",
                    description: "iwa",
                    type: 10
                },
                {
                    name: "autres",
                    description: "autre",
                    type: 10
                },
            ]
        },
        {
            name: "clansmax",
            description: "places dans le village",
            type: 1,
            options: [
                {
                    name: "uchiwa",
                    description: "uchiwa",
                    type: 10
                },
                {
                    name: "hyuga",
                    description: "hyuga",
                    type: 10
                },{
                    name: "senju",
                    description: "senju",
                    type: 10
                },
                {
                    name: "nara",
                    description: "nara",
                    type: 10
                },{
                    name: "uzumaki",
                    description: "uzumaki",
                    type: 10
                },
                {
                    name: "momochi",
                    description: "momochi",
                    type: 10
                },
                {
                    name: "yuki",
                    description: "yuki",
                    type: 10
                },{
                    name: "kaguya",
                    description: "kaguya",
                    type: 10
                },
                {
                    name: "karatashi",
                    description: "karatashi",
                    type: 10
                },{
                    name: "hoshigaki",
                    description: "hoshigaki",
                    type: 10
                },
                {
                    name: "chinoike",
                    description: "chinoike",
                    type: 10
                },
                {
                    name: "arashi",
                    description: "arashi",
                    type: 10
                },{
                    name: "yotsuki",
                    description: "yotsuki",
                    type: 10
                },
                {
                    name: "fujiwara",
                    description: "fujiwara",
                    type: 10
                },{
                    name: "hatori",
                    description: "hatori",
                    type: 10
                },
                {
                    name: "kamizuru",
                    description: "kamizuru",
                    type: 10
                },
                {
                    name: "motori",
                    description: "motori",
                    type: 10
                },
                {
                    name: "bakuhatsu",
                    description: "bakuhatsu",
                    type: 10
                },
                {
                    name: "bakuho",
                    description: "bakuho",
                    type: 10
                },{
                    name: "kaemuri",
                    description: "kaemuri",
                    type: 10
                },
                {
                    name: "shirogane",
                    description: "Shirogane",
                    type: 10
                },
                {
                    name: "kibin",
                    description: "Kibin",
                    type: 10
                },
                {
                    name: "tatsumaki",
                    description: "Tatsumaki",
                    type: 10
                },
                {
                    name: "taku",
                    description: "Taku",
                    type: 10
                },{
                    name: "hôki",
                    description: "Hôki",
                    type: 10
                },
            ]
        },
        {
            name: "village",
            description: "places dans le village",
            type: 1,
            options: [
                {
                    name: "konoha",
                    description: "konoha",
                    type: 10
                },
                {
                    name: "kiri",
                    description: "kiri",
                    type: 10
                },{
                    name: "suna",
                    description: "suna",
                    type: 10
                },
                {
                    name: "kumo",
                    description: "kumo",
                    type: 10
                },{
                    name: "iwa",
                    description: "iwa",
                    type: 10
                },
                {
                    name: "autres",
                    description: "autre",
                    type: 10
                },
            ]
        },
        {
            name: "clans",
            description: "places dans le village",
            type: 1,
            options: [
                {
                    name: "uchiwa",
                    description: "uchiwa",
                    type: 10
                },
                {
                    name: "hyuga",
                    description: "hyuga",
                    type: 10
                },{
                    name: "senju",
                    description: "senju",
                    type: 10
                },
                {
                    name: "nara",
                    description: "nara",
                    type: 10
                },{
                    name: "uzumaki",
                    description: "uzumaki",
                    type: 10
                },
                {
                    name: "momochi",
                    description: "momochi",
                    type: 10
                },
                {
                    name: "yuki",
                    description: "yuki",
                    type: 10
                },{
                    name: "kaguya",
                    description: "kaguya",
                    type: 10
                },
                {
                    name: "karatashi",
                    description: "karatashi",
                    type: 10
                },{
                    name: "hoshigaki",
                    description: "hoshigaki",
                    type: 10
                },
                {
                    name: "chinoike",
                    description: "chinoike",
                    type: 10
                },
                {
                    name: "arashi",
                    description: "arashi",
                    type: 10
                },{
                    name: "yotsuki",
                    description: "yotsuki",
                    type: 10
                },
                {
                    name: "fujiwara",
                    description: "fujiwara",
                    type: 10
                },{
                    name: "hatori",
                    description: "hatori",
                    type: 10
                },
                {
                    name: "kamizuru",
                    description: "kamizuru",
                    type: 10
                },
                {
                    name: "motori",
                    description: "motori",
                    type: 10
                },{
                    name: "bakuhatsu",
                    description: "bakuhatsu",
                    type: 10
                },
                {
                    name: "bakuho",
                    description: "bakuho",
                    type: 10
                },{
                    name: "kaemuri",
                    description: "kaemuri",
                    type: 10
                },
                {
                    name: "shirogane",
                    description: "Shirogane",
                    type: 10
                },
                {
                    name: "kibin",
                    description: "Kibin",
                    type: 10
                },
                {
                    name: "tatsumaki",
                    description: "Tatsumaki",
                    type: 10
                },
                {
                    name: "taku",
                    description: "Taku",
                    type: 10
                },{
                    name: "hôki",
                    description: "Hôki",
                    type: 10
                },
            ]
        },
        {
            name: "autre",
            description: "places dans le village",
            type: 1,
            options: [
                {
                    name: "autrekonoha",
                    description: "Autre konoha",
                    type: 10
                },
                {
                    name: "autrekiri",
                    description: "Autre kiri",
                    type: 10
                },
                {
                    name: "autresuna",
                    description: "Autre suna",
                    type: 10
                },
                {
                    name: "autrekumo",
                    description: "Autre kumo",
                    type: 10
                },
                {
                    name: "autreiwa",
                    description: "Autre iwa",
                    type: 10
                }
            ]
        },{
            name: "autremax",
            description: "places dans le village",
            type: 1,
            options: [
                {
                    name: "autrekonoha",
                    description: "Autre konoha max",
                    type: 10
                },
                {
                    name: "autrekiri",
                    description: "Autre kiri max",
                    type: 10
                },
                {
                    name: "autresuna",
                    description: "Autre suna max",
                    type: 10
                },
                {
                    name: "autrekumo",
                    description: "Autre kumo max",
                    type: 10
                },
                {
                    name: "autreiwa",
                    description: "Autre iwa max",
                    type: 10
                },
            ]
        },

    ],

    runSlash: async (client, interaction) => {

        const guild = await Guild.findOne({ guildId: interaction.guild.id });

        if(!interaction.member.roles.cache.has(guild.roles.recruteur))return interaction.reply({content: `Vous n'avez pas la permission d'éxécuter cette commande.`,ephemeral: true});

        let max = false;
        const module = interaction.options._subcommand
        const option = interaction.options._hoistedOptions;

        switch(module){
            case "villagemax":
                for(i in option){
                    guild.recensement[option[i].name].placemax = option[i].value
                }
                break;
            case "clansmax":
                for(i in option){
                    max = true;
                    clan(option[i],max)
                }
                break;
            case "village":
                for(i in option){
                    guild.recensement[option[i].name].place = option[i].value
                }
                break;
            case "clans":
                for(i in option){
                    max = false;
                    clan(option[i],max)
                }
                break;
            case "autre":
                for(i in option){
                    clan(option[i],max)
                }
                break;
            case "autremax":
                for(i in option){
                    max = true;
                    clan(option[i],max)
                }
                break;

        }

        async function clan(clan,max){
            switch(clan.name){
                case "uchiwa":
                    max ? guild.recensement.konoha[clan.name].placemax = clan.value : guild.recensement.konoha[clan.name].place = clan.value
                    break;
                case "hyuga":
                    max ? guild.recensement.konoha[clan.name].placemax = clan.value : guild.recensement.konoha[clan.name].place = clan.value
                    break;
                case "senju":
                    max ? guild.recensement.konoha[clan.name].placemax = clan.value : guild.recensement.konoha[clan.name].place = clan.value
                    break;
                case "nara":
                    max ? guild.recensement.konoha[clan.name].placemax = clan.value : guild.recensement.konoha[clan.name].place = clan.value
                    break;
                case "uzumaki":
                    max ? guild.recensement.konoha[clan.name].placemax = clan.value : guild.recensement.konoha[clan.name].place = clan.value
                    break;
                case "momochi":
                    max ? guild.recensement.kiri[clan.name].placemax = clan.value : guild.recensement.kiri[clan.name].place = clan.value
                    break;
                case "yuki":
                    max ? guild.recensement.kiri[clan.name].placemax = clan.value : guild.recensement.kiri[clan.name].place = clan.value
                    break;
                case "kaguya":
                    max ? guild.recensement.kiri[clan.name].placemax = clan.value : guild.recensement.kiri[clan.name].place = clan.value
                    break;
                case "karatashi":
                    max ? guild.recensement.kiri[clan.name].placemax = clan.value : guild.recensement.kiri[clan.name].place = clan.value
                    break;
                case "hoshigaki":
                    max ? guild.recensement.kiri[clan.name].placemax = clan.value : guild.recensement.kiri[clan.name].place = clan.value
                    break;
                case "shirogane":
                    max ? guild.recensement.suna[clan.name].placemax = clan.value : guild.recensement.suna[clan.name].place = clan.value
                    break;
                case "kibin":
                    max ? guild.recensement.suna[clan.name].placemax = clan.value : guild.recensement.suna[clan.name].place = clan.value
                    break;
                case "tatsumaki":
                    max ? guild.recensement.suna[clan.name].placemax = clan.value : guild.recensement.suna[clan.name].place = clan.value
                    break;
                case "taku":
                    max ? guild.recensement.suna[clan.name].placemax = clan.value : guild.recensement.suna[clan.name].place = clan.value
                    break;
                case "hôki":
                    max ? guild.recensement.suna[clan.name].placemax = clan.value : guild.recensement.suna[clan.name].place = clan.value
                    break;
                case "chinoike":
                    max ? guild.recensement.kumo[clan.name].placemax = clan.value : guild.recensement.kumo[clan.name].place = clan.value
                    break;
                case "arashi":
                    max ? guild.recensement.kumo[clan.name].placemax = clan.value : guild.recensement.kumo[clan.name].place = clan.value
                    break;
                case "yotsuki":
                    max ? guild.recensement.kumo[clan.name].placemax = clan.value : guild.recensement.kumo[clan.name].place = clan.value
                    break;
                case "fujiwara":
                    max ? guild.recensement.kumo[clan.name].placemax = clan.value : guild.recensement.kumo[clan.name].place = clan.value
                    break;
                case "hatori":
                    max ? guild.recensement.kumo[clan.name].placemax = clan.value : guild.recensement.kumo[clan.name].place = clan.value
                    break;
                case "kamizuru":
                    max ? guild.recensement.iwa[clan.name].placemax = clan.value : guild.recensement.iwa[clan.name].place = clan.value
                    break;
                case "motori":
                    max ? guild.recensement.iwa[clan.name].placemax = clan.value : guild.recensement.iwa[clan.name].place = clan.value
                    break;
                case "bakuhatsu":
                    max ? guild.recensement.iwa[clan.name].placemax = clan.value : guild.recensement.iwa[clan.name].place = clan.value
                    break;
                case "bakuho":
                    max ? guild.recensement.iwa[clan.name].placemax = clan.value : guild.recensement.iwa[clan.name].place = clan.value
                    break;
                case "kaemuri":
                    max ? guild.recensement.iwa[clan.name].placemax = clan.value : guild.recensement.iwa[clan.name].place = clan.value
                    break;
                case "autrekonoha":
                    max ? guild.recensement.konoha.autres.placemax = clan.value : guild.recensement.konoha.autres.place = clan.value
                    break;
                case "autrekiri":
                    max ? guild.recensement.kiri.autres.placemax = clan.value : guild.recensement.kiri.autres.place = clan.value
                    break;
                case "autresuna":
                    max ? guild.recensement.suna.autres.placemax = clan.value : guild.recensement.suna.autres.place = clan.value
                    break;
                case "autrekumo":
                    max ? guild.recensement.kumo.autres.placemax = clan.value : guild.recensement.kumo.autres.place = clan.value
                    break;
                case "autreiwa":
                    max ? guild.recensement.iwa.autres.placemax = clan.value : guild.recensement.iwa.autres.place = clan.value
                    break;
            }

        }

        const recensementEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Recensement`)
        .setDescription(`**Ici se trouve les places disponibles dans les villages/clans**`)
        .addField(`Konoha : ${guild.recensement.konoha.place}/${guild.recensement.konoha.placemax}`,"```"+ `Uchiwa : ${guild.recensement.konoha.uchiwa.place}/${guild.recensement.konoha.uchiwa.placemax}\nHyuga : ${guild.recensement.konoha.hyuga.place}/${guild.recensement.konoha.hyuga.placemax}\nSenju : ${guild.recensement.konoha.senju.place}/${guild.recensement.konoha.senju.placemax}\nNara : ${guild.recensement.konoha.nara.place}/${guild.recensement.konoha.nara.placemax}\nUzumaki : ${guild.recensement.konoha.uzumaki.place}/${guild.recensement.konoha.uzumaki.placemax}\nAutre : ${guild.recensement.konoha.autres.place}/${guild.recensement.konoha.autres.placemax}`+ "```")
        .addField(`Kiri : ${guild.recensement.kiri.place}/${guild.recensement.kiri.placemax}`,"```"+ `Momochi : ${guild.recensement.kiri.momochi.place}/${guild.recensement.kiri.momochi.placemax}\nYuki : ${guild.recensement.kiri.yuki.place}/${guild.recensement.kiri.yuki.placemax}\nKaguya : ${guild.recensement.kiri.kaguya.place}/${guild.recensement.kiri.kaguya.placemax}\nKaratashi : ${guild.recensement.kiri.karatashi.place}/${guild.recensement.kiri.karatashi.placemax}\nHoshigaki : ${guild.recensement.kiri.hoshigaki.place}/${guild.recensement.kiri.hoshigaki.placemax}\nAutre : ${guild.recensement.kiri.autres.place}/${guild.recensement.kiri.autres.placemax}`+ "```")
        .addField(`Suna : ${guild.recensement.suna.place}/${guild.recensement.suna.placemax}`,"```"+ `Shirogane : ${guild.recensement.suna.shirogane.place}/${guild.recensement.suna.shirogane.placemax}\nKibin : ${guild.recensement.suna.kibin.place}/${guild.recensement.suna.kibin.placemax}\nTatsumaki : ${guild.recensement.suna.tatsumaki.place}/${guild.recensement.suna.tatsumaki.placemax}\nTaku : ${guild.recensement.suna.taku.place}/${guild.recensement.suna.taku.placemax}\nHôki : ${guild.recensement.suna.hôki.place}/${guild.recensement.suna.hôki.placemax}\nAutre : ${guild.recensement.suna.autres.place}/${guild.recensement.suna.autres.placemax}`+ "```")
        .addField(`Kumo : ${guild.recensement.kumo.place}/${guild.recensement.kumo.placemax}`,"```"+ `Chinoike : ${guild.recensement.kumo.chinoike.place}/${guild.recensement.kumo.chinoike.placemax}\nArashi : ${guild.recensement.kumo.arashi.place}/${guild.recensement.kumo.arashi.placemax}\nYotsuki : ${guild.recensement.kumo.yotsuki.place}/${guild.recensement.kumo.yotsuki.placemax}\nFujiwara : ${guild.recensement.kumo.fujiwara.place}/${guild.recensement.kumo.fujiwara.placemax}\nHatori : ${guild.recensement.kumo.hatori.place}/${guild.recensement.kumo.hatori.placemax}\nAutre : ${guild.recensement.kumo.autres.place}/${guild.recensement.kumo.autres.placemax}`+ "```")
        .addField(`Iwa : ${guild.recensement.iwa.place}/${guild.recensement.iwa.placemax}`,"```"+ `Kamizuru : ${guild.recensement.iwa.kamizuru.place}/${guild.recensement.iwa.kamizuru. placemax}\nMotori : ${guild.recensement.iwa.motori.place}/${guild.recensement.iwa.motori.placemax}\nBakuhatsu : ${guild.recensement.iwa.bakuhatsu.place}/${guild.recensement.iwa.bakuhatsu.placemax}\nBakuho : ${guild.recensement.iwa.bakuho.place}/${guild.recensement.iwa.bakuho.placemax}\nKaemuri : ${guild.recensement.iwa.kaemuri.place}/${guild.recensement.iwa.kaemuri.placemax}\nAutre : ${guild.recensement.iwa.autres.place}/${guild.recensement.iwa.autres.placemax}`+ "```")
        .addField(`Autre :`,"```"+ `${guild.recensement.autres.place}/${guild.recensement.autres.placemax}`+ "```")


        await guild.save()
        msg = await interaction.guild.channels.cache.get(guild.channels.recensement).messages.fetch(guild.plugins.recensementMsg);
        msg.edit({embeds:[recensementEmbed]});

        interaction.reply({content: 'Recensement mis à jour !', ephemeral: true});

    }

    }