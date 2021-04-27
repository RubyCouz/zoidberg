const {prefix} = require('../config.json')
module.exports = client => {
    // tableau contenant les id des chans où les votes sont possibles
    const channelIds = [
        '836660083516768297' // chan suggestion (voir pour récup id dynamiquement)
    ]
    const addReactions = message => {
        message.react('👍')

        // définition d'un délai d'apparition des réactions, pour éviter des bugs
        setTimeout(() => {
            message.react('👎')
        }, 750)
    }
    // à la publication d'un message
    client.on('message', async (message) => {
        // si l'id du channel où le message est publié est égal à l'id du channel définit plus haut
        if (channelIds.includes(message.channel.id)) {
            // ajout de réaction au message
            addReactions(message)
            // sinon presence de la commande poll dans le message => sondage ou demande de réaction dans un autre channel
        } else if (message.content.toLowerCase() === `${prefix}poll`) {
            // suppression de la commande
            await message.delete()
            // récupération du dernier message (avant la commande)
            const fetched = await message.channel.messages.fetch({limit: 1})
            // si le message a été récupéré
            if (fetched && fetched.first()) {
                // ajout de réaction au message
                addReactions(fetched.first())
            }
        }

    })
}