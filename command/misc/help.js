module.exports = {
    commands: ['help'],
    expectedArgs: '',
    permissionError: 'Vous n\'avez pas la permission nécessaire pour exécuter cette commande.',
    minArgs: 0,
    maxArgs: 0,
    callback: (client, message, arguments, text) => {
            message.channel.send(`
            Commandes actives :

            **$serverinfo** - informations sur le serveur
            **$embed** - affiche un message stylisé
            **$cc** - supprime tout les messages du channel sur lequel est tapé la commande
            **$channel nom_du_channel** création d'un channel de texte
            **$voicechannel nom_du_channel** - création d'un channel vocal
            **$server** - une info server
            **$ping** - pong
            **$ban** - ban un utilisateur
            **$kick** - kick un utilisateur
            **$poll** - après un message, permet d'ajouter les réactions like et dislike sur ce message (si pas posté dans le chan suggestion)
            `)
    },
    permissions: [],
    requiredRoles : [],
}