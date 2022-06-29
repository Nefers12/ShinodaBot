const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
 dotenv.config();
const client = new Client({ intents: 515 });

const NodeCache = require( "node-cache" );
const Cache = new NodeCache();

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

module.exports = {
    Cache
} 