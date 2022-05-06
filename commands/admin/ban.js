const { Infraction } = require('../../db/models/index');

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

        var count = await Infraction.countDocuments({ userID: user.id });

        const infractionCreate = await new Infraction({
            index: `${user.id}${count + 1}`,
            userID: user.id,
            type: 'BAN',
            timeStamp: Date.now(),
            reason: raison,
            reportedBy: interaction.user.id,
        });

        infractionCreate.save();

        user.send(`Vous avez été banni du serveur **Shinoda** pour la raison suivante : ${raison}`);
        interaction.reply({content:`<@${user.id}> a été banni pour la raison suivante : ${raison}`,ephemeral:true});
        user.ban({reason: raison});

    }

}