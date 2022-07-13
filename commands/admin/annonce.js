const { MessageEmbed,MessageAttachment } = require('discord.js');
const fs = require("fs");
const http = require("https");


module.exports = {
    name: 'annonce',
    help:'Commande en cours de développement',
    permissions: ['ADMINISTRATOR'],
    description : 'créer un annonce',

    runSlash: async (client, interaction) => {

        let isDone = false;

        const AnnonceObject = {
			nb: 0,
			msg: [],
			chan: "",
		};

        let annonceEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Dans quel salon voulez-vous envoyer votre annonce ?')
        .setDescription('Merci de taguer le salon')

        const filter = m => m.author.id == interaction.user.id;

		interaction.reply({embeds:[annonceEmbed]}).then( () => {
            interaction.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
			.then( async collected  => {
                if(interaction.guild.channels.cache.get(collected.first().content)){
                    collected.first().content = AnnonceObject.chan
                }else{
                    annonceEmbed.setTitle(`Ce salon n'existe pas`);
                    annonceEmbed.setDescription(`Meci de taguer un salon valide`);
                    interaction.editReply({embeds:[annonceEmbed]})
                }

				while (!isDone) {
					await actionChoice();
				}
            })
        })

        async function actionChoice() {

        annonceEmbed.setTitle(`Que voulez vous faire ?`);
        annonceEmbed.setDescription(`1 : Ajouter du texte\n\n2 : Envoyer un media\n\n3: Envoyer l'annonce\n\n4 : Annuler`);
        
        interaction.editReply({embeds:[annonceEmbed]}).then( () => {
            interaction.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
			.then( async collected  => {
                switch(collected.first().content){
                    case "1":
                        collected.first().delete();
                        annonceEmbed.setTitle(`Vous aviez choisi d'ajouter du texte`);
                        annonceEmbed.setDescription(`veuillez écrire le text de l'annonce`)

                        interaction.editReply({embeds:[annonceEmbed]}).then(() => {
                            interaction.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                            .then(collected => {
                                console.log(collected.first().content);
                                collected.first().delete();
                            })
                        })
                        break;

                }
			})
        })
        

    }
}
}