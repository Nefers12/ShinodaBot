module.exports = {
    name: 'unmute',
    permissions: ['BAN_MEMBERS'],
    description : 'Unmute un utilisateur',
    help : 'Cette commande permet de unmute un utilisateur\n\nUtilisation : /unmute <pseudo>',
    options : [{
        name:'pseudo',
        description : 'Pseudo de l\'utilisateur à unmute',
        type : 'USER',
        required: true,
    }],
    runSlash: async (client, interaction) => {
        const user = interaction.options.getMember('pseudo');


        if(!user) return interaction.reply({content:'Veuillez mentionner un utilisateur valide',ephemeral:true});
        if(!user.isCommunicationDisabled()) return interaction.reply({content:'Ce membre n\'est pas mute',ephemeral:true});

        user.timeout(null);
        user.send('Vous avez été unmute');
        interaction.reply({content:`<@${user.id}> a été unmute`,ephemeral:true});

    }

}