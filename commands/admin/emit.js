const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emit',
    description : 'Emmet un event',
    permissions: ['ADMINISTRATOR'],
    options : [{
        name:'event',
        description : 'Event à émettre',
        type : 'STRING',
        required: true,
    },{
        name:'guild',
        description : 'guild à émettre',
        type : 'STRING',
        required: false,
        choices: [{
            name: 'guild',
            value: 'guild',
        }],
    },{
        name:'mention',
        description : 'users et roles',
        type : 9,
        required: false,
    },{
        name:'channel',
        description : 'channel et categorie',
        type : 7,
        required: false,
    },{
        name:'string',
        description : 'pour le reste',
        type : 3,
        required: false,
    }],
    runSlash: async (client, interaction) => {
        const evt = interaction.options.getString('event');
        let options = [];

        for(i in interaction.options._hoistedOptions){
            if(interaction.options._hoistedOptions[i].value == 'guild'){
                options[i] = interaction.guild;
            }else{
                options[i] = interaction.options._hoistedOptions[i].value;
            }

            if(+i+1 == interaction.options._hoistedOptions.length){
                client.emit(evt,options[1]);
            }

        }

    }
}