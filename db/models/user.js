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

});

module.exports = model("User", userSchema);
