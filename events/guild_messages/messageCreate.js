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

        for (let o in serveur) {
            let cnt = message.content.toLowerCase().replace("?","").split(" ");

            if(cnt.length < 2) return;

            if (cnt.includes(serveur[o])){
                score ++;
			}

            if(o/(serveur.length-1) == 1) {
                    if(score >= 2) {
                        message.channel.send("Le serveur est actuellement en cours de développement, mais ne vous inquétez pas nous vous avertirons dès qu'il sera disponible !");
                    }
            }
		}
    },
};