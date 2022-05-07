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
            Cache.set( "antiRaid", guild.plugins.antiRaid);
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