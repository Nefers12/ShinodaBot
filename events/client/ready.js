const dotenv = require('dotenv'); dotenv.config();
var {messagesCount} = require('../../config/array.js');
const { Guild, User } = require('../../db/models/index');
var user = require('../../db/models/user.js');
const { Cache } = require('../../index');

module.exports = {
    name: 'ready',
    once : true,
    async execute(client) {
        console.log('Bot opérationnel !');

        const devGuild = await client.guilds.cache.get(process.env.GUILD_ID);
        devGuild.commands.set(client.commands.map(cmd => cmd));

        const guild = await Guild.findOne({ guildId: devGuild.id });
        const guildCreate = await new Guild({
            guildId: devGuild.id,
            name: devGuild.name,
            channels: {
                logs: '',
                question: '',
                suggestion: '',
                join: '',
                candidature: '',
                tickets: '',
                boost: '',
                closedTicketsCategory: '',
            },
            recrutement:{
                konoha:{
                    place: 0,
                    uchiwa: 0,
                    hyuga: 0,
                    senju: 0,
                    nara: 0,
                    uzumaki: 0,
                },
                kiri:{
                    place: 0,
                    momochi: 0,
                    yuki: 0,
                    kaguya: 0,
                    karatashi: 0,
                    hoshigaki: 0,
                },
                suna:{
                    place: 0,
                    shirogane: 0,
                    kibin: 0,
                    tatsumaki: 0,
                    taku: 0,
                    hôki: 0,
                },
                kumo:{
                    place: 0,
                    chinoike: 0,
                    arashi: 0,
                    yotsuki: 0,
                    fujiwara: 0,
                    hatori: 0,
                },
                iwa:{
                    place: 0,
                    kamizuru: 0,
                    motori: 0,
                    bakuhatsu: 0,
                    bakuho: 0,
                    kaemuri: 0,
                },
            },
            plugins:{
                playerTickets:{
                    enabled: false,
                    messageID: '',
                    playerTicketCategory: '',
                    closedPlayerTicketCategory: '',
                },
                staffTickets:{
                    enabled: false,
                    messageID: '',
                    staffTicketCategory: '',
                    closedStaffTicketCategory: '',
                },
                supportTickets:{
                    enabled: false,
                    messageID: '',
                    supportTicketCategory: '',
                    closedSupportTicketCategory: '',
                },
                antiRaid: {
                    enable: false,
                },
                recrutement: false,
            },
            roles:{
                villageois: '',
            }
        });

        if(!guild){
            guildCreate.save();
            cacheGuild(guildCreate);
        }else{
            cacheGuild(guild)
        }

        async function cacheGuild(guild) {
            Cache.set( "guild", guild);
            Cache.set( "channels", guild.channels);
            Cache.set( "playerTickets", guild.plugins.playerTickets);
            Cache.set( "staffTickets", guild.plugins.staffTickets);
            Cache.set( "supportTickets", guild.plugins.supportTickets);
            Cache.set( "demandeRP", guild.plugins.demandeRP);
            Cache.set( "supportTickets", guild.plugins.supportTickets);
            Cache.set( "antiRaid", guild.plugins.antiRaid);
            Cache.set( "roles", guild.roles);
            Cache.set( "Konoha", guild.recrutement.konoha);
            Cache.set( "Kiri", guild.recrutement.kiri);
            Cache.set( "Suna", guild.recrutement.suna);
            Cache.set( "Kumo", guild.recrutement.kumo);
            Cache.set( "Iwa", guild.recrutement.iwa);
        }

        setInterval(async () => {
			for(i in messagesCount){
                user = await User.findOne({ userId: i });
                user.messagesCount = +user.messagesCount +messagesCount[i];
                user.save()
                delete messagesCount[i]
            }
		}, 3600000);
        
    }

    
    
}