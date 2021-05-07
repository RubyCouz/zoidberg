const loadCommands = require('../load_commands')

module.exports = {
    commands: ['delete'],
    permissionError: 'Vous n\'avez pas la permission nécessaire pour exécuter cette commande.',
    minArgs: 0,
    maxArgs: 0,
    description: 'Suppression d\'un salon',
    callback: (client,message, arguments, text) => {
        message.channel.delete();
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles : [],
}