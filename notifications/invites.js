module.exports = (client) => {
    const invites = {}

    const getInviteCounts = async (guild) => {
        return await new Promise((resolve) => {
            guild.fetchInvites().then((invites) => {
                const inviteCounter = {}

                invites.forEach((invite) => {
                    // accès aux informations de l'invitation
                    const {uses, inviter} = invite
                    // accès aux information de l'utilisateur qui invite
                    const {username, discriminator} = inviter

                    const name = `${username}#${discriminator}`

                    inviteCounter[name] = (inviteCounter[name] || 0) + uses

                    resolve(inviteCounter)
                })
            })
        })
    }

    client.guilds.cache.forEach(async (guild) => {
        invites[guild.id] = await getInviteCounts(guild)
    })
    // à l'arrivée d'un membre sur le serveur
    client.on('guildMemberAdd', async member => {
        const {guild, id} = member
        // récupération du nombre d'invitation avant et après l'arrivée d'un membre sur le serveur
        const invitesBefore = invites[guild.id]
        const invitesAfter = await getInviteCounts(guild)

        console.log('before : ', invitesBefore)
        console.log('after : ', invitesAfter)

        for (const inviter in invitesAfter) {
            if(invitesBefore[inviter] === invitesAfter[inviter] - 1) {
                const channelId = '838449753544720434'
                const channel = guild.channels.cache.get(channelId)
                const count = invitesAfter[inviter]
                channel.send(
                    `<@${id}> arrive sur le discord, invité par ${inviter} (${count} invitations)`
                )
                invites[guild.id] = invitesAfter
                return
            }
        }
    })
}