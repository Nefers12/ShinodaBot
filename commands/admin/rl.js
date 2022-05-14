const { Infraction } = require('../../db/models/index');

module.exports = {
    name: 'rl',
    permissions: ['ADMINISTRATOR'],
    description : 'Redemarre le bot',

    runSlash: async (client, interaction) => {
        interaction.reply({content :'Bot redémarré', ephemeral: true}).then(() => {
            return process.exit();
        });
    }
}