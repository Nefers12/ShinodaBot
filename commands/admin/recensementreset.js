const { Guild, User } = require('../../db/models/index');


module.exports = {
    name: 'recensementreset',
    permissions: ['ADMINISTRATOR'],
    description : 'Reinitialise le recensement',
    help:'Cette commande permet de rĂ©initialiser le recensement\n\nUtilisation : /recensementreset',

    runSlash: async (client, interaction) => {

        const guild = await Guild.findOne({ guildId: interaction.guild.id });

        guild.recensement={
            autres:{
                place: 0,
                placemax: 0,
            },
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
                },
                autres:{
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
                autres:{
                    place: 0,
                    placemax: 0,
                }
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
                hĂ´ki:{
                    place: 0,
                    placemax: 0,
                } ,
                autres:{
                    place: 0,
                    placemax: 0,
                }
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
                autres:{
                    place: 0,
                    placemax: 0,
                }
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
                autres:{
                    place: 0,
                    placemax: 0,
                }
            },
        },

    guild.save();

    interaction.reply({content : 'Recensement rĂ©initialisĂ©', ephemeral: true});
}
}