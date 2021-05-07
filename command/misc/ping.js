const loadCommands = require('../load_commands')

module.exports = {
    commands: ['ping'],
    minArgs: 0,
    maxArgs: 0,
    description: 'Pong !!',
    callback: (client, message, arguments, text) => {
        message.reply('Pong !!!')
    },
}