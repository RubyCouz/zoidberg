const loadCommands = require('./load_commands')
// chargement de mongo et schema
const mongo = require('../mongo')
const prefixSchema = require('../schema/prefix_schema')
// chargement du prefix
const {prefix: globalPrefix} = require('../config.json')
const guildPrefixes = {}
// fonction permettant la vérification des permissions
const validatePermissions = (permissions) => {
    // tableau des permission
    const ValidPermissions = [
        'ADMINISTRATOR',
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]
    // boucle parcourant le tableau pour vérifier que la permission spécifiée est bien dans le tableau
    for (const permission of permissions) {
        // si elle n'est pas dans le tableau
        if (!ValidPermissions.includes(permission)) {
            // envoie d'une erreur
            throw new Error(`"${permission}" : cette permission n'est pas reconnue par le système.`)
        }
    }
}

const allCommands = {}

module.exports = (client, commandOptions) => {
    let {
        commands,
        permissions = [],
    } = commandOptions
    // vérification que commands est bien un tableau
    if (typeof commands === 'string') {
        commands = [commands]
    }
    // vérification que les permissions sont valides et comprise dans le tableau
    if (permissions.length) {
        // vérification que la permission est bien un tableau, si char => convertion en tableau
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }
        validatePermissions(permissions)
    }
    for (const command of commands) {
        allCommands[command] = {
            // destructuration de l'objet commandOptions
            ...commandOptions,
            commands,
            permissions
        }
    }
}
// mise en place d'une écoute de commande pour contourner la limite
module.exports.listen = (client) => {
    // ecoute du message
    client.on('message', message => {

        // récupération du membre, contenu du message et serveur contenus dans l'objet message
        const {member, content, guild, channels} = message
        const prefix = guildPrefixes[guild.id] || globalPrefix
        // suppression des espaces dans la commande et stockage dans un tableau
        const arguments = content.split(/[ ]+/)
        // suppression de la commande du premier index
        const name = arguments.shift().toLowerCase()
        // si le nom commence par le préfix
        if (name.startsWith(prefix)) {
            // récupération du nom de la commande
            const command = allCommands[name.replace(prefix, '')]
            // si la commande n'existe, on fait rien
            if (!command) {
                return
            }

            const {
                commands,
                permissions,
                permissionError = 'Vous n\'avez pas la permission d\'utiliser cette commande',
                requiredRoles = [],
                minArgs = 0,
                maxArgs = null,
                expectedArgs,
                callback
            } = command
            // vérification que l'utilisateur a la permission
            for (const permission of permissions) {
                if (!member.hasPermission(permission)) {
                    message.reply(permissionError)
                    return
                }
            }
            // vérification que l'utilisateur possède le rôle nécessaire à l'exécution de la commande
            for (const requiredRole of requiredRoles) {
                const role = guild.roles.cache.find(role =>
                    role.name === requiredRole
                )
                // si le role n'existe pas ou si l'utilisateur n'a pas de rôle
                if (!role || !member.roles.cache.has(role.id)) {
                    message.reply(`Vous devez avoir le rôle ${requiredRole} pour utiliser cette commande`)
                    return
                }
            }

            // vérification du nombre d'arguments dans la commande
            if (arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
                message.reply(`Syntaxe incorrecte. Veuillez utiliser la syntaxe suivante : ${prefix}${commands} ${expectedArgs}`)
                return
            }

            callback(client, message, arguments, arguments.join(' '))
            return
        }

    })
}

module.exports.loadPrefixes = async (client) => {
    await mongo().then(async mongoose => {
        try {
            for (const guild of client.guilds.cache) {
                const guildId = guild[1].id
                const result = await prefixSchema.findOne({_id: guildId})
                guildPrefixes[guildId] = result.prefix
            }
        } finally {
            await mongoose.connection.close()
        }
    })

}