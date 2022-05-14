const { Schema, model } = require("mongoose");

const guildSchema = new Schema({
	guildId: String,
	name: String,
	roles: {
		villageois: String,
	},
	channels: {
		logs: String,
		question: String,
		suggestion: String,
		join: String,
		candidature: String,
		tickets: String,
		boost: String,
		partenariat: String,
		closedTicketsCategory: String,
	},
	plugins:{
		playerTickets:{
			enabled: Boolean,
			messageID: String,
			playerTicketCategory: String,
		},
		staffTickets:{
			enabled: Boolean,
			messageID: String,
			staffTicketCategory: String,
		},
		supportTickets:{
			enabled: Boolean,
			messageID: String,
			supportTicketCategory: String,
		},
		demandeRP:{
			enabled: Boolean,
			messageID: String,
			demandeRPCategory: String,
		},
		antiRaid: {
			enable: { type: Boolean, default: false },
		},
	}
});

module.exports = model("Guild", guildSchema);
