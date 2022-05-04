const { Schema, model } = require("mongoose");

const infractionSchema = Schema({
	index: String,
	userID: String,
	type: String,
	timeStamp: Date,
	duration: Number,
	reason: String,
	reportedBy: String,
});

module.exports = model("Infraction", infractionSchema);
