module.exports = {
    commands: ['removerole'],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<Target user\'s @> <Role name>',
    callback: (client, message, arguments) => {
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            message.reply('Spécifiez un rôle à retirer.')
            return
        }

        arguments.shift()

        const roleName = arguments.join(' ')
        const {guild} = message
        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })
        if(!role) {
            message.reply(`Il n'y pas de role nommé ${roleName}`)
            return
        }
        const member = guild.members.cache.get(targetUser.id)
        // si l'utilisateur à le role
        if(member.roles.cache.get(role.id)) {
            member.roles.remove(role)
            message.reply(`${targetUser.username}#${targetUser.discriminator} n'a plus le rôle ${roleName}`)
        } else {
            message.reply(`${targetUser.username}#${targetUser.discriminator} n'a pas le role ${roleName}`)
        }
       },
    permissions: ['ADMINISTRATOR'],
    requiredRoles : [],
}