const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'suggestion',
    channel: '963778312801517638',
    description : 'Créer un embed avec la suggestion',
    options : [{
        name:'suggestion',
        description : 'Champ dans lequel la suggestion doit être écrite',
        type : 'STRING',
        required: true,
    }],
    runSlash: async (client, interaction) => {
        const suggestion = interaction.options.getString('suggestion');

        const suggestionEmbed = new MessageEmbed()
	        .setColor('RANDOM')
	        .setAuthor({name: `suggestion de ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
	        .setDescription(suggestion)
	        .setTimestamp()

        interaction.reply({embeds: [suggestionEmbed]});

    }
}