const { Schema, model } = require("mongoose");

const guildSchema = new Schema({
	guildId: String,
	name: String,
	channels: {
		logs: String,
		question: String,
		suggestion: String,
		join: String,
		candidature: String,
		tickets: String,
		boost: String,
	},
	plugins:{
		playerTickets:{
			enabled: Boolean,
			messageID: String,
			playerTicketCategory: String,
			closedPlayerTicketCategory: String,
		},
		staffTickets:{
			enabled: Boolean,
			messageID: String,
			staffTicketCategory: String,
			closedStaffTicketCategory: String,
		},
		supportTickets:{
			enabled: Boolean,
			messageID: String,
			supportTicketCategory: String,
			closedSupportTicketCategory: String,
		},
		antiRaid: {
			enable: { type: Boolean, default: false },
		},
	}
});

module.exports = model("Guild", guildSchema);
