const mongo = require('../../mongo')
const welcomeSchema = require('../../schema/welcome_schema')
module.exports = {
    commands: ['setwelcome'],
    expectedArgs: '<message> ',
    permissionError: 'Vous n\'avez pas la permission nécessaire pour exécuter cette commande.',
    minArgs: 1,
    description: 'Définir un message d\'accueil sur le serveur',
    callback: async (client, message, arguments, permission) => {
        const {member, channel, content, guild} = message
        // récupération du message posté
        let text = content
        // separation de la chaine de caractère selon les espaces
        const split = text.split(' ')
        // suppression de la première entrée du tableau => commande
        split.shift()
        // concaténation des éléments du tableau en une chaine de caractère
        // séparés avec un ' '
        text = split.join(' ')
        await mongo().then(async mongoose => {
            try {
                await welcomeSchema.findOneAndUpdate(
                    // recherche de la donnée en fonction de l'id
                    {
                        _id: guild.id
                    },
                    // donnée à envoyer dans la base
                    {
                        _id: guild.id,
                        channelID: channel.id,
                        text: text
                    },
                    // upsert => si donnée présente, modification, si absente => ajout
                    {
                        upsert: true
                    }
                )
            } finally {
                await mongoose.connection.close()
            }
        })
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: [],
}