const { MessageEmbed,MessageAttachment } = require('discord.js');
const fs = require("fs");
const http = require("https");


module.exports = {
    name: 'annonce',
    permissions: ['BAN_MEMBERS'],
    description : 'créer un annonce',

    runSlash: async (client, interaction) => {
        const filter = m => m.author.id == interaction.user.id;

        const annonceEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Que voulez vous faire ?`)
            .setDescription(`1 : Ajouter du texte\nEnvoyer un media\n3: Envoyer l'annonce`)

        interaction.reply({embeds:[annonceEmbed]}).then(m => {
            interaction.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
			.then(collected => {
                //collected.guild.channels.cache.get(interaction.channel.id).
				console.log(m)
			})
        })
    }
}