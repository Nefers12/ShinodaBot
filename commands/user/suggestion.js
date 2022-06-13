const { MessageEmbed } = require('discord.js');
const { Guild } = require('../../db/models/index');

module.exports = {
    name: 'suggestion',
    permissions: ['SEND_MESSAGES'],
    description : 'Créer un embed avec la suggestion',
    options : [{
        name:'suggestion',
        description : 'Champ dans lequel la suggestion doit être écrite',
        type : 'STRING',
        required: true,
    }],
    runSlash: async (client, interaction) => {

        const guild = await Guild.findOne({ guildId: interaction.guild.id });

        const suggestion = interaction.options.getString('suggestion');

        const suggestionEmbed = new MessageEmbed()
	        .setColor('RANDOM')
	        .setAuthor({name: `suggestion de ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
	        .setDescription(suggestion)
	        .setTimestamp()

            interaction.guild.channels.cache.get(guild.channels.suggestion).send({embeds: [suggestionEmbed]});

            interaction.reply({content :'Votre suggestion a bien été envoyée !', ephemeral: true});

    }
}