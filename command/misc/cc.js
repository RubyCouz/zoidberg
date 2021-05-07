const loadCommands = require('../load_commands')
module.exports = {
    commands: ['cc'],
    expectedArgs: '',
    permissionError: 'Vous n\'avez pas la permission nécessaire pour exécuter cette commande.',
    minArgs: 0,
    maxArgs: 0,
    description: 'Nettoyage du salon',
    callback: (client, message, arguments, text) => {
                // récupération de tous les messages du chan
                message.channel.messages.fetch().then((results) => {
                    // suppression de tous les messages du chan
                    message.channel.bulkDelete(results)
                })
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles : [],
}