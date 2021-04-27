module.exports = client => {
    // récupération id channel
    const channelId = '836186856781643776'
    // à l'arrivée d'un membre sur le serveur
    client.on('guildMemberAdd', (member) => {
        // affichage des infos du membre en console
    console.log(member)
        // définition du message d'accueil
        const message = `Please welcome <@${member.id}> to the server`
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