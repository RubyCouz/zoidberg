module.exports = {
    commands: ['cc'],
    expectedArgs: '',
    permissionError: 'Vous n\'avez pas la permission nécessaire pour exécuter cette commande.',
    minArgs: 0,
    maxArgs: 0,
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