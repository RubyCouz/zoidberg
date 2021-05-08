const mongo = require('../../mongo')
// chargement du schema
const prefixSchema = require('../../schema/prefix_schema')
const commandBase = require('../command-base')
module.exports = {
    commands: ['setprefix'],
    expectedArgs: '<prefix>',
    permissionError: 'Vous n\'avez pas la permission nécessaire pour exécuter cette commande.',
    minArgs: 1,
    maxArgs: 1,
    description: 'changement de préfix pour les commande de ce serveur',
    callback: async (client, message, arguments, text) => {
        await mongo().then(async mongoose => {
            try {
                // récupération de l'id du serveur
                const guildId = message.guild.id
                // récupération du nouveaux préfix
                const prefix = arguments[0]
                await prefixSchema.findOneAndUpdate(
                    {
                        _id: guildId
                    },
                    {
                        _id: guildId,
                        prefix // === prefix: prefix depuis ES6
                    },
                    {
                        upsert: true
                    })

                message.reply(`Le prefix de commande pour Zoidberg est maintenant : ${prefix}`)
                // récupération du nouveau préfix insert en base de données
                await commandBase.loadPrefixes(client)
            } finally {
                // fermeture de la connection à la base de donnée
                await mongoose.connection.close()
            }


        })
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: [],
}