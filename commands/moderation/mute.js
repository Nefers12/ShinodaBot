const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'mute',
    permissions: ['MODERATE_MEMBERS'],
    description : 'Mute un utilisateur',
    options : [{
        name:'pseudo',
        description : 'Pseudo de l\'utilisateur à mute',
        type : 'USER',
        required: true,
    },{
        name:'raison',
        description : 'raison du mute',
        type : 'STRING',
        required: true,
    },{
        name:'temps',
        description : 'temps du mute',
        type : 'STRING',
        required: true,
    }],
    runSlash: async (client, interaction) => {
        const raison = interaction.options.getString('raison');
        const user = interaction.options.getMember('pseudo');
        const temps = interaction.options.getString('temps');
        const tempsMs = ms(temps);


        if(!user) return interaction.reply({content:'Veuillez mentionner un utilisateur valide',ephemeral:true});
        if(!user.moderatable) return interaction.reply({content:'Je ne peux pas mute cet utilisateur',ephemeral:true});
        if(!temps) return interaction.reply({content:'Veuillez entrer une durée valide',ephemeral:true});

        user.timeout(tempsMs, raison);
        interaction.reply({content:`<@${user.id}> a été mute pendant ${temps} pour la raison suivante : ${raison}`,ephemeral:true});

    }

}