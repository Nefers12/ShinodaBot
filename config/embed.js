const {MessageEmbed} = require('discord.js');

module.exports = {
	createEmbed : async function(title,description) {
		const logsEmbed = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(title)
		.setDescription(description)

		return logsEmbed;
	}
};
