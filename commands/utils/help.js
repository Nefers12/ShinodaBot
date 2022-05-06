const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description : 'Créer un embed qui contient la liste des commandes',
    options : [{
        name:'command',
        description : 'Commande pour laquelle on a besoin d\'aide',
        type : 'STRING',
        required: true,
        choices: [{
            name: 'all',
            value: 'all',
            required : false,
        }],
    }],
    runSlash: async (client, interaction) => {
        const cmd = interaction.options.getString('command');
        console.log('test')
    }
}