const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'question',
    channel : '963778312801517638',
    description : 'Créer un embed avec la question',
    options : [{
        name:'question',
        description : 'Champ dans lequel la question doit être écrite',
        type : 'STRING',
        required: true,
    }],
    runSlash: async (client, interaction) => {
        const question = interaction.options.getString('question');

        const questionEmbed = new MessageEmbed()
	        .setColor('RANDOM')
	        .setAuthor({name: `Question de ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
	        .setDescription(question)
	        .setTimestamp()

        interaction.reply({embeds: [questionEmbed]});

    }

}