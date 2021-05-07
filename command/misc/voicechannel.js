const loadCommands = require('../load_commands')

module.exports = {
    commands: ['voicechannel'],
    expectedArgs: '<num1> <num2>',
    permissionError: 'Vous n\'avez pas la permission nécessaire pour exécuter cette commande.',
    minArgs: 1,
    maxArgs: 1,
    description: 'Création d\'un salon vocal',
    callback: (client, message, arguments, text) => {
        const name = message.content.replace('$voicechannel', '')
            message.guild.channels.create(name, {
                type: 'voice',
            })
                .then((channel) => {
                    const categoryId = '818757144962662420'
                    channel.setParent(categoryId)
                    channel.setUserLimit(10)
                })
    },
    permissions: [],
    requiredRoles : [],
}