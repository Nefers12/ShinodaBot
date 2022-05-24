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
            plugins:{
                playerTickets:{
                    enabled: false,
                },
                staffTickets:{
                    enabled: false,
                },
                supportTickets:{
                    enabled: false,
                },
                demandeRP:{
                    enable: false,
                },
                antiRaid: {
                    enable: false,
                },
                recensementPl: false,
            },
            recensement:{
                konoha:{
                    place: 0,
                    placemax: 0,
                    uchiwa:{
                        place: 0,
                        placemax: 0,
                    },
                    hyuga:{
                        place: 0,
                        placemax: 0,
                    },
                    senju:{
                        place: 0,
                        placemax: 0,
                    },
                    nara:{
                        place: 0,
                        placemax: 0,
                    },
                    uzumaki:{
                        place: 0,
                        placemax: 0,
                    }
                },
                kiri:{
                    place: 0,
                    placemax: 0,
                    momochi:{
                        place: 0,
                        placemax: 0,
                    },
                    yuki:{
                        place: 0,
                        placemax: 0,
                    },
                    kaguya:{
                        place: 0,
                        placemax: 0,
                    },
                    karatashi:{
                        place: 0,
                        placemax: 0,
                    },
                    hoshigaki:{
                        place: 0,
                        placemax: 0,
                    },
                },
                suna:{
                    place: 0,
                    placemax: 0,
                    shirogane:{
                        place: 0,
                        placemax: 0,
                    },
                    kibin:{
                        place: 0,
                        placemax: 0,
                    },
                    tatsumaki:{
                        place: 0,
                        placemax: 0,
                    },
                    taku:{
                        place: 0,
                        placemax: 0,
                    } ,
                    hôki:{
                        place: 0,
                        placemax: 0,
                    } ,
                },
                kumo:{
                    place: 0,
                    placemax: 0,
                    chinoike:{
                        place: 0,
                        placemax: 0,
                    } ,
                    arashi:{
                        place: 0,
                        placemax: 0,
                    } ,
                    yotsuki:{
                        place: 0,
                        placemax: 0,
                    } ,
                    fujiwara:{
                        place: 0,
                        placemax: 0,
                    } ,
                    hatori:{
                        place: 0,
                        placemax: 0,
                    } ,
                },
                iwa:{
                    place: 0,
                    placemax: 0,
                    kamizuru: {
                        place: 0,
                        placemax: 0,
                    },
                    motori:{
                        place: 0,
                        placemax: 0,
                    } ,
                    bakuhatsu:{
                        place: 0,
                        placemax: 0,
                    } ,
                    bakuho:{
                        place: 0,
                        placemax: 0,
                    } ,
                    kaemuri:{
                        place: 0,
                        placemax: 0,
                    },
                },
            },
        });

        if(!guild){
            guildCreate.save();
            cacheGuild(guildCreate);
        }else{
            cacheGuild(guild)
        }

        async function cacheGuild(guild) {
            Cache.set( "guild", guild);
            Cache.set( "playerTickets", guild.plugins.playerTickets);
            Cache.set( "staffTickets", guild.plugins.staffTickets);
            Cache.set( "supportTickets", guild.plugins.supportTickets);
            Cache.set( "demandeRP", guild.plugins.demandeRP);
            Cache.set( "antiRaid", guild.plugins.antiRaid);
            Cache.set( "recensementpl", guild.plugins.recensementPl);
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