const { Guild, User } = require('../../db/models/index');


module.exports = {
    name: 'recensementreset',
    permissions: ['ADMINISTRATOR'],
    description : 'Reinitialise le recensement',

    runSlash: async (client, interaction) => {

        const guild = await Guild.findOne({ guildId: interaction.guild.id });

        guild.recensement={
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
    }

    guild.save();
}
}