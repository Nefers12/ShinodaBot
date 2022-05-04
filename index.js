const { Client, Message, Collection } = require('discord.js');
const dotenv = require('dotenv');const { readSync } = require('fs');
const mongoose = require('mongoose');
 dotenv.config();
const client = new Client({ intents: 515 });

client.commands = new Collection();

['CommandUtil', 'EventUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

process.on("unhandledRejection", (err) => {console.error(err);});

mongoose.connect(process.env.MONGO_URI, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000,
    family: 4
}).then(() => console.log('Connecté à MongoDB')).catch(err => console.error(err));

client.login(process.env.DISCORD_TOKEN);