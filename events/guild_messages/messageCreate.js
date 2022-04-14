const dotenv = require('dotenv'); dotenv.config();

module.exports = {
    name: 'messageCreate',
    once : false,
    execute(client, message) {
        if (message.author.bot) return;
    },
};