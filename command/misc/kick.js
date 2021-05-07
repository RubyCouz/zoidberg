const loadCommands = require('../load_commands')

module.exports = {
    commands: ['kick'],
    expectedArgs: '<member>',
    permissionError: 'Vous n\'avez pas la permission nécessaire pour exécuter cette commande.',
    minArgs: 1,
    maxArgs: 1,
    description: 'Kick un membre du serveur (temporaire)',
    callback: (client, message, arguments, text) => {
        const {member, mentions} = message
            // récupération du user demandant le ban
            const tag = `<@${member.id}>`
            if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('KICK_MEMBERS')) {
                // récupération des infos user mentionné
                const target = mentions.users.first()
                if (target) {
                    const targetMember = message.guild.members.cache.get(target.id)
                    // ban du user mentionné
                    targetMember.kick()
                    message.channel.send(`Quel kick merveilleux ${tag}`)
                } else {
                    message.channel.send(`${tag} Je peux pas kick si tu ne me dis pas qui je dois kick, hein !!!`)
                }
            } else {
                message.channel.send(`${tag} Tu n'as pas la permission d'utiliser cette commande... Noob !!!`)
            }
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles : [],
}