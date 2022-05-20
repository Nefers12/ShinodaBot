const { MessageEmbed } = require('discord.js');
const { Guild } = require('../../db/models/index');

module.exports = {
    name: 'question',
    permissions: ['SEND_MESSAGES'],
    description : 'Créer un embed avec la question',
    options : [{
        name:'question',
        description : 'Champ dans lequel la question doit être écrite',
        type : 'STRING',
        required: true,
    }],
    runSlash: async (client, interaction) => {

        const guild = await Guild.findOne({ guildId: interaction.guild.id });

        const question = interaction.options.getString('question');

        const questionEmbed = new MessageEmbed()
	        .setColor('RANDOM')
	        .setAuthor({name: `Question de ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
	        .setDescription(question)
	        .setTimestamp()

            interaction.guild.channels.cache.get(guild.channels.question).send({embeds: [questionEmbed]});

            interaction.reply({content :'Votre question a bien été envoyée !', ephemeral: true});

    }

}