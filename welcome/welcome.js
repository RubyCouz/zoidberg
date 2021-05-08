const mongo = require ('../mongo')
module.exports = client => {
    // récupération id channel
    const channelId = '836186856781643776'
    const targetChannelId = '836583472268050454' // chan rôle
    // à l'arrivée d'un membre sur le serveur
    client.on('guildMemberAdd', (member) => {
        // définition du message d'accueil
        const message = `Bienvenue sur Test Dev, <@${member.id} !!! Veuillez passer par le salon ${member
            .guild.channels.cache
            .get(targetChannelId)
            .toString()}> pour sélectionner un ou plusieurs rôles et faire apparaitre les salons appropriés.`
        // définition du channel
        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)

        client.users.fetch(member.id).then(user => {
            client.guilds.cache.forEach((guild) => {
                // envoie d'un message privée de bienvenue
                user.send(`Bienvenue sur le serveur ${guild.name}`)
            })

        })
    })
}
// récupération message en bdd
//     await mongo.then(mongoose => {
//         try {
//             const result = await welcomeSchema.findOne({ _id: guild.id})
//         } finally {
//            mongoose.connection.close()
//         }
//     })
