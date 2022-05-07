const dotenv = require('dotenv'); dotenv.config();
const {banlist, serveur} = require('../../config/array.js')


module.exports = {
    name: 'messageCreate',
    once : false,
    execute(client, message) {
        if(message.author.bot) return;
        if(message.channel.type === "DM") return;

        let score=0;
        let step=0;


        if(message.channel != "963778312801517638" && message.content.includes('https://discord.gg/')) {
            message.delete();
            message.channel.send(`${message.author} a tenté d'envoyer une invitation`);
        }

        for (let i in banlist) {
            let content = message.content.toLowerCase().replace(/\s/g, '');
            if (content.includes(banlist[i])) {
                message.channel.send(`${message.author} a utilisé le mot interdit "${banlist[i]}" dans la phrase :  ` + "```" + `${message.content}` + "```")
                message.delete();
			}
		}
    },
};