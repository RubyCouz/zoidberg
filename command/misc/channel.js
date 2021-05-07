const loadCommands = require('../load_commands')

module.exports = {
    commands: ['channel'],
    expectedArgs: '<name>',
    permissionError: 'Vous n\'avez pas la permission nécessaire pour exécuter cette commande.',
    minArgs: 1,
    maxArgs: 1,
    description: 'Cération d\'un salon',
    callback: (client, message, arguments, text) => {
        // échappement de la commande pour récupérer le nom du chan
        const name = message.content.replace('$channel', '')
        // création du chan
        message.guild.channels.create(name, {
            type: 'text',
        })
            .then((channel) => {
                // récupéraiton des infos du chan en console
                console.log(channel)
                // définition de l'id parent
                const categoryId = '818757144962662420'
                // assignation du cha à une catégorie en particulier
                channel.setParent(categoryId)
            })

    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: [],
}