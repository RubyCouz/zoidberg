module.exports = {
    commands: ['ban'],
    expectedArgs: '<member>',
    permissionError: 'Vous n\'avez pas la permission nécessaire pour exécuter cette commande.',
    minArgs: 1,
    maxArgs: 1,
    callback: (client, message, arguments, text) => {
        const {member, mentions} = message
            // récupération du user demandant le ban
            const tag = `<@${member.id}>`
            if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')) {
                // récupération du user mentionné
                const target = mentions.users.first()
                if (target) {
                    const targetMember = message.guild.members.cache.get(target.id)
                    // ban du user mentionné
                    targetMember.ban()
                    message.channel.send(`Quel ban merveilleux ${tag}`)
                } else {
                    message.channel.send(`${tag} Je ne peux pas ban si tu ne me dis pas qui je dois ban, hein !!!`)
                }
            } else {
                message.channel.send(`${tag} Tu n'as pas la permission d'utiliser cette commande... Noob !!!`)
            }
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles : [],
}