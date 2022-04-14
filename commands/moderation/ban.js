const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    permissions: ['BAN_MEMBERS'],
    description : 'Bannis un utilisateur',
    options : [{
        name:'pseudo',
        description : 'Pseudo de l\'utilisateur à bannir',
        type : 'USER',
        required: true,
    },{
        name:'raison',
        description : 'raison du ban',
        type : 'STRING',
        required: true,
    }],
    runSlash: async (client, interaction) => {
        const raison = interaction.options.getString('raison');
        const user = interaction.options.getMember('pseudo');

        if(!user) return interaction.reply('Veuillez mentionner un utilisateur valide');
        if(!user.bannable) return interaction.reply('Je ne peux pas bannir cet utilisateur');

        user.ban({reason: raison});
        interaction.reply({content:`<@${user.id}> a été banni pour la raison suivante : ${raison}`,ephemeral:true});

    }

}