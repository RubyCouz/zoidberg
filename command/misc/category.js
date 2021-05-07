const loadCommands = require('../load_commands')

module.exports = {
    commands: ['cat'],
    expectedArgs: '<name>',
    permissionError: 'Vous n\'avez pas la permission nécessaire pour exécuter cette commande.',
    minArgs: 1,
    maxArgs: 1,
    description: 'Création d\'une catégorie',
    callback: (client, message, arguments, text) => {
        // échappement de la commande pour récupérer le nom du chan
        const name = message.content.replace('$cat', '')
        // création du chan
        message.guild.channels.create(name, {
            type: 'category',
        })
            .then((channel) => {

            })

    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: [],
}