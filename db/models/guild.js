const { Schema, model } = require("mongoose");

const guildSchema = new Schema({
	guildId: String,
	name: String,
	roles: {
		villageois: String,
		recruteur: String,
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
	recrutement:{
		konoha:{
			place: Number,
			uchiwa: Number,
			hyuga: Number,
			senju: Number,
			nara: Number,
			uzumaki: Number,
		},
		kiri:{
			place: Number,
			momochi: Number,
			yuki: Number,
			kaguya: Number,
			karatashi: Number,
			hoshigaki: Number,
		},
		suna:{
			place: Number,
			shirogane: Number,
			kibin: Number,
			tatsumaki: Number,
			taku: Number,
			hôki: Number,
		},
		kumo:{
			place: Number,
			chinoike: Number,
			arashi: Number,
			yotsuki: Number,
			fujiwara: Number,
			hatori: Number,
		},
		iwa:{
			place: Number,
			kamizuru: Number,
			motori: Number,
			bakuhatsu: Number,
			bakuho: Number,
			kaemuri: Number,
		},
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
		recrutement: Boolean,
	}
});

module.exports = model("Guild", guildSchema);
