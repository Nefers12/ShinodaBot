const { Client, Message, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const client = new Client({ intents: 513 });

client.commands = new Collection();

['CommandUtil', 'EventUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

process.on('exit', code => { console.log(`Le processus s'est arrêté avec le code : ${code}`) });
process.on('uncaughtException', (err,origin) => { console.log(`Un erreur inatendue s'est produite : ${err}, Origine : ${origin}`) });
process.on('unhandledRejection', (reason,promise) => { console.log(`Un erreur inatendue s'est produite : ${reason}, \n-- Origine : ${promise}`) });
process.on('warning', (...args) =>  console.log(...args));


client.login(process.env.DISCORD_TOKEN);
