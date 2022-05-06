const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	userId: String,
	userName: String,
	joinDate: Date,
	messagesCount: Number,
	userAvatar: String,
	MinecraftUser: String,
	numberOfJoin: Number,
	invites: Number,
	ticketStaff: Number,
	ticketPlayer: Number,
	ticketSupport: Number,

});

module.exports = model("User", userSchema);
