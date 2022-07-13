const { MessageEmbed } = require('discord.js');
const { Infraction } = require('../../db/models/index');

module.exports = {
    name: 'stic',
    permissions: ['BAN_MEMBERS'],
    description : 'Montre les infractions de l\'utilisateur',
    help:'Cette commande permet de montrer les infractions d\'un utilisateur\n\nUtilisation : /stic <user>',
    options : [{
        name:'pseudo',
        description : 'Pseudo de l\'utilisateur',
        type : 'USER',
        required: true,
    }],
    runSlash: async (client, interaction) => {
        const user = interaction.options.getMember('pseudo');

        if(!user) return interaction.reply('Veuillez mentionner un utilisateur valide');
        if(!user.bannable) return interaction.reply('Je ne peut pas vérifier les infractions de cet utilisateur');

        var count = await Infraction.countDocuments({ userID: user.id });

        const infracEmbed = new MessageEmbed()
            .setColor('RANDOM')
	        .setAuthor({name: `Infractions de ${user.username}`, iconURL: user.displayAvatarURL()})
	        .setDescription(`**Nombre d'infractions de ${user}:** \n\n l'utilisateur a commis ${count} infractions`)

        for (let i = 1; i <= count; i++) {
            const infrac = await Infraction.findOne({ index: `${user.id}${i}` });
            infracEmbed.addField(
				`Infraction n°${i}`,
				`${infrac.type} par <@${infrac.reportedBy}> \nle ${infrac.timeStamp.toUTCString().slice(0, -13)} à ${infrac.timeStamp.toUTCString().slice(17, 22)}\n Pour la raison "${infrac.reason}"`
			);
        }

        interaction.reply({embeds:[infracEmbed],ephemeral:true});

    }

}