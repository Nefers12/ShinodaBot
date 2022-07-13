const { Infraction } = require('../../db/models/index');

module.exports = {
    name: 'rl',
    permissions: ['ADMINISTRATOR'],
    description : 'Redemarre le bot',
    help:'Cette commande permet de redemarrer le bot\n\nUtilisation : /rl',

    runSlash: async (client, interaction) => {
        interaction.reply({content :'Bot redémarré', ephemeral: true}).then(() => {
            return process.exit();
        });
    }
}