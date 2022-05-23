const { Infraction } = require('../../db/models/index');

module.exports = {
    name: 'recrutement',
    permissions: ['ADMINISTRATOR'],
    description : 'permet d\'éditer les options de recrutement',
    options: [
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
                },                {
                    name: "suna",
                    description: "suna",
                    type: 10
                },
                {
                    name: "kumo",
                    description: "kumo",
                    type: 10
                },                {
                    name: "iwa",
                    description: "iwa",
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
                },                {
                    name: "senju",
                    description: "senju",
                    type: 10
                },
                {
                    name: "nara",
                    description: "nara",
                    type: 10
                },                {
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
                },                {
                    name: "kaguya",
                    description: "kaguya",
                    type: 10
                },
                {
                    name: "karatashi",
                    description: "karatashi",
                    type: 10
                },                {
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
                },                {
                    name: "yotsuki",
                    description: "yotsuki",
                    type: 10
                },
                {
                    name: "fujiwara",
                    description: "fujiwara",
                    type: 10
                },                {
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
                },                {
                    name: "bakuhatsu",
                    description: "bakuhatsu",
                    type: 10
                },
                {
                    name: "bakuho",
                    description: "bakuho",
                    type: 10
                },                {
                    name: "kaemuri",
                    description: "kaemuri",
                    type: 10
                },
            ]
        }
    ],

    runSlash: async (client, interaction) => {
        
        
    }
}