const dotenv = require('dotenv'); dotenv.config();

module.exports = {
    name: 'interactionCreate',
    once : false,
    async execute(client, interaction) {
        if(interaction.isCommand()){
            const cmd = client.commands.get(interaction.commandName);
            if(!cmd) return interaction.reply(`Cette commande n'xiste pas !`);

            if(!interaction.member.permissions.has(cmd.permissions)) return interaction.reply(`Vous n'avez pas la permission d'exécuter cette commande !`);

            cmd.runSlash(client, interaction);
        }

    }
}