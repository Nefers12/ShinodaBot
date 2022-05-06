const dotenv = require('dotenv'); dotenv.config();
const { Guild } = require('../../db/models/index');

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

        if(!guild)guildCreate.save();
        
    }
    
}