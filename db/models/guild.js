const { Schema, model } = require("mongoose");

const guildSchema = new Schema({
	guildId: String,
	name: String,
	roles: {
		villageois: String,
		recruteur: String,
		konoha: String,
		kiri: String,
		suna: String,
		kumo: String,
		iwa: String,
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
		recensement: String,
		closedTicketsCategory: String,
		acceptedTicketsCategory: String,
	},
	recensement:{
		konoha:{
			place: Number,
			placemax: Number,
			uchiwa:{
				place: Number,
				placemax: Number,
			},
			hyuga:{
				place: Number,
				placemax: Number,
			},
			senju:{
				place: Number,
				placemax: Number,
			},
			nara:{
				place: Number,
				placemax: Number,
			},
			uzumaki:{
				place: Number,
				placemax: Number,
			}
		},
		kiri:{
			place: Number,
			placemax: Number,
			momochi:{
				place: Number,
				placemax: Number,
			},
			yuki:{
				place: Number,
				placemax: Number,
			},
			kaguya:{
				place: Number,
				placemax: Number,
			},
			karatashi:{
				place: Number,
				placemax: Number,
			},
			hoshigaki:{
				place: Number,
				placemax: Number,
			},
		},
		suna:{
			place: Number,
			placemax: Number,
			shirogane:{
				place: Number,
				placemax: Number,
			},
			kibin:{
				place: Number,
				placemax: Number,
			},
			tatsumaki:{
				place: Number,
				placemax: Number,
			},
			taku:{
				place: Number,
				placemax: Number,
			} ,
			hôki:{
				place: Number,
				placemax: Number,
			} ,
		},
		kumo:{
			place: Number,
			placemax: Number,
			chinoike:{
				place: Number,
				placemax: Number,
			} ,
			arashi:{
				place: Number,
				placemax: Number,
			} ,
			yotsuki:{
				place: Number,
				placemax: Number,
			} ,
			fujiwara:{
				place: Number,
				placemax: Number,
			} ,
			hatori:{
				place: Number,
				placemax: Number,
			} ,
		},
		iwa:{
			place: Number,
			placemax: Number,
			kamizuru: {
				place: Number,
				placemax: Number,
			},
			motori:{
				place: Number,
				placemax: Number,
			} ,
			bakuhatsu:{
				place: Number,
				placemax: Number,
			} ,
			bakuho:{
				place: Number,
				placemax: Number,
			} ,
			kaemuri:{
				place: Number,
				placemax: Number,
			},
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
		recensementPl: Boolean,
		recensementMsg: String,
	}
});

module.exports = model("Guild", guildSchema);
