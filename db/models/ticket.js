const { Schema, model } = require("mongoose");

const ticketSchema = new Schema({
	index: String,
	userId: String,
	guildId: String,
	timeStamp: Date,
	channelID: String,
	messageID: String,
	type: String,
	isOpen: Boolean,
	closedBy: String,
	closedAt: Date,
});

module.exports = model("Ticket", ticketSchema);
