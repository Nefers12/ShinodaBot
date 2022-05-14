const Discord = require('discord.js');
const ms = require('ms');
const { Infraction } = require('../../db/models/index');

module.exports = {
    name: 'mute',
    permissions: ['BAN_MEMBERS'],
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

        var count = await Infraction.countDocuments({ userID: user.id });

        const infractionCreate = await new Infraction({
            index: `${user.id}${count + 1}`,
            userID: user.id,
            type: 'MUTE',
            timeStamp: Date.now(),
            duration: tempsMs,
            reason: raison,
            reportedBy: interaction.user.id,
        });

        infractionCreate.save();
        
        user.timeout(tempsMs, raison);
        user.send(`Vous avez été mute pendant ${temps} pour la raison suivante : ${raison}`);
        interaction.reply({content:`<@${user.id}> a été mute pendant ${temps} pour la raison suivante : ${raison}`,ephemeral:true});

    }

}