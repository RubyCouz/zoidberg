module.exports = {
    commands: ['giverole'],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<Target user\'s @> <Role name>',
    callback: (client, message, arguments) => {
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            message.reply('Spécifiez un rôle à donner.')
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
            message.reply(`${targetUser.username}#${targetUser.discriminator} a déjà le rôle ${roleName}`)
        } else {
            member.roles.add(role)
            message.reply(`Le role ${roleName} a été assigné à ${targetUser.username}#${targetUser.discriminator}`)

        }
        },
    permissions: ['ADMINISTRATOR'],
    requiredRoles : [],
}