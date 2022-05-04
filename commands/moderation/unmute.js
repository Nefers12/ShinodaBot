module.exports = {
    name: 'unmute',
    permissions: ['MODERATE_MEMBERS'],
    description : 'Unmute un utilisateur',
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