const { Infraction } = require('../../db/models/index');

module.exports = {
    name: 'warn',
    permissions: ['BAN_MEMBERS'],
    description : 'Warn un utilisateur',
    options : [{
        name:'pseudo',
        description : 'Pseudo de l\'utilisateur à warn',
        type : 'USER',
        required: true,
    },{
        name:'raison',
        description : 'raison du warn',
        type : 'STRING',
        required: true,
    }],
    runSlash: async (client, interaction) => {
        const raison = interaction.options.getString('raison');
        const user = interaction.options.getMember('pseudo');

        if(!user) return interaction.reply('Veuillez mentionner un utilisateur valide');
        if(!user.bannable) return interaction.reply('Je ne peux pas warn cet utilisateur');

        var count = await Infraction.countDocuments({ userID: user.id });

        const infractionCreate = await new Infraction({
            index: `${user.id}${count + 1}`,
            userID: user.id,
            type: 'WARN',
            timeStamp: Date.now(),
            reason: raison,
            reportedBy: interaction.user.id,
        });

        infractionCreate.save();

        user.send(`Vous avez été warn sur le serveur **Shinoda** pour la raison suivante : ${raison}`);
        interaction.reply({content:`<@${user.id}> a été warn pour la raison suivante : ${raison}`,ephemeral:true});

    }

}